export default function Marquee({ items, variant = "dark", speed = 30 }) {
  const row = [...items, ...items]; // duplicate for a seamless loop
  const styles =
    variant === "red"
      ? "border-ink bg-brand text-white"
      : "border-ink bg-ink text-white";

  return (
    <div className={`overflow-hidden border-y-2 py-3 ${styles}`}>
      <div
        className="marquee-track flex w-max items-center"
        style={{ "--marquee-duration": `${speed}s` }}
      >
        {row.map((item, idx) => (
          <span
            key={idx}
            className="display mx-6 flex shrink-0 items-center gap-6 whitespace-nowrap text-base tracking-[0.15em]"
          >
            {item}
            <span className={variant === "red" ? "text-ink" : "text-brand"}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}