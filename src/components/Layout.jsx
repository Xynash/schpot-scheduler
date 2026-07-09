import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  Clock,
  BookMarked,
} from "lucide-react";
import Footer from "./Footer";

const USER_NAV = [
  { to: "/", icon: Clock, text: "Available Slots" },
  { to: "/my-bookings", icon: BookMarked, text: "My Bookings" },
  { to: "/calendar", icon: CalendarDays, text: "Calendar" },
];

const OWNER_NAV = [
  { to: "/owner", icon: LayoutDashboard, text: "Dashboard" },
  { to: "/owner/create", icon: PlusCircle, text: "Create Slot" },
  { to: "/owner/bookings", icon: ClipboardList, text: "Bookings" },
];

function ModeToggle({ isOwner, onSwitch }) {
  return (
    <div className="flex select-none items-center gap-3">
      <button
        onClick={() => onSwitch(false)}
        className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${
          !isOwner ? "text-ink" : "text-ink/35 hover:text-ink/60"
        }`}
      >
        User
      </button>

      <button
        onClick={() => onSwitch(!isOwner)}
        aria-label="Switch between user and owner mode"
        className="relative h-5 w-10 border-2 border-ink bg-white"
      >
        <span
          className={`absolute top-0 h-full w-1/2 bg-brand transition-all duration-200 ${
            isOwner ? "left-1/2" : "left-0"
          }`}
        />
      </button>

      <button
        onClick={() => onSwitch(true)}
        className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${
          isOwner ? "text-ink" : "text-ink/35 hover:text-ink/60"
        }`}
      >
        Owner
      </button>
    </div>
  );
}

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isOwner = location.pathname.startsWith("/owner");
  const nav = isOwner ? OWNER_NAV : USER_NAV;

  // Feed cursor position to the grid-spotlight CSS (--mx / --my)
  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const switchMode = (toOwner) => {
    if (toOwner !== isOwner) navigate(toOwner ? "/owner" : "/");
  };

  return (
    <div className="grid-bg flex min-h-screen flex-col">
      {/* Header — full-bleed, logo at viewport edge */}
      <header className="border-b-2 border-brand bg-cream">
        <div className="flex items-center justify-between px-5 py-4 md:px-8">
          <span className="display text-3xl text-brand">
            Schpot<span className="text-ink">.</span>
            <span className="ml-3 hidden align-middle font-sans text-[10px] font-bold tracking-[0.25em] text-ink/40 sm:inline">
              SCHEDULER
            </span>
          </span>
          <ModeToggle isOwner={isOwner} onSwitch={switchMode} />
        </div>
      </header>

      {/* Tabs — truly centered (w-max + mx-auto), scrollable on mobile */}
      <div className="border-b border-ink/10 bg-cream/80 backdrop-blur-sm">
        <nav className="mx-auto flex w-max max-w-full gap-2 overflow-x-auto px-5 py-3 md:px-8">
          {nav.map(({ to, icon: Icon, text }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/" || to === "/owner"}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2.5 border-2 px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? "border-ink bg-ink text-white shadow-hard-sm"
                    : "border-transparent text-ink/50 hover:border-ink hover:text-ink"
                }`
              }
            >
              <Icon size={16} strokeWidth={2.5} /> {text}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Page content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-12 md:px-10 md:py-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}