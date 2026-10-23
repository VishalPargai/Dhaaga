// src/utils/WishlistContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import products from '../data/products.json';
import { money } from './formatters';
import { getWhatsAppUrl, INSTAGRAM_DM_URL } from '../data/constants';

const WishlistContext = createContext(null);

export function WishlistProvider({ children, onNotify }) {
  const [savedItems, setSavedItems] = useState(() => {
    try {
      const stored = localStorage.getItem('dhaaga_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('dhaaga_wishlist', JSON.stringify(savedItems));
    } catch (e) {
      console.error('Could not save wishlist to localStorage', e);
    }
  }, [savedItems]);

  function isSaved(productId, formatId = null) {
    return savedItems.some((item) => {
      if (formatId && item.formatId) {
        return item.productId === productId && item.formatId === formatId;
      }
      return item.productId === productId;
    });
  }

  function toggleSave(product, format = null) {
    if (!product) return false;
    const resolvedFormat = format || product.formats?.[0] || null;
    const formatId = resolvedFormat?.id || null;

    const exists = isSaved(product.id, formatId);

    if (exists) {
      setSavedItems((prev) =>
        prev.filter(
          (item) => !(item.productId === product.id && (formatId ? item.formatId === formatId : true))
        )
      );
      if (onNotify) onNotify(`Removed "${product.name}" from your saved pieces.`);
      return false;
    } else {
      setSavedItems((prev) => [
        ...prev,
        {
          productId: product.id,
          formatId: formatId,
          addedAt: Date.now(),
        },
      ]);
      if (onNotify) onNotify(`Saved "${product.name}" to your wishlist!`);
      return true;
    }
  }

  function removeItem(productId, formatId = null) {
    setSavedItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && (formatId ? item.formatId === formatId : true))
      )
    );
  }

  function clearWishlist() {
    setSavedItems([]);
    if (onNotify) onNotify('Saved pieces cleared.');
  }

  // Populate actual product & format objects for the saved items
  const detailedSavedItems = savedItems
    .map((entry) => {
      const product = products.find((p) => p.id === entry.productId);
      if (!product) return null;
      const format =
        product.formats?.find((f) => f.id === entry.formatId) ||
        product.formats?.[0] ||
        null;
      return {
        ...entry,
        product,
        format,
      };
    })
    .filter(Boolean);

  // Total price calculation
  const totalPrice = detailedSavedItems.reduce((acc, item) => {
    return acc + (item.format?.price || 0);
  }, 0);

  // Generate combined multi-item enquiry message
  const combinedEnquiryMessage = detailedSavedItems.length
    ? `Hi Dhaaga! 🌸\nI would love to enquire about these ${detailedSavedItems.length} saved pieces from your collection:\n\n${detailedSavedItems
        .map(
          (item, idx) =>
            `${idx + 1}. *${item.product.name}* (${item.format?.label || 'Standard'}) - ${
              item.format?.price ? money(item.format.price) : 'Price to confirm'
            }`
        )
        .join('\n')}\n\n*Estimated Total:* ${money(totalPrice)}\n\nCould you please share availability and how to place the order? Thank you!`
    : '';

  function enquireAllWhatsApp() {
    if (!detailedSavedItems.length) return;
    const url = getWhatsAppUrl(combinedEnquiryMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  async function copyAllEnquiry() {
    if (!combinedEnquiryMessage) return false;
    try {
      await navigator.clipboard.writeText(combinedEnquiryMessage);
      if (onNotify) onNotify('Wishlist details copied! Paste in Instagram DM.');
      return true;
    } catch {
      return false;
    }
  }

  function enquireAllInstagram() {
    void copyAllEnquiry();
    window.open(INSTAGRAM_DM_URL, '_blank', 'noopener,noreferrer');
  }

  return (
    <WishlistContext.Provider
      value={{
        savedItems,
        detailedSavedItems,
        isSaved,
        toggleSave,
        removeItem,
        clearWishlist,
        wishlistCount: detailedSavedItems.length,
        totalPrice,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        enquireAllWhatsApp,
        enquireAllInstagram,
        combinedEnquiryMessage,
        copyAllEnquiry,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
