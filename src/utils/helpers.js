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

export function useData(fetchFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchFn()
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [fetchFn]);
  return { data, loading, error };
}
