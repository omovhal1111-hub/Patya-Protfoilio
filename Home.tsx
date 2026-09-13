import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARTWORKS, PORTRAIT, SOCIALS, type Artwork } from "../data/artworks";
import { useReducedMotion } from "../hooks/useMedia";
import GlyphHero from "../components/GlyphHero";
import Marquee, { Asterisk } from "../components/Marquee";
import { Reveal, Words } from "../components/Reveal";
import DriftWall from "../components/DriftWall";
import BounceCards from "../components/BounceCards";
import ArtworkModal from "../components/ArtworkModal";

gsap.registerPlugin(ScrollTrigger);

const DISCIPLINES = [
  { n: "01", word: "Illustration", desc: "Standalone pieces that carry a whole mood in a single frame.", img: ARTWORKS[5] },
  { n: "02", word: "Character Design", desc: "Personalities built from silhouette, posture and one good eyebrow.", img: ARTWORKS[3] },
  { n: "03", word: "Digital Painting", desc: "Light, atmosphere and brushwork pushed until the scene breathes.", img: ARTWORKS[2] },
  { n: "04", word: "Environment Art", desc: "Worlds with weather, history and somewhere small to stand.", img: ARTWORKS[0] },
  { n: "05", word: "Visual Storytelling", desc: "Quiet narratives — what happened just before, and just after.", img: ARTWORKS[1] },
];

const FEATURED = [ARTWORKS[0], ARTWORKS[1], ARTWORKS[4]];

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  /* gentle parallax on anything tagged data-para */
  useEffect(() => {
    if (reduced || !pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-para]").forEach((el) => {
        gsap.to(el, {
          yPercent: parseFloat(el.dataset.para || "0"),
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, [reduced]);

  const activeIndex = ARTWORKS.findIndex((a) => a.id === activeId);
  const openArt = (art: Artwork) => setActiveId(art.id);

  return (
    <div ref={pageRef}>
      <GlyphHero />
      <Marquee />

      {/* 01 — the artist */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 sm:px-10 sm:py-32 lg:grid-cols-12 lg:gap-8 lg:px-16">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="label-tag mb-8">01 — The artist</p>
          </Reveal>
          <Reveal y={44} delay={0.1}>
            <figure className="paper-frame relative w-[240px] rotate-[-3.5deg] p-3 shadow-lift transition-transform duration-500 hover:rotate-0 sm:w-[280px]">
              <span className="tape -top-2.5 left-1/2 -translate-x-1/2 rotate-[-5deg]" aria-hidden="true" />
              <div className="overflow-hidden rounded-[2px]" style={{ aspectRatio: "4 / 5" }}>
                <img src={PORTRAIT.src} alt={PORTRAIT.alt} className="h-full w-full object-cover" />
              </div>
              <figcaption className="pt-2.5 font-display text-sm italic text-ink-soft">
                the artist, at his desk — 4 pm light
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="lg:col-span-8 lg:pt-16">
          <Words
            text="I'm a passionate 2D Artist and Illustrator who loves turning ideas and imagination into expressive visuals. My work explores illustration, character design, digital painting, and visual storytelling — with a constant curiosity for new styles and creative possibilities."
            className="font-display text-[clamp(1.5rem,3.3vw,2.8rem)] font-medium leading-[1.22] tracking-tight text-ink"
            accentWords={["illustration", "storytelling"]}
          />
          <Reveal delay={0.25} y={24}>
            <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Every piece starts as a scribble with too much enthusiasm and ends as a small world —
              coastal ruins, lamplit bus stops, characters borrowed from stories I love. This site is
              the shelf where those worlds live.
            </p>
          </Reveal>
          <Reveal delay={0.35} y={24}>
            <Link
              to="/about"
              className="link-line mt-8 inline-block text-sm font-extrabold uppercase tracking-[0.18em] text-clay"
            >
              More about the artist →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 02 — selected work collage */}
      <section id="selected" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 pb-24 sm:px-10 sm:pb-32 lg:px-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="label-tag mb-5">02 — Selected work</p>
            </Reveal>
            <h2 className="font-display text-[clamp(2.6rem,7.5vw,6.4rem)] font-semibold leading-[0.92] tracking-tight text-ink">
              <Words text="SELECTED" className="block" />
              <Words text="WORK" delay={0.15} className="block italic text-clay" />
            </h2>
          </div>
          <span
            aria-hidden="true"
            className="mb-2 hidden select-none font-display text-[clamp(3rem,8vw,7rem)] font-bold uppercase leading-none lg:block"
            style={{ color: "transparent", WebkitTextStroke: "1.5px color-mix(in oklab, #2d2520 22%, transparent)" }}
          >
            archive
          </span>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-5 sm:gap-8">
          {/* coast — wide anchor */}
          <Reveal mask as="figure" className="group col-span-12 md:col-span-7">
            <button type="button" data-cursor="" onClick={() => openArt(FEATURED[0])} className="block w-full text-left" aria-label={`Open artwork: ${FEATURED[0].title}`}>
              <div className="relative overflow-hidden rounded-[6px] border border-ink/12 shadow-card" style={{ aspectRatio: "16 / 10" }}>
                <img
                  src={FEATURED[0].src}
                  alt={FEATURED[0].alt}
                  data-para="7"
                  className="absolute -top-[6%] left-0 h-[112%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </button>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4">
              <span className="font-display text-lg font-semibold italic text-ink">{FEATURED[0].title}</span>
              <span className="label-tag">№ 01 · environment</span>
            </figcaption>
          </Reveal>

          {/* bus stop — tall, offset down */}
          <Reveal mask as="figure" delay={0.12} className="group col-span-12 md:col-span-4 md:col-start-9 md:mt-28">
            <button type="button" data-cursor="" onClick={() => openArt(FEATURED[1])} className="block w-full text-left" aria-label={`Open artwork: ${FEATURED[1].title}`}>
              <div className="relative mx-auto max-w-[380px] overflow-hidden rounded-[6px] border border-ink/12 shadow-card" style={{ aspectRatio: "9 / 14" }}>
                <img
                  src={FEATURED[1].src}
                  alt={FEATURED[1].alt}
                  data-para="-6"
                  className="absolute -top-[6%] left-0 h-[112%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </button>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4">
              <span className="font-display text-lg font-semibold italic text-ink">{FEATURED[1].title}</span>
              <span className="label-tag">№ 02 · narrative</span>
            </figcaption>
          </Reveal>

          {/* grave — overlapping rise */}
          <Reveal mask as="figure" delay={0.08} className="group relative z-10 col-span-12 md:col-span-5 md:col-start-3 md:-mt-20">
            <button type="button" data-cursor="" onClick={() => openArt(FEATURED[2])} className="block w-full text-left" aria-label={`Open artwork: ${FEATURED[2].title}`}>
              <div className="relative overflow-hidden rounded-[6px] border border-ink/12 shadow-lift" style={{ aspectRatio: "3 / 2" }}>
                <img
                  src={FEATURED[2].src}
                  alt={FEATURED[2].alt}
                  data-para="5"
                  className="absolute -top-[6%] left-0 h-[112%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </button>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4">
              <span className="font-display text-lg font-semibold italic text-ink">{FEATURED[2].title}</span>
              <span className="label-tag">№ 03 · symbolic</span>
            </figcaption>
          </Reveal>

          <div className="col-span-12 flex items-end md:col-span-4 md:col-start-8">
            <Reveal delay={0.15}>
              <p className="max-w-[26ch] text-[15px] leading-relaxed text-ink-soft">
                Six finished worlds so far — environments, characters and quiet symbolic fields. The
                full shelf is one click away.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-16">
          <Link to="/work" className="group inline-flex items-center gap-5" aria-label="View selected work">
            <span className="font-display text-2xl font-semibold italic text-ink transition-colors duration-300 group-hover:text-clay sm:text-4xl">
              View selected work
            </span>
            <span className="relative flex items-center">
              <span className="h-px w-14 bg-ink transition-all duration-500 group-hover:w-28 group-hover:bg-clay sm:w-20 sm:group-hover:w-36" />
              <svg viewBox="0 0 24 24" className="-ml-1 h-5 w-5 text-clay transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 12h16m0 0l-6-6m6 6l-6 6" />
              </svg>
            </span>
          </Link>
        </Reveal>
      </section>

      {/* 03 — disciplines */}
      <section className="border-y border-ink/12 bg-cream/60">
        <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-10 sm:py-28 lg:px-16">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="label-tag mb-5">03 — Fields of play</p>
              </Reveal>
              <h2 className="font-display text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[0.98] tracking-tight text-ink">
                <Words text="What these hands make" />
              </h2>
            </div>
            <Asterisk className="mb-3 hidden h-10 w-10 text-clay sm:block animate-spin-slow" />
          </div>

          <div>
            {DISCIPLINES.map((d, i) => (
              <Reveal key={d.word} delay={i * 0.05} y={26}>
                <div className="group grid cursor-default grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-ink/12 py-6 first:border-t sm:gap-8 sm:py-7">
                  <span className="label-tag w-8">{d.n}</span>
                  <span className="font-display text-[clamp(1.6rem,4.2vw,3.4rem)] font-semibold leading-none tracking-tight text-ink transition-all duration-400 group-hover:translate-x-3 group-hover:italic group-hover:text-clay sm:group-hover:translate-x-5">
                    {d.word}
                  </span>
                  <span className="hidden max-w-[250px] text-right text-sm leading-snug text-ink-soft md:block">
                    {d.desc}
                  </span>
                  <span className="hidden overflow-hidden rounded-[3px] shadow-soft transition-all duration-500 md:block h-14 w-[72px] lg:h-16 lg:w-20 opacity-0 rotate-[-5deg] scale-90 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100">
                    <img src={d.img.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — drifting wall */}
      <section className="mx-auto max-w-full overflow-hidden px-0 py-24 sm:py-32">
        <div className="mx-auto mb-12 max-w-[1400px] px-5 sm:px-10 lg:px-16">
          <Reveal>
            <p className="label-tag mb-5">04 — The drifting wall</p>
          </Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[0.98] tracking-tight text-ink">
              <Words text="A wall that never sits still" />
            </h2>
            <p className="max-w-[36ch] text-sm leading-relaxed text-ink-soft">
              The whole archive in slow motion — prints gliding past like an exhibition you walk
              through at your own pace.
            </p>
          </div>
        </div>
        <Reveal y={50} duration={1.2}>
          <DriftWall />
        </Reveal>
      </section>

      {/* 05 — studio wall (BounceCards) */}
      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-10 sm:pb-32 lg:px-16">
        <div className="mb-6 text-center">
          <Reveal>
            <p className="label-tag mb-5">05 — Studio wall</p>
          </Reveal>
          <h2 className="font-display text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[0.98] tracking-tight text-ink">
            <Words text="Pinned & beloved" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-3 hidden text-sm font-semibold text-ink-soft md:block">
              hover to fan the prints — click any of them to step inside
            </p>
          </Reveal>
        </div>
        <Reveal y={40} duration={1.1}>
          <BounceCards items={[ARTWORKS[1], ARTWORKS[2], ARTWORKS[5]]} onSelect={openArt} />
        </Reveal>
      </section>

      {/* 06 — closing CTA */}
      <section className="relative overflow-hidden border-t border-ink/12">
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, var(--color-paper) 0%, #f0dcc2 55%, #e9b48f66 100%)" }} aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 py-24 sm:px-10 sm:py-32 lg:grid-cols-12 lg:items-end lg:px-16">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="label-tag mb-6">06 — What's next</p>
            </Reveal>
            <h2 className="font-display text-[clamp(2.6rem,7vw,6.2rem)] font-semibold leading-[0.95] tracking-tight text-ink">
              <Words text="Let's make" className="block" />
              <Words text="something warm." delay={0.18} className="block italic text-clay" />
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <Reveal delay={0.25} y={30}>
              <p className="mb-6 max-w-[34ch] text-[15px] leading-relaxed text-ink-soft">
                Commissions, freelance projects, collaborations — or just a conversation about a
                world you'd like to see drawn.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm font-extrabold uppercase tracking-[0.14em] text-cream shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay"
              >
                Start a conversation
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12h16m0 0l-6-6m6 6l-6 6" />
                </svg>
              </Link>
              <div className="mt-6 flex gap-5 text-sm font-bold text-ink">
                <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="link-line">Instagram</a>
                <a href={SOCIALS.behance} target="_blank" rel="noreferrer" className="link-line">Behance</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {activeIndex >= 0 && (
        <ArtworkModal
          art={ARTWORKS[activeIndex]}
          index={activeIndex}
          total={ARTWORKS.length}
          onClose={() => setActiveId(null)}
          onPrev={() => setActiveId(ARTWORKS[(activeIndex - 1 + ARTWORKS.length) % ARTWORKS.length].id)}
          onNext={() => setActiveId(ARTWORKS[(activeIndex + 1) % ARTWORKS.length].id)}
        />
      )}
    </div>
  );
}
