import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import type { Artwork } from "../data/artworks";
import { useReducedMotion } from "../hooks/useMedia";

interface BounceCardsProps {
  items: Artwork[];
  onSelect: (art: Artwork) => void;
  className?: string;
}

type Pos = { x: number; y: number; r: number };

/**
 * React Bits BounceCards, tuned warm: prints stacked like on a studio desk,
 * fanning out with a restrained elastic bounce on hover (desktop) — static fan on touch.
 */
export default function BounceCards({ items, onSelect, className = "" }: BounceCardsProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const fanRef = useRef<Pos[]>([]);

  const layout = useCallback(() => {
    const wrap = wrapRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (!wrap || cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1100px)", () => {
      const stack: Pos[] = [
        { x: -30, y: 12, r: -5 },
        { x: 2, y: 0, r: 2 },
        { x: 34, y: 16, r: 8 },
      ];
      const fan: Pos[] = [
        { x: -350, y: -4, r: -8 },
        { x: 0, y: -30, r: 0 },
        { x: 350, y: -4, r: 8 },
      ];
      apply(cards, stack, fan, false);
    });

    mm.add("(min-width: 768px) and (max-width: 1099px)", () => {
      const stack: Pos[] = [
        { x: -24, y: 10, r: -5 },
        { x: 0, y: 0, r: 2 },
        { x: 24, y: 12, r: 7 },
      ];
      const fan: Pos[] = [
        { x: -262, y: -2, r: -8 },
        { x: 0, y: -24, r: 0 },
        { x: 262, y: -2, r: 8 },
      ];
      apply(cards, stack, fan, false);
    });

    mm.add("(max-width: 767px)", () => {
      const fan: Pos[] = [
        { x: -104, y: 8, r: -8 },
        { x: 0, y: -16, r: 1 },
        { x: 104, y: 8, r: 8 },
      ];
      apply(cards, fan, fan, true);
    });

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const apply = (cards: HTMLButtonElement[], stack: Pos[], fan: Pos[], instantFan: boolean) => {
    fanRef.current = instantFan ? fan : stack;
    cards.forEach((card, i) => {
      const p = instantFan ? fan[i] : stack[i];
      gsap.set(card, { xPercent: -50, yPercent: -50, x: p.x, y: p.y, rotation: p.r, scale: 1, zIndex: i });
    });
  };

  useEffect(() => {
    const cleanup = layout();
    return () => cleanup?.();
  }, [layout]);

  const fanOut = () => {
    if (reduced || window.innerWidth < 768) return;
    const cards = cardRefs.current.filter(Boolean) as HTMLButtonElement[];
    const mm1100 = window.matchMedia("(min-width: 1100px)").matches;
    const fan: Pos[] = mm1100
      ? [
          { x: -350, y: -4, r: -8 },
          { x: 0, y: -30, r: 0 },
          { x: 350, y: -4, r: 8 },
        ]
      : [
          { x: -262, y: -2, r: -8 },
          { x: 0, y: -24, r: 0 },
          { x: 262, y: -2, r: 8 },
        ];
    fanRef.current = fan;
    cards.forEach((card, i) => {
      gsap.to(card, {
        x: fan[i].x,
        y: fan[i].y,
        rotation: fan[i].r,
        zIndex: 10 + i,
        duration: 1.15,
        ease: "elastic.out(1, 0.62)",
        delay: i * 0.05,
        overwrite: "auto",
      });
    });
  };

  const stackUp = () => {
    if (reduced || window.innerWidth < 768) return;
    const cards = cardRefs.current.filter(Boolean) as HTMLButtonElement[];
    const mm1100 = window.matchMedia("(min-width: 1100px)").matches;
    const stack: Pos[] = mm1100
      ? [
          { x: -30, y: 12, r: -5 },
          { x: 2, y: 0, r: 2 },
          { x: 34, y: 16, r: 8 },
        ]
      : [
          { x: -24, y: 10, r: -5 },
          { x: 0, y: 0, r: 2 },
          { x: 24, y: 12, r: 7 },
        ];
    fanRef.current = stack;
    cards.forEach((card, i) => {
      gsap.to(card, {
        x: stack[i].x,
        y: stack[i].y,
        rotation: stack[i].r,
        scale: 1,
        zIndex: i,
        duration: 0.7,
        ease: "power3.inOut",
        delay: i * 0.03,
        overwrite: "auto",
      });
    });
  };

  const lift = (i: number) => {
    if (reduced || window.innerWidth < 768) return;
    const card = cardRefs.current[i];
    const p = fanRef.current[i];
    if (!card || !p) return;
    gsap.to(card, { y: p.y - 18, scale: 1.045, rotation: p.r * 0.4, zIndex: 40, duration: 0.4, ease: "power3.out", overwrite: "auto" });
  };

  const settle = (i: number) => {
    if (reduced || window.innerWidth < 768) return;
    const card = cardRefs.current[i];
    const p = fanRef.current[i];
    if (!card || !p) return;
    gsap.to(card, { y: p.y, scale: 1, rotation: p.r, duration: 0.5, ease: "power3.out", overwrite: "auto" });
  };

  return (
    <div
      ref={wrapRef}
      className={`relative mx-auto h-[430px] w-full max-w-[1000px] sm:h-[520px] ${className}`}
      onMouseEnter={fanOut}
      onMouseLeave={stackUp}
    >
      {items.slice(0, 3).map((art, i) => (
        <button
          key={art.id}
          type="button"
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          onClick={() => onSelect(art)}
          onMouseEnter={() => lift(i)}
          onMouseLeave={() => settle(i)}
          onFocus={() => lift(i)}
          onBlur={() => settle(i)}
          data-cursor=""
          aria-label={`Open artwork: ${art.title}`}
          className="paper-frame absolute left-1/2 top-1/2 w-[168px] rounded-[4px] p-2 text-left sm:w-[260px] sm:p-3 lg:w-[290px]"
        >
          <span className="block overflow-hidden rounded-[2px]" style={{ aspectRatio: "4 / 5" }}>
            <img src={art.src} alt={art.alt} loading="lazy" className="h-full w-full object-cover" />
          </span>
          <span className="mt-2 flex items-baseline justify-between gap-2 px-0.5 pb-0.5">
            <span className="font-display text-sm font-semibold italic text-ink sm:text-base">{art.title}</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink-soft sm:text-[10px]">
              {art.categories[0]}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
