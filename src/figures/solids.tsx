import type { ReactNode } from "react";
import { INK, PINE, STONE, iso, type Pt, type V3 } from "./theme";
import { Tx } from "./ui";

function project(v: V3, at: Pt, s: number): Pt {
  return iso(v[0], v[1], v[2], at, s);
}

function edgeKey(a: V3, b: V3): string {
  const sa = a.join(",");
  const sb = b.join(",");
  return sa < sb ? `${sa}|${sb}` : `${sb}|${sa}`;
}

export function IsoMesh({
  at,
  s,
  faces = [],
  edges,
  hidden = [],
  polys = [],
  labels = [],
}: {
  at: Pt;
  s: number;
  faces?: { pts: V3[]; fill: string }[];
  edges: [V3, V3][];
  hidden?: string[];
  polys?: { pts: V3[]; fill: string; stroke?: string }[];
  labels?: { at: V3; text: string; dx?: number; dy?: number }[];
}) {
  const hide = new Set(hidden);
  const pathOf = (pts: V3[]) => {
    const scr = pts.map((v) => project(v, at, s));
    return `${scr.map((q, i) => `${i ? "L" : "M"}${q.x.toFixed(1)},${q.y.toFixed(1)}`).join(" ")} Z`;
  };
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {faces.map((f, i) => (
        <path key={`f${i}`} d={pathOf(f.pts)} fill={f.fill} stroke="none" />
      ))}
      {edges.map(([a, b], i) => {
        const A = project(a, at, s);
        const B = project(b, at, s);
        const dashed = hide.has(edgeKey(a, b));
        return (
          <line
            key={`e${i}`}
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            stroke={dashed ? STONE : PINE}
            strokeWidth={dashed ? 1.3 : 1.7}
            strokeDasharray={dashed ? "4 3" : undefined}
          />
        );
      })}
      {polys.map((poly, i) => (
        <path
          key={`p${i}`}
          d={pathOf(poly.pts)}
          fill={poly.fill}
          stroke={poly.stroke ?? "#b08d4a"}
          strokeWidth={2}
        />
      ))}
      {labels.map((lb, i) => {
        const q = project(lb.at, at, s);
        return (
          <Tx key={i} x={q.x + (lb.dx ?? 0)} y={q.y + (lb.dy ?? 0)} size={13} fill={INK}>
            {lb.text}
          </Tx>
        );
      })}
    </g>
  );
}

const CUBE_EDGES: [V3, V3][] = [
  [[0, 0, 0], [1, 0, 0]],
  [[1, 0, 0], [1, 1, 0]],
  [[1, 1, 0], [0, 1, 0]],
  [[0, 1, 0], [0, 0, 0]],
  [[0, 0, 1], [1, 0, 1]],
  [[1, 0, 1], [1, 1, 1]],
  [[1, 1, 1], [0, 1, 1]],
  [[0, 1, 1], [0, 0, 1]],
  [[0, 0, 0], [0, 0, 1]],
  [[1, 0, 0], [1, 0, 1]],
  [[1, 1, 0], [1, 1, 1]],
  [[0, 1, 0], [0, 1, 1]],
];

const CUBE_HIDDEN = ["0,0,0|0,1,0", "0,1,0|1,1,0", "0,1,0|0,1,1"];

export function WireCube({
  at,
  s = 78,
  dim = [1, 1, 1],
  polys,
  labels,
  extraEdges = [],
}: {
  at: Pt;
  s?: number;
  dim?: V3;
  polys?: { pts: V3[]; fill: string; stroke?: string }[];
  labels?: { at: V3; text: string; dx?: number; dy?: number }[];
  extraEdges?: { a: V3; b: V3; color: string; dash?: string }[];
}) {
  const sc = (v: V3): V3 => [v[0] * dim[0], v[1] * dim[1], v[2] * dim[2]];
  const edges = CUBE_EDGES.map(([a, b]) => [sc(a), sc(b)] as [V3, V3]);
  const hidden = CUBE_HIDDEN.map((k) => {
    const [sa, sb] = k.split("|");
    const parse = (t: string): V3 => t.split(",").map(Number) as V3;
    return edgeKey(sc(parse(sa)), sc(parse(sb)));
  });
  const faces = [
    { pts: ([[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]] as V3[]).map(sc), fill: "#f8f1e0" },
    { pts: ([[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]] as V3[]).map(sc), fill: "#d7eee3" },
    { pts: ([[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]] as V3[]).map(sc), fill: "#f4fbf7" },
  ];
  return (
    <g>
      <IsoMesh
        at={at}
        s={s}
        faces={faces}
        edges={edges}
        hidden={hidden}
        polys={polys?.map((poly) => ({ ...poly, pts: poly.pts.map(sc) }))}
        labels={labels?.map((lb) => ({ ...lb, at: sc(lb.at) }))}
      />
      {extraEdges.map((e, i) => {
        const A = project(sc(e.a), at, s);
        const B = project(sc(e.b), at, s);
        return (
          <line
            key={i}
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            stroke={e.color}
            strokeWidth={2.4}
            strokeDasharray={e.dash}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

export function SvgFrame({
  w,
  h,
  children,
}: {
  w: number;
  h: number;
  children: ReactNode;
}) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden>
      <g strokeLinejoin="round" strokeLinecap="round">
        {children}
      </g>
    </svg>
  );
}
