import { Mail, MessageCircle } from "lucide-react";

const LINKS = [
  { label: "What is Schpot?", href: "https://schpot.com" },
  { label: "How it works?", href: "https://schpot.com" },
  { label: "Host guide", href: "https://schpot.com" },
  { label: "Contact", href: "mailto:contact@schpot.com" },
];

// Inline Instagram glyph (lucide-react removed brand icons)
const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-ink bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-[1fr_auto_auto] md:gap-20 md:px-10">
        {/* Brand */}
        <div>
          <p className="display text-4xl text-brand">
            Schpot<span className="text-white">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-white/50">
            Curated spaces, by the hour.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Important links
          </p>
          <ul className="space-y-3">
            {LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer"
                  className="display text-base tracking-wider transition-colors hover:text-brand">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Connect
          </p>
          <div className="flex gap-2.5">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"
              className="border-2 border-white/25 p-2.5 transition-all hover:border-brand hover:bg-brand">
              <InstagramIcon size={16} />
            </a>
            <a href="mailto:contact@schpot.com" aria-label="Email"
              className="border-2 border-white/25 p-2.5 transition-all hover:border-brand hover:bg-brand">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 md:px-10">
          ©  Schpot · Built for the Schpot 
        </p>
      </div>

      {/* Floating WhatsApp button */}
      <a href="https://wa.me/919876543210?text=Hi%20Schpot!" target="_blank" rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 border-2 border-ink bg-brand p-3 text-white shadow-hard transition-all hover:-translate-y-0.5 hover:shadow-hard-lg">
        <MessageCircle size={20} />
      </a>
    </footer>
  );
}