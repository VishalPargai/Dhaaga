// src/components/QuickViewModal.jsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ArrowUpRight, Instagram, Check, Copy } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { money, imageUrl } from '../utils/formatters';
import { getWhatsAppUrl, INSTAGRAM_DM_URL } from '../data/constants';
import { useWishlist } from '../utils/WishlistContext';
import Photo from './Photo';

export default function QuickViewModal({
  product,
  initialFormatId,
  isOpen,
  onClose,
  onViewFullDetails,
}) {
  const [selectedFormatId, setSelectedFormatId] = useState(initialFormatId);
  const [imageIdx, setImageIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const { isSaved, toggleSave } = useWishlist();

  // Keep format in sync whenever product or initialFormatId changes
  useEffect(() => {
    if (product) {
      setSelectedFormatId(initialFormatId || product.formats?.[0]?.id || null);
      setImageIdx(0);
      setCopied(false);
    }
  }, [product, initialFormatId]);

  // Handle escape key and browser back button
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    // Push quickview state so pressing browser back closes modal
    const originalHash = window.location.hash;
    window.history.pushState({ modal: 'quickview' }, '', '#quickview');

    function handlePopState() {
      onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);

    // Prevent body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = originalOverflow;
      if (window.location.hash === '#quickview') {
        window.history.replaceState({}, '', originalHash || window.location.pathname + window.location.search);
      }
    };
  }, [isOpen, onClose]);

  if (typeof document === 'undefined') return null;

  const currentFormat =
    product?.formats?.find((f) => f.id === selectedFormatId) ||
    product?.formats?.[0] ||
    null;

  const images = currentFormat?.images || [];
  const currentImage = images[imageIdx] || images[0] || '';
  const saved = product && currentFormat ? isSaved(product.id, currentFormat.id) : false;

  const enquiryText = product && currentFormat
    ? `Hi Dhaaga! 🌸\nI would love to enquire about:\n• *Product:* ${product.name}\n• *Format:* ${currentFormat.label || 'Standard'}\n• *Price:* ${
        currentFormat.price != null ? money(currentFormat.price) : 'Please share price'
      }\nCould you please share details & availability? Thank you!`
    : '';

  function handleWhatsApp() {
    if (!enquiryText) return;
    window.open(getWhatsAppUrl(enquiryText), '_blank', 'noopener,noreferrer');
  }

  async function handleCopyInstagram() {
    if (!enquiryText) return;
    try {
      await navigator.clipboard.writeText(enquiryText);
      setCopied(true);
      window.open(INSTAGRAM_DM_URL, '_blank', 'noopener,noreferrer');
      setTimeout(() => setCopied(false), 4000);
    } catch {
      window.open(INSTAGRAM_DM_URL, '_blank', 'noopener,noreferrer');
    }
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && product && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-[16px] sm:p-[24px]"
          role="dialog"
          aria-modal="true"
          aria-label={`Quick preview for ${product.name}`}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 dark:bg-black/80 backdrop-blur-[6px] cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[820px] max-h-[90vh] overflow-y-auto bg-[#faf7f2] dark:bg-[#1e1c19] text-[#201e1b] dark:text-[#f0ebe1] rounded-[24px] shadow-[0_24px_70px_rgba(0,0,0,0.35)] border border-[#302e2a18] dark:border-[#ffffff18] p-[22px] sm:p-[32px]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-[18px] right-[18px] z-20 w-[38px] h-[38px] rounded-full border border-[#302e2a18] dark:border-[#ffffff18] bg-[#faf7f2]/90 dark:bg-[#1e1c19]/90 backdrop-blur-[6px] flex items-center justify-center text-[#706c61] dark:text-[#a6a094] hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-[#282522] cursor-pointer transition-colors shadow-sm"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[36px] items-start">
              {/* Left: Images */}
              <div>
                <div className="relative aspect-[4/4.8] w-full rounded-[16px] overflow-hidden bg-[#eae2d5] dark:bg-[#25221e]">
                  <Photo
                    src={currentImage}
                    alt={`${product.name} — ${currentFormat?.label || ''}`}
                    fit={currentFormat?.imageFit || 'cover'}
                    position={currentFormat?.imagePosition || 'center'}
                  />

                  {/* Heart Button inside preview */}
                  <button
                    onClick={() => toggleSave(product, currentFormat)}
                    className={`absolute top-[14px] right-[14px] z-10 w-[38px] h-[38px] rounded-full backdrop-blur-[8px] flex items-center justify-center cursor-pointer transition-all duration-200 border ${
                      saved
                        ? 'bg-[#c94b4b] text-white border-[#c94b4b] shadow-md'
                        : 'bg-white/85 dark:bg-black/65 text-[#302e2a] dark:text-[#f0ebe1] border-white/20 hover:scale-105'
                    }`}
                    aria-label={saved ? 'Remove from saved' : 'Save piece'}
                    title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
                  </button>

                  <span className="absolute bottom-[12px] left-[12px] text-[8px] tracking-[0.13em] uppercase bg-[#f5f0e7cc] dark:bg-[#1a1917cc] text-[#302e2a] dark:text-[#f0ebe1] py-[6px] px-[10px] rounded-full backdrop-blur-[4px]">
                    HANDMADE WITH INTENTION
                  </span>
                </div>

                {images.length > 1 && (
                  <div className="flex gap-[8px] mt-[10px] overflow-x-auto pb-[4px]">
                    {images.map((src, idx) => (
                      <button
                        key={src}
                        onClick={() => setImageIdx(idx)}
                        className={`w-[54px] aspect-square rounded-[8px] overflow-hidden border p-0 cursor-pointer bg-[#eae2d5] dark:bg-[#25221e] flex-none ${
                          idx === imageIdx
                            ? 'border-[#626b50] dark:border-[#9da991] p-[2px]'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Photo src={src} alt={`${product.name} ${idx + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Product Details & Actions */}
              <div className="flex flex-col h-full justify-between pt-[4px]">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.16em] font-bold text-[#686a59] dark:text-[#a8b797]">
                    {(product.collections || []).join(' · ')}
                  </span>
                  <h3 className="font-serif text-[clamp(28px,3.5vw,38px)] font-medium leading-[1.05] m-0 mt-[6px]">
                    {product.name}
                    <span className="text-[#626b50] dark:text-[#9da991]">.</span>
                  </h3>

                  <div className="font-serif text-[26px] font-medium my-[14px] text-[#201e1b] dark:text-[#f0ebe1]">
                    {currentFormat?.price != null ? money(currentFormat.price) : 'Price upon request'}
                  </div>

                  <p className="text-[12px] text-[#777469] dark:text-[#a6a094] leading-[1.7] m-0 mb-[18px]">
                    {product.description}
                  </p>

                  {/* Formats Selection */}
                  {product.formats?.length > 1 && (
                    <div className="mb-[20px]">
                      <span className="block text-[9px] uppercase tracking-[0.14em] font-bold text-[#777469] dark:text-[#a6a094] mb-[8px]">
                        Select Format:
                      </span>
                      <div className="flex flex-wrap gap-[8px]">
                        {product.formats.map((f) => {
                          const active = f.id === currentFormat?.id;
                          return (
                            <button
                              key={f.id}
                              onClick={() => {
                                setSelectedFormatId(f.id);
                                setImageIdx(0);
                              }}
                              className={`py-[7px] px-[13px] rounded-full text-[10px] cursor-pointer transition-all border ${
                                active
                                  ? 'bg-black text-white dark:bg-[#f0ebe1] dark:text-[#181715] border-black dark:border-[#f0ebe1] font-medium shadow-sm'
                                  : 'border-[#302e2a22] dark:border-[#ffffff20] bg-transparent text-[#706c61] dark:text-[#a6a094] hover:border-black dark:hover:border-white'
                              }`}
                            >
                              {f.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Order / Enquiry Buttons */}
                <div className="space-y-[10px] pt-[14px] border-t border-[#302e2a14] dark:border-[#ffffff12]">
                  {/* WhatsApp Direct 1-Click Enquiry with SiWhatsapp */}
                  <button
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-[10px] py-[13px] px-[18px] rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-[12px] shadow-[0_4px_16px_rgba(37,211,102,0.3)] cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <SiWhatsapp size={18} />
                    <span>Order / Enquire on WhatsApp</span>
                    <ArrowUpRight size={14} />
                  </button>

                  {/* Instagram Direct Enquiry */}
                  <button
                    onClick={handleCopyInstagram}
                    className="w-full flex items-center justify-center gap-[8px] py-[11px] px-[18px] rounded-full border border-[#302e2a22] dark:border-[#ffffff20] bg-transparent hover:bg-[#eae2d5]/60 dark:hover:bg-[#25221e] text-[#201e1b] dark:text-[#f0ebe1] text-[11px] font-medium cursor-pointer transition-colors"
                  >
                    {copied ? <Check size={14} className="text-[#626b50]" /> : <Instagram size={14} />}
                    <span>{copied ? 'Details Copied! Opening DM...' : 'Enquire via Instagram DM'}</span>
                  </button>

                  <div className="flex items-center justify-between pt-[4px]">
                    <button
                      onClick={() => {
                        onClose();
                        if (onViewFullDetails) onViewFullDetails(product.id, currentFormat?.id);
                      }}
                      className="text-[11px] text-[#626b50] dark:text-[#a8b797] hover:underline cursor-pointer border-0 bg-transparent p-0 flex items-center gap-[4px]"
                    >
                      View full details & care guide <ArrowUpRight size={12} />
                    </button>

                    <button
                      onClick={() => toggleSave(product, currentFormat)}
                      className="text-[11px] text-[#777469] dark:text-[#a6a094] hover:text-[#c94b4b] cursor-pointer border-0 bg-transparent p-0 flex items-center gap-[5px]"
                    >
                      <Heart size={13} fill={saved ? '#c94b4b' : 'none'} color={saved ? '#c94b4b' : 'currentColor'} />
                      <span>{saved ? 'Saved' : 'Save to wishlist'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
