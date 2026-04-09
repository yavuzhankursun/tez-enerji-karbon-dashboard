import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/** The color the overlay takes -- the NEW theme's background */
const SWEEP_COLORS = {
  toDark: "#030712",
  toLight: "#faf9fe",
} as const;

const SWEEP_DURATION = 0.6;
const TOGGLE_DELAY_MS = SWEEP_DURATION * 500;

export function ThemeToggle({ isDark, toggle }: ThemeToggleProps) {
  const [isSweeping, setIsSweeping] = useState(false);
  const [sweepColor, setSweepColor] = useState<string | null>(null);

  const handleToggle = useCallback(() => {
    if (isSweeping) return;

    const targetColor = isDark ? SWEEP_COLORS.toLight : SWEEP_COLORS.toDark;
    setSweepColor(targetColor);
    setIsSweeping(true);

    setTimeout(() => {
      toggle();
    }, TOGGLE_DELAY_MS);
  }, [isDark, isSweeping, toggle]);

  const handleSweepComplete = useCallback(() => {
    setIsSweeping(false);
    setSweepColor(null);
  }, []);

  return (
    <>
      <motion.button
        onClick={handleToggle}
        className="fixed top-4 right-4 z-50 flex items-center justify-center w-11 h-11 md:w-10 md:h-10 rounded-full border border-[var(--pastel-nav-border)] dark:border-gray-700/60 bg-[var(--pastel-nav-bg)] dark:bg-gray-800/80 backdrop-blur-xl shadow-lg shadow-black/[0.03] dark:shadow-black/[0.15] text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        aria-label={isDark ? "Acik temaya gec" : "Koyu temaya gec"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </motion.div>
      </motion.button>

      {createPortal(
        <AnimatePresence>
          {isSweeping && sweepColor != null && (
            <SweepOverlay
              color={sweepColor}
              duration={SWEEP_DURATION}
              onComplete={handleSweepComplete}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

function SweepOverlay({
  color,
  duration,
  onComplete,
}: {
  color: string;
  duration: number;
  onComplete: () => void;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 1 }}
      animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        clipPath: {
          duration,
          ease: [0.65, 0, 0.35, 1],
        },
        opacity: {
          duration: 0.25,
          delay: 0,
        },
      }}
      onAnimationComplete={(definition) => {
        if (definition === "animate") {
          onComplete();
        }
      }}
      style={{ backgroundColor: color }}
      className="fixed inset-0 z-[9999] pointer-events-none will-change-[clip-path]"
      aria-hidden="true"
    />
  );
}
