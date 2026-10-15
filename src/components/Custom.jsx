// src/components/Custom.jsx
import { Instagram, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { INSTAGRAM_DM_URL } from "../data/constants";

export default function Custom() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#666e56] text-[#f5f0e7] py-[85px] px-[clamp(22px,10vw,160px)] sm-down:py-[70px] sm-down:px-[24px] sm-down:pb-[65px] relative overflow-hidden"
      id="custom"
    >
      <div className="relative z-10 max-w-[620px]">
        <p className="flex items-center gap-[10px] text-[9px] leading-[1.5] tracking-[0.17em] font-bold text-[#d8ddce] m-0 mb-[22px]">
          <i className="w-[22px] h-[1px] bg-[#d8ddce] inline-block"></i> MADE
          JUST FOR YOU
        </p>
        <h2 className="font-serif font-normal text-[clamp(54px,7vw,86px)] leading-[0.95] tracking-[-0.04em] m-0 mb-[23px] sm-down:text-[66px]">
          Have something
          <br />
          <em className="font-normal text-[#d8ddce] not-italic">in mind?</em>
        </h2>
        <p className="text-[#e1e2d8] text-[11px] leading-[1.9] max-w-[350px] m-0 mb-[25px] sm-down:max-w-[290px]">
          Tell us your colours, your idea, or the little thing you wish existed.
          We'll dream it up together.
        </p>
        <motion.a
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-[16px] border border-transparent py-[15px] px-[19px] text-[10px] font-semibold cursor-pointer transition-all duration-200 bg-[#f5f0e7] text-[#302e2a] hover:bg-white focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 sm-down:py-[14px] sm-down:px-[15px] shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
          href={INSTAGRAM_DM_URL}
          target="_blank"
          rel="noreferrer"
        >
          <Instagram size={16} /> Talk to us on Instagram{" "}
          <ArrowUpRight size={16} />
        </motion.a>
        <small className="block text-[#d8ddce] text-[9px] mt-[16px]">
          Custom pieces are discussed individually through DMs.
        </small>
      </div>
      <div
        className="absolute right-[8%] bottom-[-130px] font-serif font-normal text-[460px] leading-[0.8] tracking-[-0.1em] text-[#f5f0e70f] sm-down:text-[280px] sm-down:right-[-2%] sm-down:bottom-[-75px] pointer-events-none select-none"
        aria-hidden="true"
      >
        d.
      </div>
    </motion.section>
  );
}
