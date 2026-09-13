import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARTWORKS, PORTRAIT, SOCIALS } from "../data/artworks";
import { useReducedMotion } from "../hooks/useMedia";
import { Reveal, Words } from "../components/Reveal";
import { Folder } from "../components/FolderStack";
import { Asterisk } from "../components/Marquee";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { n: "01", name: "2D Illustration", note: "the core language" },
  { n: "02", name: "Character Design", note: "silhouette first, details later" },
  { n: "03", name: "Digital Painting", note: "light, atmosphere, patience" },
  { n: "04", name: "Environment Illustration", note: "places that feel lived-in" },
  { n: "05", name: "Visual Storytelling", note: "the frame before and after" },
  { n: "06", name: "Concept Development", note: "scribble → thumbnail → world" },
];

const FOLDERS = [
  {
    label: "Worlds & Ruins",
    front: "#bc5b39",
    back: "#934326",
    items: [ARTWORKS[0], ARTWORKS[4], ARTWORKS[2]],
    note: "Environments with weather, history and somewhere small to stand.",
  },
  {
    label: "Characters",
    front: "#d29a3a",
    back: "#a87a22",
    items: [ARTWORKS[3], ARTWORKS[5], PORTRAIT as any],
    note: "Borrowed heroes, original souls — and the artist himself.",
  },
  {
    label: "Quiet Hours",
    front: "#8a9a7b",
    back: "#6c7d5f",
    items: [ARTWORKS[1], ARTWORKS[4], PORTRAIT as any],
    note: "Lamplight, dusk, and things that wait patiently.",
  },
  {
    label: "Experiments",
    front: "#a292b8",
    back: "#837498",
    items: [ARTWORKS[2], ARTWORKS[5], ARTWORKS[0]],
    note: "Style studies that refused to behave — kept on purpose.",
  },
];

const POSTCARDS = [
  { art: ARTWORKS[1], cls: "w-[46%] rotate-[-5deg] top-0 left-0", tilt: "-5deg" },
  { art: ARTWORKS[2], cls: "w-[42%] rotate-[4deg] top-[18%] right-0", tilt: "4deg" },
  { art: ARTWORKS[5], cls: "w-[44%] rotate-[-2deg] bottom-0 left-[16%]", tilt: "-2deg" },
];

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

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

  return (
    <div ref={pageRef} className="pt-32 sm:pt-40">
      {/* header */}
      <header className="mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16">
        <Reveal>
          <p className="label-tag mb-6 flex items-center gap-3">
            <Asterisk className="h-3.5 w-3.5 text-clay" /> 02 — About the artist
          </p>
        </Reveal>
        <h1 className="max-w-[16ch] font-display text-[clamp(2.3rem,6.4vw,5.6rem)] font-semibold leading-[1.0] tracking-tight text-ink">
          <Words text="An illustrator turning ideas into" />{" "}
          <Words text="visual stories." delay={0.3} className="italic text-clay" />
        </h1>
      </header>

      {/* bio spread */}
      <section className="mx-auto grid max-w-[1400px] gap-14 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-12 lg:gap-10 lg:px-16">
        <div className="lg:col-span-5">
          <Reveal mask>
            <figure className="paper-frame relative max-w-[420px] rotate-[-2deg] p-3 shadow-lift transition-transform duration-500 hover:rotate-0 sm:p-4">
              <span className="tape -top-2.5 left-8 rotate-[-6deg]" aria-hidden="true" />
              <span className="tape -top-2 right-10 rotate-[5deg]" aria-hidden="true" style={{ width: 56 }} />
              <div className="relative overflow-hidden rounded-[3px]" style={{ aspectRatio: "4 / 5" }}>
                <img
                  src={PORTRAIT.src}
                  alt={PORTRAIT.alt}
                  data-para="5"
                  className="absolute -top-[5%] left-0 h-[110%] w-full object-cover"
                />
              </div>
              <figcaption className="flex items-center justify-between pt-3 font-display text-sm italic text-ink-soft">
                <span>self, drawn honestly</span>
                <Asterisk className="h-3.5 w-3.5 text-clay" />
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.2} y={30}>
            <dl className="mt-12 max-w-[420px] divide-y divide-ink/12 border-y border-ink/12">
              {[
                ["Name", "Prathamesh Bhore"],
                ["Craft", "2D Art & Illustration"],
                ["Focus", "Illustration · Characters · Environments"],
                ["Status", "Open for commissions & collaborations"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="label-tag">{k}</dt>
                  <dd className="flex items-center gap-2 text-right text-sm font-bold text-ink">
                    {k === "Status" && <span className="h-2 w-2 rounded-full bg-sage" aria-hidden="true" />}
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <Reveal>
            <h2 className="label-tag mb-6">The short version</h2>
          </Reveal>
          <Words
            text="I'm a passionate 2D Artist and Illustrator who loves turning ideas and imagination into expressive visuals. My work explores illustration, character design, digital painting, and visual storytelling — with a constant curiosity for new styles and creative possibilities."
            className="font-display text-[clamp(1.4rem,2.9vw,2.4rem)] font-medium leading-[1.25] tracking-tight text-ink"
            accentWords={["illustration", "storytelling"]}
          />
          <Reveal delay={0.2} y={26}>
            <p className="mt-8 max-w-[58ch] text-[15px] leading-relaxed text-ink-soft sm:text-base">
              I care about the quiet parts of a picture — the weather, the 4 pm light, the posture
              of a character a second before they speak. A piece is finished when the world inside
              it feels like it was already there and I just dusted it off.
            </p>
          </Reveal>
          <Reveal delay={0.3} y={26}>
            <p className="mt-5 max-w-[58ch] text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Most days you'll find me somewhere between a thumbnail the size of a postage stamp
              and a final render with one stubborn warm light source. Fan art keeps the hands
              loose; original worlds keep the head busy.
            </p>
          </Reveal>
          <Reveal delay={0.38} y={22}>
            <Link to="/work" className="link-line mt-9 inline-block text-sm font-extrabold uppercase tracking-[0.18em] text-clay">
              See what that looks like →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* folders — creative explorations */}
      <section className="border-y border-ink/12 bg-cream/60">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="label-tag mb-5">Creative explorations</p>
              </Reveal>
              <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.8rem)] font-semibold leading-[0.98] tracking-tight text-ink">
                <Words text="Four folders from the shelf" />
              </h2>
            </div>
            <Reveal delay={0.2}>
              <p className="max-w-[36ch] text-sm leading-relaxed text-ink-soft">
                Hover — or tap — a folder and its current obsessions peek out. Every piece in them
                lives in the full archive.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
            {FOLDERS.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.08} y={36} className="flex justify-center">
                <Folder
                  label={f.label}
                  count={String(f.items.length).padStart(2, "0")}
                  front={f.front}
                  back={f.back}
                  note={f.note}
                  items={f.items.map((it) => ({ src: it.src, alt: it.alt ?? "" }))}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* skills */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
        <Reveal>
          <p className="label-tag mb-5">The toolkit</p>
        </Reveal>
        <h2 className="mb-12 font-display text-[clamp(1.9rem,4.6vw,3.8rem)] font-semibold leading-[0.98] tracking-tight text-ink">
          <Words text="Skills, kept sharp on purpose" />
        </h2>
        <div className="grid gap-x-16 md:grid-cols-2">
          {SKILLS.map((s, i) => (
            <Reveal key={s.n} delay={(i % 2) * 0.06} y={24}>
              <div className="group flex items-baseline gap-5 border-b border-ink/12 py-5 transition-all duration-300 hover:translate-x-2 sm:gap-7 sm:py-6">
                <span className="font-display text-lg italic text-clay">{s.n}</span>
                <span className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">{s.name}</span>
                <span className="ml-auto text-right text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">
                  {s.note}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* approach + scattered postcards */}
      <section className="mx-auto grid max-w-[1400px] gap-14 px-5 pb-24 sm:px-10 sm:pb-32 lg:grid-cols-12 lg:gap-10 lg:px-16">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="label-tag mb-5">Artistic approach</p>
          </Reveal>
          <h2 className="mb-8 font-display text-[clamp(1.9rem,4.6vw,3.8rem)] font-semibold leading-[0.98] tracking-tight text-ink">
            <Words text="How a piece happens" />
          </h2>
          {[
            ["01", "Scribble & thumbnails", "Ugly on purpose. Twenty tiny frames to find the one honest one."],
            ["02", "Values & light studies", "Decide where the warmth lives before any detail is allowed in."],
            ["03", "The final render", "Slow layers, one warm light source, and a last pass for atmosphere."],
          ].map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 0.08} y={26}>
              <div className="mb-7 border-l-2 border-clay/60 pl-5">
                <p className="font-display text-lg font-semibold italic text-ink sm:text-xl">
                  <span className="mr-3 text-clay">{n}</span>
                  {t}
                </p>
                <p className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-ink-soft">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="relative min-h-[420px] lg:col-span-6 sm:min-h-[520px]">
          {POSTCARDS.map((p, i) => (
            <Reveal key={p.art.id} delay={i * 0.12} y={44} className={`absolute ${p.cls}`}>
              <figure className="paper-frame p-2 shadow-lift transition-transform duration-500 hover:rotate-0 hover:scale-[1.03]" data-cursor="">
                <div className="overflow-hidden rounded-[2px]" style={{ aspectRatio: "4 / 5" }}>
                  <img src={p.art.src} alt={p.art.alt} loading="lazy" data-para={i % 2 ? "-5" : "6"} className="h-full w-full object-cover" />
                </div>
                <figcaption className="px-1 pt-2 font-display text-xs italic text-ink-soft">{p.art.title}</figcaption>
              </figure>
            </Reveal>
          ))}
          <Asterisk className="absolute right-[8%] top-[6%] h-10 w-10 animate-spin-slow text-mustard" />
        </div>
      </section>

      {/* selected teaser */}
      <section className="border-t border-ink/12 bg-parch/50">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.8rem)] font-semibold leading-[0.98] tracking-tight text-ink">
              <Words text="A taste of the shelf" />
            </h2>
            <Link to="/work" className="link-line text-sm font-extrabold uppercase tracking-[0.18em] text-clay">
              The full archive →
            </Link>
          </div>
          <div className="grid grid-cols-12 gap-6 sm:gap-8">
            <Reveal mask as="figure" className="col-span-12 md:col-span-7">
              <Link to="/work" className="group block" aria-label={`Open the archive — ${ARTWORKS[0].title}`}>
                <div className="relative overflow-hidden rounded-[6px] border border-ink/12 shadow-card" style={{ aspectRatio: "16 / 10" }}>
                  <img src={ARTWORKS[0].src} alt={ARTWORKS[0].alt} loading="lazy" data-para="6" className="absolute -top-[5%] left-0 h-[110%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <figcaption className="mt-3 font-display text-lg font-semibold italic text-ink">{ARTWORKS[0].title}</figcaption>
              </Link>
            </Reveal>
            <Reveal mask delay={0.12} as="figure" className="col-span-12 md:col-span-4 md:col-start-9 md:mt-16">
              <Link to="/work" className="group block" aria-label={`Open the archive — ${ARTWORKS[3].title}`}>
                <div className="relative mx-auto max-w-[340px] overflow-hidden rounded-[6px] border border-ink/12 shadow-card" style={{ aspectRatio: "4 / 5" }}>
                  <img src={ARTWORKS[3].src} alt={ARTWORKS[3].alt} loading="lazy" data-para="-5" className="absolute -top-[5%] left-0 h-[110%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <figcaption className="mt-3 font-display text-lg font-semibold italic text-ink">{ARTWORKS[3].title}</figcaption>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* socials band */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-24 lg:px-16">
        <Reveal>
          <p className="label-tag mb-8">Find the artist</p>
        </Reveal>
        {[
          { label: "Email", value: SOCIALS.email, href: `mailto:${SOCIALS.email}`, external: false },
          { label: "Instagram", value: SOCIALS.instagramHandle, href: SOCIALS.instagram, external: true },
          { label: "Behance", value: SOCIALS.behanceHandle, href: SOCIALS.behance, external: true },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07} y={24}>
            <a
              href={s.href}
              {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="group flex flex-wrap items-baseline justify-between gap-3 border-t border-ink/15 py-6 transition-all duration-400 last:border-b hover:bg-cream hover:px-5"
            >
              <span className="font-display text-2xl font-semibold text-ink transition-colors duration-300 group-hover:text-clay sm:text-4xl">
                {s.label}
              </span>
              <span className="flex items-center gap-4 text-sm font-bold text-ink-soft">
                {s.value}
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-clay transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
            </a>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
