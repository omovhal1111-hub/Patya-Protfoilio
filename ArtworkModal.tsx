import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Artwork } from "../data/artworks";
import { SOCIALS } from "../data/artworks";
import { useReducedMotion } from "../hooks/useMedia";

interface ArtworkModalProps {
  art: Artwork;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ArtworkModal({ art, index, total, onClose, onPrev, onNext }: ArtworkModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  /* entrance */
  useEffect(() => {
    if (reduced) return;
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
    gsap.fromTo(
      panelRef.current,
      { yPercent: 5, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );
  }, [reduced]);

  /* soft swap when navigating between works */
  useEffect(() => {
    if (reduced || !mediaRef.current) return;
    gsap.fromTo(
      mediaRef.current.querySelector("img"),
      { opacity: 0.25, scale: 0.985 },
      { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
    );
  }, [art.id, reduced]);

  /* keyboard + scroll lock + focus */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={`Artwork: ${art.title}`}>
      <div ref={backdropRef} className="absolute inset-0 bg-ink/60" onClick={onClose} aria-hidden="true" />

      <div
        ref={panelRef}
        className="absolute inset-0 grid overflow-y-auto bg-cream lg:grid-cols-[1.45fr_1fr] lg:overflow-hidden"
      >
        {/* artwork side */}
        <div className="relative flex min-h-[52vh] items-center justify-center bg-parch p-6 sm:p-10 lg:min-h-0">
          <div ref={mediaRef} className="flex w-full items-center justify-center">
            <img
              key={art.id}
              src={art.src}
              alt={art.alt}
              className="paper-frame max-h-[44vh] w-auto max-w-full rounded-[4px] p-2 shadow-lift sm:p-3 lg:max-h-[80vh]"
            />
          </div>

          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous artwork"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 bg-cream text-ink transition-all duration-300 hover:-translate-x-0.5 hover:bg-ink hover:text-cream"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold tracking-[0.18em] text-ink-soft">
              {index + 1} / {total}
            </span>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next artwork"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 bg-cream text-ink transition-all duration-300 hover:translate-x-0.5 hover:bg-ink hover:text-cream"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close artwork view"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-cream text-ink shadow-soft transition-all duration-300 hover:rotate-90 hover:bg-ink hover:text-cream lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* meta side */}
        <div className="flex flex-col gap-6 border-t border-ink/12 p-7 sm:p-10 lg:overflow-y-auto lg:border-l lg:border-t-0 lg:p-12">
          <div className="flex items-start justify-between gap-4">
            <p className="label-tag">{art.medium}</p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close artwork view"
              className="hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:rotate-90 hover:bg-ink hover:text-cream lg:grid"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {art.categories.map((c) => (
              <span
                key={c}
                className="rounded-full border px-3.5 py-1 text-xs font-bold tracking-wide"
                style={{ borderColor: art.tint, color: "var(--color-ink)", background: `${art.tint}14` }}
              >
                {c}
              </span>
            ))}
          </div>

          <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-5xl">
            {art.title}
          </h2>

          <span className="rule-line w-16" style={{ background: art.tint }} aria-hidden="true" />

          <p className="max-w-md text-[15px] leading-relaxed text-ink-soft sm:text-base">{art.description}</p>

          {art.fanArt && (
            <div
              className="max-w-md rounded-r-md border-l-[3px] bg-parch/70 px-4 py-3 text-sm leading-relaxed text-ink-soft"
              style={{ borderColor: art.tint }}
            >
              <strong className="font-bold text-ink">Fan artwork.</strong> A personal study of a beloved
              character — drawn for love of the source, not a commissioned piece.
            </div>
          )}

          <div className="mt-auto flex flex-col gap-3 pt-6">
            <p className="text-sm font-semibold text-ink">
              Like this direction? The archive continues on Behance.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={SOCIALS.behance}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-cream transition-colors duration-300 hover:bg-clay"
              >
                More on Behance
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
              <a
                href={`mailto:${SOCIALS.email}?subject=About "${art.title}"`}
                className="link-line inline-flex items-center gap-2 self-center px-1 py-2 text-sm font-bold text-clay"
              >
                Enquire about this piece →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
