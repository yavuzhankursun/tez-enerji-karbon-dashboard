import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { humanizeFilename } from "../hooks/useGraphImages";

interface GraphGalleryProps {
  images: string[];
  columns?: 2 | 3 | 4;
}

function ImageModal({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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
          alt={humanizeFilename(src)}
          className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl bg-white dark:bg-gray-800"
          loading="eager"
        />
        <p className="text-center text-white/60 text-xs mt-3">
          {humanizeFilename(src)}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function GraphGallery({ images, columns = 3 }: GraphGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const gridCols =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : columns === 4
        ? "grid-cols-2 md:grid-cols-4"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <>
      <div className={`grid ${gridCols} gap-4`}>
        {visibleImages.map((src, idx) => (
          <motion.button
            key={src}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.04, duration: 0.35 }}
            whileHover={{ y: -2, scale: 1.02 }}
            onClick={() => setSelectedImage(src)}
            className="group rounded-xl border border-[var(--pastel-border)] dark:border-gray-800 bg-[var(--pastel-surface)] dark:bg-gray-900 p-2 shadow-sm hover:shadow-md transition-all cursor-pointer text-left"
            aria-label={`Grafigi buyut: ${humanizeFilename(src)}`}
          >
            <div className="relative overflow-hidden rounded-lg bg-[var(--pastel-muted)] dark:bg-gray-800">
              <img
                src={src}
                alt={humanizeFilename(src)}
                loading="lazy"
                className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-lg" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 px-1 truncate">
              {humanizeFilename(src)}
            </p>
          </motion.button>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--pastel-border)] dark:border-gray-700 bg-[var(--pastel-surface)] dark:bg-gray-800 px-5 py-3 md:py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-[var(--pastel-muted)] dark:hover:bg-gray-700 hover:border-[var(--pastel-muted-strong)] dark:hover:border-gray-600 transition-colors min-h-[44px]"
          >
            Daha fazla goster ({images.length - visibleCount} grafik kaldi)
          </button>
        </div>
      )}

      <AnimatePresence>
        {selectedImage && (
          <ImageModal src={selectedImage} onClose={handleClose} />
        )}
      </AnimatePresence>
    </>
  );
}
