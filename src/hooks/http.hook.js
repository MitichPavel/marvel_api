import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading]= useState(false);
  const [error, setError]= useState(null);

  const request = useCallback(async (url, options) => {
    const method = options?.method ?? 'GET',
    headers = options?.headers ?? { 'Content-Type': 'application/json' },
    body = options?.body;

    setLoading(true);

    try {
      const response = await fetch(url, { method, headers, body });
  
      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }
  
      const data = await response.json();

      return data;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, clearError, request };
}
