import { useState, useEffect } from 'react';

export const BASE = import.meta.env.VITE_API_URL || '';
export const IMG_BASE = `${BASE}/images/`;

export function getImageUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.replace(/^\/?images\//, '');
  return `${IMG_BASE}${clean}`;
}

export function openExternalUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return;
  let url = rawUrl.trim();
  if (!url) return;
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function useData(fetchFn, cacheKey, fallbackData) {
  const getInitialData = () => {
    if (cacheKey && typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(`portfolio_cache_${cacheKey}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) ? parsed.length > 0 : Boolean(parsed)) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Cache read error:', e);
      }
    }
    return fallbackData || null;
  };

  const [data, setData] = useState(getInitialData);
  const [loading, setLoading] = useState(() => !getInitialData());
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchFn()
      .then((fresh) => {
        if (!isMounted) return;
        if (fresh && (Array.isArray(fresh) ? fresh.length > 0 : true)) {
          setData(fresh);
          if (cacheKey && typeof window !== 'undefined') {
            try {
              localStorage.setItem(`portfolio_cache_${cacheKey}`, JSON.stringify(fresh));
            } catch (e) {
              console.warn('Cache write error:', e);
            }
          }
        }
      })
      .catch((e) => {
        if (!isMounted) return;
        console.warn(`[useData] Failed to fetch live data for ${cacheKey || 'unknown'}:`, e);
        // Only show error if we have NO data to display at all
        setData((current) => {
          if (!current && !fallbackData) {
            setError(e.message);
          }
          return current;
        });
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [fetchFn, cacheKey]);

  return { data, loading, error };
}
