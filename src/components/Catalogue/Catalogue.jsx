import { useMemo } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Instagram,
  Copy,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Photo from "../Photo";
import { COLLECTIONS, FILTERS, INSTAGRAM_DM_URL } from "../../data/constants";
import { money } from "../../utils/formatters";
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
    if (isSearching) {
      return searchVisible;
    }
    if (collection === "bloom" && filter === "all") {
      return matchingProducts.flatMap((item) =>
        (item.formats || []).map((formatItem) => ({
          product: item,
          cardFormat: formatItem,
        })),
      );
    }
    return matchingProducts.map((item) => ({
      product: item,
      cardFormat:
        (item.formats || []).find((formatItem) => formatItem.id === filter) ||
        item.formats?.[0] ||
        null,
    }));
  }, [matchingProducts, collection, filter, isSearching, searchVisible]);

  function openProduct(item, selectedFormatId = null) {
    setProductId(item.id);
    setFormatId(selectedFormatId || item.formats?.[0]?.id || null);
    setImageIndex(0);
    setCopied(false);
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

  function closeProduct() {
    setProductId(null);
    setFormatId(null);
    setImageIndex(0);
    setCopied(false);
    window.setTimeout(
      () =>
        document
          .getElementById("catalogue")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      20,
    );
  }

  const enquiry =
    product && format
      ? `Hi Dhaaga! I'm interested in:\nProduct: ${product.name}\nFormat: ${format.label}\nPrice: ${format.price == null ? "Please share the price" : money(format.price)}\nCould you share more details?`
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

  return (
    <section
      className="pt-[22px] pb-[120px] w-[min(1320px,calc(100%-clamp(40px,10.4vw,168px)))] mx-auto max-[900px]:w-[calc(100%-56px)] max-sm:pt-[20px] max-sm:pb-[80px] max-sm:w-[calc(100%-40px)] scroll-mt-0"
      id="catalogue"
    >
      <div className="flex justify-between items-end gap-[30px] mb-[24px] max-sm:block max-sm:mb-[20px]">
        <div>
          <p className="flex items-center gap-[10px] text-[9px] leading-[1.5] tracking-[0.17em] font-bold text-[#686a59] m-0 mb-[12px]">
            <i className="w-[22px] h-[1px] bg-[#626b50] inline-block"></i>THE
            DHAAGA COLLECTION
          </p>
          <h2 className="font-serif font-normal text-[clamp(40px,4.6vw,64px)] leading-[0.95] tracking-[-0.04em] m-0 max-sm:text-[44px]">
            Objects with{" "}
            <em className="font-normal text-[#626b50] not-italic">feeling.</em>
          </h2>
        </div>
        <p className="max-w-[235px] text-[#777469] text-[11px] leading-[1.8] m-0 mb-[5px] max-sm:mt-[12px] max-sm:max-w-[270px]">
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
                className="inline-flex items-center gap-[8px] text-[11px] font-medium text-[#626b50] hover:text-[#201e1b] transition-colors mb-[14px] cursor-pointer border-0 bg-transparent p-0"
              >
                <ArrowLeft size={15} /> Back to all collections
              </button>
              <div className="flex justify-between items-end gap-[20px] pb-[14px] border-b border-[#302e2a18]">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.16em] text-[#777469] m-0 mb-[4px] uppercase">
                    SEARCH RESULTS
                  </p>
                  <h3 className="font-serif font-medium text-[30px] leading-tight m-0 text-[#201e1b] max-sm:text-[24px]">
                    Items containing “{searchQuery}”
                  </h3>
                </div>
                <span className="text-[9px] tracking-[0.14em] text-[#777469] flex-none">
                  {String(visible.length).padStart(2, "0")} PIECES FOUND
                </span>
              </div>
            </div>
          ) : (
            <>
              {/* COLLECTION TABS */}
              <div
                className="relative flex gap-[28px] border-b border-[#302e2a22] mb-[20px] overflow-x-auto scrollbar-hide max-sm:gap-[20px] max-sm:mb-[16px]"
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
                          ? "text-[#1f1d1a] font-semibold"
                          : "text-[#878276] hover:text-[#1f1d1a] font-medium"
                      }`}
                      onClick={() => handleSelectCollection(item.id)}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="activeCollectionUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1f1d1a]"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-end mb-[12px]">
                <div>
                  <h3 className="font-serif font-medium text-[27px] leading-none m-0 mb-[5px] max-sm:text-[24px]">
                    {current.label}
                  </h3>
                  <p className="text-[#777469] text-[10px] m-0 max-sm:max-w-[230px] max-sm:leading-[1.5]">
                    {current.description}
                  </p>
                </div>
                <span className="text-[8px] tracking-[0.14em] text-[#777469] max-sm:text-[7px]">
                  {String(visible.length).padStart(2, "0")} PIECES
                </span>
              </div>

              {/* FORMAT FILTERS */}
              <div
                className="flex gap-[8px] overflow-x-auto py-[2px] pb-[10px] mb-[16px] scrollbar-hide max-sm:-mr-[20px] max-sm:pr-[20px] max-sm:mb-[12px]"
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
                          ? "text-white bg-black border-black font-medium shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                          : "border-[#302e2a29] text-[#706c61] bg-transparent hover:text-white hover:bg-black hover:border-black"
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

          {visible.length ? (
            <motion.div
              layout
              className="grid grid-cols-3 gap-x-[25px] gap-y-[43px] max-[900px]:grid-cols-2 max-[900px]:gap-x-[18px] max-[900px]:gap-y-[35px] max-sm:gap-x-[12px] max-sm:gap-y-[29px]"
            >
              <AnimatePresence mode="popLayout">
                {visible.map(({ product: item, cardFormat }, index) => (
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
                    <button
                      className="group block relative overflow-hidden w-full aspect-[4/4.8] max-sm:aspect-[4/4.9] p-0 border-0 bg-[#eae2d5] cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4"
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
                      <span className="absolute left-[14px] top-[13px] text-[#716d62] text-[8px] tracking-[0.12em] max-sm:left-[9px] max-sm:top-[9px]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </button>
                    <div className="flex items-center justify-between pt-[14px] gap-[12px] max-sm:items-start max-sm:pt-[11px] max-sm:gap-[5px]">
                      <div>
                        <h4 className="font-serif font-medium text-[23px] leading-[1.1] m-0 mb-[6px] max-sm:text-[21px]">
                          {item.name}
                          {collection === "bloom" &&
                          filter === "all" &&
                          cardFormat?.label ? (
                            <span className="font-sans font-normal text-[15px] text-[#777469]">
                              {" "}
                              · {cardFormat.label}
                            </span>
                          ) : null}
                        </h4>
                        <p className="text-[13px] text-[#514A42] font-normal m-0 mt-[6px] max-sm:text-[10px]">
                          {cardFormat?.price == null
                            ? "Price to be added"
                            : money(cardFormat.price)}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        className="grid place-items-center flex-none w-[32px] h-[32px] border border-[#302e2a29] bg-transparent rounded-full cursor-pointer transition-colors hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 max-sm:w-[28px] max-sm:h-[28px]"
                        onClick={() => openProduct(item, cardFormat?.id)}
                        aria-label={`View details for ${item.name}`}
                      >
                        <ArrowUpRight size={17} />
                      </motion.button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-[80px] px-[20px] border border-[#302e2a29] text-[#777469] rounded-[16px]"
            >
              <Sparkles className="mx-auto text-[#626b50]" />
              <h3 className="font-serif font-medium text-[30px] text-[#302e2a] my-[18px] mb-[8px]">
                {isSearching
                  ? `No pieces found for “${searchQuery}”`
                  : "Something lovely is on its way."}
              </h3>
              <p className="text-[11px] max-w-[360px] mx-auto text-[#777469] mb-[18px]">
                {isSearching
                  ? "Try searching for a different keyword like flower, rose, pot, or coaster."
                  : "There are no products in this format just yet. Try another filter."}
              </p>
              <button
                className="inline-flex items-center gap-[9px] border-0 bg-[#302e2a] text-white rounded-full py-[10px] px-[18px] cursor-pointer text-[10px] font-semibold hover:bg-black transition-colors"
                onClick={() => {
                  if (isSearching && setSearchQuery) {
                    setSearchQuery("");
                  } else {
                    setFilter("all");
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
            className="inline-flex items-center gap-[9px] border-0 bg-transparent cursor-pointer text-[10px] text-[#777469] py-[8px] mb-[26px] focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 hover:text-[#201e1b] transition-colors"
            onClick={closeProduct}
          >
            <ArrowLeft size={16} /> Back to {current.label}
          </motion.button>
          <div className="grid grid-cols-[minmax(0,1.08fr)_minmax(300px,0.82fr)] gap-[clamp(35px,7vw,105px)] items-start max-[900px]:grid-cols-[minmax(0,1fr)_minmax(270px,0.9fr)] max-[900px]:gap-[35px] max-sm:flex max-sm:flex-col max-sm:gap-[27px]">
            <div className="w-full">
              <div className="aspect-[4/4.7] max-sm:aspect-[4/4.4] relative overflow-hidden bg-[#eae2d5] group">
                <Photo
                  src={image}
                  alt={`${product.name} — ${format?.label || ""}`}
                  fit={format?.imageFit || "cover"}
                  position={format?.imagePosition || "center"}
                  scale={format?.imageScale || 1}
                />
                <span className="absolute bottom-[14px] left-[14px] text-[8px] tracking-[0.13em] text-[#56594a] bg-[#f5f0e7bf] py-[8px] px-[10px]">
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
                      className={`w-[72px] max-sm:w-[62px] aspect-square border p-0 bg-[#eae2d5] cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 group ${index === imageIndex ? "border-[#626b50] p-[3px]" : "border-transparent"}`}
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
              <p className="flex items-center gap-[10px] text-[9px] leading-[1.5] tracking-[0.17em] font-bold text-[#686a59] m-0 mb-[17px] uppercase">
                <i className="w-[22px] h-[1px] bg-[#626b50] inline-block"></i>
                {(product.collections || [])
                  .map(
                    (id) => COLLECTIONS.find((item) => item.id === id)?.label,
                  )
                  .filter(Boolean)
                  .join(" / ")}
              </p>
              <h2 className="font-serif font-medium text-[clamp(44px,5vw,68px)] leading-[0.9] tracking-[-0.045em] m-0 mb-[18px] max-sm:text-[54px]">
                {product.name}
                <span className="text-[#626b50]">.</span>
              </h2>
              <p className="text-[#777469] text-[11px] leading-[1.9] max-w-[370px] m-0">
                {product.description}
              </p>
              <div className="font-serif font-medium text-[27px] my-[24px] mb-[28px] max-sm:my-[18px] max-sm:mb-[24px]">
                {format?.price == null
                  ? "Price to be added"
                  : money(format.price)}
              </div>

              {/* DETAIL TAB OPTIONS */}
              <p className="text-[8px] font-bold tracking-[0.15em] m-0 mb-[13px]">
                CHOOSE A FORMAT
              </p>
              <div className="flex flex-wrap gap-[8px]">
                {(product.formats || []).map((item) => (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.96 }}
                    className={`border py-[11px] px-[14px] text-[10px] cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 ${
                      format?.id === item.id
                        ? "bg-black border-black text-white font-medium shadow-sm"
                        : "border-[#302e2a29] text-[#555046] hover:bg-black hover:border-black hover:text-white"
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

              <p className="text-[#777469] text-[10px] leading-[1.8] my-[23px]">
                Each piece is handmade, so small variations are part of its
                charm.
              </p>

              {/* ENQUIRE BUTTON */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-between gap-[16px] border border-transparent py-3.75 px-4.75 text-[10px] font-semibold cursor-pointer transition-all duration-200 bg-[#302e2a] text-[#f7f2e9] hover:bg-[#626b50] w-full focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 max-sm:py-[14px] max-sm:px-3.75 shadow-[0_4px_16px_rgba(48,46,42,0.12)]"
                onClick={enquire}
              >
                <Instagram size={16} /> Enquire on Instagram{" "}
                <ArrowUpRight size={16} />
              </motion.button>

              <div className="mt-[20px] border border-[#302e2a29] p-[14px]">
                <div className="flex items-center justify-between gap-[10px] text-[8px] tracking-[0.13em]">
                  <b>YOUR ENQUIRY</b>
                  <button
                    className="inline-flex items-center gap-[6px] border-0 bg-transparent text-[9px] cursor-pointer text-[#626b50] focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4"
                    onClick={copyEnquiry}
                  >
                    <Copy size={13} />
                    {copied ? "Copied" : "Copy details"}
                  </button>
                </div>
                <pre className="font-sans text-[10px] leading-[1.8] whitespace-pre-wrap text-[#6e6a60] m-0 mt-[14px]">
                  {enquiry}
                </pre>
              </div>
              <p className="text-[#777469] text-[9px] leading-[1.7] m-0 mt-[12px]">
                Your message is not sent automatically. Paste the copied details
                into Instagram and send when you're ready.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
