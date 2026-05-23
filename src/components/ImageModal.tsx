import { useEffect } from "react";
import { motion } from "framer-motion";
import { humanizeFilename } from "../hooks/useGraphImages";

interface ImageModalProps {
  src: string;
  onClose: () => void;
  caption?: string;
}

export function ImageModal({ src, onClose, caption }: ImageModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const label = caption ?? humanizeFilename(src);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Grafik gorunumu"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm font-medium transition-colors"
          aria-label="Kapat"
        >
          ESC ile kapat
        </button>
        <img
          src={src}
          alt={label}
          className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl bg-white dark:bg-gray-800"
          loading="eager"
        />
        <p className="text-center text-white/60 text-xs mt-3">{label}</p>
      </motion.div>
    </motion.div>
  );
}
