import { useState } from "react";

export interface FolderItem {
  src: string;
  alt: string;
}

interface FolderProps {
  label: string;
  count: string;
  front: string;
  back: string;
  items: FolderItem[];
  note: string;
}

const ITEM_VARS = [
  { "--r": "-9deg", "--dx": "-40px", transitionDelay: "0.04s" },
  { "--r": "1deg", "--dx": "0px", transitionDelay: "0.1s" },
  { "--r": "10deg", "--dx": "40px", transitionDelay: "0.16s" },
] as const;

/** React Bits Folder, recoloured in warm studio tones — hover (or tap) to open the flap. */
export function Folder({ label, count, front, back, items, note }: FolderProps) {
  const [pinned, setPinned] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={pinned}
        aria-label={`${label} folder — ${count} pieces. Activate to open.`}
        onClick={() => setPinned((p) => !p)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setPinned((p) => !p);
          }
        }}
        data-cursor=""
        className={`folder-stage relative h-[176px] w-[212px] outline-none sm:h-[190px] sm:w-[232px] ${pinned ? "folder-open" : ""}`}
      >
        <div className="folder-back" style={{ background: back }}>
          <div className="folder-tab" style={{ background: back }} />
        </div>

        {items.slice(0, 3).map((item, i) => (
          <div key={i} className="folder-item rounded-[3px]" style={ITEM_VARS[i] as any}>
            <img src={item.src} alt={item.alt} loading="lazy" />
          </div>
        ))}

        <div className="folder-front flex items-end justify-center pb-3" style={{ background: front }}>
          <span className="rounded-full bg-cream/92 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink shadow-sm">
            {label}
          </span>
          <span
            className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full bg-cream/85 text-[10px] font-extrabold text-ink"
            aria-hidden="true"
          >
            {count}
          </span>
        </div>
      </div>
      <p className="max-w-[220px] text-center text-sm leading-snug text-ink-soft">{note}</p>
    </div>
  );
}
