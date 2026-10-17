import Photo from "./Photo";
import { motion } from "framer-motion";

export default function Story() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] gap-[clamp(35px,8vw,120px)] items-center pt-[30px] pb-[132px] w-[min(1320px,calc(100%-clamp(40px,10.4vw,168px)))] mx-auto max-[900px]:gap-[40px] max-[900px]:w-[calc(100%-56px)] max-sm:grid-cols-1 max-sm:gap-[31px] max-sm:pt-[10px] max-sm:pb-[80px] max-sm:w-[calc(100%-40px)] transition-colors duration-300"
      id="story"
    >
      <div className="relative min-h-[400px] h-[min(55vw,570px)] bg-[#eae2d5] dark:bg-[#25221e] max-sm:min-h-[310px] max-sm:h-[90vw] max-sm:max-h-[460px] group overflow-hidden">
        <Photo
          src="images/story-workspace.webp"
          alt="A cosy crochet workspace with yarn, handmade flowers and tools"
          className="absolute inset-0 w-full h-full object-cover dark:brightness-[0.92]"
        />
        <span className="absolute bottom-[13px] left-[13px] text-[8px] tracking-[0.13em] bg-[#f5f0e7cc] dark:bg-[#1a1917d9] text-[#302e2a] dark:text-[#f0ebe1] py-[9px] px-[11px] backdrop-blur-[2px]">
          THE BEAUTY IS IN THE MAKING
        </span>
      </div>
      <div className="max-w-[450px] w-full">
        <p className="flex items-center gap-[10px] text-[9px] leading-[1.5] tracking-[0.17em] font-bold text-[#686a59] dark:text-[#a8b797] m-0 mb-[18px]">
          <i className="w-[22px] h-[1px] bg-[#626b50] dark:bg-[#9da991] inline-block"></i>A NOTE
          FROM DHAAGA
        </p>
        <h2 className="font-serif font-normal text-[clamp(42px,5vw,68px)] leading-[0.95] tracking-[-0.04em] m-0 mb-[27px] text-[#201e1b] dark:text-[#f0ebe1] max-sm:text-[50px]">
          Made slowly.
          <br />
          <em className="font-normal text-[#626b50] dark:text-[#a8b797] not-italic">
            Made with meaning.
          </em>
        </h2>
        <p className="text-[#777469] dark:text-[#a6a094] text-[11px] leading-[2] m-0 mb-[16px] max-sm:text-[11px]">
          There is something special about making things by hand — the quiet
          rhythm of the thread, the little imperfections, and the time tucked
          into every stitch.
        </p>
        <p className="text-[#777469] dark:text-[#a6a094] text-[11px] leading-[2] m-0 mb-[16px] max-sm:text-[11px]">
          Dhaaga is a home for thoughtful crochet pieces, made with intention
          and meant to bring a little warmth to everyday life.
        </p>
        <p className="mt-[27px] text-[11px] text-[#777469] dark:text-[#a6a094] m-0">
          With care,{" "}
          <strong className="font-serif font-medium text-[25px] text-[#302e2a] dark:text-[#f0ebe1] ml-[7px]">
            dhaaga.
          </strong>
        </p>
      </div>
    </motion.section>
  );
}
