import type { ReactNode } from "react";
import {
  PINE,
  SANS,
  PAPER,
  INK,
  type Pt,
  angleArc,
  rightMark,
  sub,
  norm,
  add,
  mul,
} from "./theme";

export function Fig({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="lesson-figure">
      <div role="img" aria-label={caption}>
        {children}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function FigureRow({ children }: { children: ReactNode }) {
  return <div className="figure-row">{children}</div>;
}

export function Tx({
  x,
  y,
  children,
  anchor = "middle",
  size = 15,
  fill = INK,
  italic = false,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "middle" | "start" | "end";
  size?: number;
  fill?: string;
  italic?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline="middle"
      fontFamily={SANS}
      fontSize={size}
      fontWeight={600}
      fontStyle={italic ? "italic" : "normal"}
      fill={fill}
      stroke={PAPER}
      strokeWidth={4}
      paintOrder="stroke"
      strokeLinejoin="round"
    >
      {children}
    </text>
  );
}

export function Arc({
  v,
  a,
  b,
  r,
  color = PINE,
  width = 2,
}: {
  v: Pt;
  a: Pt;
  b: Pt;
  r: number;
  color?: string;
  width?: number;
}) {
  return (
    <path d={angleArc(v, a, b, r)} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />
  );
}

export function Right({ c, a, b, size = 13 }: { c: Pt; a: Pt; b: Pt; size?: number }) {
  return (
    <polyline points={rightMark(c, a, b, size)} fill="none" stroke={PINE} strokeWidth={1.7} strokeLinejoin="round" />
  );
}

export function Ticks({ a, b, n = 1, len = 8 }: { a: Pt; b: Pt; n?: number; len?: number }) {
  const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const dir = norm(sub(b, a));
  const perp = { x: -dir.y, y: dir.x };
  const gap = 5.5;
  const start = -((n - 1) * gap) / 2;
  const lines = [];
  for (let i = 0; i < n; i++) {
    const c = add(mid, mul(dir, start + i * gap));
    const p1 = add(c, mul(perp, len));
    const p2 = add(c, mul(perp, -len));
    lines.push(
      <line
        key={i}
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        stroke={PINE}
        strokeWidth={2}
        strokeLinecap="round"
      />,
    );
  }
  return <g>{lines}</g>;
}
