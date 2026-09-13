import { Link } from "react-router-dom";
import { SOCIALS } from "../data/artworks";
import { Asterisk } from "./Marquee";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, #bc5b39, transparent 70%)" }} aria-hidden="true" />

      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-10 sm:py-16 lg:px-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-tag mb-4 !text-paper/50">The end of the page — not the archive</p>
            <p className="font-display text-4xl font-semibold leading-none tracking-tight sm:text-6xl">
              Prathamesh <span className="italic text-peach">Bhore</span>
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-paper/60">
              <Asterisk className="h-3.5 w-3.5 text-clay" /> 2D Artist &amp; Illustrator
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/work", label: "Work" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="link-line text-sm font-bold tracking-wide text-paper/85 hover:text-peach">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-paper/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm font-semibold">
            <a href={`mailto:${SOCIALS.email}`} className="link-line text-paper/80 hover:text-peach">
              {SOCIALS.email}
            </a>
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="link-line text-paper/80 hover:text-peach">
              Instagram — {SOCIALS.instagramHandle}
            </a>
            <a href={SOCIALS.behance} target="_blank" rel="noreferrer" className="link-line text-paper/80 hover:text-peach">
              Behance — {SOCIALS.behanceHandle}
            </a>
          </div>
          <p className="text-xs tracking-wide text-paper/45">
            © {new Date().getFullYear()} Prathamesh Bhore · drawn, painted &amp; built with warmth
          </p>
        </div>
      </div>
    </footer>
  );
}
