import { useId } from "react";
import { GRID, INK, MOSS, PAPER, PINE, SANS, STONE } from "./theme";
import { Tx } from "./ui";

export type PlotCurve = {
  f: (x: number) => number;
  from?: number;
  to?: number;
  color?: string;
  width?: number;
  dash?: string;
  samples?: number;
};

export type PlotShade = {
  f: (x: number) => number;
  from: number;
  to: number;
  baseline?: number;
  color?: string;
};

export type PlotPoint = {
  x: number;
  y: number;
  label?: string;
  dx?: number;
  dy?: number;
  open?: boolean;
  color?: string;
};

export type PlotLine = {
  x?: number;
  y?: number;
  color?: string;
  dash?: string;
  label?: string;
};

export type PlotNote = {
  x: number;
  y: number;
  text: string;
  anchor?: "middle" | "start" | "end";
};

type Tick = { at: number; label: string };

function autoTicks(min: number, max: number): Tick[] {
  const span = max - min;
  const step = span <= 8 ? 1 : span <= 14 ? 2 : Math.ceil(span / 6);
  const ticks: Tick[] = [];
  const start = Math.ceil((min + span * 0.04) / step) * step;
  for (let t = start; t < max - span * 0.04 + 1e-9; t += step) {
    const at = Math.round(t * 1000) / 1000;
    if (Math.abs(at) < 1e-8) continue;
    ticks.push({ at, label: Number.isInteger(at) ? String(at) : at.toFixed(1) });
  }
  return ticks;
}

function curvePath(
  f: (x: number) => number,
  from: number,
  to: number,
  X: (x: number) => number,
  Y: (y: number) => number,
  yMin: number,
  yMax: number,
  samples: number,
): string {
  const jump = (yMax - yMin) * 0.5;
  let d = "";
  let prev: number | null = null;
  let pen = false;
  for (let i = 0; i <= samples; i++) {
    const x = from + ((to - from) * i) / samples;
    const y = f(x);
    if (!Number.isFinite(y) || (prev !== null && Math.abs(y - prev) > jump)) {
      pen = false;
      prev = Number.isFinite(y) ? y : null;
      if (!Number.isFinite(y)) continue;
    }
    d += `${pen ? "L" : "M"}${X(x).toFixed(2)},${Y(y).toFixed(2)}`;
    pen = true;
    prev = y;
  }
  return d;
}

function Arrow({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const s = 9;
  const w = 0.42;
  const p1 = `${x2},${y2}`;
  const p2 = `${x2 - s * Math.cos(ang - w)},${y2 - s * Math.sin(ang - w)}`;
  const p3 = `${x2 - s * Math.cos(ang + w)},${y2 - s * Math.sin(ang + w)}`;
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.6} />
      <polygon points={`${p1} ${p2} ${p3}`} fill={color} />
    </>
  );
}

export function FuncPlot({
  xMin,
  xMax,
  yMin,
  yMax,
  curves = [],
  shades = [],
  points = [],
  vLines = [],
  hLines = [],
  notes = [],
  xTicks,
  yTicks,
  width = 440,
  height = 300,
  grid = true,
}: {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  curves?: PlotCurve[];
  shades?: PlotShade[];
  points?: PlotPoint[];
  vLines?: PlotLine[];
  hLines?: PlotLine[];
  notes?: PlotNote[];
  xTicks?: Tick[];
  yTicks?: Tick[];
  width?: number;
  height?: number;
  grid?: boolean;
}) {
  const clip = useId().replace(/:/g, "");
  const padL = 46;
  const padR = 26;
  const padT = 18;
  const padB = 34;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const X = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * plotW;
  const Y = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * plotH;
  const showX = xMin < 0 && xMax > 0;
  const showY = yMin < 0 && yMax > 0;
  const xAxis = showX ? 0 : xMin;
  const yAxis = showY ? 0 : yMin;
  const xt = xTicks ?? autoTicks(xMin, xMax);
  const yt = yTicks ?? autoTicks(yMin, yMax);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden>
      <defs>
        <clipPath id={clip}>
          <rect x={padL} y={padT} width={plotW} height={plotH} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        {grid &&
          xt.map((t) => (
            <line key={`gx${t.at}`} x1={X(t.at)} y1={padT} x2={X(t.at)} y2={padT + plotH} stroke={GRID} />
          ))}
        {grid &&
          yt.map((t) => (
            <line key={`gy${t.at}`} x1={padL} y1={Y(t.at)} x2={padL + plotW} y2={Y(t.at)} stroke={GRID} />
          ))}
        {shades.map((s, i) => {
          const samples = 80;
          const pts: string[] = [];
          for (let k = 0; k <= samples; k++) {
            const x = s.from + ((s.to - s.from) * k) / samples;
            const y = s.f(x);
            if (!Number.isFinite(y)) return null;
            pts.push(`${X(x).toFixed(2)},${Y(y).toFixed(2)}`);
          }
          const base = s.baseline ?? 0;
          const d = `M ${pts[0]} L ${pts.slice(1).join(" L ")} L ${X(s.to).toFixed(2)},${Y(base).toFixed(2)} L ${X(s.from).toFixed(2)},${Y(base).toFixed(2)} Z`;
          return <path key={i} d={d} fill={s.color ?? "rgba(82, 183, 136, 0.32)"} stroke="none" />;
        })}
        {curves.map((c, i) => {
          const d = curvePath(
            c.f,
            c.from ?? xMin,
            c.to ?? xMax,
            X,
            Y,
            yMin,
            yMax,
            c.samples ?? 160,
          );
          if (!d) return null;
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={c.color ?? PINE}
              strokeWidth={c.width ?? 2.3}
              strokeDasharray={c.dash}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          );
        })}
        {vLines.map((ln, i) =>
          ln.x === undefined ? null : (
            <line
              key={`v${i}`}
              x1={X(ln.x)}
              y1={padT}
              x2={X(ln.x)}
              y2={padT + plotH}
              stroke={ln.color ?? STONE}
              strokeWidth={1.4}
              strokeDasharray={ln.dash ?? "5 4"}
            />
          ),
        )}
        {hLines.map((ln, i) =>
          ln.y === undefined ? null : (
            <line
              key={`h${i}`}
              x1={padL}
              y1={Y(ln.y)}
              x2={padL + plotW}
              y2={Y(ln.y)}
              stroke={ln.color ?? STONE}
              strokeWidth={1.4}
              strokeDasharray={ln.dash ?? "5 4"}
            />
          ),
        )}
      </g>
      <Arrow x1={X(xMin)} y1={Y(yAxis)} x2={X(xMax)} y2={Y(yAxis)} color={STONE} />
      <Arrow x1={X(xAxis)} y1={Y(yMin)} x2={X(xAxis)} y2={Y(yMax)} color={STONE} />
      <Tx x={X(xMax) - 2} y={Y(yAxis) - 12} size={13} fill={STONE} italic>
        x
      </Tx>
      <Tx x={X(xAxis) + 12} y={Y(yMax) + 10} size={13} fill={STONE} italic anchor="start">
        y
      </Tx>
      {showX && showY && (
        <Tx x={X(0) - 10} y={Y(0) + 12} size={12} fill={STONE} anchor="end">
          0
        </Tx>
      )}
      {xt.map((t) => (
        <Tx key={`xt${t.label}`} x={X(t.at)} y={Y(yAxis) + 16} size={12} fill={STONE}>
          {t.label}
        </Tx>
      ))}
      {yt.map((t) => (
        <Tx key={`yt${t.label}`} x={X(xAxis) - 8} y={Y(t.at)} size={12} fill={STONE} anchor="end">
          {t.label}
        </Tx>
      ))}
      {points.map((pt, i) => (
        <g key={`p${i}`}>
          <circle
            cx={X(pt.x)}
            cy={Y(pt.y)}
            r={4.5}
            fill={pt.open ? PAPER : (pt.color ?? PINE)}
            stroke={pt.color ?? PINE}
            strokeWidth={2}
          />
          {pt.label && (
            <Tx x={X(pt.x) + (pt.dx ?? 0)} y={Y(pt.y) + (pt.dy ?? -14)} size={13}>
              {pt.label}
            </Tx>
          )}
        </g>
      ))}
      {hLines.map((ln, i) =>
        ln.y !== undefined && ln.label ? (
          <Tx key={`hl${i}`} x={X(xMax) - 8} y={Y(ln.y) - 10} size={13} anchor="end" fill={ln.color ?? STONE}>
            {ln.label}
          </Tx>
        ) : null,
      )}
      {vLines.map((ln, i) =>
        ln.x !== undefined && ln.label ? (
          <Tx key={`vl${i}`} x={X(ln.x) + 6} y={Y(yMax) + 16} size={13} anchor="start" fill={ln.color ?? STONE}>
            {ln.label}
          </Tx>
        ) : null,
      )}
      {notes.map((n, i) => (
        <Tx key={`n${i}`} x={X(n.x)} y={Y(n.y)} size={14} anchor={n.anchor ?? "middle"} fill={MOSS}>
          {n.text}
        </Tx>
      ))}
    </svg>
  );
}

export function NumberLine({
  min,
  max,
  marks = [],
  bands = [],
  signs = [],
  title,
  width = 460,
  height = 118,
}: {
  min: number;
  max: number;
  marks?: { at: number; label: string; filled?: boolean; hole?: boolean }[];
  bands?: { from: number; to: number }[];
  signs?: { at: number; text: string }[];
  title?: string;
  width?: number;
  height?: number;
}) {
  const pad = 28;
  const y = 52;
  const X = (v: number) => pad + ((Math.min(max, Math.max(min, v)) - min) / (max - min)) * (width - 2 * pad);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden>
      {title && (
        <text x={pad} y={18} fontFamily={SANS} fontSize={13} fontWeight={600} fill={INK}>
          {title}
        </text>
      )}
      {bands.map((b, i) => (
        <line
          key={i}
          x1={X(b.from)}
          y1={y}
          x2={X(b.to)}
          y2={y}
          stroke={MOSS}
          strokeWidth={8}
          strokeLinecap="round"
          opacity={0.85}
        />
      ))}
      <line x1={16} y1={y} x2={width - 16} y2={y} stroke={PINE} strokeWidth={1.6} />
      <polygon points={`${width - 10},${y} ${width - 20},${y - 4.5} ${width - 20},${y + 4.5}`} fill={PINE} />
      <polygon points={`10,${y} 20,${y - 4.5} 20,${y + 4.5}`} fill={PINE} />
      {marks.map((m, i) => (
        <g key={i}>
          {m.hole ? (
            <g stroke="#9b3d3d" strokeWidth={2.2} strokeLinecap="round">
              <line x1={X(m.at) - 5} y1={y - 5} x2={X(m.at) + 5} y2={y + 5} />
              <line x1={X(m.at) - 5} y1={y + 5} x2={X(m.at) + 5} y2={y - 5} />
            </g>
          ) : (
            <circle
              cx={X(m.at)}
              cy={y}
              r={6}
              fill={m.filled === false ? PAPER : PINE}
              stroke={PINE}
              strokeWidth={2}
            />
          )}
          <text
            x={X(m.at)}
            y={y + 26}
            textAnchor="middle"
            fontFamily={SANS}
            fontSize={14}
            fontWeight={600}
            fill={INK}
          >
            {m.label}
          </text>
        </g>
      ))}
      {signs.map((s, i) => (
        <text
          key={i}
          x={X(s.at)}
          y={y - 18}
          textAnchor="middle"
          fontFamily={SANS}
          fontSize={18}
          fontWeight={700}
          fill={s.text === "−" ? "#9b3d3d" : MOSS}
        >
          {s.text}
        </text>
      ))}
    </svg>
  );
}
