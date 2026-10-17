import type { ReactNode } from "react";
import { IsoMesh, SvgFrame, WireCube } from "./solids";
import {
  BARK,
  DANGER,
  FILL,
  FILL_GOLD,
  FILL_WARM,
  GOLD,
  MOSS,
  PINE,
  STONE,
  mathArc,
  p,
  polar,
  type Pt,
  type V3,
} from "./theme";
import { Arc, Fig, FigureRow, Right, Ticks, Tx } from "./ui";

const PAPER_TRI = "rgba(255,253,248,0.55)";

const line = {
  stroke: PINE,
  strokeWidth: 2,
  fill: "none" as const,
};

function Board({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  return <SvgFrame w={w} h={h}>{children}</SvgFrame>;
}

function ParallelLines() {
  const P = p(133, 72);
  const Q = p(265, 188);
  const rightP = p(210, 72);
  const leftP = p(50, 72);
  const downP = p(300, 236);
  const rightQ = p(360, 188);
  const upQ = p(100, 30);
  return (
    <Board w={420} h={270}>
      <line x1={28} y1={72} x2={400} y2={72} {...line} />
      <line x1={28} y1={188} x2={400} y2={188} {...line} />
      <line x1={78} y1={24} x2={320} y2={236} stroke={BARK} strokeWidth={2} />
      <Arc v={P} a={rightP} b={downP} r={26} color={GOLD} />
      <Arc v={Q} a={rightQ} b={p(320, 236)} r={26} color={GOLD} />
      <Arc v={P} a={leftP} b={downP} r={40} color={MOSS} />
      <Arc v={P} a={leftP} b={downP} r={48} color={MOSS} />
      <Arc v={Q} a={rightQ} b={upQ} r={40} color={MOSS} />
      <Arc v={Q} a={rightQ} b={upQ} r={48} color={MOSS} />
      <Tx x={18} y={72} anchor="end" italic>a</Tx>
      <Tx x={18} y={188} anchor="end" italic>b</Tx>
      <Tx x={86} y={48} size={14} fill={BARK}>секущая</Tx>
      <Tx x={250} y={20} size={14} fill={MOSS}>a ∥ b</Tx>
    </Board>
  );
}

function AngleSum() {
  const A = p(169, 48);
  const B = p(48, 196);
  const C = p(250, 196);
  const D = p(340, 196);
  return (
    <Board w={380} h={240}>
      <polygon points="169,48 48,196 250,196" fill={FILL} stroke={PINE} strokeWidth={2} />
      <line x1={250} y1={196} x2={340} y2={196} stroke={PINE} strokeWidth={2} />
      <Arc v={B} a={C} b={A} r={32} color={GOLD} />
      <Arc v={A} a={B} b={C} r={28} color={MOSS} />
      <Arc v={C} a={B} b={A} r={32} color={BARK} />
      <Arc v={C} a={D} b={A} r={46} color={DANGER} />
      <Tx x={78} y={178} size={14} fill={GOLD}>50°</Tx>
      <Tx x={169} y={86} size={14} fill={MOSS}>70°</Tx>
      <Tx x={214} y={178} size={14} fill={BARK}>60°</Tx>
      <Tx x={292} y={168} size={14} fill={DANGER}>120°</Tx>
      <Tx x={48} y={214}>B</Tx>
      <Tx x={250} y={214}>C</Tx>
      <Tx x={169} y={34}>A</Tx>
      <Tx x={340} y={214}>D</Tx>
    </Board>
  );
}

function Congruence() {
  const t = (dx: number, dy: number) => ({
    A: p(36 + dx, 150 + dy),
    B: p(128 + dx, 150 + dy),
    C: p(62 + dx, 48 + dy),
  });
  const u = t(0, 0);
  const v = t(175, 8);
  return (
    <Board w={420} h={210}>
      {[u, v].map((tr, i) => (
        <g key={i}>
          <polygon
            points={`${tr.A.x},${tr.A.y} ${tr.B.x},${tr.B.y} ${tr.C.x},${tr.C.y}`}
            fill={i ? FILL_GOLD : FILL}
            stroke={PINE}
            strokeWidth={2}
          />
          <Ticks a={tr.A} b={tr.B} n={1} />
          <Ticks a={tr.A} b={tr.C} n={2} />
          <Arc v={tr.A} a={tr.B} b={tr.C} r={22} color={GOLD} />
        </g>
      ))}
      <Tx x={70} y={196}>ABC</Tx>
      <Tx x={250} y={196}>A₁B₁C₁</Tx>
    </Board>
  );
}

function Midline() {
  const A = p(180, 36);
  const B = p(36, 196);
  const C = p(324, 196);
  const M = p(108, 116);
  const N = p(252, 116);
  return (
    <Board w={380} h={230}>
      <polygon points="180,36 36,196 324,196" fill={FILL} stroke={PINE} strokeWidth={2} />
      <line x1={M.x} y1={M.y} x2={N.x} y2={N.y} stroke={GOLD} strokeWidth={2.4} />
      <circle cx={M.x} cy={M.y} r={3.5} fill={GOLD} />
      <circle cx={N.x} cy={N.y} r={3.5} fill={GOLD} />
      <Tx x={A.x} y={22}>A</Tx>
      <Tx x={B.x} y={214}>B</Tx>
      <Tx x={C.x} y={214}>C</Tx>
      <Tx x={M.x - 16} y={M.y}>M</Tx>
      <Tx x={N.x + 16} y={N.y}>N</Tx>
      <Tx x={180} y={104} size={13} fill={GOLD}>MN = BC / 2</Tx>
    </Board>
  );
}

function Inequality() {
  const okA = p(40, 168);
  const okB = p(170, 168);
  const okC = p(86.8, 105.6);
  const badA = p(250, 168);
  const badB = p(406, 168);
  return (
    <Board w={460} h={220}>
      <polygon points={`${okA.x},${okA.y} ${okB.x},${okB.y} ${okC.x},${okC.y}`} fill={FILL} stroke={PINE} strokeWidth={2} />
      <Tx x={62} y={128} size={14}>3</Tx>
      <Tx x={140} y={128} size={14}>4</Tx>
      <Tx x={105} y={186} size={14}>5</Tx>
      <Tx x={105} y={36} size={14} fill={MOSS}>3 + 4 &gt; 5</Tx>
      <path d={mathArc(badA, 52, -55, 55)} fill="none" stroke={PINE} strokeWidth={2} />
      <path d={mathArc(badB, 78, 125, 235)} fill="none" stroke={GOLD} strokeWidth={2} />
      <line x1={badA.x} y1={badA.y} x2={badB.x} y2={badB.y} stroke={PINE} strokeWidth={2} />
      <Tx x={268} y={140} size={14}>2</Tx>
      <Tx x={360} y={120} size={14} fill={GOLD}>3</Tx>
      <Tx x={328} y={186} size={14}>6</Tx>
      <Tx x={328} y={36} size={14} fill={DANGER}>2 + 3 &lt; 6</Tx>
    </Board>
  );
}

function Pythagoras() {
  const C = p(168, 210);
  const A = p(168, 98);
  const B = p(252, 210);
  const left = [p(56, 98), p(56, 210), C, A];
  const bottom = [C, B, p(252, 294), p(168, 294)];
  const perp = p(112, -84);
  const hyp = [A, B, p(B.x + perp.x, B.y + perp.y), p(A.x + perp.x, A.y + perp.y)];
  const poly = (pts: Pt[], fill: string) => (
    <polygon points={pts.map((q) => `${q.x},${q.y}`).join(" ")} fill={fill} stroke={PINE} strokeWidth={1.7} />
  );
  return (
    <Board w={420} h={330}>
      {poly(left, FILL)}
      {poly(bottom, FILL_GOLD)}
      {poly(hyp, FILL_WARM)}
      <polygon points="168,98 168,210 252,210" fill={PAPER_TRI} stroke={PINE} strokeWidth={2} />
      <Right c={C} a={A} b={B} />
      <Tx x={104} y={154} italic>b²</Tx>
      <Tx x={210} y={252} italic>a²</Tx>
      <Tx x={268} y={118} italic>c²</Tx>
      <Tx x={156} y={160} size={14} italic>b</Tx>
      <Tx x={210} y={198} size={14} italic>a</Tx>
      <Tx x={196} y={146} size={14} italic>c</Tx>
    </Board>
  );
}

function Thales() {
  const V = p(36, 214);
  const cuts = [100, 168, 236, 304];
  const topAt = (x: number) => {
    const t = (x - 36) / (390 - 36);
    return 214 + t * (36 - 214);
  };
  return (
    <Board w={420} h={250}>
      <line x1={V.x} y1={V.y} x2={390} y2={214} stroke={PINE} strokeWidth={2} />
      <line x1={V.x} y1={V.y} x2={390} y2={36} stroke={PINE} strokeWidth={2} />
      {cuts.map((x, i) => (
        <g key={x}>
          <line x1={x} y1={214} x2={x} y2={topAt(x)} stroke={GOLD} strokeWidth={2} />
          {i > 0 && <Ticks a={p(cuts[i - 1], 214)} b={p(x, 214)} n={1} />}
        </g>
      ))}
      <Tx x={28} y={214} anchor="end">V</Tx>
      <Tx x={200} y={28} size={14} fill={GOLD}>параллельные прямые</Tx>
    </Board>
  );
}

function Similar() {
  const draw = (ox: number, oy: number, k: number) => {
    const A = p(ox, oy);
    const B = p(ox + 48 * k, oy);
    const C = p(ox, oy - 64 * k);
    return { A, B, C };
  };
  const s = draw(36, 200, 1);
  const g = draw(200, 210, 2);
  return (
    <Board w={460} h={250}>
      {[s, g].map((t, i) => (
        <g key={i}>
          <polygon
            points={`${t.A.x},${t.A.y} ${t.B.x},${t.B.y} ${t.C.x},${t.C.y}`}
            fill={i ? FILL_GOLD : FILL}
            stroke={PINE}
            strokeWidth={2}
          />
          <Right c={t.A} a={t.C} b={t.B} size={12} />
          <Arc v={t.B} a={t.A} b={t.C} r={18 + i * 4} color={GOLD} />
        </g>
      ))}
      <Tx x={28} y={168} size={14}>4</Tx>
      <Tx x={60} y={214} size={14}>3</Tx>
      <Tx x={70} y={150} size={14}>5</Tx>
      <Tx x={184} y={140} size={14}>8</Tx>
      <Tx x={248} y={228} size={14}>6</Tx>
      <Tx x={280} y={120} size={14}>10</Tx>
      <Tx x={360} y={36} size={14} fill={MOSS}>k = 2</Tx>
    </Board>
  );
}

function ParallelogramFig() {
  const A = p(50, 168);
  const B = p(210, 168);
  const D = p(110, 52);
  const C = p(270, 52);
  return (
    <Board w={340} h={210}>
      <polygon points="50,168 210,168 270,52 110,52" fill={FILL} stroke={PINE} strokeWidth={2} />
      <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke={GOLD} strokeWidth={1.5} />
      <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke={GOLD} strokeWidth={1.5} />
      <circle cx={160} cy={110} r={3.5} fill={GOLD} />
      <Ticks a={A} b={B} n={1} />
      <Ticks a={D} b={C} n={1} />
      <Ticks a={A} b={D} n={2} />
      <Ticks a={B} b={C} n={2} />
      <Tx x={A.x - 12} y={A.y + 14}>A</Tx>
      <Tx x={B.x + 12} y={B.y + 14}>B</Tx>
      <Tx x={C.x + 12} y={C.y - 8}>C</Tx>
      <Tx x={D.x - 12} y={D.y - 8}>D</Tx>
      <Tx x={172} y={124} size={13} fill={GOLD}>O</Tx>
    </Board>
  );
}

function QuadTypes() {
  return (
    <Board w={680} h={200}>
      <polygon points="24,46 128,46 128,140 24,140" fill={FILL} stroke={PINE} strokeWidth={2} />
      <Right c={p(24, 140)} a={p(24, 46)} b={p(128, 140)} size={12} />
      <Tx x={76} y={172} size={14}>прямоугольник</Tx>

      <polygon points="250,40 330,92 250,144 170,92" fill={FILL_GOLD} stroke={PINE} strokeWidth={2} />
      <line x1={170} y1={92} x2={330} y2={92} stroke={GOLD} strokeWidth={1.4} />
      <line x1={250} y1={40} x2={250} y2={144} stroke={GOLD} strokeWidth={1.4} />
      <Right c={p(250, 92)} a={p(300, 92)} b={p(250, 50)} size={10} />
      <Ticks a={p(250, 40)} b={p(330, 92)} n={1} />
      <Tx x={250} y={172} size={14}>ромб</Tx>

      <polygon points="400,48 492,48 492,140 400,140" fill={FILL} stroke={PINE} strokeWidth={2} />
      <Ticks a={p(400, 48)} b={p(492, 48)} n={1} />
      <Right c={p(400, 140)} a={p(400, 48)} b={p(492, 140)} size={12} />
      <Tx x={446} y={172} size={14}>квадрат</Tx>

      <polygon points="540,140 660,140 630,52 575,52" fill={FILL_WARM} stroke={PINE} strokeWidth={2} />
      <line x1={590} y1={52} x2={590} y2={140} stroke={GOLD} strokeWidth={1.4} strokeDasharray="4 3" />
      <Tx x={592} y={100} size={13} fill={GOLD} anchor="start">h</Tx>
      <Tx x={600} y={172} size={14}>трапеция</Tx>
    </Board>
  );
}

function CircleAngles() {
  const O = p(150, 128);
  const r = 86;
  const A = polar(O.x, O.y, r, 210);
  const B = polar(O.x, O.y, r, 330);
  const C = polar(O.x, O.y, r, 80);
  const O2 = p(430, 128);
  const A2 = p(350, 128);
  const B2 = p(510, 128);
  const C2 = polar(O2.x, O2.y, 80, 110);
  return (
    <Board w={620} h={270}>
      <circle cx={O.x} cy={O.y} r={r} fill={FILL} stroke={PINE} strokeWidth={2} />
      <path d={mathArc(O, r, 210, 330)} fill="none" stroke={GOLD} strokeWidth={4} />
      <line x1={O.x} y1={O.y} x2={A.x} y2={A.y} stroke={GOLD} strokeWidth={1.6} />
      <line x1={O.x} y1={O.y} x2={B.x} y2={B.y} stroke={GOLD} strokeWidth={1.6} />
      <line x1={C.x} y1={C.y} x2={A.x} y2={A.y} stroke={PINE} strokeWidth={2} />
      <line x1={C.x} y1={C.y} x2={B.x} y2={B.y} stroke={PINE} strokeWidth={2} />
      <Arc v={O} a={A} b={B} r={28} color={GOLD} />
      <Arc v={C} a={A} b={B} r={22} color={PINE} />
      <Tx x={O.x + 8} y={O.y + 22} size={13} fill={GOLD}>120°</Tx>
      <Tx x={C.x} y={C.y + 36} size={13}>60°</Tx>
      <Tx x={O.x} y={O.y - 8} size={13}>O</Tx>

      <circle cx={O2.x} cy={O2.y} r={80} fill="none" stroke={PINE} strokeWidth={2} />
      <line x1={A2.x} y1={A2.y} x2={B2.x} y2={B2.y} stroke={GOLD} strokeWidth={2} />
      <line x1={C2.x} y1={C2.y} x2={A2.x} y2={A2.y} stroke={PINE} strokeWidth={2} />
      <line x1={C2.x} y1={C2.y} x2={B2.x} y2={B2.y} stroke={PINE} strokeWidth={2} />
      <Right c={C2} a={A2} b={B2} size={14} />
      <Tx x={O2.x} y={248} size={14}>угол, опирающийся на диаметр</Tx>
    </Board>
  );
}

function TangentFig() {
  const O = p(150, 140);
  const r = 78;
  const P = p(310, 46);
  const dx = P.x - O.x;
  const dy = P.y - O.y;
  const dist = Math.hypot(dx, dy);
  const ang = Math.acos(r / dist);
  const base = Math.atan2(dy, dx);
  const touch = (sign: number): Pt => ({
    x: O.x + r * Math.cos(base + sign * ang),
    y: O.y + r * Math.sin(base + sign * ang),
  });
  const T1 = touch(1);
  const T2 = touch(-1);
  return (
    <Board w={420} h={270}>
      <circle cx={O.x} cy={O.y} r={r} fill={FILL} stroke={PINE} strokeWidth={2} />
      <line x1={O.x} y1={O.y} x2={T1.x} y2={T1.y} stroke={GOLD} strokeWidth={1.7} />
      <line x1={P.x} y1={P.y} x2={T1.x} y2={T1.y} stroke={PINE} strokeWidth={2} />
      <line x1={P.x} y1={P.y} x2={T2.x} y2={T2.y} stroke={PINE} strokeWidth={2} />
      <Right c={T1} a={O} b={P} size={14} />
      <Ticks a={P} b={T1} n={1} />
      <Ticks a={P} b={T2} n={1} />
      <circle cx={O.x} cy={O.y} r={3} fill={PINE} />
      <Tx x={O.x - 14} y={O.y + 16}>O</Tx>
      <Tx x={P.x + 12} y={P.y}>P</Tx>
      <Tx x={T1.x + 8} y={T1.y + 14} size={13}>T₁</Tx>
      <Tx x={T2.x - 8} y={T2.y - 12} size={13}>T₂</Tx>
    </Board>
  );
}

function Incircle() {
  const I = p(98, 172);
  return (
    <Board w={240} h={240}>
      <polygon points="70,88 154,200 70,200" fill={FILL} stroke={PINE} strokeWidth={2} />
      <circle cx={I.x} cy={I.y} r={28} fill={FILL_GOLD} stroke={GOLD} strokeWidth={2} />
      <line x1={I.x} y1={I.y} x2={I.x} y2={200} stroke={GOLD} strokeWidth={1.3} />
      <Right c={p(I.x, 200)} a={p(I.x + 20, 200)} b={I} size={10} />
      <Tx x={I.x + 10} y={190} size={13} fill={GOLD} anchor="start">r</Tx>
    </Board>
  );
}

function Circumcircle() {
  const A = p(70, 70);
  const B = p(190, 190);
  const C = p(70, 190);
  const O = p(130, 130);
  return (
    <Board w={270} h={250}>
      <circle cx={O.x} cy={O.y} r={85} fill={FILL} stroke={GOLD} strokeWidth={2} />
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="none" stroke={PINE} strokeWidth={2} />
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={GOLD} strokeWidth={2.2} />
      <circle cx={O.x} cy={O.y} r={3} fill={GOLD} />
      <line x1={O.x} y1={O.y} x2={C.x} y2={C.y} stroke={GOLD} strokeWidth={1.2} strokeDasharray="3 3" />
      <Tx x={O.x + 8} y={O.y - 8} size={13} fill={GOLD}>O</Tx>
      <Tx x={120} y={70} size={13}>гипотенуза — диаметр</Tx>
      <Tx x={108} y={214} size={13}>R = c / 2</Tx>
    </Board>
  );
}

function AreasOverview() {
  return (
    <Board w={680} h={180}>
      <rect x={24} y={28} width={110} height={78} fill={FILL} stroke={PINE} strokeWidth={2} />
      <Tx x={79} y={70} italic>ab</Tx>
      <Tx x={79} y={140} size={13}>прямоугольник</Tx>

      <polygon points="180,106 300,106 340,36 220,36" fill={FILL_GOLD} stroke={PINE} strokeWidth={2} />
      <line x1={250} y1={36} x2={250} y2={106} stroke={GOLD} strokeDasharray="4 3" />
      <Tx x={258} y={74} size={13} fill={GOLD} anchor="start">h</Tx>
      <Tx x={260} y={140} size={13}>S = ah</Tx>

      <polygon points="400,110 520,110 450,36" fill={FILL} stroke={PINE} strokeWidth={2} />
      <line x1={450} y1={36} x2={450} y2={110} stroke={GOLD} strokeDasharray="4 3" />
      <Tx x={458} y={78} size={13} fill={GOLD} anchor="start">h</Tx>
      <Tx x={460} y={140} size={13}>S = ah / 2</Tx>

      <circle cx={610} cy={74} r={40} fill={FILL_WARM} stroke={PINE} strokeWidth={2} />
      <line x1={610} y1={74} x2={650} y2={74} stroke={GOLD} strokeWidth={1.6} />
      <Tx x={630} y={66} size={13} fill={GOLD}>r</Tx>
      <Tx x={610} y={140} size={13}>S = πr²</Tx>
    </Board>
  );
}

function TriangleAreas() {
  return (
    <Board w={560} h={220}>
      <polygon points="40,180 200,180 110,40" fill={FILL} stroke={PINE} strokeWidth={2} />
      <line x1={110} y1={40} x2={110} y2={180} stroke={GOLD} strokeDasharray="4 3" />
      <Right c={p(110, 180)} a={p(150, 180)} b={p(110, 140)} size={12} />
      <Tx x={96} y={110} size={14} italic>h</Tx>
      <Tx x={120} y={198} size={14} italic>a</Tx>
      <Tx x={120} y={24} size={13}>S = ah / 2</Tx>

      <polygon points="300,180 500,180 390,48" fill={FILL_GOLD} stroke={PINE} strokeWidth={2} />
      <Arc v={p(390, 48)} a={p(300, 180)} b={p(500, 180)} r={28} color={GOLD} />
      <Tx x={390} y={92} size={14} fill={GOLD}>C</Tx>
      <Tx x={330} y={100} size={14} italic>b</Tx>
      <Tx x={460} y={100} size={14} italic>a</Tx>
      <Tx x={400} y={208} size={13}>S = ab sin C / 2</Tx>
    </Board>
  );
}

function QuadAreas() {
  return (
    <Board w={660} h={200}>
      <polygon points="30,140 170,140 210,46 70,46" fill={FILL} stroke={PINE} strokeWidth={2} />
      <line x1={120} y1={46} x2={120} y2={140} stroke={GOLD} strokeDasharray="4 3" />
      <Tx x={128} y={96} size={13} fill={GOLD} anchor="start">h</Tx>
      <Tx x={120} y={172} size={13}>S = ah</Tx>

      <polygon points="330,40 400,100 330,160 260,100" fill={FILL_GOLD} stroke={PINE} strokeWidth={2} />
      <line x1={260} y1={100} x2={400} y2={100} stroke={BARK} strokeWidth={1.6} />
      <line x1={330} y1={40} x2={330} y2={160} stroke={GOLD} strokeWidth={1.6} />
      <Tx x={360} y={88} size={13} italic>d₁</Tx>
      <Tx x={314} y={110} size={13} italic>d₂</Tx>
      <Tx x={330} y={186} size={13}>S = d₁d₂ / 2</Tx>

      <polygon points="470,150 630,150 600,52 510,52" fill={FILL_WARM} stroke={PINE} strokeWidth={2} />
      <line x1={540} y1={52} x2={540} y2={150} stroke={GOLD} strokeDasharray="4 3" />
      <Tx x={500} y={40} size={13} italic>b</Tx>
      <Tx x={550} y={168} size={13} italic>a</Tx>
      <Tx x={548} y={100} size={13} fill={GOLD} anchor="start">h</Tx>
    </Board>
  );
}

function VectorsFig() {
  const O = p(48, 196);
  const sc = 32;
  const A = p(O.x + 3 * sc, O.y - 1 * sc);
  const B = p(O.x + 1 * sc, O.y - 2 * sc);
  const S = p(O.x + 4 * sc, O.y - 3 * sc);
  return (
    <Board w={280} h={240}>
      <line x1={24} y1={O.y} x2={250} y2={O.y} stroke={STONE} strokeWidth={1.3} />
      <line x1={O.x} y1={220} x2={O.x} y2={20} stroke={STONE} strokeWidth={1.3} />
      <line x1={A.x} y1={A.y} x2={S.x} y2={S.y} stroke={GOLD} strokeWidth={1.5} strokeDasharray="5 3" />
      <line x1={B.x} y1={B.y} x2={S.x} y2={S.y} stroke={PINE} strokeWidth={1.5} strokeDasharray="5 3" />
      <Arrow from={O} to={A} color={PINE} />
      <Arrow from={O} to={B} color={GOLD} />
      <Arrow from={O} to={S} color={BARK} />
      <Tx x={A.x + 8} y={A.y} size={14} italic fill={PINE}>a</Tx>
      <Tx x={B.x - 14} y={B.y} size={14} italic fill={GOLD}>b</Tx>
      <Tx x={S.x + 8} y={S.y} size={14} italic fill={BARK}>a + b</Tx>
      <Tx x={150} y={20} size={13}>правило параллелограмма</Tx>
    </Board>
  );
}

function Arrow({ from, to, color }: { from: Pt; to: Pt; color: string }) {
  const ang = Math.atan2(to.y - from.y, to.x - from.x);
  const s = 10;
  const wing = 0.4;
  return (
    <g>
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={color} strokeWidth={2.2} />
      <polygon
        points={`${to.x},${to.y} ${to.x - s * Math.cos(ang - wing)},${to.y - s * Math.sin(ang - wing)} ${to.x - s * Math.cos(ang + wing)},${to.y - s * Math.sin(ang + wing)}`}
        fill={color}
      />
    </g>
  );
}

function CoordinatesFig() {
  const O = p(46, 200);
  const u = 36;
  const X = (x: number, y: number) => p(O.x + x * u, O.y - y * u);
  const A = X(1, 1);
  const B = X(4, 3);
  const M = X(2.5, 2);
  const foot = X(4, 1);
  return (
    <Board w={280} h={250}>
      <line x1={20} y1={O.y} x2={250} y2={O.y} stroke={STONE} />
      <line x1={O.x} y1={230} x2={O.x} y2={24} stroke={STONE} />
      <line x1={A.x} y1={A.y} x2={foot.x} y2={foot.y} stroke={GOLD} strokeDasharray="4 3" />
      <line x1={foot.x} y1={foot.y} x2={B.x} y2={B.y} stroke={GOLD} strokeDasharray="4 3" />
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={PINE} strokeWidth={2} />
      <Right c={foot} a={A} b={B} size={12} />
      <circle cx={A.x} cy={A.y} r={4} fill={PINE} />
      <circle cx={B.x} cy={B.y} r={4} fill={PINE} />
      <circle cx={M.x} cy={M.y} r={4} fill={GOLD} />
      <Tx x={A.x - 28} y={A.y + 14} size={13}>A(1; 1)</Tx>
      <Tx x={B.x + 8} y={B.y - 8} size={13} anchor="start">B(4; 3)</Tx>
      <Tx x={M.x} y={M.y + 18} size={13} fill={GOLD}>M</Tx>
      <Tx x={120} y={A.y + 16} size={13} fill={GOLD}>Δx</Tx>
      <Tx x={foot.x + 16} y={150} size={13} fill={GOLD}>Δy</Tx>
    </Board>
  );
}

function SpaceLines() {
  return (
    <Board w={360} h={280}>
      <WireCube
        at={p(180, 200)}
        s={92}
        extraEdges={[
          { a: [0, 0, 1], b: [1, 0, 1], color: MOSS },
          { a: [0, 1, 1], b: [1, 1, 1], color: MOSS },
          { a: [1, 0, 0], b: [1, 0, 1], color: GOLD },
          { a: [0, 0, 0], b: [1, 0, 0], color: GOLD },
          { a: [0, 0, 0], b: [0, 0, 1], color: DANGER },
          { a: [1, 0, 0], b: [1, 1, 0], color: DANGER },
          { a: [1, 0, 1], b: [0, 1, 1], color: BARK, dash: "6 4" },
          { a: [1, 0, 0], b: [0, 1, 1], color: "#6b3fa0" },
        ]}
        labels={[
          { at: [0.5, 0, 1], text: "a", dy: -14 },
          { at: [0.5, 0.5, 1], text: "a√2", dy: -16 },
          { at: [0.62, 0.38, 0.38], text: "a√3", dx: 8, dy: 4 },
        ]}
      />
    </Board>
  );
}

function Polyhedra() {
  const prismEdges: [V3, V3][] = [
    [[0, 0, 0], [1.25, 0, 0]],
    [[1.25, 0, 0], [0.4, 1, 0]],
    [[0.4, 1, 0], [0, 0, 0]],
    [[0, 0, 1], [1.25, 0, 1]],
    [[1.25, 0, 1], [0.4, 1, 1]],
    [[0.4, 1, 1], [0, 0, 1]],
    [[0, 0, 0], [0, 0, 1]],
    [[1.25, 0, 0], [1.25, 0, 1]],
    [[0.4, 1, 0], [0.4, 1, 1]],
  ];
  const base: V3[] = [
    [0, 0, 0],
    [1.2, 0, 0],
    [1.2, 1, 0],
    [0, 1, 0],
  ];
  const apex: V3 = [0.55, 0.38, 1.2];
  const pyr: [V3, V3][] = [
    [base[0], base[1]],
    [base[1], base[2]],
    [base[2], base[3]],
    [base[3], base[0]],
    [base[0], apex],
    [base[1], apex],
    [base[2], apex],
    [base[3], apex],
  ];
  return (
    <Board w={680} h={230}>
      <WireCube at={p(90, 170)} s={70} dim={[1.35, 0.9, 0.75]} />
      <Tx x={90} y={210} size={14}>V = abc</Tx>
      <IsoMesh
        at={p(310, 175)}
        s={72}
        faces={[
          { pts: [[0, 0, 0], [1.25, 0, 0], [1.25, 0, 1], [0, 0, 1]], fill: "#f8f1e0" },
          { pts: [[0, 0, 1], [1.25, 0, 1], [0.4, 1, 1]], fill: "#f4fbf7" },
        ]}
        edges={prismEdges}
        hidden={["0,0,0|0.4,1,0", "0.4,1,0|0.4,1,1"]}
      />
      <Tx x={330} y={210} size={14}>V = S·h</Tx>
      <IsoMesh
        at={p(520, 180)}
        s={70}
        faces={[{ pts: [base[0], base[1], apex], fill: "#f8f1e0" }]}
        edges={pyr}
        hidden={["0,0,0|0,1,0", "0,1,0|1.2,1,0"]}
      />
      <Tx x={545} y={210} size={14}>V = S·h / 3</Tx>
    </Board>
  );
}

function Sections() {
  const tri: V3[] = [
    [1, 0, 0.35],
    [1, 0.55, 1],
    [0.4, 0, 1],
  ];
  const hex: V3[] = [
    [1, 0.5, 0],
    [0.5, 1, 0],
    [0, 1, 0.5],
    [0, 0.5, 1],
    [0.5, 0, 1],
    [1, 0, 0.5],
  ];
  return (
    <Board w={520} h={270}>
      <WireCube at={p(120, 168)} s={78} polys={[{ pts: tri, fill: "rgba(176,141,74,0.45)", stroke: GOLD }]} />
      <Tx x={120} y={252} size={14}>треугольник</Tx>
      <WireCube at={p(360, 168)} s={78} polys={[{ pts: hex, fill: "rgba(82,183,136,0.4)", stroke: MOSS }]} />
      <Tx x={360} y={252} size={14}>шестиугольник</Tx>
    </Board>
  );
}

function SphereSection() {
  const O = p(160, 145);
  const R = 96;
  const d = 38;
  const half = Math.sqrt(R * R - d * d);
  const T = polar(O.x, O.y, R, -40);
  const tang = polar(T.x, T.y, 46, 50);
  return (
    <Board w={380} h={280}>
      <circle cx={O.x} cy={O.y} r={R} fill={FILL} stroke={PINE} strokeWidth={2} />
      <line x1={O.x - half} y1={O.y - d} x2={O.x + half} y2={O.y - d} stroke={GOLD} strokeWidth={2} />
      <line x1={O.x} y1={O.y} x2={O.x} y2={O.y - d} stroke={BARK} strokeWidth={1.6} />
      <line x1={O.x} y1={O.y - d} x2={O.x + half} y2={O.y - d} stroke={MOSS} strokeWidth={2} />
      <line x1={O.x} y1={O.y} x2={polar(O.x, O.y, R, 215).x} y2={polar(O.x, O.y, R, 215).y} stroke={PINE} strokeWidth={1.4} strokeDasharray="4 3" />
      <Right c={p(O.x, O.y - d)} a={p(O.x + 40, O.y - d)} b={O} size={11} />
      <circle cx={O.x} cy={O.y} r={3.5} fill={PINE} />
      <Tx x={O.x - 14} y={O.y + 16}>O</Tx>
      <Tx x={O.x + 10} y={O.y - d / 2} size={14} fill={BARK} anchor="start">d</Tx>
      <Tx x={O.x + half / 2} y={O.y - d - 14} size={14} fill={MOSS}>r</Tx>
      <Tx x={polar(O.x, O.y, R * 0.55, 215).x} y={polar(O.x, O.y, R * 0.55, 215).y} size={14}>R</Tx>
      <line x1={tang.x} y1={tang.y} x2={polar(T.x, T.y, 46, 50 + 180).x} y2={polar(T.x, T.y, 46, 50 + 180).y} stroke={PINE} strokeWidth={1.7} />
      <Right c={T} a={O} b={tang} size={12} />
    </Board>
  );
}

function Revolution() {
  return (
    <Board w={680} h={210}>
      <line x1={30} y1={22} x2={30} y2={168} stroke={STONE} strokeDasharray="3 3" />
      <rect x={30} y={40} width={46} height={108} fill={FILL_GOLD} stroke={PINE} strokeWidth={1.6} />
      <ellipse cx={148} cy={148} rx={38} ry={11} fill={FILL_GOLD} stroke={PINE} strokeWidth={1.5} />
      <path d="M110 46 V148" stroke={PINE} strokeWidth={1.5} />
      <path d="M186 46 V148" stroke={PINE} strokeWidth={1.5} />
      <ellipse cx={148} cy={46} rx={38} ry={11} fill={FILL} stroke={PINE} strokeWidth={1.5} />
      <Tx x={148} y={192} size={14}>цилиндр</Tx>

      <line x1={292} y1={22} x2={292} y2={168} stroke={STONE} strokeDasharray="3 3" />
      <polygon points="248,150 292,42 292,150" fill={FILL_GOLD} stroke={PINE} strokeWidth={1.6} />
      <path d="M358 150 L400 36 L442 150" fill="none" stroke={PINE} strokeWidth={1.5} />
      <ellipse cx={400} cy={150} rx={42} ry={12} fill={FILL_GOLD} stroke={PINE} strokeWidth={1.5} />
      <Tx x={400} y={192} size={14}>конус</Tx>

      <path d="M470 150 A 42 42 0 0 1 554 150 Z" fill={FILL} stroke={PINE} strokeWidth={1.6} />
      <line x1={470} y1={150} x2={560} y2={150} stroke={STONE} strokeDasharray="3 3" />
      <circle cx={620} cy={96} r={44} fill={FILL} stroke={PINE} strokeWidth={1.7} />
      <Tx x={620} y={192} size={14}>шар</Tx>
    </Board>
  );
}

export const geometryFigures: Record<string, ReactNode> = {
  "school-geometry-01": (
    <Fig caption="Прямые a и b параллельны. Золотые дуги — соответственные углы, двойные зелёные — накрест лежащие внутренние. При параллельных прямых те и другие равны; если равна одна такая пара, прямые параллельны.">
      <ParallelLines />
    </Fig>
  ),
  "school-geometry-02": (
    <FigureRow>
      <Fig caption="Сумма углов 50° + 60° + 70° = 180°. Внешний угол при C равен 120° — это сумма двух внутренних, с ним не смежных (50° и 70°), и смежный внутреннему 60°.">
        <AngleSum />
      </Fig>
      <Fig caption="Признак по двум сторонам и углу между ними: одинаковые засечки и одинаковая дуга. Треугольники ABC и A₁B₁C₁ равны, даже если один из них сдвинут.">
        <Congruence />
      </Fig>
      <Fig caption="M и N — середины сторон. Средняя линия MN параллельна третьей стороне и вдвое короче её.">
        <Midline />
      </Fig>
    </FigureRow>
  ),
  "school-geometry-03": (
    <Fig caption="Слева отрезки 3, 4 и 5 удовлетворяют неравенству треугольника, и треугольник замыкается. Справа 2 + 3 < 6: дуги радиусов 2 и 3 из концов отрезка 6 не встречаются, такого треугольника нет.">
      <Inequality />
    </Fig>
  ),
  "school-geometry-04": (
    <Fig caption="В прямоугольном треугольнике квадрат на гипотенузе складывается из квадратов на катетах: c² = a² + b². На рисунке треугольник 3–4–5, поэтому площади квадратов относятся как 9, 16 и 25.">
      <Pythagoras />
    </Fig>
  ),
  "school-geometry-05": (
    <Fig caption="Параллельные прямые отсекают на одной стороне угла равные отрезки — и на другой стороне отрезки тоже равны. Так устроена теорема Фалеса и средняя линия.">
      <Thales />
    </Fig>
  ),
  "school-geometry-06": (
    <Fig caption="Треугольники 3–4–5 и 6–8–10 подобны с коэффициентом k = 2: углы равны, стороны пропорциональны. Периметры относятся как k, площади — как k², то есть как 4.">
      <Similar />
    </Fig>
  ),
  "school-geometry-07": (
    <Fig caption="В параллелограмме противоположные стороны равны (одинаковые засечки), а диагонали делятся точкой пересечения пополам.">
      <ParallelogramFig />
    </Fig>
  ),
  "school-geometry-08": (
    <Fig caption="Прямоугольник — параллелограмм с прямым углом. Ромб — с равными сторонами, его диагонали перпендикулярны. Квадрат совмещает оба свойства. У трапеции ровно одна пара сторон параллельна; h — высота.">
      <QuadTypes />
    </Fig>
  ),
  "school-geometry-09": (
    <FigureRow>
      <Fig caption="Центральный угол 120° равен дуге, на которую опирается. Вписанный угол на ту же дугу вдвое меньше — 60°. Справа угол, опирающийся на диаметр, прямой.">
        <CircleAngles />
      </Fig>
      <Fig caption="Касательная перпендикулярна радиусу в точке касания. Отрезки двух касательных из одной точки равны: PT₁ = PT₂.">
        <TangentFig />
      </Fig>
    </FigureRow>
  ),
  "school-geometry-10": (
    <FigureRow>
      <Fig caption="Вписанная окружность касается всех сторон. Центр — пересечение биссектрис, радиус перпендикулярен стороне. Для прямоугольного треугольника r = (a + b − c) / 2.">
        <Incircle />
      </Fig>
      <Fig caption="Описанная окружность проходит через все вершины. У прямоугольного треугольника центр — середина гипотенузы, и гипотенуза является диаметром: R = c / 2.">
        <Circumcircle />
      </Fig>
    </FigureRow>
  ),
  "school-geometry-11": (
    <Fig caption="Площадь прямоугольника ab, параллелограмма ah, треугольника ah/2, круга πr². Высота везде перпендикулярна стороне, к которой её провели.">
      <AreasOverview />
    </Fig>
  ),
  "school-geometry-12": (
    <Fig caption="Одну и ту же площадь можно снять с разных данных. Слева есть основание и высота. Справа известны две стороны и угол между ними: S = ab sin C / 2.">
      <TriangleAreas />
    </Fig>
  ),
  "school-geometry-13": (
    <Fig caption="Параллелограмм: S = ah. Ромб через диагонали: S = d₁d₂ / 2, диагонали перпендикулярны. Трапеция: S = (a + b)h / 2, где a и b — основания, h — высота.">
      <QuadAreas />
    </Fig>
  ),
  "school-geometry-14": (
    <Fig caption="Сумма векторов a = (3; 1) и b = (1; 2) — диагональ параллелограмма, a + b = (4; 3). Тот же результат даёт правило треугольника: приставить b к концу a.">
      <VectorsFig />
    </Fig>
  ),
  "school-geometry-15": (
    <Fig caption="Расстояние AB — гипотенуза прямоугольного треугольника с катетами Δx и Δy. M — середина отрезка, её координаты — средние арифметические координат концов.">
      <CoordinatesFig />
    </Fig>
  ),
  "school-geometry-16": (
    <Fig caption="На кубе зелёные рёбра параллельны, золотые пересекаются, красные скрещиваются: не параллельны и не лежат в одной плоскости. Пунктир на грани — диагональ a√2, пространственная диагональ — a√3.">
      <SpaceLines />
    </Fig>
  ),
  "school-geometry-17": (
    <Fig caption="Объём прямоугольного параллелепипеда равен произведению трёх рёбер, призмы — площади основания на высоту, пирамиды — трети того же произведения. Для куба V − E + F = 8 − 12 + 6 = 2.">
      <Polyhedra />
    </Fig>
  ),
  "school-geometry-18": (
    <Fig caption="Сечение куба плоскостью может быть треугольником (плоскость срезает одну вершину) или правильным шестиугольником (плоскость проходит через середины рёбер).">
      <Sections />
    </Fig>
  ),
  "school-geometry-19": (
    <Fig caption="Сечение шара плоскостью — круг. Если плоскость проходит на расстоянии d от центра, радиус сечения r = √(R² − d²). Касательная к сечению перпендикулярна радиусу в точке касания.">
      <SphereSection />
    </Fig>
  ),
  "school-geometry-20": (
    <Fig caption="Цилиндр — вращение прямоугольника вокруг стороны, конус — вращение прямоугольного треугольника вокруг катета, шар — вращение полукруга вокруг диаметра. Золотым выделен вращаемый профиль.">
      <Revolution />
    </Fig>
  ),
};
