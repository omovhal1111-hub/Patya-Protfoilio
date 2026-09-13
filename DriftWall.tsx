import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARTWORKS, PORTRAIT } from "../data/artworks";
import { useReducedMotion } from "../hooks/useMedia";

gsap.registerPlugin(ScrollTrigger);

const W = [
  "w-[190px] sm:w-[300px]",
  "w-[140px] sm:w-[215px]",
  "w-[225px] sm:w-[345px]",
  "w-[160px] sm:w-[250px]",
];
const H = ["h-[140px] sm:h-[210px]", "h-[170px] sm:h-[250px]", "h-[130px] sm:h-[190px]"];

const ROWS = [
  { arts: [ARTWORKS[0], ARTWORKS[4], ARTWORKS[1], ARTWORKS[5]], dur: 95, dir: 1, h: 0, tilt: 3.5 },
  { arts: [ARTWORKS[2], ARTWORKS[3], PORTRAIT as any, ARTWORKS[0]], dur: 75, dir: -1, h: 1, tilt: 0 },
  { arts: [ARTWORKS[1], ARTWORKS[5], ARTWORKS[4], ARTWORKS[2]], dur: 110, dir: 1, h: 2, tilt: -3.5 },
];

/**
 * React Bits DriftWall, slowed to a gallery drift: three rows of framed prints
 * gliding in opposite directions with a whisper of perspective. Pauses off-screen.
 */
export default function DriftWall() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      const tracks = root.querySelectorAll<HTMLElement>("[data-drift-track]");
      const tweens: gsap.core.Tween[] = [];
      tracks.forEach((track, i) => {
        const cfg = ROWS[i % ROWS.length];
        const tw = gsap.to(track, {
          xPercent: -50,
          duration: cfg.dur,
          ease: "none",
          repeat: -1,
        });
        if (cfg.dir === -1) tw.progress(0.5);
        tw.timeScale(cfg.dir);
        tweens.push(tw);
      });
      ScrollTrigger.create({
        trigger: root,
        start: "top 100%",
        end: "bottom 0%",
        onToggle: (self) => tweens.forEach((t) => (self.isActive ? t.play() : t.pause())),
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className="relative flex flex-col gap-5 sm:gap-7"
      style={{ perspective: "1300px" }}
      aria-label="Drifting gallery wall of artworks"
    >
      {ROWS.map((row, r) => (
        <div
          key={r}
          className="drift-mask overflow-hidden"
          style={{ transform: `rotateX(${row.tilt}deg)` }}
        >
          <div data-drift-track="" className="drift-row flex w-max items-center gap-5 sm:gap-7">
            {[0, 1, 2, 3].map((rep) =>
              row.arts.map((art, i) => {
                const idx = rep * row.arts.length + i;
                const src = (art as any).src as string;
                const alt = (art as any).alt as string;
                return (
                  <figure
                    key={idx}
                    className={`paper-frame shrink-0 rounded-[4px] p-1.5 transition-all duration-500 hover:-translate-y-2 hover:rotate-0 hover:shadow-lift sm:p-2 ${W[i % W.length]} ${idx % 2 ? "rotate-[1.6deg]" : "rotate-[-1.6deg]"}`}
                  >
                    <div className={`overflow-hidden rounded-[2px] ${H[row.h]}`}>
                      <img
                        src={src}
                        alt={rep === 0 ? alt : ""}
                        aria-hidden={rep !== 0}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </figure>
                );
              })
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
