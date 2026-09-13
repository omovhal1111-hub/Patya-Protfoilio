import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ARTWORKS, CATEGORIES, SOCIALS, type Category } from "../data/artworks";
import { useReducedMotion } from "../hooks/useMedia";
import { Reveal, Words } from "../components/Reveal";
import ImageTrail from "../components/ImageTrail";
import GlowCard from "../components/GlowCard";
import ArtworkModal from "../components/ArtworkModal";
import { Asterisk } from "../components/Marquee";

const SPANS = [
  "md:col-span-7",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-6",
];

type Filter = "All" | Category;

export default function Work() {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeId, setActiveId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const filtered = useMemo(
    () => (filter === "All" ? ARTWORKS : ARTWORKS.filter((a) => a.categories.includes(filter))),
    [filter]
  );
  const trailImages = useMemo(() => ARTWORKS.map((a) => a.src), []);

  /* staggered re-entry when the filter changes */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || reduced) return;
    const cells = grid.querySelectorAll("[data-work-cell]");
    const t = gsap.fromTo(
      cells,
      { opacity: 0, y: 26, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07, ease: "power3.out" }
    );
    return () => {
      t.kill();
    };
  }, [filter, reduced]);

  const activeIdx = filtered.findIndex((a) => a.id === activeId);
  const countFor = (c: Filter) =>
    c === "All" ? ARTWORKS.length : ARTWORKS.filter((a) => a.categories.includes(c as Category)).length;

  return (
    <div className="pt-32 sm:pt-40">
      {/* header */}
      <header className="mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16">
        <Reveal>
          <p className="label-tag mb-6 flex items-center gap-3">
            <Asterisk className="h-3.5 w-3.5 text-clay" /> The painted archive
          </p>
        </Reveal>
        <h1 className="font-display text-[clamp(2.8rem,9vw,8rem)] font-semibold leading-[0.9] tracking-tight text-ink">
          <Words text="THE" className="mr-[0.25em]" />
          <Words text="ARCHIVE" delay={0.12} className="italic text-clay" />
        </h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0.2}>
            <p className="max-w-[52ch] text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Every finished world on one shelf — environments, characters and quiet symbolic
              fields. Move through the archive and the prints will follow your cursor; click any
              piece to step inside it.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-display text-2xl italic text-ink">
              {String(ARTWORKS.length).padStart(2, "0")} pieces
            </p>
          </Reveal>
        </div>
      </header>

      {/* filters */}
      <div className="sticky top-[76px] z-30 mt-12 border-y border-ink/12 bg-paper/92 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 px-5 py-3.5 sm:px-10 lg:px-16" role="tablist" aria-label="Filter artworks by category">
          {(["All", ...CATEGORIES] as Filter[]).map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] transition-all duration-300 ${
                  active
                    ? "border-ink bg-ink text-cream shadow-soft"
                    : "border-ink/20 text-ink-soft hover:-translate-y-0.5 hover:border-clay hover:text-clay"
                }`}
              >
                {c} <span className={active ? "text-peach" : "text-ink/35"}>{countFor(c)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* grid + image trail */}
      <section className="relative mx-auto max-w-[1400px] px-5 pb-10 pt-14 sm:px-10 sm:pt-16 lg:px-16">
        <ImageTrail images={trailImages} />
        <div ref={gridRef} className="relative z-10 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12">
          {filtered.map((art, i) => {
            const cell = (
              <button
                key={art.id}
                type="button"
                data-work-cell=""
                data-cursor=""
                onClick={() => setActiveId(art.id)}
                aria-label={`Open artwork: ${art.title}`}
                className="paper-frame group block w-full rounded-[6px] p-2.5 text-left transition-shadow duration-500 hover:shadow-lift"
              >
                <span className="relative block overflow-hidden rounded-[3px]" style={{ aspectRatio: art.ratio }}>
                  <img
                    src={art.src}
                    alt={art.alt}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  {art.fanArt && (
                    <span className="absolute left-3 top-3 rounded-full border border-lav bg-cream/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-ink">
                      fan art
                    </span>
                  )}
                  <span
                    className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-cream/92 text-ink opacity-0 shadow-soft transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                </span>
                <span className="mt-3 flex items-baseline justify-between gap-4 px-1 pb-1">
                  <span className="font-display text-lg font-semibold italic leading-tight text-ink sm:text-xl">{art.title}</span>
                  <span className="label-tag shrink-0">{art.categories[0]}</span>
                </span>
              </button>
            );

            const span = SPANS[i % SPANS.length];
            const offset = i % 2 === 1 ? "md:mt-20" : "";

            return (
              <Reveal key={art.id} y={40} className={`${span} ${offset}`}>
                {i === 0 ? (
                  <GlowCard glow={art.tint} className="rounded-[8px]">
                    {cell}
                  </GlowCard>
                ) : (
                  cell
                )}
              </Reveal>
            );
          })}
        </div>
        <p className="relative z-10 mt-10 text-center text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
          ← drag your cursor through the shelf →
        </p>
      </section>

      {/* beyond the site */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
        <Reveal>
          <p className="label-tag mb-8">Beyond this site</p>
        </Reveal>
        <h2 className="mb-10 font-display text-[clamp(1.8rem,4.5vw,3.6rem)] font-semibold leading-[1.02] tracking-tight text-ink">
          <Words text="Sketches, studies & process live elsewhere" />
        </h2>
        {[
          { label: "Behance", value: SOCIALS.behanceHandle, href: SOCIALS.behance, note: "full project breakdowns" },
          { label: "Instagram", value: SOCIALS.instagramHandle, href: SOCIALS.instagram, note: "works-in-progress & daily draws" },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} y={24}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-wrap items-baseline justify-between gap-3 border-t border-ink/15 py-6 transition-all duration-400 last:border-b hover:bg-cream hover:px-5 sm:py-7"
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
      </section>

      {activeIdx >= 0 && (
        <ArtworkModal
          art={filtered[activeIdx]}
          index={activeIdx}
          total={filtered.length}
          onClose={() => setActiveId(null)}
          onPrev={() => setActiveId(filtered[(activeIdx - 1 + filtered.length) % filtered.length].id)}
          onNext={() => setActiveId(filtered[(activeIdx + 1) % filtered.length].id)}
        />
      )}
    </div>
  );
}
