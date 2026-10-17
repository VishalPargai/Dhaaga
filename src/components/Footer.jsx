import { Instagram } from "lucide-react";
import { COLLECTIONS, INSTAGRAM_PROFILE_URL } from "../data/constants";

export default function Footer({ chooseCollection }) {
  return (
    <footer className="pt-[43px] px-[clamp(22px,5.2vw,84px)] pb-[25px] max-sm:pt-[32px] max-sm:px-[20px] max-sm:pb-[22px] transition-colors duration-300">
      <div className="flex items-center justify-between pb-[40px] border-b border-[#302e2a29] dark:border-[#ffffff15] gap-[30px] max-sm:items-start max-sm:flex-col max-sm:gap-[23px] max-sm:pb-[28px]">
        <a
          className="inline-flex flex-col font-serif font-semibold text-[34px] leading-[0.78] tracking-[-0.055em] max-sm:text-[31px] text-[#302e2a] dark:text-[#f0ebe1] focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 cursor-pointer"
          href="#home"
        >
          <span>
            dhaaga<span className="text-[#626b50] dark:text-[#9da991]">.</span>
          </span>
          <small className="mt-[9px] font-sans font-normal text-[8px] leading-[1.2] tracking-[0.19em] max-sm:text-[7px] max-sm:mt-[8px] text-[#555046] dark:text-[#a6a094]">
            HANDMADE WITH INTENTION
          </small>
        </a>
        <p className="text-[#777469] dark:text-[#a6a094] font-serif italic text-[21px] leading-[1.25] text-right m-0 max-sm:text-left max-sm:text-[20px]">
          Little things, made slowly.
          <br />A little handmade, a lot of heart.
        </p>
      </div>
      <div className="flex items-center justify-between gap-[22px] pt-[22px] max-sm:items-start max-sm:flex-col max-sm:gap-[17px]">
        <nav className="flex flex-wrap items-center gap-[20px] max-sm:gap-[16px]">
          {COLLECTIONS.filter((item) => item.id !== "all").map((item) => (
            <button
              key={item.id}
              onClick={() => chooseCollection(item.id)}
              className="border-0 p-0 m-0 leading-[1.4] align-middle bg-transparent cursor-pointer text-[9px] text-[#777469] dark:text-[#a6a094] hover:text-[#626b50] dark:hover:text-[#9da991] focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <a
            href="#custom"
            className="border-0 p-0 m-0 leading-[1.4] align-middle bg-transparent cursor-pointer text-[9px] text-[#777469] dark:text-[#a6a094] hover:text-[#626b50] dark:hover:text-[#9da991] focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 transition-colors"
          >
            Custom
          </a>
        </nav>
        <a
          className="inline-flex items-center gap-[7px] text-[9px] text-[#777469] dark:text-[#a6a094] hover:text-[#626b50] dark:hover:text-[#9da991] m-0 p-0 leading-[1.4] align-middle focus-visible:outline-2 focus-visible:outline-[#626b50] focus-visible:outline-offset-4 transition-colors"
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
        >
          <Instagram size={14} /> Instagram
        </a>
        <span className="text-[#777469] dark:text-[#a6a094] text-[9px] whitespace-nowrap max-sm:mt-[2px]">
          © {new Date().getFullYear()} Dhaaga
        </span>
      </div>
    </footer>
  );
}
