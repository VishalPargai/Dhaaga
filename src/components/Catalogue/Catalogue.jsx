// src/components/Catalogue/Catalogue.jsx
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Instagram,
  Copy,
  Sparkles,
  Heart,
  Eye,
  ChevronDown,
  ShieldCheck,
  Package,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import Photo from "../Photo";
import { COLLECTIONS, FILTERS, INSTAGRAM_DM_URL, getWhatsAppUrl } from "../../data/constants";
import { money } from "../../utils/formatters";
import { useWishlist } from "../../utils/WishlistContext";
import QuickViewModal from "../QuickViewModal";
import products from "../../data/products.json";

export default function Catalogue({
  collection,
  setCollection,
  filter,
  setFilter,
  productId,
  setProductId,
  formatId,
  setFormatId,
  imageIndex,
  setImageIndex,
  copied,
  setCopied,
  setNotice,
  searchQuery = '',
  setSearchQuery,
}) {
  const { isSaved, toggleSave } = useWishlist();

  // Sorting & Budget filter state
  const [sortBy, setSortBy] = useState('featured');
  const [budgetFilter, setBudgetFilter] = useState('all');

  // Quick view state
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewFormatId, setQuickViewFormatId] = useState(null);

  // Accordion state in product detail view
  const [activeAccordion, setActiveAccordion] = useState('care');

  const isSearching = Boolean(searchQuery && searchQuery.trim());
  const product = products.find((item) => item.id === productId) || null;
  const format =
    product?.formats?.find((item) => item.id === formatId) ||
    product?.formats?.[0] ||
    null;
  const images = format?.images || [];
  const image = images[imageIndex] || images[0] || "";
  const current =
    COLLECTIONS.find((item) => item.id === collection) || COLLECTIONS[0];
  const filters = FILTERS[collection] || FILTERS.all;

  const searchResultsList = useMemo(() => {
    if (!isSearching) return [];
    const q = searchQuery.trim().toLowerCase();
    return products.filter((item) => {
      const name = (item.name || "").toLowerCase();
      const desc = (item.description || "").toLowerCase();
      const cols = (item.collections || []).some((c) => c.toLowerCase().includes(q));
      const formats = (item.formats || []).some((f) => (f.label || "").toLowerCase().includes(q));
      return name.includes(q) || desc.includes(q) || cols || formats;
    });
  }, [searchQuery, isSearching]);

  const searchVisible = useMemo(() => {
    return searchResultsList.map((item) => ({
      product: item,
      cardFormat: item.formats?.[0] || null,
    }));
  }, [searchResultsList]);

  const matchingProducts = useMemo(
    () =>
      products.filter(
        (item) =>
          item.available !== false &&
          (collection === "all" ||
            (item.collections || []).includes(collection)) &&
          (filter === "all" ||
            (item.formats || []).some(
              (formatItem) => formatItem.id === filter,
            )),
      ),
    [collection, filter],
  );

  const visible = useMemo(() => {
    let list = [];
    if (isSearching) {
      list = searchVisible;
    } else if (collection === "bloom" && filter === "all") {
      list = matchingProducts.flatMap((item) =>
        (item.formats || []).map((formatItem) => ({
          product: item,
          cardFormat: formatItem,
        })),
      );
    } else {
      list = matchingProducts.map((item) => ({
        product: item,
        cardFormat:
          (item.formats || []).find((formatItem) => formatItem.id === filter) ||
          item.formats?.[0] ||
          null,
      }));
    }

    // Apply budget filter
    if (budgetFilter !== 'all') {
      list = list.filter(({ cardFormat }) => {
        const price = cardFormat?.price;
        if (price == null) return false;
        if (budgetFilter === 'under-299') return price <= 299;
        if (budgetFilter === 'under-499') return price <= 499;
        if (budgetFilter === 'above-500') return price >= 500;
        return true;
      });
    }

    // Apply sorting
    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => (a.cardFormat?.price ?? 999999) - (b.cardFormat?.price ?? 999999));
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => (b.cardFormat?.price ?? -1) - (a.cardFormat?.price ?? -1));
    } else if (sortBy === 'name-asc') {
      list = [...list].sort((a, b) => (a.product.name || '').localeCompare(b.product.name || ''));
    }

    return list;
  }, [matchingProducts, collection, filter, isSearching, searchVisible, budgetFilter, sortBy]);

  // Open product detail with Browser History API support
  function openProduct(item, selectedFormatId = null) {
    setProductId(item.id);
    setFormatId(selectedFormatId || item.formats?.[0]?.id || null);
    setImageIndex(0);
    setCopied(false);

    // Push URL hash with product ID so pressing browser back returns to catalogue!
    const targetHash = `#product-${item.id}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState({ productId: item.id }, '', targetHash);
    }

    window.setTimeout(
      () =>
        document
          .getElementById("product-detail")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      40,
    );
  }

  function handleSelectCollection(id) {
    setCollection(id);
    setFilter("all");
    setProductId(null);
    setFormatId(null);
  }

  // Close product detail with Browser History API support
  function closeProduct() {
    setProductId(null);
    setFormatId(null);
    setImageIndex(0);
    setCopied(false);

    // Revert browser URL so user doesn't stay on #product-
    if (window.location.hash.startsWith('#product-')) {
      if (window.history.state?.productId) {
        window.history.back();
      } else {
        window.history.replaceState({}, '', window.location.pathname + window.location.search);
      }
    }

    window.setTimeout(
      () =>
        document
          .getElementById("catalogue")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      20,
    );
  }

  // Multi-channel enquiry messages
  const enquiry =
    product && format
      ? `Hi Dhaaga! I'm interested in:\nProduct: ${product.name}\nFormat: ${format.label}\nPrice: ${format.price == null ? "Please share the price" : money(format.price)}\nCould you share more details?`
      : "";

  const whatsappEnquiryMessage =
    product && format
      ? `Hi Dhaaga! 🌸\nI would love to order / enquire about:\n• *Product:* ${product.name}\n• *Format:* ${format.label}\n• *Price:* ${format.price == null ? "Please share the price" : money(format.price)}\n\nCould you please share details on how to place the order? Thank you!`
      : "";

  async function copyEnquiry() {
    if (!enquiry) return;
    try {
      await navigator.clipboard.writeText(enquiry);
      setCopied(true);
      setNotice("Enquiry copied. Paste it into your Instagram DM.");
    } catch {
      setNotice(
        "Clipboard access is unavailable. Copy the enquiry text shown below.",
      );
    }
  }

  function enquire() {
    window.open(INSTAGRAM_DM_URL, "_blank", "noopener,noreferrer");
    void copyEnquiry();
  }

  function enquireWhatsApp() {
    if (!whatsappEnquiryMessage) return;
    window.open(getWhatsAppUrl(whatsappEnquiryMessage), "_blank", "noopener,noreferrer");
  }

  const isProductSaved = product ? isSaved(product.id, format?.id) : false;

  return (
    <section
      className="pt-[22px] pb-[120px] w-[min(1320px,calc(100%-clamp(40px,10.4vw,168px)))] mx-auto max-[900px]:w-[calc(100%-56px)] max-sm:pt-[20px] max-sm:pb-[80px] max-sm:w-[calc(100%-40px)] scroll-mt-0 transition-colors duration-300"
      id="catalogue"
    >
      <div className="flex justify-between items-end gap-[30px] mb-[24px] max-sm:block max-sm:mb-[20px]">
        <div>
          <p className="flex items-center gap-[10px] text-[9px] leading-[1.5] tracking-[0.17em] font-bold text-[#686a59] dark:text-[#a8b797] m-0 mb-[12px]">
            <i className="w-[22px] h-[1px] bg-[#626b50] dark:bg-[#9da991] inline-block"></i>THE
            DHAAGA COLLECTION
          </p>
          <h2 className="font-serif font-normal text-[clamp(40px,4.6vw,64px)] leading-[0.95] tracking-[-0.04em] m-0 text-[#201e1b] dark:text-[#f0ebe1] max-sm:text-[44px]">
            Objects with{" "}
            <em className="font-normal text-[#626b50] dark:text-[#a8b797] not-italic">feeling.</em>
          </h2>
        </div>
        <p className="max-w-[235px] text-[#777469] dark:text-[#a6a094] text-[11px] leading-[1.8] m-0 mb-[5px] max-sm:mt-[12px] max-sm:max-w-[270px]">
          Made to be kept, gifted, and loved for a long time.
        </p>
      </div>

      {!product ? (
        <>
          {/* SEARCH RESULTS VIEW OR REGULAR COLLECTION VIEW */}
          {isSearching ? (
            <div className="mb-[28px]">
              <button
                onClick={() => setSearchQuery && setSearchQuery("")}
                className="inline-flex items-center gap-[8px] text-[11px] font-medium text-[#626b50] dark:text-[#a8b797] hover:text-[#201e1b] dark:hover:text-[#f0ebe1] transition-colors mb-[14px] cursor-pointer border-0 bg-transparent p-0"
              >
                <ArrowLeft size={15} /> Back to all collections
              </button>
              <div className="flex justify-between items-end gap-[20px] pb-[14px] border-b border-[#302e2a18] dark:border-[#ffffff15]">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.16em] text-[#777469] dark:text-[#a6a094] m-0 mb-[4px] uppercase">
                    SEARCH RESULTS
                  </p>
                  <h3 className="font-serif font-medium text-[30px] leading-tight m-0 text-[#201e1b] dark:text-[#f0ebe1] max-sm:text-[24px]">
                    Items containing “{searchQuery}”
                  </h3>
                </div>
                <span className="text-[9px] tracking-[0.14em] text-[#777469] dark:text-[#a6a094] flex-none">
                  {String(visible.length).padStart(2, "0")} PIECES FOUND
                </span>
              </div>
            </div>
          ) : (
            <>
              {/* COLLECTION TABS */}
              <div
                className="relative flex gap-[28px] border-b border-[#302e2a22] dark:border-[#ffffff15] mb-[20px] overflow-x-auto scrollbar-hide max-sm:gap-[20px] max-sm:mb-[16px]"
                role="tablist"
                aria-label="Collections"
              >
                {COLLECTIONS.map((item) => {
                  const isActive = collection === item.id;
                  return (
                    <button
                      key={item.id}
                      role="tab"
                      aria-selected={isActive}
                      className={`relative bg-transparent border-0 pb-[12px] pt-[2px] whitespace-nowrap cursor-pointer text-[12px] max-sm:text-[11px] tracking-[0.02em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 ${
                        isActive
                          ? "text-[#1f1d1a] dark:text-[#f5f0e7] font-semibold"
                          : "text-[#878276] hover:text-[#1f1d1a] dark:text-[#8e887c] dark:hover:text-[#f5f0e7] font-medium"
                      }`}
                      onClick={() => handleSelectCollection(item.id)}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="activeCollectionUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1f1d1a] dark:bg-[#f5f0e7]"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-end mb-[12px]">
                <div>
                  <h3 className="font-serif font-medium text-[27px] leading-none m-0 mb-[5px] text-[#201e1b] dark:text-[#f0ebe1] max-sm:text-[24px]">
                    {current.label}
                  </h3>
                  <p className="text-[#777469] dark:text-[#a6a094] text-[10px] m-0 max-sm:max-w-[230px] max-sm:leading-[1.5]">
                    {current.description}
                  </p>
                </div>
                <span className="text-[8px] tracking-[0.14em] text-[#777469] dark:text-[#a6a094] max-sm:text-[7px]">
                  {String(visible.length).padStart(2, "0")} PIECES
                </span>
              </div>

              {/* FORMAT FILTERS */}
              <div
                className="flex gap-[8px] overflow-x-auto py-[2px] pb-[10px] mb-[12px] scrollbar-hide max-sm:-mr-[20px] max-sm:pr-[20px] max-sm:mb-[10px]"
                aria-label="Filter by format"
              >
                {filters.map((item) => {
                  const isActive = filter === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-none border rounded-full py-[8px] px-[15px] text-[10px] cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 max-sm:px-[12px] max-sm:py-[8px] ${
                        isActive
                          ? "text-white bg-black border-black font-medium shadow-[0_2px_8px_rgba(0,0,0,0.12)] dark:text-[#181715] dark:bg-[#f0ebe1] dark:border-[#f0ebe1]"
                          : "border-[#302e2a29] text-[#706c61] bg-transparent hover:text-white hover:bg-black hover:border-black dark:border-[#ffffff20] dark:text-[#a6a094] dark:hover:text-[#181715] dark:hover:bg-[#f0ebe1] dark:hover:border-[#f0ebe1]"
                      }`}
                      onClick={() => setFilter(item.id)}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>
            </>
          )}

          {/* FILTER & SORT BAR (BUDGET PILLS + SORT DROPDOWN) */}
          <div className="flex flex-wrap items-center justify-between gap-[12px] mb-[24px] pt-[4px] pb-[8px] border-b border-[#302e2a10] dark:border-[#ffffff10]">
            {/* Budget Filter Pills */}
            <div className="flex items-center gap-[6px] overflow-x-auto scrollbar-hide py-[2px]">
              <span className="text-[9px] uppercase tracking-[0.14em] font-bold text-[#777469] dark:text-[#a6a094] mr-[4px] flex-none">
                Budget:
              </span>
              {[
                { id: 'all', label: 'All' },
                { id: 'under-299', label: 'Under ₹299' },
                { id: 'under-499', label: 'Under ₹499' },
                { id: 'above-500', label: '₹500+' },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBudgetFilter(b.id)}
                  className={`text-[10px] py-[4px] px-[11px] rounded-full cursor-pointer transition-all border ${
                    budgetFilter === b.id
                      ? 'bg-[#626b50] text-white border-[#626b50] dark:bg-[#9da991] dark:text-[#181715] dark:border-[#9da991] font-medium'
                      : 'border-[#302e2a18] dark:border-[#ffffff18] text-[#706c61] dark:text-[#a6a094] hover:border-[#626b50] bg-transparent'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-[8px] ml-auto">
              <span className="text-[9px] uppercase tracking-[0.14em] font-bold text-[#777469] dark:text-[#a6a094]">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-[11px] font-medium py-[5px] px-[10px] rounded-[10px] border border-[#302e2a22] dark:border-[#ffffff1c] bg-[#fbf8f2] dark:bg-[#201e1b] text-[#201e1b] dark:text-[#f0ebe1] outline-none cursor-pointer focus:border-[#626b50] transition-colors"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {visible.length ? (
            <motion.div
              layout
              className="grid grid-cols-3 gap-x-[25px] gap-y-[43px] max-[900px]:grid-cols-2 max-[900px]:gap-x-[18px] max-[900px]:gap-y-[35px] max-sm:gap-x-[12px] max-sm:gap-y-[29px]"
            >
              <AnimatePresence mode="popLayout">
                {visible.map(({ product: item, cardFormat }, index) => {
                  const saved = isSaved(item.id, cardFormat?.id);
                  return (
                    <motion.article
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{
                        duration: 0.32,
                        delay: Math.min(index * 0.03, 0.18),
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="min-w-0"
                      key={`${item.id}-${cardFormat?.id || "default"}`}
                    >
                      <div className="group relative overflow-hidden w-full aspect-[4/4.8] max-sm:aspect-[4/4.9] p-0 border-0 bg-[#eae2d5] dark:bg-[#25221e] cursor-pointer text-left">
                        {/* Main photo click opens full detail */}
                        <button
                          className="w-full h-full p-0 border-0 bg-transparent cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4"
                          onClick={() => openProduct(item, cardFormat?.id)}
                          aria-label={`View ${item.name} — ${cardFormat?.label || ""}`}
                        >
                          <Photo
                            src={cardFormat?.images?.[0]}
                            alt={`${item.name} — ${cardFormat?.label || ""}`}
                            fit={cardFormat?.imageFit || "cover"}
                            position={cardFormat?.imagePosition || "center"}
                            scale={cardFormat?.imageScale || 1}
                          />
                        </button>

                        {/* Top Left Index */}
                        <span className="absolute left-[14px] top-[13px] text-[#716d62] dark:text-[#9c968a] text-[8px] tracking-[0.12em] max-sm:left-[9px] max-sm:top-[9px] pointer-events-none">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* Top Right: Wishlist Heart Toggle */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleSave(item, cardFormat);
                          }}
                          className={`absolute top-[10px] right-[10px] z-10 w-[34px] h-[34px] rounded-full backdrop-blur-[6px] flex items-center justify-center cursor-pointer transition-all border ${
                            saved
                              ? "bg-[#c94b4b] text-white border-[#c94b4b] shadow-[0_2px_8px_rgba(201,75,75,0.4)]"
                              : "bg-[#fcfaf7]/85 dark:bg-[#1a1816]/85 text-[#706c61] dark:text-[#a6a094] border-[#302e2a15] dark:border-[#ffffff18] hover:text-[#c94b4b]"
                          }`}
                          aria-label={saved ? "Remove from saved" : "Save piece"}
                          title={saved ? "Remove from wishlist" : "Save to wishlist"}
                        >
                          <Heart
                            size={16}
                            fill={saved ? "currentColor" : "none"}
                          />
                        </motion.button>

                        {/* Centered Bottom Quick View Pill (Clearly visible and touch-friendly on desktop and mobile) */}
                        <div className="absolute inset-x-0 bottom-[10px] flex justify-center z-10 px-[8px]">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setQuickViewProduct(item);
                              setQuickViewFormatId(cardFormat?.id);
                            }}
                            className="flex items-center gap-[6px] bg-[#faf7f2]/95 dark:bg-[#1e1c19]/95 text-[#201e1b] dark:text-[#f0ebe1] text-[11px] font-medium py-[6px] px-[14px] rounded-full backdrop-blur-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.22)] border border-[#302e2a18] dark:border-[#ffffff22] hover:bg-white dark:hover:bg-black transition-all cursor-pointer"
                            aria-label={`Quick view ${item.name}`}
                          >
                            <Eye size={13} className="text-[#626b50] dark:text-[#9da991]" />
                            <span>Quick View</span>
                          </motion.button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-[14px] gap-[12px] max-sm:items-start max-sm:pt-[11px] max-sm:gap-[5px]">
                        <div>
                          <h4 className="font-serif font-medium text-[23px] leading-[1.1] m-0 mb-[6px] text-[#201e1b] dark:text-[#f0ebe1] max-sm:text-[21px]">
                            {item.name}
                            {collection === "bloom" &&
                            filter === "all" &&
                            cardFormat?.label ? (
                              <span className="font-sans font-normal text-[15px] text-[#777469] dark:text-[#a6a094]">
                                {" "}
                                · {cardFormat.label}
                              </span>
                            ) : null}
                          </h4>
                          <p className="text-[13px] text-[#514A42] dark:text-[#c4b7a6] font-normal m-0 mt-[6px] max-sm:text-[10px]">
                            {cardFormat?.price == null
                              ? "Price to be added"
                              : money(cardFormat.price)}
                          </p>
                        </div>
                        <div className="flex items-center gap-[6px]">
                          {/* Quick view button next to arrow button */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setQuickViewProduct(item);
                              setQuickViewFormatId(cardFormat?.id);
                            }}
                            className="grid place-items-center flex-none w-[32px] h-[32px] border border-[#302e2a20] dark:border-[#ffffff18] bg-transparent text-[#706c61] dark:text-[#a6a094] rounded-full cursor-pointer transition-colors hover:text-[#201e1b] dark:hover:text-white hover:bg-[#eae2d5]/60 dark:hover:bg-[#25221e] max-sm:w-[28px] max-sm:h-[28px]"
                            title="Quick view"
                            aria-label={`Quick view ${item.name}`}
                          >
                            <Eye size={14} />
                          </button>

                          {/* Open Full Detail Button */}
                          <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.94 }}
                            className="grid place-items-center flex-none w-[32px] h-[32px] border border-[#302e2a29] dark:border-[#ffffff20] bg-transparent text-[#302e2a] dark:text-[#f0ebe1] rounded-full cursor-pointer transition-colors hover:bg-black hover:text-white dark:hover:bg-[#f0ebe1] dark:hover:text-[#181715] focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 max-sm:w-[28px] max-sm:h-[28px]"
                            onClick={() => openProduct(item, cardFormat?.id)}
                            aria-label={`View details for ${item.name}`}
                          >
                            <ArrowUpRight size={17} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-[80px] px-[20px] border border-[#302e2a29] dark:border-[#ffffff18] text-[#777469] dark:text-[#a6a094] bg-[#fbf8f233] dark:bg-[#1f1d1a80] rounded-[16px]"
            >
              <Sparkles className="mx-auto text-[#626b50] dark:text-[#9da991]" />
              <h3 className="font-serif font-medium text-[30px] text-[#302e2a] dark:text-[#f0ebe1] my-[18px] mb-[8px]">
                {isSearching
                  ? `No pieces found for “${searchQuery}”`
                  : "Something lovely is on its way."}
              </h3>
              <p className="text-[11px] max-w-[360px] mx-auto text-[#777469] dark:text-[#a6a094] mb-[18px]">
                {isSearching
                  ? "Try searching for a different keyword like flower, rose, pot, or coaster."
                  : budgetFilter !== 'all'
                  ? "No pieces match this specific budget range. Try resetting your price filter."
                  : "There are no products in this format just yet. Try another filter."}
              </p>
              <button
                className="inline-flex items-center gap-[9px] border-0 bg-[#302e2a] dark:bg-[#f0ebe1] text-white dark:text-[#181715] rounded-full py-[10px] px-[18px] cursor-pointer text-[10px] font-semibold hover:bg-black dark:hover:bg-white transition-colors"
                onClick={() => {
                  if (isSearching && setSearchQuery) {
                    setSearchQuery("");
                  } else {
                    setFilter("all");
                    setBudgetFilter("all");
                  }
                }}
              >
                {isSearching ? "Browse all collections" : "Show all pieces"}{" "}
                <ArrowRight size={14} />
              </button>
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="pt-[5px]"
          id="product-detail"
        >
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-[9px] border-0 bg-transparent cursor-pointer text-[10px] text-[#777469] dark:text-[#a6a094] py-[8px] mb-[26px] focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 hover:text-[#201e1b] dark:hover:text-[#f0ebe1] transition-colors"
            onClick={closeProduct}
          >
            <ArrowLeft size={16} /> Back to {current.label}
          </motion.button>
          <div className="grid grid-cols-[minmax(0,1.08fr)_minmax(300px,0.82fr)] gap-[clamp(35px,7vw,105px)] items-start max-[900px]:grid-cols-[minmax(0,1fr)_minmax(270px,0.9fr)] max-[900px]:gap-[35px] max-sm:flex max-sm:flex-col max-sm:gap-[27px]">
            <div className="w-full">
              <div className="aspect-[4/4.7] max-sm:aspect-[4/4.4] relative overflow-hidden bg-[#eae2d5] dark:bg-[#25221e] group">
                <Photo
                  src={image}
                  alt={`${product.name} — ${format?.label || ""}`}
                  fit={format?.imageFit || "cover"}
                  position={format?.imagePosition || "center"}
                  scale={format?.imageScale || 1}
                />
                <span className="absolute bottom-[14px] left-[14px] text-[8px] tracking-[0.13em] text-[#56594a] dark:text-[#a8b797] bg-[#f5f0e7bf] dark:bg-[#1a1917cc] py-[8px] px-[10px] backdrop-blur-[2px]">
                  HANDMADE, ONE PIECE AT A TIME
                </span>
              </div>
              {images.length > 1 && (
                <div className="flex gap-[10px] mt-[10px]">
                  {images.map((src, index) => (
                    <motion.button
                      key={src}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className={`w-[72px] max-sm:w-[62px] aspect-square border p-0 bg-[#eae2d5] dark:bg-[#25221e] cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 group ${index === imageIndex ? "border-[#626b50] dark:border-[#9da991] p-[3px]" : "border-transparent"}`}
                      onClick={() => setImageIndex(index)}
                      aria-label={`View photo ${index + 1}`}
                    >
                      <Photo
                        src={src}
                        alt={`${product.name} thumbnail ${index + 1}`}
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full pt-[18px] max-sm:pt-0">
              <p className="flex items-center gap-[10px] text-[9px] leading-[1.5] tracking-[0.17em] font-bold text-[#686a59] dark:text-[#a8b797] m-0 mb-[17px] uppercase">
                <i className="w-[22px] h-[1px] bg-[#626b50] dark:bg-[#9da991] inline-block"></i>
                {(product.collections || [])
                  .map(
                    (id) => COLLECTIONS.find((item) => item.id === id)?.label,
                  )
                  .filter(Boolean)
                  .join(" / ")}
              </p>
              <h2 className="font-serif font-medium text-[clamp(44px,5vw,68px)] leading-[0.9] tracking-[-0.045em] m-0 mb-[18px] text-[#201e1b] dark:text-[#f0ebe1] max-sm:text-[54px]">
                {product.name}
                <span className="text-[#626b50] dark:text-[#9da991]">.</span>
              </h2>
              <p className="text-[#777469] dark:text-[#a6a094] text-[11px] leading-[1.9] max-w-[370px] m-0">
                {product.description}
              </p>
              <div className="font-serif font-medium text-[27px] my-[24px] mb-[28px] text-[#201e1b] dark:text-[#f0ebe1] max-sm:my-[18px] max-sm:mb-[24px]">
                {format?.price == null
                  ? "Price to be added"
                  : money(format.price)}
              </div>

              {/* DETAIL TAB OPTIONS */}
              <p className="text-[8px] font-bold tracking-[0.15em] m-0 mb-[13px] text-[#201e1b] dark:text-[#f0ebe1]">
                CHOOSE A FORMAT
              </p>
              <div className="flex flex-wrap gap-[8px]">
                {(product.formats || []).map((item) => (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.96 }}
                    className={`border py-[11px] px-[14px] text-[10px] cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 ${
                      format?.id === item.id
                        ? "bg-black border-black text-white dark:bg-[#f0ebe1] dark:border-[#f0ebe1] dark:text-[#181715] font-medium shadow-sm"
                        : "border-[#302e2a29] dark:border-[#ffffff20] text-[#555046] dark:text-[#a6a094] hover:bg-black hover:border-black hover:text-white dark:hover:bg-[#f0ebe1] dark:hover:border-[#f0ebe1] dark:hover:text-[#181715]"
                    }`}
                    onClick={() => {
                      setFormatId(item.id);
                      setImageIndex(0);
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              <p className="text-[#777469] dark:text-[#a6a094] text-[10px] leading-[1.8] my-[23px]">
                Each piece is handmade, so small variations are part of its
                charm.
              </p>

              {/* MULTI-CHANNEL ENQUIRY & WISHLIST ACTIONS */}
              <div className="space-y-[10px]">
                {/* 1-Click WhatsApp Direct Enquiry Button with SiWhatsapp */}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-between gap-[16px] py-[13px] px-[20px] text-[11px] font-semibold cursor-pointer transition-all duration-200 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.3)] focus-visible:outline-2 focus-visible:outline-[#25D366] focus-visible:outline-offset-4"
                  onClick={enquireWhatsApp}
                >
                  <span className="flex items-center gap-[9px]">
                    <SiWhatsapp size={18} />
                    <span>Order / Enquire on WhatsApp</span>
                  </span>
                  <ArrowUpRight size={16} />
                </motion.button>

                <div className="grid grid-cols-2 gap-[10px]">
                  {/* Instagram Button */}
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-[8px] border border-[#302e2a24] dark:border-[#ffffff20] py-[11px] px-[14px] text-[10px] font-medium cursor-pointer transition-all duration-200 bg-transparent text-[#201e1b] dark:text-[#f0ebe1] hover:bg-[#eae2d5]/60 dark:hover:bg-[#25221e] rounded-full focus-visible:outline-2 focus-visible:outline-[#626b50]"
                    onClick={enquire}
                  >
                    <Instagram size={14} />
                    <span>Enquire via Instagram</span>
                  </motion.button>

                  {/* Wishlist Save Button */}
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className={`inline-flex items-center justify-center gap-[8px] border py-[11px] px-[14px] text-[10px] font-medium cursor-pointer transition-all duration-200 rounded-full focus-visible:outline-2 focus-visible:outline-[#626b50] ${
                      isProductSaved
                        ? "bg-[#c94b4b] text-white border-[#c94b4b] shadow-sm"
                        : "border-[#302e2a24] dark:border-[#ffffff20] bg-transparent text-[#201e1b] dark:text-[#f0ebe1] hover:bg-[#eae2d5]/60 dark:hover:bg-[#25221e]"
                    }`}
                    onClick={() => toggleSave(product, format)}
                  >
                    <Heart size={14} fill={isProductSaved ? "currentColor" : "none"} />
                    <span>{isProductSaved ? "Saved to Wishlist" : "Save to Wishlist"}</span>
                  </motion.button>
                </div>
              </div>

              {/* ENQUIRY DETAILS BOX */}
              <div className="mt-[20px] border border-[#302e2a29] dark:border-[#ffffff18] dark:bg-[#1e1c19] p-[14px]">
                <div className="flex items-center justify-between gap-[10px] text-[8px] tracking-[0.13em] text-[#302e2a] dark:text-[#f0ebe1]">
                  <b>YOUR ENQUIRY</b>
                  <button
                    className="inline-flex items-center gap-[6px] border-0 bg-transparent text-[9px] cursor-pointer text-[#626b50] dark:text-[#9da991] hover:text-[#201e1b] dark:hover:text-[#f0ebe1] focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4"
                    onClick={copyEnquiry}
                  >
                    <Copy size={13} />
                    {copied ? "Copied" : "Copy details"}
                  </button>
                </div>
                <pre className="font-sans text-[10px] leading-[1.8] whitespace-pre-wrap text-[#6e6a60] dark:text-[#a6a094] m-0 mt-[14px]">
                  {enquiry}
                </pre>
              </div>
              <p className="text-[#777469] dark:text-[#a6a094] text-[9px] leading-[1.7] m-0 mt-[12px]">
                You can order directly using WhatsApp above, or copy the details into Instagram DM.
              </p>

              {/* ACCORDION: CRAFTSMANSHIP, CARE GUIDE, PACKAGING */}
              <div className="mt-[28px] border-t border-[#302e2a18] dark:border-[#ffffff18] divide-y divide-[#302e2a15] dark:divide-[#ffffff12]">
                {/* Item 1: Craftsmanship & Materials */}
                <div className="py-[14px]">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'craft' ? null : 'craft')}
                    className="w-full flex items-center justify-between text-left bg-transparent border-0 p-0 cursor-pointer"
                  >
                    <span className="flex items-center gap-[8px] text-[12px] font-medium text-[#201e1b] dark:text-[#f0ebe1]">
                      <Sparkles size={15} className="text-[#626b50] dark:text-[#9da991]" />
                      Craftsmanship & Materials
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#777469] dark:text-[#a6a094] transition-transform duration-200 ${
                        activeAccordion === 'craft' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'craft' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[11px] text-[#777469] dark:text-[#a6a094] leading-[1.8] m-0 pt-[10px]">
                          Every single stitch is hand-crocheted using 100% premium milk cotton yarn. The petals and stems are supported with gentle, flexible floral craft wire so you can shape and arrange them to fit your vases naturally. Made slowly to last years without fading.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Item 2: Care & Cleaning Guide */}
                <div className="py-[14px]">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'care' ? null : 'care')}
                    className="w-full flex items-center justify-between text-left bg-transparent border-0 p-0 cursor-pointer"
                  >
                    <span className="flex items-center gap-[8px] text-[12px] font-medium text-[#201e1b] dark:text-[#f0ebe1]">
                      <ShieldCheck size={15} className="text-[#626b50] dark:text-[#9da991]" />
                      Care & Cleaning Guide
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#777469] dark:text-[#a6a094] transition-transform duration-200 ${
                        activeAccordion === 'care' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'care' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <ul className="text-[11px] text-[#777469] dark:text-[#a6a094] leading-[1.8] m-0 pt-[10px] pl-[18px] list-disc space-y-[4px]">
                          <li><strong>Dusting:</strong> Gently flick dust with a soft makeup brush or blow with a hairdryer on the cool, low setting.</li>
                          <li><strong>Washing:</strong> Spot clean with cold water and mild baby detergent using a damp cloth. Do not soak in water or machine wash.</li>
                          <li><strong>Storage:</strong> Keep away from prolonged direct harsh sunlight to retain the soft hue of natural yarn.</li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Item 3: Gifting & Packaging */}
                <div className="py-[14px]">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'gift' ? null : 'gift')}
                    className="w-full flex items-center justify-between text-left bg-transparent border-0 p-0 cursor-pointer"
                  >
                    <span className="flex items-center gap-[8px] text-[12px] font-medium text-[#201e1b] dark:text-[#f0ebe1]">
                      <Package size={15} className="text-[#626b50] dark:text-[#9da991]" />
                      Packaging & Gifting
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#777469] dark:text-[#a6a094] transition-transform duration-200 ${
                        activeAccordion === 'gift' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'gift' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[11px] text-[#777469] dark:text-[#a6a094] leading-[1.8] m-0 pt-[10px]">
                          Arrives packed in sturdy protective boxes with butter paper and jute twine. Want to send it directly as a gift? Mention it during your WhatsApp enquiry and we will include a handwritten kraft gift card with your message free of charge.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* QUICK VIEW MODAL */}
      <QuickViewModal
        product={quickViewProduct}
        initialFormatId={quickViewFormatId}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onViewFullDetails={(pId, fId) => {
          setQuickViewProduct(null);
          const p = products.find((x) => x.id === pId);
          if (p) openProduct(p, fId);
        }}
      />
    </section>
  );
}
