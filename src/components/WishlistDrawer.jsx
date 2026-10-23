// src/components/WishlistDrawer.jsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Heart, ArrowRight, Instagram, ArrowUpRight } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { useWishlist } from '../utils/WishlistContext';
import { money, imageUrl } from '../utils/formatters';

export default function WishlistDrawer({ onSelectProduct }) {
  const {
    isDrawerOpen,
    closeDrawer,
    detailedSavedItems,
    removeItem,
    clearWishlist,
    totalPrice,
    enquireAllWhatsApp,
    enquireAllInstagram,
    wishlistCount,
  } = useWishlist();

  // Escape key & browser back handling
  useEffect(() => {
    if (!isDrawerOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        closeDrawer();
      }
    }

    const originalHash = window.location.hash;
    window.history.pushState({ drawer: 'wishlist' }, '', '#saved');

    function handlePopState() {
      closeDrawer();
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = originalOverflow;
      if (window.location.hash === '#saved') {
        window.history.replaceState({}, '', originalHash || window.location.pathname + window.location.search);
      }
    };
  }, [isDrawerOpen, closeDrawer]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end" role="dialog" aria-modal="true" aria-label="Saved pieces">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/45 dark:bg-black/65 backdrop-blur-[4px] cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 w-full max-w-[440px] h-full bg-[#fcfaf7] dark:bg-[#1a1816] text-[#201e1b] dark:text-[#f0ebe1] shadow-[-16px_0_40px_rgba(0,0,0,0.18)] flex flex-col border-l border-[#302e2a18] dark:border-[#ffffff14]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-[22px_24px] border-b border-[#302e2a15] dark:border-[#ffffff12]">
              <div className="flex items-center gap-[10px]">
                <div className="w-[32px] h-[32px] rounded-full bg-[#626b50]/15 dark:bg-[#9da991]/20 flex items-center justify-center text-[#626b50] dark:text-[#a8b797]">
                  <Heart size={16} fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-serif text-[22px] leading-tight m-0 font-medium">
                    Saved Pieces
                  </h3>
                  <p className="text-[10px] text-[#777469] dark:text-[#a6a094] m-0 mt-[2px]">
                    {wishlistCount} {wishlistCount === 1 ? 'piece' : 'pieces'} kept with love
                  </p>
                </div>
              </div>

              <button
                onClick={closeDrawer}
                className="w-[36px] h-[36px] rounded-full border border-[#302e2a20] dark:border-[#ffffff20] bg-transparent flex items-center justify-center text-[#706c61] dark:text-[#a6a094] hover:text-black dark:hover:text-white hover:bg-[#eae2d5]/60 dark:hover:bg-[#25221e] cursor-pointer transition-colors"
                aria-label="Close saved pieces drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-[20px_24px] divide-y divide-[#302e2a12] dark:divide-[#ffffff10]">
              {detailedSavedItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-[40px_20px]">
                  <div className="w-[60px] h-[60px] rounded-full bg-[#eae2d5]/60 dark:bg-[#25221e] flex items-center justify-center text-[#8e887c] dark:text-[#7d776c] mb-[18px]">
                    <Heart size={26} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-serif text-[22px] font-medium m-0 mb-[6px]">
                    Your wishlist is quiet
                  </h4>
                  <p className="text-[12px] text-[#777469] dark:text-[#a6a094] max-w-[260px] leading-[1.6] m-0 mb-[22px]">
                    Tap the heart on any bouquet, flower, or keepsake to save it here and compare before ordering.
                  </p>
                  <button
                    onClick={closeDrawer}
                    className="inline-flex items-center gap-[8px] py-[10px] px-[20px] rounded-full bg-[#302e2a] dark:bg-[#f0ebe1] text-[#f5f0e7] dark:text-[#181715] text-[11px] font-semibold hover:bg-[#201e1b] dark:hover:bg-white cursor-pointer transition-colors"
                  >
                    Explore collection <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                detailedSavedItems.map(({ product, format }) => {
                  const thumb = format?.images?.[0] || product.formats?.[0]?.images?.[0];
                  return (
                    <div
                      key={`${product.id}-${format?.id || 'default'}`}
                      className="py-[16px] first:pt-0 last:pb-0 flex items-center gap-[14px] group"
                    >
                      <button
                        onClick={() => {
                          closeDrawer();
                          if (onSelectProduct) onSelectProduct(product.id, format?.id);
                        }}
                        className="w-[64px] h-[64px] rounded-[10px] overflow-hidden bg-[#eae2d5] dark:bg-[#25221e] flex-none cursor-pointer border-0 p-0 text-left"
                      >
                        <img
                          src={imageUrl(thumb)}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </button>

                      <div className="flex-1 min-w-0">
                        <button
                          onClick={() => {
                            closeDrawer();
                            if (onSelectProduct) onSelectProduct(product.id, format?.id);
                          }}
                          className="text-left bg-transparent border-0 p-0 cursor-pointer block w-full"
                        >
                          <h4 className="font-serif text-[17px] font-medium leading-snug m-0 truncate text-[#201e1b] dark:text-[#f0ebe1] hover:text-[#626b50] dark:hover:text-[#a8b797] transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-[#777469] dark:text-[#a6a094] m-0 mt-[2px] truncate">
                            {format?.label || 'Standard'}
                          </p>
                          <p className="text-[13px] font-medium text-[#4b523f] dark:text-[#a8b797] m-0 mt-[4px]">
                            {format?.price ? money(format.price) : 'Price to confirm'}
                          </p>
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(product.id, format?.id)}
                        className="p-[8px] rounded-full text-[#9c968a] hover:text-[#c94b4b] hover:bg-[#c94b4b]/10 cursor-pointer border-0 bg-transparent transition-colors flex-none"
                        aria-label={`Remove ${product.name} from wishlist`}
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary & Order CTA */}
            {detailedSavedItems.length > 0 && (
              <div className="p-[20px_24px] border-t border-[#302e2a15] dark:border-[#ffffff12] bg-[#f8f5ee] dark:bg-[#1f1d1a] space-y-[12px]">
                <div className="flex items-center justify-between pb-[6px]">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.14em] font-bold text-[#777469] dark:text-[#a6a094]">
                      Estimated Total
                    </span>
                    <p className="text-[10px] text-[#8e887c] dark:text-[#7d776c] m-0">
                      Excluding delivery
                    </p>
                  </div>
                  <span className="font-serif text-[24px] font-medium text-[#201e1b] dark:text-[#f0ebe1]">
                    {money(totalPrice)}
                  </span>
                </div>

                {/* 1-Click WhatsApp Enquiry for all items with SiWhatsapp */}
                <button
                  onClick={enquireAllWhatsApp}
                  className="w-full flex items-center justify-center gap-[10px] py-[13px] px-[16px] rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-[12px] shadow-[0_4px_14px_rgba(37,211,102,0.3)] cursor-pointer transition-all active:scale-[0.98]"
                >
                  <SiWhatsapp size={18} />
                  <span>Enquire All on WhatsApp</span>
                  <ArrowUpRight size={14} />
                </button>

                {/* Instagram Fallback Enquiry */}
                <button
                  onClick={enquireAllInstagram}
                  className="w-full flex items-center justify-center gap-[8px] py-[11px] px-[16px] rounded-full border border-[#302e2a22] dark:border-[#ffffff20] bg-transparent hover:bg-[#eae2d5]/60 dark:hover:bg-[#25221e] text-[#201e1b] dark:text-[#f0ebe1] text-[11px] font-medium cursor-pointer transition-colors"
                >
                  <Instagram size={15} />
                  <span>Copy & Send via Instagram DM</span>
                </button>

                <div className="flex justify-between items-center pt-[4px]">
                  <span className="text-[10px] text-[#8e887c] dark:text-[#7d776c]">
                    Pieces are handmade upon order
                  </span>
                  <button
                    onClick={clearWishlist}
                    className="text-[10px] text-[#9c968a] hover:text-[#c94b4b] underline cursor-pointer bg-transparent border-0 p-0"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
