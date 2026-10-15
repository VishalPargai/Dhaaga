import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ chooseCollection }) {
  return (
    <section className="relative isolate min-h-[100svh] flex items-center overflow-hidden pt-[140px] px-[clamp(22px,8vw,130px)] pb-[100px] bg-[#e9dfcf] xl:pl-[max(130px,calc((100vw-1320px)/2))] max-sm:items-end max-sm:px-[20px] max-sm:pb-[96px]" id="home">
      <div className="absolute inset-0 -z-20 w-full h-full bg-[#e9dfcf]">
        <img src={`${import.meta.env.BASE_URL}images/hero-dhaaga.webp`} alt="Dhaaga's handmade crochet collection" fetchPriority="high" className="block w-full h-full object-cover object-center mix-blend-normal max-sm:object-[62%_center]" />
      </div>
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[linear-gradient(90deg,rgba(245,240,231,0.36)_0%,rgba(245,240,231,0.20)_28%,rgba(245,240,231,0.04)_48%,transparent_58%)] max-sm:bg-[linear-gradient(0deg,rgba(245,240,231,0.96)_0%,rgba(245,240,231,0.86)_32%,rgba(245,240,231,0.18)_67%,transparent_82%)]"></div>
      
      <div className="relative z-10 w-[min(560px,48%)] xl:w-[570px] max-[900px]:w-[min(520px,56%)] max-sm:w-full max-sm:max-w-[440px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-[10px] text-[9px] leading-[1.5] tracking-[0.17em] font-bold text-[#444a37] m-0 mb-[22px] max-sm:text-[8px] max-sm:mb-[17px]"
        >
          <i className="w-[22px] h-[1px] bg-[#626b50] inline-block"></i> SMALL THINGS, THOUGHTFULLY MADE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          className="font-serif font-normal text-[clamp(54px,6.6vw,100px)] leading-[0.91] tracking-[-0.045em] m-0 mb-[26px] text-[#302e2a] drop-shadow-none max-[900px]:text-[clamp(52px,7.4vw,72px)] max-sm:text-[clamp(48px,12.5vw,68px)] max-sm:mb-[18px]"
        >
          A little handmade,<br /><em className="font-normal text-[#626b50] not-italic">a lot of heart.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
          className="max-w-[350px] text-[#49463f] drop-shadow-none text-[12px] leading-[1.9] mb-[30px] max-sm:text-[11px] max-sm:max-w-[310px] max-sm:mb-[23px]"
        >
          Crochet pieces made slowly, with care in every loop and a little love stitched into every detail.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-[16px] border border-transparent py-[15px] px-[19px] text-[10px] font-semibold cursor-pointer transition-colors duration-200 text-[#f5f0e7] bg-[#302e2a] hover:bg-[#201e1b] focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 max-sm:py-[14px] max-sm:px-[15px] shadow-[0_4px_16px_rgba(48,46,42,0.14)]"
          onClick={() => {
            if (chooseCollection) {
              chooseCollection('all');
            } else {
              const el = document.getElementById('catalogue');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          Explore the collection <ArrowDown size={15} />
        </motion.button>
      </div>
      
      <div className="absolute z-[5] bottom-[24px] left-[clamp(22px,5.2vw,84px)] right-[clamp(22px,5.2vw,84px)] flex justify-between items-center gap-[20px] pointer-events-none text-[#302e2a] font-semibold text-[10px] tracking-[0.12em] drop-shadow-[0_1px_2px_rgba(245,240,231,0.95)] max-sm:bottom-[20px] max-sm:left-[20px] max-sm:right-[20px] max-sm:text-[8px] max-sm:tracking-[0.07em]">
        <span>01 / MADE BY HAND</span>
        <span className="text-[#262820] text-[11px] font-bold tracking-[0.055em] max-sm:text-[9px] max-sm:tracking-[0.025em]">Made with intention, always.</span>
      </div>
    </section>
  );
}