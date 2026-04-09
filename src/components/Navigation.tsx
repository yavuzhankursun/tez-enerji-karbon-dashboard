import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "hero", label: "Genel Bakis", shortLabel: "Genel" },
  { id: "tahminler", label: "Tahminler", shortLabel: "Tahmin" },
  { id: "asama2", label: "Elektrik Detay", shortLabel: "Elektrik" },
  { id: "asama3", label: "Karbon Detay", shortLabel: "Karbon" },
  { id: "asama1", label: "Parametre Analizi", shortLabel: "Param." },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: 0 };
        const rect = el.getBoundingClientRect();
        return { id: item.id, top: rect.top };
      });

      const current = sections.reduce((closest, section) => {
        if (section.top <= 120 && section.top > closest.top) {
          return section;
        }
        return closest;
      }, sections[0]);

      if (current) {
        setActiveSection(current.id);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-40 flex justify-center py-3 px-2 md:px-4"
        >
          <div className="flex items-center gap-0.5 md:gap-1 rounded-full border border-[var(--pastel-nav-border)] dark:border-gray-700/60 bg-[var(--pastel-nav-bg)] dark:bg-gray-900/80 backdrop-blur-xl px-1.5 md:px-2 py-1.5 shadow-lg shadow-black/[0.03] dark:shadow-black/[0.15]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative rounded-full px-2.5 md:px-4 py-2 md:py-1.5 text-[11px] md:text-xs font-medium transition-colors min-h-[44px] md:min-h-0 ${
                  activeSection === item.id
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                {activeSection === item.id && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute inset-0 rounded-full bg-[var(--pastel-muted)] dark:bg-gray-800"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 hidden md:inline">{item.label}</span>
                <span className="relative z-10 md:hidden">{item.shortLabel}</span>
              </button>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
