import { useState, useEffect } from "react";
import type { DashboardData } from "../types";

interface UseDataReturn {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

export function useData(): UseDataReturn {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch("/data.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Veri yuklenemedi`);
        }

        const text = await response.text();
        const cleaned = text.replace(/:\s*NaN/g, ": null");
        const parsed: DashboardData = JSON.parse(cleaned);

        setData(parsed);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        setError(
          err instanceof Error ? err.message : "Bilinmeyen hata olustu"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return { data, loading, error };
}
