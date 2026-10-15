import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ notice, setNotice }) {
  return (
    <AnimatePresence>
      {notice && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 15, x: "-50%" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed z-50 left-1/2 bottom-[24px] flex items-center gap-[10px] max-w-[calc(100%-30px)] bg-[#201e1b] text-[#f5f0e7] py-[13px] px-[18px] shadow-[0_12px_36px_rgba(0,0,0,0.22)] rounded-full text-[11px] max-sm:bottom-[16px] max-sm:w-[calc(100%-32px)] max-sm:justify-between border border-[#ffffff15]"
          role="status"
        >
          <div className="flex items-center gap-[10px]">
            <Check size={15} className="text-[#9da991]" />
            <span>{notice}</span>
          </div>
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss"
            className="grid place-items-center border-0 bg-transparent text-inherit cursor-pointer ml-[8px] p-[2px] opacity-75 hover:opacity-100 transition-opacity focus-visible:outline-2 focus-visible:outline-[#626b50]"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
