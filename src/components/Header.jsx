import { useState, useRef, useEffect, useMemo } from "react";
import { Menu, X, ArrowUpRight, ArrowRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { COLLECTIONS } from "../data/constants";
import products from "../data/products.json";
import { priceLabel, imageUrl } from "../utils/formatters";
import { useTheme } from "../utils/ThemeContext";
import ThemeToggle from "./ThemeToggle";

export default function Header({
  mobileOpen,
  setMobileOpen,
  setProductId,
  chooseCollection,
  onSearchSubmit,
}) {
  const { isDark, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [searchOpen]);

  const allMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((item) => {
      const name = (item.name || "").toLowerCase();
      const desc = (item.description || "").toLowerCase();
      const cols = (item.collections || []).some((c) => c.toLowerCase().includes(q));
      const formats = (item.formats || []).some((f) => (f.label || "").toLowerCase().includes(q));
      return name.includes(q) || desc.includes(q) || cols || formats;
    });
  }, [query]);

  const previewResults = useMemo(() => allMatches.slice(0, 5), [allMatches]);

  function handleSelectProduct(item) {
    setSearchOpen(false);
    setQuery("");
    setProductId(item.id);
    window.setTimeout(() => {
      document.getElementById("product-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  function handleViewAll() {
    if (!query.trim()) return;
    const q = query.trim();
    setSearchOpen(false);
    setQuery("");
    if (onSearchSubmit) {
      onSearchSubmit(q);
    }
  }

  return (
    <>
      <header className="absolute z-20 top-0 left-0 right-0 flex items-center justify-between py-[24px] px-[clamp(22px,5.2vw,84px)] max-sm:py-[18px] max-sm:px-[20px] bg-[linear-gradient(180deg,rgba(245,240,231,0.52)_0%,rgba(245,240,231,0.14)_72%,transparent_100%)] max-sm:bg-[linear-gradient(180deg,rgba(245,240,231,0.72),rgba(245,240,231,0.15))] dark:bg-[linear-gradient(180deg,rgba(22,21,19,0.85)_0%,rgba(22,21,19,0.35)_72%,transparent_100%)] dark:max-sm:bg-[linear-gradient(180deg,rgba(22,21,19,0.92),rgba(22,21,19,0.35))]">
        <a
          className="inline-flex flex-col font-serif font-semibold text-[34px] leading-[0.78] tracking-[-0.055em] max-sm:text-[31px] text-[#302e2a] dark:text-[#f0ebe1] focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 cursor-pointer group"
          href="#home"
          onClick={() => {
            setProductId(null);
            setMobileOpen(false);
            setSearchOpen(false);
          }}
        >
          <span>
            dhaaga<span className="text-[#626b50] dark:text-[#9da991]">.</span>
          </span>
          <small className="mt-[9px] font-sans font-normal text-[8px] leading-[1.2] tracking-[0.19em] max-sm:text-[7px] max-sm:mt-[8px] text-[#555046] dark:text-[#a6a094]">
            HANDMADE WITH INTENTION
          </small>
        </a>

        {/* DESKTOP NAV & SEARCH & THEME TOGGLE */}
        <div
          className={`flex items-center gap-[clamp(16px,2.2vw,36px)] max-sm:hidden transition-all duration-200 ${
            searchOpen ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
          }`}
        >
          <nav
            className="flex items-center gap-[clamp(18px,2.5vw,40px)] max-[900px]:gap-[16px]"
            aria-label="Main navigation"
          >
            {COLLECTIONS.filter((item) => item.id !== "all").map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  chooseCollection(item.id);
                  setSearchOpen(false);
                }}
                className="relative inline-block text-[13px] max-[900px]:text-[10px] font-semibold tracking-[0.015em] text-[#302e2a] dark:text-[#e4ded4] transition-colors duration-200 hover:text-black dark:hover:text-white after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-[3px] after:h-[1.5px] after:bg-[#302e2a] dark:after:bg-[#f0ebe1] after:scale-x-0 after:origin-left after:transition-transform after:duration-[260ms] hover:after:scale-x-100 focus-visible:after:scale-x-100 focus-visible:outline-offset-[5px] bg-transparent border-0 p-0 m-0 cursor-pointer"
              >
                {item.label}
              </motion.button>
            ))}
            <motion.a
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              href="#custom"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('custom')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setSearchOpen(false);
              }}
              className="relative inline-block text-[13px] max-[900px]:text-[10px] font-semibold tracking-[0.015em] text-[#302e2a] dark:text-[#e4ded4] transition-colors duration-200 hover:text-black dark:hover:text-white after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-[3px] after:h-[1.5px] after:bg-[#302e2a] dark:after:bg-[#f0ebe1] after:scale-x-0 after:origin-left after:transition-transform after:duration-[260ms] hover:after:scale-x-100 focus-visible:after:scale-x-100 focus-visible:outline-offset-[5px]"
            >
              Custom
            </motion.a>
          </nav>

          <div className="flex items-center gap-[12px]">
            {/* DESKTOP SEARCH BUTTON */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-[7px] py-[7px] px-[13px] rounded-full border border-[#302e2a22] dark:border-[#ffffff20] bg-[#f5f0e799] dark:bg-[#25221e99] hover:bg-[#eae2d5] dark:hover:bg-[#322d27] hover:border-[#302e2a44] dark:hover:border-[#ffffff40] text-[#302e2a] dark:text-[#e4ded4] text-[12px] font-medium transition-all cursor-pointer backdrop-blur-[6px] shadow-[0_1px_4px_rgba(48,46,42,0.06)]"
              aria-label="Open search bar"
            >
              <Search size={14} className="text-[#626b50] dark:text-[#9da991]" />
              <span>Search</span>
            </motion.button>

            {/* DESKTOP THEME TOGGLE */}
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          </div>
        </div>

        {/* MOBILE ACTIONS */}
        <div
          className={`hidden max-sm:flex items-center gap-[8px] transition-all duration-200 ${
            searchOpen ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
          }`}
        >
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} className="mr-[2px]" />
          <button
            onClick={() => {
              setSearchOpen(true);
              setMobileOpen(false);
            }}
            className="border border-[#302e2a29] dark:border-[#ffffff20] rounded-full bg-transparent w-[42px] h-[42px] inline-flex items-center justify-center cursor-pointer text-[#302e2a] dark:text-[#f0ebe1] focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4"
            aria-label="Open search bar"
          >
            <Search size={18} />
          </button>
          <button
            className="border border-[#302e2a29] dark:border-[#ffffff20] rounded-full bg-transparent w-[42px] h-[42px] inline-flex items-center justify-center cursor-pointer text-[#302e2a] dark:text-[#f0ebe1] focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((value) => !value);
              setSearchOpen(false);
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* WIDE EXPANDABLE SEARCHBAR */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              ref={searchContainerRef}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute z-50 top-[14px] left-[clamp(16px,5.2vw,84px)] right-[clamp(16px,5.2vw,84px)] max-w-[720px] mx-auto max-sm:left-[12px] max-sm:right-[12px] max-sm:top-[12px]"
            >
              <div className="relative flex items-center gap-[12px] bg-[#fbf8f2] dark:bg-[#23201c] border border-[#302e2a33] dark:border-[#ffffff25] shadow-[0_16px_40px_rgba(48,46,42,0.18)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] rounded-full py-[10px] px-[18px] backdrop-blur-[16px]">
                <Search size={18} className="text-[#626b50] dark:text-[#9da991] flex-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && query.trim()) {
                      handleViewAll();
                    }
                    if (e.key === "Escape") {
                      setSearchOpen(false);
                      setQuery("");
                    }
                  }}
                  placeholder="Search flowers, bouquets, pots, coasters, bags..."
                  className="w-full bg-transparent border-0 outline-none text-[13px] text-[#201e1b] dark:text-[#f0ebe1] placeholder:text-[#8a857a] dark:placeholder:text-[#8a857a] font-sans"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Clear search input"
                    className="p-[4px] rounded-full hover:bg-[#eae2d5] dark:hover:bg-[#353029] text-[#706c61] dark:text-[#a6a094] hover:text-black dark:hover:text-white cursor-pointer border-0 bg-transparent flex-none transition-colors"
                  >
                    <X size={15} />
                  </button>
                )}
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setQuery("");
                  }}
                  aria-label="Close search bar"
                  className="flex items-center gap-[3px] text-[11px] font-medium text-[#706c61] dark:text-[#a6a094] hover:text-black dark:hover:text-white py-[4px] px-[10px] rounded-full hover:bg-[#eae2d5] dark:hover:bg-[#353029] border border-[#302e2a18] dark:border-[#ffffff18] cursor-pointer flex-none transition-colors"
                >
                  Close
                </button>
              </div>

              {/* LIVE DROPDOWN UNDER WIDE SEARCHBAR */}
              {query.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.16 }}
                  className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[#fbf8f2] dark:bg-[#23201c] border border-[#302e2a24] dark:border-[#ffffff20] rounded-[18px] p-[8px] shadow-[0_24px_50px_rgba(48,46,42,0.22)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.6)] backdrop-blur-[20px] z-50 overflow-hidden"
                >
                  {previewResults.length > 0 ? (
                    <div>
                      <div className="px-[12px] py-[6px] text-[9px] tracking-[0.14em] font-bold text-[#777469] dark:text-[#a6a094] uppercase flex justify-between items-center border-b border-[#302e2a10] dark:border-[#ffffff12] pb-[8px] mb-[6px]">
                        <span>Matching Products ({allMatches.length})</span>
                        <span>Top Results</span>
                      </div>
                      <div className="flex flex-col gap-[3px]">
                        {previewResults.map((item) => {
                          const thumb = item.formats?.[0]?.images?.[0];
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleSelectProduct(item)}
                              className="flex items-center gap-[12px] w-full p-[8px_10px] rounded-[10px] hover:bg-[#ede5d6] dark:hover:bg-[#2e2a24] transition-all text-left cursor-pointer border-0 bg-transparent group"
                            >
                              <div className="w-[46px] h-[46px] flex-none rounded-[8px] overflow-hidden bg-[#e8e0d2] dark:bg-[#2e2a24]">
                                <img
                                  src={imageUrl(thumb)}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-[8px]">
                                  <h4 className="font-serif text-[15px] font-medium text-[#201e1b] dark:text-[#f0ebe1] m-0 truncate">
                                    {item.name}
                                  </h4>
                                  <span className="text-[11px] font-medium text-[#4b523f] dark:text-[#a8b797] flex-none">
                                    {priceLabel(item)}
                                  </span>
                                </div>
                                <p className="text-[10px] text-[#777469] dark:text-[#a6a094] m-0 mt-[2px] truncate capitalize">
                                  {(item.collections || []).join(" · ")}
                                  {item.formats?.length ? ` · ${item.formats.length} formats` : ""}
                                </p>
                              </div>
                              <ArrowUpRight
                                size={15}
                                className="text-[#999488] dark:text-[#7d776c] group-hover:text-[#201e1b] dark:group-hover:text-white flex-none transition-colors"
                              />
                            </button>
                          );
                        })}
                      </div>

                      {/* SEE ALL ITEMS BUTTON */}
                      <button
                        onClick={handleViewAll}
                        className="flex items-center justify-between w-full py-[11px] px-[14px] mt-[8px] border-t border-[#302e2a14] dark:border-[#ffffff12] text-[11px] font-semibold text-[#201e1b] dark:text-[#f0ebe1] hover:bg-[#ede5d6] dark:hover:bg-[#2e2a24] rounded-[10px] transition-colors cursor-pointer bg-transparent"
                      >
                        <span>See all {allMatches.length} items containing “{query}”</span>
                        <span className="flex items-center gap-[4px] text-[#626b50] dark:text-[#9da991]">
                          View all <ArrowRight size={14} />
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="py-[24px] px-[16px] text-center text-[#777469] dark:text-[#a6a094]">
                      <p className="font-serif text-[18px] text-[#201e1b] dark:text-[#f0ebe1] m-0 mb-[4px]">
                        No pieces found
                      </p>
                      <p className="text-[11px] m-0">
                        Try searching for rose, pot, coaster, tulip, or bouquet.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute flex flex-col z-30 top-[84px] left-[16px] right-[16px] py-[12px] px-[20px] bg-[#f5f0e7fa] dark:bg-[#1c1a17fa] border border-[#302e2a29] dark:border-[#ffffff20] shadow-[0_18px_45px_#2d271f1a] dark:shadow-[0_18px_45px_rgba(0,0,0,0.5)] backdrop-blur-[8px]"
            aria-label="Mobile navigation"
          >
            {COLLECTIONS.filter((item) => item.id !== "all").map((item) => (
              <button
                key={item.id}
                onClick={() => chooseCollection(item.id)}
                className="flex justify-between items-center py-[15px] border-b border-[#302e2a29] dark:border-[#ffffff15] bg-transparent text-[12px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 font-medium text-[#302e2a] dark:text-[#f0ebe1]"
              >
                {item.label}
                <ArrowUpRight size={16} />
              </button>
            ))}
            <a
              href="#custom"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                document.getElementById('custom')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="flex justify-between items-center py-[15px] border-b border-[#302e2a29] dark:border-[#ffffff15] bg-transparent text-[12px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 font-medium text-[#302e2a] dark:text-[#f0ebe1]"
            >
              Custom <ArrowUpRight size={16} />
            </a>
            <a
              href="#story"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                document.getElementById('story')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="flex justify-between items-center py-[15px] border-b border-[#302e2a29] dark:border-[#ffffff15] bg-transparent text-[12px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 font-medium text-[#302e2a] dark:text-[#f0ebe1]"
            >
              Our story <ArrowUpRight size={16} />
            </a>
            <div className="flex justify-between items-center py-[15px] border-t-0 text-[12px] font-medium text-[#302e2a] dark:text-[#f0ebe1]">
              <span className="flex items-center gap-[6px]">
                {isDark ? "Dark mode" : "Light mode"}
              </span>
              <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
