import { useEffect, useRef, useState, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import gsap from "gsap";
import { SOCIALS, PORTRAIT } from "../data/artworks";
import { Asterisk } from "./Marquee";

const ITEMS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Contact" },
];

export default function PillNav() {
  const headerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const moveIndicator = useCallback((el: HTMLElement | null, active: boolean, instant = false) => {
    const ind = indicatorRef.current;
    if (!ind || !el) return;
    const vars = {
      x: el.offsetLeft,
      width: el.offsetWidth,
      backgroundColor: active ? "#2d2520" : "#e0cfae",
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto" as const,
    };
    if (instant) gsap.set(ind, vars);
    else gsap.to(ind, vars);
  }, []);

  /* entrance + keep indicator on the active route */
  useEffect(() => {
    const header = headerRef.current;
    if (header) {
      gsap.from(header, { y: -30, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.1 });
    }
    const place = () => {
      const idx = ITEMS.findIndex((it) => (it.to === "/" ? location.pathname === "/" : location.pathname.startsWith(it.to)));
      if (idx >= 0) moveIndicator(itemRefs.current[idx], true, true);
    };
    place();
    if (document.fonts?.ready) document.fonts.ready.then(place);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [location.pathname, moveIndicator]);

  /* close menu + scroll top on navigation */
  useEffect(() => setOpen(false), [location.pathname]);

  /* lock scroll while menu open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open && overlayRef.current) {
      const links = overlayRef.current.querySelectorAll("[data-menu-link]");
      gsap.fromTo(
        links,
        { y: 46, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out", delay: 0.15 }
      );
      const foot = overlayRef.current.querySelector("[data-menu-foot]");
      if (foot) gsap.fromTo(foot, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.5 });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-[80]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 pt-4 sm:px-8">
          {/* wordmark */}
          <Link to="/" className="group flex items-center gap-2.5 rounded-full" aria-label="Prathamesh Bhore — home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-clay text-cream shadow-soft transition-transform duration-500 group-hover:rotate-90">
              <Asterisk className="h-4.5 w-4.5" />
            </span>
            <span className="font-display text-lg font-semibold leading-none tracking-tight text-ink">
              Prathamesh <span className="italic text-clay">Bhore</span>
            </span>
          </Link>

          {/* pill nav — desktop */}
          <nav aria-label="Primary">
            <div
              ref={pillRef}
              className="relative hidden items-center gap-1 rounded-full border border-ink/12 bg-cream/85 p-1.5 shadow-soft backdrop-blur-sm md:flex"
              onMouseLeave={() => {
                const idx = ITEMS.findIndex((it) => (it.to === "/" ? location.pathname === "/" : location.pathname.startsWith(it.to)));
                if (idx >= 0) moveIndicator(itemRefs.current[idx], true);
              }}
            >
              <span
                ref={indicatorRef}
                className="absolute top-1.5 left-0 h-[calc(100%-12px)] rounded-full"
                style={{ backgroundColor: "#2d2520", width: 0 }}
                aria-hidden="true"
              />
              {ITEMS.map((item, i) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  onMouseEnter={(e) => moveIndicator(e.currentTarget, false)}
                  onFocus={(e) => moveIndicator(e.currentTarget, false)}
                  className={({ isActive }) =>
                    `relative z-10 rounded-full px-5 py-2 text-sm font-bold tracking-wide transition-colors duration-300 ${
                      isActive ? "text-cream" : "text-ink hover:text-ink"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* mobile burger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-cream shadow-soft md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-[2px] w-full bg-ink transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-full bg-ink transition-all duration-300 ${open ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* mobile menu overlay */}
      {open && (
        <div ref={overlayRef} className="fixed inset-0 z-[75] flex flex-col bg-paper md:hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-90px] top-[-90px] h-72 w-72 rounded-full opacity-70 blur-3xl"
            style={{ background: "radial-gradient(circle, #e9b48f66, transparent 70%)" }}
          />
          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-8">
            {ITEMS.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                data-menu-link=""
                className={({ isActive }) =>
                  `group flex items-baseline gap-4 border-b border-ink/10 py-4 ${isActive ? "text-clay" : "text-ink"}`
                }
              >
                <span className="text-xs font-bold tracking-[0.2em] text-ink-soft">0{i + 1}</span>
                <span className="font-display text-5xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                  {item.label}
                </span>
                <Asterisk className="ml-auto h-5 w-5 text-clay opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </NavLink>
            ))}
          </nav>
          <div data-menu-foot="" className="flex items-center gap-4 px-8 pb-10">
            <img
              src={PORTRAIT.src}
              alt=""
              className="h-16 w-16 rotate-[-4deg] rounded-md object-cover paper-frame"
            />
            <div className="text-sm font-semibold text-ink-soft">
              <p className="text-ink">2D Artist &amp; Illustrator</p>
              <a href={`mailto:${SOCIALS.email}`} className="link-line text-clay">
                {SOCIALS.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
