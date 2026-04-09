import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function ThemeToggle({ isDark, toggle }: ThemeToggleProps) {
  const [sweepPhase, setSweepPhase] = useState<"idle" | "down" | "done">("idle");
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const targetColor = isDark ? "#f0edf8" : "#030712";

  const handleToggle = useCallback(() => {
    if (sweepPhase !== "idle") return;
    setSweepPhase("down");

    // At 350ms: toggle the actual theme
    timerRef.current = setTimeout(() => {
      toggle();
    }, 350);

    // At 700ms: start removing overlay
    setTimeout(() => {
      setSweepPhase("done");
    }, 700);

    // At 1000ms: fully remove overlay
    setTimeout(() => {
      setSweepPhase("idle");
    }, 1000);
  }, [sweepPhase, toggle, isDark]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Manually animate with CSS transitions (no framer-motion dependency for overlay)
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    if (sweepPhase === "down") {
      // Start: hidden at top
      el.style.clipPath = "inset(0 0 100% 0)";
      el.style.opacity = "1";
      el.style.display = "block";
      // Force reflow
      void el.offsetHeight;
      // Animate: sweep down
      el.style.transition = "clip-path 0.65s cubic-bezier(0.65, 0, 0.35, 1)";
      el.style.clipPath = "inset(0 0 0% 0)";
    } else if (sweepPhase === "done") {
      // Fade out
      el.style.transition = "opacity 0.3s ease";
      el.style.opacity = "0";
    } else {
      // idle - hide
      el.style.display = "none";
      el.style.clipPath = "inset(0 0 100% 0)";
      el.style.opacity = "0";
      el.style.transition = "none";
    }
  }, [sweepPhase]);

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
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </motion.div>
      </motion.button>

      {createPortal(
        <div
          ref={overlayRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            pointerEvents: "none",
            backgroundColor: targetColor,
            display: "none",
            willChange: "clip-path, opacity",
          }}
          aria-hidden="true"
        />,
        document.body
      )}
    </>
  );
}
