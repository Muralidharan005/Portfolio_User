export function Loading() {
  return (
    <div className="loading-wrap">
      <div className="loader" />
      <span>Loading…</span>
    </div>
  );
}

export function Err({ msg }) {
  return <div className="error-msg">⚠️ {msg || 'Could not load data'}</div>;
}
