import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { humanizeFilename } from "../hooks/useGraphImages";
import { ImageModal } from "./ImageModal";

interface GraphGalleryProps {
  images: string[];
  columns?: 2 | 3 | 4;
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
