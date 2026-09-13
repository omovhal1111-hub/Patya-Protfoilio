import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARTWORKS } from "../data/artworks";
import { useReducedMotion } from "../hooks/useMedia";
import { Words } from "./Reveal";
import { Asterisk } from "./Marquee";

gsap.registerPlugin(ScrollTrigger);

const POOL = "PRATHMESB#%&*+=░▒▓";

function GlyphLine({
  word,
  onChars,
  className = "",
}: {
  word: string;
  onChars?: (els: HTMLElement[]) => void;
  className?: string;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const els = Array.from(wrapRef.current.querySelectorAll<HTMLElement>("[data-glyph]"));
    onChars?.(els);
  }, [word, onChars]);

  return (
    <span ref={wrapRef} className={className} aria-label={word} role="text">
      {word.split("").map((ch, i) => (
        <span key={i} className="glyph-char" data-glyph="" aria-hidden="true">
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function GlyphHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const archImgRef = useRef<HTMLImageElement>(null);
  const archWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const allChars = useRef<HTMLElement[]>([]);
  const reduced = useReducedMotion();
  const coast = ARTWORKS[0];

  /* scramble-decode on load + per-glyph scroll drift */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const chars = allChars.current;

      if (!reduced) {
        // scramble decode
        const timers: number[] = [];
        chars.forEach((el, i) => {
          const final = el.textContent ?? "";
          let tick = 0;
          const total = 9 + i * 2;
          const id = window.setInterval(() => {
            tick += 1;
            if (tick >= total) {
              el.textContent = final;
              window.clearInterval(id);
            } else {
              el.textContent = POOL[Math.floor(Math.random() * POOL.length)];
            }
          }, 38);
          timers.push(id);
        });
        timers.push(
          window.setTimeout(() => timers.forEach((t) => window.clearInterval(t)), 4000)
        );

        // per-glyph scroll response
        chars.forEach((el, i) => {
          const dir = i % 2 === 0 ? -1 : 1;
          const amp = 16 + (i % 3) * 13;
          gsap.to(el, {
            y: dir * amp,
            rotation: dir * 3.5,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.7 },
          });
        });

        // arch breathing + parallax
        gsap.to(archImgRef.current, {
          scale: 1.16,
          duration: 11,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        gsap.to(archWrapRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.8 },
        });
        gsap.to(textRef.current, {
          opacity: 0.2,
          y: -46,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.8 },
        });
      }
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  const collect = (bucket: { current: HTMLElement[] }, offset: number) => (els: HTMLElement[]) => {
    bucket.current = [...bucket.current.slice(0, offset), ...els];
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-24 pt-32 sm:pt-36"
      aria-label="Introduction"
    >
      {/* soft warm washes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, #e9b48f55, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-120px] bottom-[-80px] h-[380px] w-[380px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, #8a9a7b44, transparent 70%)" }}
      />

      {/* the portal arch — a doorway into the painted world */}
      <div
        ref={archWrapRef}
        className="hero-arch absolute right-[4%] top-[13%] z-0 hidden h-[min(66vh,600px)] w-[min(38vw,520px)] sm:block"
      >
        <img
          ref={archImgRef}
          src={coast.src}
          alt={coast.alt}
          className="h-full w-full scale-[1.05] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper/70 via-transparent to-transparent" />
      </div>

      {/* rotating wordmark badge */}
      <div className="absolute right-[30%] top-[8%] z-10 hidden h-32 w-32 lg:block" aria-hidden="true">
        <svg viewBox="0 0 120 120" className="h-full w-full animate-spin-slow text-ink/70">
          <defs>
            <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text fontSize="10.5" letterSpacing="2.6" fill="currentColor" fontFamily="Karla, sans-serif" fontWeight="700">
            <textPath href="#badge-circle">2D ARTIST ✳ ILLUSTRATOR ✳ VISUAL WORLDS ✳</textPath>
          </text>
        </svg>
        <Asterisk className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-clay" />
      </div>

      <div className="relative z-10 px-5 sm:px-10 lg:px-16">
        <p className="label-tag mb-6 flex items-center gap-3">
          <span className="inline-block h-[7px] w-[7px] rounded-full bg-clay" />
          Portfolio — the painted archive of
        </p>

        <div ref={textRef}>
          <h1 className="font-display font-semibold leading-[0.9] tracking-[-0.015em] text-ink">
            <GlyphLine
              word="PRATHAMESH"
              onChars={collect(allChars, 0)}
              className="block text-[clamp(2.9rem,11.4vw,10.6rem)]"
            />
            <GlyphLine
              word="BHORE"
              onChars={collect(allChars, 10)}
              className="ml-[6vw] block text-[clamp(2.9rem,11.4vw,10.6rem)] text-clay"
            />
          </h1>
        </div>

        <div className="mt-8 flex max-w-xl flex-col gap-5 sm:ml-[6vw]">
          <Words
            text="2D Artist & Illustrator — turning ideas and imagination into expressive visuals, one warm world at a time."
            className="text-base sm:text-lg leading-relaxed text-ink-soft"
            accentWords={["illustrator"]}
          />
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#selected"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm font-bold tracking-wide text-cream transition-colors duration-300 hover:bg-clay"
            >
              Step into the work
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v16m0 0l-6-6m6 6l6-6" />
              </svg>
            </a>
            <span className="text-sm font-semibold text-ink-soft">
              illustration · characters · environments
            </span>
          </div>
        </div>
      </div>

      {/* bottom strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between gap-6 border-t border-ink/12 px-5 py-4 sm:px-10 lg:px-16">
        <span className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-soft">
          <span className="relative h-8 w-px overflow-hidden bg-ink/15">
            <span className="animate-scroll-cue absolute inset-0 bg-clay" />
          </span>
          scroll
        </span>
        <span className="hidden text-[11px] font-bold uppercase tracking-[0.22em] text-ink-soft md:block">
          six worlds · one pair of hands
        </span>
        <span className="flex items-center gap-2 rounded-full border border-sage/60 bg-sage/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-sage" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
          </span>
          commissions open
        </span>
      </div>
    </section>
  );
}
