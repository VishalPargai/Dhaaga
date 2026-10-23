// src/components/Reviews.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Heart } from 'lucide-react';
import { TESTIMONIALS, INSTAGRAM_PROFILE_URL } from '../data/constants';

export default function Reviews() {
  return (
    <section
      className="pt-[30px] pb-[100px] w-[min(1320px,calc(100%-clamp(40px,10.4vw,168px)))] mx-auto max-[900px]:w-[calc(100%-56px)] max-sm:pt-[10px] max-sm:pb-[70px] max-sm:w-[calc(100%-40px)] transition-colors duration-300"
      id="reviews"
    >
      <div className="flex justify-between items-end gap-[30px] mb-[34px] max-sm:block max-sm:mb-[24px]">
        <div>
          <p className="flex items-center gap-[10px] text-[9px] leading-[1.5] tracking-[0.17em] font-bold text-[#686a59] dark:text-[#a8b797] m-0 mb-[12px]">
            <i className="w-[22px] h-[1px] bg-[#626b50] dark:bg-[#9da991] inline-block"></i>
            LOVED BY YOU
          </p>
          <h2 className="font-serif font-normal text-[clamp(38px,4.5vw,60px)] leading-[0.95] tracking-[-0.04em] m-0 text-[#201e1b] dark:text-[#f0ebe1] max-sm:text-[42px]">
            Little pieces in{" "}
            <em className="font-normal text-[#626b50] dark:text-[#a8b797] not-italic">warm homes.</em>
          </h2>
        </div>
        <p className="max-w-[280px] text-[#777469] dark:text-[#a6a094] text-[11px] leading-[1.8] m-0 mb-[5px] max-sm:mt-[12px] max-sm:max-w-full">
          Real words from people who welcomed our slow-made crochet pieces into their lives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] max-sm:gap-[16px]">
        {TESTIMONIALS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
            className="p-[24px] rounded-[18px] bg-[#fbf8f2] dark:bg-[#201e1b] border border-[#302e2a14] dark:border-[#ffffff10] shadow-[0_4px_20px_rgba(48,46,42,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex flex-col justify-between hover:border-[#626b50]/40 dark:hover:border-[#9da991]/30 transition-all duration-300"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-[4px] mb-[14px]">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className="fill-[#e5a93b] text-[#e5a93b]"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-serif italic text-[16px] text-[#302e2a] dark:text-[#f0ebe1] leading-[1.6] m-0 mb-[18px]">
                “{item.text}”
              </p>
            </div>

            {/* Author info */}
            <div className="pt-[14px] border-t border-[#302e2a10] dark:border-[#ffffff0d] flex items-center justify-between">
              <div>
                <h4 className="font-sans font-semibold text-[13px] text-[#201e1b] dark:text-[#f0ebe1] m-0">
                  {item.name}
                </h4>
                <p className="text-[10px] text-[#777469] dark:text-[#a6a094] m-0 mt-[2px]">
                  {item.location} · <span className="text-[#626b50] dark:text-[#a8b797] font-medium">{item.piece}</span>
                </p>
              </div>

              <span className="flex items-center gap-[3px] text-[9px] uppercase tracking-[0.1em] font-medium text-[#626b50] dark:text-[#a8b797] bg-[#626b50]/10 dark:bg-[#9da991]/15 py-[3px] px-[8px] rounded-full">
                <ShieldCheck size={11} /> {item.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Community Invite bar */}
      <div className="mt-[28px] p-[16px_22px] rounded-full bg-[#eae2d5]/60 dark:bg-[#25221e]/80 border border-[#302e2a10] dark:border-[#ffffff10] flex items-center justify-between flex-wrap gap-[12px] text-[11px] text-[#555046] dark:text-[#bbb4a6]">
        <div className="flex items-center gap-[8px]">
          <Heart size={14} className="text-[#626b50] dark:text-[#9da991]" fill="currentColor" />
          <span>Have a Dhaaga piece on your desk or windowsill?</span>
        </div>
        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-[#201e1b] dark:text-[#f0ebe1] hover:text-[#626b50] dark:hover:text-[#a8b797] underline cursor-pointer"
        >
          Tag @_.dhaagaa on Instagram to be featured →
        </a>
      </div>
    </section>
  );
}
