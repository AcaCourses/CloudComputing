import { useState } from "react";

export interface SearchResult {
  id: string;
  title: string;
  unidad?: number;
  labNumber?: number;
  slug: string;
  snippet: string;
  url: string;
  score: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function useSearch() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string, options?: { unidad?: number; labNumber?: number; k?: number }) => {
    if (!query.trim()) {
      setResults([]);
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          k: options?.k ?? 5,
          unidad: options?.unidad,
          labNumber: options?.labNumber,
        }),
      });

      if (!res.ok) {
        throw new Error(`Search error: ${res.statusText}`);
      }

      const data = await res.json();
      setResults(data.results || []);
      return data.results;
    } catch (err: any) {
      setError(err.message || "Error realizando la búsqueda");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { search, results, loading, error };
}
