export const INK = "#243028";
export const PINE = "#1b4332";
export const MOSS = "#2d6a4f";
export const GOLD = "#b08d4a";
export const BARK = "#6b4f3a";
export const DANGER = "#9b3d3d";
export const STONE = "#8a8d86";
export const GRID = "#e4e6e0";
export const FILL = "#e7f6ee";
export const FILL_GOLD = "#f8f1e0";
export const FILL_WARM = "#f3ece3";
export const PAPER = "#fffdf8";
export const SANS = "Manrope, Segoe UI, sans-serif";

export type Pt = { x: number; y: number };
export type V3 = [number, number, number];

export function p(x: number, y: number): Pt {
  return { x, y };
}

export function add(a: Pt, b: Pt): Pt {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function sub(a: Pt, b: Pt): Pt {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function mul(a: Pt, k: number): Pt {
  return { x: a.x * k, y: a.y * k };
}

export function norm(a: Pt): Pt {
  const len = Math.hypot(a.x, a.y) || 1;
  return { x: a.x / len, y: a.y / len };
}

export function polar(cx: number, cy: number, r: number, deg: number): Pt {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) };
}

/** Smaller arc from ray v→a to ray v→b, in screen coordinates. */
export function angleArc(v: Pt, a: Pt, b: Pt, r: number): string {
  const a1 = Math.atan2(a.y - v.y, a.x - v.x);
  const a2 = Math.atan2(b.y - v.y, b.x - v.x);
  let d = a2 - a1;
  while (d <= -Math.PI) d += 2 * Math.PI;
  while (d > Math.PI) d -= 2 * Math.PI;
  const sweep = d > 0 ? 1 : 0;
  const x1 = v.x + r * Math.cos(a1);
  const y1 = v.y + r * Math.sin(a1);
  const x2 = v.x + r * Math.cos(a2);
  const y2 = v.y + r * Math.sin(a2);
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 ${sweep} ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

/** Math-angle arc, y up. sweep follows increasing angle. */
export function mathArc(c: Pt, r: number, deg0: number, deg1: number): string {
  const at = (deg: number) => polar(c.x, c.y, r, deg);
  const a = at(deg0);
  const b = at(deg1);
  let delta = deg1 - deg0;
  while (delta < 0) delta += 360;
  while (delta >= 360) delta -= 360;
  const large = delta > 180 ? 1 : 0;
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 ${large} 0 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

export function rightMark(c: Pt, a: Pt, b: Pt, size = 13): string {
  const ua = norm(sub(a, c));
  const ub = norm(sub(b, c));
  const p1 = add(c, mul(ua, size));
  const p2 = add(p1, mul(ub, size));
  const p3 = add(c, mul(ub, size));
  return `${p1.x.toFixed(2)},${p1.y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)} ${p3.x.toFixed(2)},${p3.y.toFixed(2)}`;
}

export function iso(x: number, y: number, z: number, o: Pt, s: number): Pt {
  return {
    x: o.x + (x - y) * s * Math.cos(Math.PI / 6),
    y: o.y + (x + y) * s * 0.5 - z * s,
  };
}
