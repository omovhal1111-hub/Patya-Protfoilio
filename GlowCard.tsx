import { useRef, type ReactNode, type CSSProperties } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glow?: string;
  style?: CSSProperties;
}

/** BorderGlow adapted for the warm light palette — a soft ember edge that follows the pointer. */
export default function GlowCard({ children, className = "", glow = "#e9b48f", style }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div
      ref={ref}
      className={`glow-wrap ${className}`}
      style={{ ...style, ["--glow" as any]: glow }}
      onMouseMove={onMove}
    >
      {children}
    </div>
  );
}
