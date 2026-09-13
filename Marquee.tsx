import { useReducedMotion } from "../hooks/useMedia";

const DEFAULT_ITEMS = [
  "Illustration",
  "Character Design",
  "Digital Painting",
  "Visual Storytelling",
  "Environment Art",
  "Concept Development",
];

export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Marquee({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  const reduced = useReducedMotion();
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display text-xl sm:text-2xl font-medium italic tracking-wide text-ink/80 whitespace-nowrap">
            {item}
          </span>
          <Asterisk className="mx-6 h-4 w-4 text-clay shrink-0" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative z-10 -rotate-[1.1deg] scale-x-[1.03] border-y border-ink/15 bg-parch py-3 marquee-hover overflow-hidden">
      <div
        className="flex w-max animate-marquee"
        style={{ "--marquee-dur": reduced ? "0s" : "46s" } as React.CSSProperties}
      >
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
