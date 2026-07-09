import { useEffect, useState } from "react";

export default function RotatingText({ words, interval = 2200, className = "" }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      <span key={i} className="word-in inline-block">{words[i]}</span>
    </span>
  );
}