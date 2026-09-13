import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useFinePointer, useReducedMotion } from "../hooks/useMedia";

interface ImageTrailProps {
  images: string[];
  className?: string;
}

/**
 * React Bits ImageTrail (variant-style elastic pop), adapted to the warm paper world:
 * small framed prints surface at the cursor while browsing, then sink away.
 * Desktop only — disabled on touch and for reduced motion. Fully cleaned up on unmount.
 */
export default function ImageTrail({ images, className = "" }: ImageTrailProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    if (!wrap || !host || !fine || reduced || images.length === 0) return;
    if (window.innerWidth < 768) return;

    const compact = window.innerWidth < 1024;
    const baseSize = compact ? 118 : 176;
    const threshold = compact ? 120 : 96;

    let lastX = -9999;
    let lastY = -9999;
    let index = 0;
    const active: HTMLDivElement[] = [];
    const tweens: gsap.core.Tween[] = [];

    const spawn = (x: number, y: number) => {
      const el = document.createElement("div");
      el.className = "trail-item";
      const size = baseSize * (0.82 + Math.random() * 0.36);
      el.style.width = `${size}px`;
      el.style.height = `${size * (0.9 + Math.random() * 0.3)}px`;

      const img = document.createElement("img");
      img.src = images[index % images.length];
      img.alt = "";
      el.appendChild(img);
      wrap.appendChild(el);
      active.push(el);
      index += 1;

      if (active.length > 9) {
        const old = active.shift();
        if (old) {
          gsap.killTweensOf(old);
          old.remove();
        }
      }

      const rot = gsap.utils.random(-13, 13);
      const t1 = gsap.fromTo(
        el,
        { x: x - size / 2, y: y - size / 2, scale: 0.2, rotation: rot - 16, opacity: 0 },
        { scale: 1, rotation: rot, opacity: 1, duration: 0.55, ease: "back.out(1.8)" }
      );
      const t2 = gsap.to(el, {
        opacity: 0,
        scale: 0.55,
        y: `+=${gsap.utils.random(18, 40)}`,
        rotation: rot + gsap.utils.random(-8, 8),
        duration: 0.7,
        delay: 0.5,
        ease: "power2.in",
        onComplete: () => {
          const at = active.indexOf(el);
          if (at >= 0) active.splice(at, 1);
          el.remove();
        },
      });
      tweens.push(t1, t2);
    };

    const onMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist < threshold) return;
      lastX = x;
      lastY = y;
      spawn(x, y);
    };

    host.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      host.removeEventListener("mousemove", onMove);
      tweens.forEach((t) => t.kill());
      active.forEach((el) => el.remove());
    };
  }, [fine, reduced, images]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    />
  );
}
