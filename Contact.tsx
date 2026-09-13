import { ARTWORKS, SOCIALS } from "../data/artworks";
import { Reveal, Words } from "../components/Reveal";
import GlowCard from "../components/GlowCard";
import { Asterisk } from "../components/Marquee";

const FRAGMENTS = [
  { art: ARTWORKS[0], cls: "right-[6%] top-[14%] w-40 lg:w-52", tilt: "5deg", dur: "8s", delay: "0s" },
  { art: ARTWORKS[5], cls: "left-[4%] top-[30%] w-28 lg:w-36", tilt: "-7deg", dur: "9.5s", delay: "-2s" },
  { art: ARTWORKS[1], cls: "right-[10%] bottom-[16%] w-28 lg:w-36", tilt: "3deg", dur: "7.5s", delay: "-4s" },
  { art: ARTWORKS[4], cls: "left-[12%] bottom-[10%] w-36 lg:w-44", tilt: "-4deg", dur: "10s", delay: "-1s" },
];

export default function Contact() {
  return (
    <div className="relative overflow-hidden pt-32 sm:pt-40">
      {/* warm closing-scene wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, var(--color-paper) 0%, #f2e2c8 48%, #eccfa8 100%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, #e9b48f88, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* floating artwork fragments */}
      {FRAGMENTS.map((f) => (
        <div
          key={f.art.id}
          aria-hidden="true"
          className={`pointer-events-none absolute hidden md:block ${f.cls}`}
          style={{ "--tilt": f.tilt, "--float-dur": f.dur, animationDelay: f.delay } as React.CSSProperties}
        >
          <figure className="paper-frame animate-floaty p-1.5 opacity-90 shadow-lift">
            <div className="overflow-hidden rounded-[2px]" style={{ aspectRatio: "4 / 3" }}>
              <img src={f.art.src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </figure>
        </div>
      ))}

      <div className="relative mx-auto max-w-[1400px] px-5 pb-24 sm:px-10 sm:pb-32 lg:px-16">
        <Reveal>
          <p className="label-tag mb-6 flex items-center gap-3">
            <Asterisk className="h-3.5 w-3.5 text-clay" /> 04 — The last page of the archive
          </p>
        </Reveal>

        <h1 className="font-display text-[clamp(2.8rem,9.5vw,8.4rem)] font-semibold leading-[0.9] tracking-tight text-ink">
          <Words text="LET'S CREATE" className="block" />
          <Words text="SOMETHING." delay={0.2} className="block italic text-clay" />
        </h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.25} className="lg:col-span-5">
            <p className="max-w-[44ch] text-[15px] leading-relaxed text-ink-soft sm:text-lg">
              Have an idea worth illustrating? A character waiting to exist, a world that needs
              weather? Tell me about it — commissions, freelance projects and collaborations all
              land in the same warm inbox.
            </p>
            <p className="mt-5 flex items-center gap-2.5 text-sm font-bold text-ink">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-sage" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sage" />
              </span>
              Open for commissions &amp; collaborations
            </p>
          </Reveal>

          <Reveal delay={0.35} y={36} className="lg:col-span-7">
            <GlowCard glow="#e9b48f" className="rounded-[12px]">
              <div className="rounded-[12px] border border-ink/12 bg-cream p-7 shadow-card sm:p-10">
                <p className="label-tag mb-5">Primary inbox — read by the artist himself</p>
                <a
                  href={`mailto:${SOCIALS.email}?subject=A world worth drawing`}
                  className="link-line break-all font-display text-[clamp(1.15rem,3.4vw,2.5rem)] font-semibold tracking-tight text-ink transition-colors duration-300 hover:text-clay"
                >
                  {SOCIALS.email}
                </a>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a
                    href={`mailto:${SOCIALS.email}?subject=A world worth drawing`}
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm font-extrabold uppercase tracking-[0.14em] text-cream shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay"
                  >
                    Start a conversation
                    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 12h16m0 0l-6-6m6 6l-6 6" />
                    </svg>
                  </a>
                  <span className="text-sm font-semibold text-ink-soft">replies come personally, not from a template</span>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        </div>

        {/* social rows */}
        <div className="mt-20">
          <Reveal>
            <p className="label-tag mb-6">Elsewhere on the internet</p>
          </Reveal>
          {[
            { label: "Instagram", value: SOCIALS.instagramHandle, href: SOCIALS.instagram, note: "works-in-progress, stories & daily draws" },
            { label: "Behance", value: SOCIALS.behanceHandle, href: SOCIALS.behance, note: "curated projects & full case views" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} y={24}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-wrap items-baseline justify-between gap-3 border-t border-ink/15 py-6 transition-all duration-400 last:border-b hover:bg-cream/80 hover:px-5 sm:py-7"
              >
                <span className="flex items-baseline gap-5">
                  <span className="font-display text-2xl font-semibold text-ink transition-colors duration-300 group-hover:text-clay sm:text-4xl">
                    {s.label}
                  </span>
                  <span className="text-sm font-bold text-ink-soft">{s.value}</span>
                </span>
                <span className="flex items-center gap-4">
                  <span className="hidden text-xs font-bold uppercase tracking-[0.16em] text-ink-soft sm:block">{s.note}</span>
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-clay transition-transform duration-400 group-hover:translate-x-1.5 group-hover:-translate-y-1.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* sign-off */}
        <Reveal delay={0.1} y={20} className="mt-20 text-center">
          <p className="font-display text-xl italic text-ink-soft sm:text-2xl">
            — thank you for walking through the archive. The kettle's on. <Asterisk className="ml-1 inline h-4 w-4 text-clay" />
          </p>
        </Reveal>
      </div>
    </div>
  );
}
