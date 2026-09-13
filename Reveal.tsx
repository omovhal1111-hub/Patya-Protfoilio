import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useMedia";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
  y?: number;
  x?: number;
  scale?: number;
  rotation?: number;
  delay?: number;
  duration?: number;
  start?: string;
  /** masked image reveal — clips from inset to full */
  mask?: boolean;
  style?: CSSProperties;
  id?: string;
}

/** Scroll-triggered entrance (transform + opacity, GPU friendly). */
export function Reveal({
  children,
  className,
  as = "div",
  y = 34,
  x = 0,
  scale = 1,
  rotation = 0,
  delay = 0,
  duration = 1,
  start = "top 88%",
  mask = false,
  style,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y,
        x,
        scale,
        rotation,
        opacity: mask ? 1 : 0,
        clipPath: mask ? "inset(14% 10% 14% 10% round 6px)" : undefined,
        duration,
        delay,
        ease: mask ? "power4.inOut" : "power3.out",
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    });
    return () => ctx.revert();
  }, [reduced, y, x, scale, rotation, delay, duration, start, mask]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={className} style={style} id={id}>
      {children}
    </Tag>
  );
}

interface WordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  accentWords?: string[];
  delay?: number;
  start?: string;
  as?: keyof HTMLElementTagNameMap;
}

/** Word-by-word masked reveal for editorial copy. */
export function Words({
  text,
  className,
  wordClassName,
  accentWords = [],
  delay = 0,
  start = "top 86%",
  as = "p",
}: WordsProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const inners = ref.current.querySelectorAll<HTMLElement>("[data-word]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inners,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 0.9,
          delay,
          ease: "power4.out",
          stagger: 0.035,
          scrollTrigger: { trigger: ref.current, start, once: true },
        }
      );
    });
    return () => ctx.revert();
  }, [reduced, text, delay, start]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((word, i) => {
        const clean = word.replace(/[^a-zA-Z']/g, "").toLowerCase();
        const accent = accentWords.includes(clean);
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <span
              data-word=""
              className={`inline-block will-change-transform ${accent ? "italic text-clay" : ""} ${wordClassName ?? ""}`}
            >
              {word}
              {i < text.split(" ").length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
