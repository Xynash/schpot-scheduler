export default function StatusBadge({ status }) {
  const styles = {
    confirmed: "bg-ink text-white",
    cancelled: "bg-white text-ink/40",
    full: "bg-white text-brand",
    open: "bg-brand text-white",
  };
  return (
    <span className={`inline-flex border-2 border-ink px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${styles[status] || styles.open}`}>
      {status}
    </span>
  );
}