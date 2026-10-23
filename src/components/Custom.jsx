// src/components/Custom.jsx
import { useState } from "react";
import { Instagram, ArrowUpRight, Sparkles, Check, Flower2, Layers } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { motion } from "framer-motion";
import {
  INSTAGRAM_DM_URL,
  CUSTOM_CATEGORIES,
  CUSTOM_PALETTES,
  getWhatsAppUrl,
} from "../data/constants";

function CategoryIcon({ id, className = "w-5 h-5" }) {
  switch (id) {
    case 'bouquet':
      return <Flower2 className={className} />;
    case 'pot':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 10V4" />
          <path d="M9 4a3 3 0 0 1 6 0" />
          <path d="M12 7c-1.5 0-3-1-3-2.5S10.5 2 12 2s3 1 3 2.5S13.5 7 12 7z" fill="currentColor" fillOpacity="0.2" />
          <path d="M7 10h10l-1.5 10H8.5L7 10z" />
          <path d="M6 10h12" />
        </svg>
      );
    case 'single-stem':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 22V8" />
          <path d="M12 8c2.5 0 5-2 5-5-2.5 0-5 2-5 5z" fill="currentColor" fillOpacity="0.2" />
          <path d="M12 8C9.5 8 7 6 7 3c2.5 0 5 2 5 5z" fill="currentColor" fillOpacity="0.2" />
          <circle cx="12" cy="8" r="1.5" fill="currentColor" />
          <path d="M12 14c-2 0-4-1-4-2 0 2 2 3 4 3" />
          <path d="M12 17c2 0 4-1 4-2 0 2-2 3-4 3" />
        </svg>
      );
    case 'keychain':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="8" cy="8" r="5" />
          <circle cx="8" cy="8" r="2" fill="currentColor" fillOpacity="0.2" />
          <path d="m11.5 11.5 8.5 8.5" />
          <path d="m16 16 2-2" />
          <path d="m18 18 2-2" />
        </svg>
      );
    case 'coasters':
      return <Layers className={className} />;
    case 'other':
    default:
      return <Sparkles className={className} />;
  }
}

export default function Custom() {
  const [selectedCategory, setSelectedCategory] = useState("bouquet");
  const [selectedPalette, setSelectedPalette] = useState("earthy-olive");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  const activeCategory =
    CUSTOM_CATEGORIES.find((c) => c.id === selectedCategory) ||
    CUSTOM_CATEGORIES[0];
  const activePalette =
    CUSTOM_PALETTES.find((p) => p.id === selectedPalette) ||
    CUSTOM_PALETTES[0];

  // Crafted custom inquiry text
  const customInquiryMessage = `Hi Dhaaga! 🌸✨\nI'd love to request a Custom Handmade Piece:\n\n• *Type:* ${activeCategory.label}\n• *Color Palette:* ${activePalette.label}\n${
    note.trim() ? `• *Special Notes/Occasion:* ${note.trim()}\n` : ''
  }\nCould we discuss the design, timeline, and pricing? Thank you!`;

  function handleSendWhatsApp() {
    window.open(getWhatsAppUrl(customInquiryMessage), "_blank", "noopener,noreferrer");
  }

  async function handleSendInstagram() {
    try {
      await navigator.clipboard.writeText(customInquiryMessage);
      setCopied(true);
      window.open(INSTAGRAM_DM_URL, "_blank", "noopener,noreferrer");
      setTimeout(() => setCopied(false), 4000);
    } catch {
      window.open(INSTAGRAM_DM_URL, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#666e56] dark:bg-[#2e3425] text-[#f5f0e7] py-[85px] px-[clamp(22px,7vw,130px)] sm-down:py-[65px] sm-down:px-[20px] relative overflow-hidden transition-colors duration-300"
      id="custom"
    >
      <div className="relative z-10 max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[40px] items-center">
        {/* Left Column: Heading & Introduction */}
        <div className="lg:col-span-5">
          <p className="flex items-center gap-[10px] text-[9px] leading-[1.5] tracking-[0.17em] font-bold text-[#d8ddce] m-0 mb-[18px]">
            <i className="w-[22px] h-[1px] bg-[#d8ddce] inline-block"></i> MADE
            JUST FOR YOU
          </p>
          <h2 className="font-serif font-normal text-[clamp(44px,5.5vw,76px)] leading-[0.95] tracking-[-0.04em] m-0 mb-[20px] sm-down:text-[54px]">
            Have something
            <br />
            <em className="font-normal text-[#d8ddce] not-italic">in mind?</em>
          </h2>
          <p className="text-[#e1e2d8] text-[12px] leading-[1.9] max-w-[400px] m-0 mb-[26px]">
            Tell us your colours, your idea, or the little keepsake you wish existed. We stitch bespoke pieces with slow care for birthdays, anniversaries, and heartfelt gifts.
          </p>

          <div className="flex items-center gap-[12px] flex-wrap">
            <span className="text-[11px] text-[#d8ddce] flex items-center gap-[6px]">
              <Sparkles size={14} /> Individual care
            </span>
            <span className="text-[11px] text-[#d8ddce]">·</span>
            <span className="text-[11px] text-[#d8ddce]">
              No minimum quantity
            </span>
            <span className="text-[11px] text-[#d8ddce]">·</span>
            <span className="text-[11px] text-[#d8ddce]">
              Delivered across India
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Customizer Card */}
        <div className="lg:col-span-7 bg-[#fdfbf7] dark:bg-[#1e1c19] text-[#201e1b] dark:text-[#f0ebe1] rounded-[24px] p-[26px] sm:p-[36px] shadow-[0_24px_60px_rgba(0,0,0,0.25)] border border-[#ffffff20]">
          <div className="flex items-center justify-between mb-[22px] pb-[16px] border-b border-[#302e2a14] dark:border-[#ffffff10]">
            <div>
              <span className="text-[9px] uppercase tracking-[0.16em] font-bold text-[#626b50] dark:text-[#a8b797]">
                BESPOKE ATELIER
              </span>
              <h3 className="font-serif text-[26px] font-medium leading-tight m-0 mt-[4px]">
                Design Your Custom Piece
              </h3>
            </div>
            <span className="text-[10px] tracking-[0.14em] uppercase font-bold text-[#626b50] dark:text-[#9da991] bg-[#626b50]/10 dark:bg-[#9da991]/15 py-[4px] px-[12px] rounded-full">
              Made to order
            </span>
          </div>

          {/* 1. Category selector with elegant vector icons */}
          <div className="mb-[24px]">
            <label className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-[#777469] dark:text-[#a6a094] mb-[12px]">
              <span>1. Choose piece type</span>
              <span className="font-normal text-[#626b50] dark:text-[#a8b797] normal-case tracking-normal">
                Selected: <strong>{activeCategory.label}</strong>
              </span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-[10px]">
              {CUSTOM_CATEGORIES.map((cat) => {
                const active = cat.id === selectedCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`group flex items-start gap-[10px] p-[12px] rounded-[14px] text-left cursor-pointer transition-all border relative ${
                      active
                        ? "bg-[#626b50] text-white border-[#626b50] dark:bg-[#9da991] dark:text-[#181715] dark:border-[#9da991] shadow-md scale-[1.02]"
                        : "bg-[#f5f0e7]/60 dark:bg-[#25221e] border-[#302e2a15] dark:border-[#ffffff12] text-[#302e2a] dark:text-[#d0c9bd] hover:border-[#626b50]/50 hover:bg-[#ede5d6]/70 dark:hover:bg-[#2e2a25]"
                    }`}
                  >
                    <div
                      className={`w-[36px] h-[36px] rounded-full flex-none flex items-center justify-center transition-colors ${
                        active
                          ? "bg-white/20 text-white dark:bg-black/20 dark:text-[#181715]"
                          : "bg-[#626b50]/10 dark:bg-[#9da991]/15 text-[#626b50] dark:text-[#a8b797]"
                      }`}
                    >
                      <CategoryIcon id={cat.id} className="w-[18px] h-[18px]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-[12px] leading-tight m-0 truncate">
                        {cat.label}
                      </h4>
                      <p
                        className={`text-[10px] m-0 mt-[3px] truncate ${
                          active
                            ? "text-white/80 dark:text-black/75"
                            : "text-[#777469] dark:text-[#a6a094]"
                        }`}
                      >
                        {cat.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Color palette selector */}
          <div className="mb-[24px]">
            <label className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-[#777469] dark:text-[#a6a094] mb-[12px]">
              <span>2. Preferred Colour Palette</span>
              <span className="font-normal text-[#626b50] dark:text-[#a8b797] normal-case tracking-normal">
                Selected: <strong>{activePalette.label.split(' ')[0]}</strong>
              </span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px]">
              {CUSTOM_PALETTES.map((palette) => {
                const active = palette.id === selectedPalette;
                return (
                  <button
                    key={palette.id}
                    onClick={() => setSelectedPalette(palette.id)}
                    className={`flex items-center gap-[10px] p-[10px_14px] rounded-[12px] text-[11px] cursor-pointer transition-all border text-left ${
                      active
                        ? "border-[#626b50] dark:border-[#9da991] bg-[#626b50]/10 dark:bg-[#9da991]/15 font-semibold text-[#201e1b] dark:text-[#f0ebe1] ring-1 ring-[#626b50]/30"
                        : "border-[#302e2a15] dark:border-[#ffffff12] bg-[#f5f0e7]/60 dark:bg-[#25221e] text-[#444039] dark:text-[#d0c9bd] hover:border-[#626b50]/40"
                    }`}
                  >
                    <span
                      className="w-[16px] h-[16px] rounded-full flex-none shadow-sm border border-black/10"
                      style={{ backgroundColor: palette.color }}
                    />
                    <span className="truncate flex-1">{palette.label}</span>
                    {active && <Check size={14} className="text-[#626b50] dark:text-[#9da991] flex-none" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Optional note */}
          <div className="mb-[24px]">
            <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#777469] dark:text-[#a6a094] mb-[8px]">
              3. Occasion, date, or special detail (Optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Birthday gift for mom, needs to arrive in Noida by 15th..."
              className="w-full bg-[#f5f0e7]/70 dark:bg-[#25221e] border border-[#302e2a20] dark:border-[#ffffff14] rounded-[12px] p-[11px_15px] text-[12px] text-[#201e1b] dark:text-[#f0ebe1] placeholder:text-[#8e887c] dark:placeholder:text-[#7d776c] outline-none focus:border-[#626b50] dark:focus:border-[#9da991] transition-colors"
            />
          </div>

          {/* 4. Action Buttons (WhatsApp & Instagram) */}
          <div className="space-y-[10px] pt-[8px]">
            {/* WhatsApp Direct with SiWhatsapp */}
            <button
              onClick={handleSendWhatsApp}
              className="w-full flex items-center justify-center gap-[10px] py-[13px] px-[20px] rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-[12px] shadow-[0_4px_16px_rgba(37,211,102,0.3)] cursor-pointer transition-all active:scale-[0.98]"
            >
              <SiWhatsapp size={19} />
              <span>Send Custom Request via WhatsApp</span>
              <ArrowUpRight size={15} />
            </button>

            {/* Instagram Alternative */}
            <button
              onClick={handleSendInstagram}
              className="w-full flex items-center justify-center gap-[8px] py-[11px] px-[18px] rounded-full border border-[#302e2a22] dark:border-[#ffffff20] bg-transparent hover:bg-[#eae2d5]/60 dark:hover:bg-[#25221e] text-[#201e1b] dark:text-[#f0ebe1] text-[11px] font-medium cursor-pointer transition-colors"
            >
              {copied ? <Check size={14} className="text-[#626b50]" /> : <Instagram size={14} />}
              <span>{copied ? 'Inquiry Copied! Opening Instagram DM...' : 'Copy & Send via Instagram DM'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative large "d." watermark in background */}
      <div
        className="absolute right-[4%] bottom-[-130px] font-serif font-normal text-[460px] leading-[0.8] tracking-[-0.1em] text-[#f5f0e70a] sm-down:text-[280px] sm-down:right-[-2%] sm-down:bottom-[-75px] pointer-events-none select-none"
        aria-hidden="true"
      >
        d.
      </div>
    </motion.section>
  );
}
