import { useState, useCallback } from "react";

export const useHttp = () => {
  const [process, setProcess] = useState("wating");

  const request = useCallback(async (url, options) => {
    const method = options?.method ?? "GET",
      headers = options?.headers ?? { "Content-Type": "application/json" },
      body = options?.body;

    setProcess("loading");

    try {
      const response = await fetch(url, { method, headers, body });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (e) {
      setProcess("error");

      throw e;
    }
  }, []);

  const clearError = useCallback(() => {
    setProcess("wating");
  }, []);

  return { clearError, request, process, setProcess };
};
