import { useState, useEffect } from 'react';

export const IMG_BASE = '/images/';

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
