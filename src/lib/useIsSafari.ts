import { useEffect, useState, useMemo } from "react";

export function useIsSafari(defaultValue = false) {
  const [isSafari, setIsSafari] = useState(defaultValue);

  // Memoize the result of the Safari check
  const safariCheck = useMemo(() => {
    if (typeof window === "undefined") return false;

    const userAgent = window.navigator.userAgent;
    return userAgent.includes("Safari") && !userAgent.includes("Chrom");
  }, []); // Only recompute the result once when the component mounts

  useEffect(() => {
    setIsSafari(safariCheck); // Update state based on memoized result
  }, [safariCheck]); // Run effect when `safariCheck` changes

  return isSafari;
}
