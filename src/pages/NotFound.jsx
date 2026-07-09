import { Link } from "react-router-dom";

function EmptySchpot() {
  return (
    <div className="relative mb-10 fade-up" aria-hidden="true">
      <svg
        width="180"
        height="150"
        viewBox="0 0 180 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hard offset shadow */}
        <rect x="26" y="26" width="140" height="110" fill="#141414" />
        {/* Slot frame — dashed = nothing here */}
        <rect
          x="14" y="14" width="140" height="110"
          fill="#ffffff" stroke="#141414" strokeWidth="4"
          strokeDasharray="12 8"
        />
        {/* Red X — the missing schpot */}
        <line x1="54" y1="44" x2="114" y2="94" stroke="#e8222d" strokeWidth="7" strokeLinecap="square" />
        <line x1="114" y1="44" x2="54" y2="94" stroke="#e8222d" strokeWidth="7" strokeLinecap="square" />
        {/* Ground line */}
        <line x1="34" y1="112" x2="134" y2="112" stroke="#141414" strokeWidth="3" />
      </svg>

      {/* VACANT tag, tilted like a sticker */}
      <span className="display absolute -right-6 top-2 rotate-6 border-2 border-ink bg-brand px-2.5 py-1 text-xs tracking-[0.2em] text-white shadow-hard-sm">
        Vacant
      </span>
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-16 text-center md:py-20">
      <EmptySchpot />

      <p className="eyebrow-boxed mb-6">404</p>
      <h1 className="display text-5xl leading-[0.95] md:text-7xl">
        Lost your
        <br />
        <span className="text-brand">Schpot?</span>
      </h1>
      <p className="mt-6 max-w-sm text-sm text-ink/50">
        This page doesn't exist. Let's get you back to the good stuff.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back to available slots
      </Link>
    </div>
  );
}