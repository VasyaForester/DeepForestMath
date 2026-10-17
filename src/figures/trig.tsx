import type { ReactNode } from "react";
import { FuncPlot } from "./plot";
import { SvgFrame } from "./solids";
import { BARK, FILL, GOLD, MOSS, PINE, STONE, mathArc, p, polar } from "./theme";
import { Arc, Fig, FigureRow, Right, Tx } from "./ui";

const PI = Math.PI;

function RightTrig() {
  const C = p(70, 180);
  const B = p(230, 180);
  const A = p(70, 50);
  return (
    <Fig caption="В прямоугольном треугольнике относительно острого угла α: sin α — противолежащий катет к гипотенузе, cos α — прилежащий к гипотенузе, tg α — противолежащий к прилежащему.">
      <SvgFrame w={340} h={230}>
        <polygon points="70,50 230,180 70,180" fill={FILL} stroke={PINE} strokeWidth={2} />
        <Right c={C} a={A} b={B} />
        <Arc v={B} a={C} b={A} r={36} color={GOLD} />
        <Tx x={188} y={166} size={15} fill={GOLD}>α</Tx>
        <Tx x={150} y={200} size={14}>прилежащий</Tx>
        <Tx x={48} y={120} size={14}>противолежащий</Tx>
        <Tx x={160} y={100} size={14}>гипотенуза</Tx>
      </SvgFrame>
    </Fig>
  );
}

function UnitCircleFig({
  mark,
  chord,
  arc,
}: {
  mark?: number[];
  chord?: number;
  arc?: [number, number];
}) {
  const O = p(170, 160);
  const r = 112;
  const ticks = [0, 90, 180, 270];
  return (
    <SvgFrame w={340} h={320}>
      <line x1={24} y1={O.y} x2={316} y2={O.y} stroke={STONE} strokeWidth={1.3} />
      <line x1={O.x} y1={300} x2={O.x} y2={20} stroke={STONE} strokeWidth={1.3} />
      <circle cx={O.x} cy={O.y} r={r} fill={FILL} stroke={PINE} strokeWidth={2} />
      {arc && (
        <path d={mathArc(O, r - 2, arc[0], arc[1])} fill="none" stroke={MOSS} strokeWidth={8} opacity={0.85} />
      )}
      {ticks.map((deg) => {
        const a = polar(O.x, O.y, r, deg);
        const b = polar(O.x, O.y, r - 8, deg);
        return <line key={deg} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={PINE} strokeWidth={1.5} />;
      })}
      {chord !== undefined && (
        <line
          x1={O.x - r * Math.sqrt(1 - chord * chord)}
          y1={O.y - chord * r}
          x2={O.x + r * Math.sqrt(1 - chord * chord)}
          y2={O.y - chord * r}
          stroke={GOLD}
          strokeWidth={1.5}
        />
      )}
      {(mark ?? [60]).map((deg) => {
        const t = polar(O.x, O.y, r, deg);
        return (
          <g key={deg}>
            <line x1={O.x} y1={O.y} x2={t.x} y2={t.y} stroke={GOLD} strokeWidth={1.7} />
            <line x1={t.x} y1={t.y} x2={t.x} y2={O.y} stroke={PINE} strokeDasharray="4 3" />
            <line x1={t.x} y1={t.y} x2={O.x} y2={t.y} stroke={MOSS} strokeDasharray="4 3" />
            <circle cx={t.x} cy={t.y} r={4} fill={PINE} />
          </g>
        );
      })}
      <Arc v={O} a={polar(O.x, O.y, r, 0)} b={polar(O.x, O.y, r, (mark ?? [60])[0])} r={28} color={GOLD} />
      <Tx x={O.x + 78} y={O.y - 78} size={13}>I</Tx>
      <Tx x={O.x - 78} y={O.y - 78} size={13}>II</Tx>
      <Tx x={O.x - 78} y={O.y + 78} size={13}>III</Tx>
      <Tx x={O.x + 78} y={O.y + 78} size={13}>IV</Tx>
      <Tx x={O.x + r + 14} y={O.y + 14} size={12}>1</Tx>
      <Tx x={O.x - 10} y={O.y - r - 8} size={12}>1</Tx>
    </SvgFrame>
  );
}

function TrigGraphs() {
  const xt = [
    { at: -PI, label: "−π" },
    { at: -PI / 2, label: "−π/2" },
    { at: PI / 2, label: "π/2" },
    { at: PI, label: "π" },
  ];
  return (
    <FigureRow>
      <Fig caption="Синусоида y = sin x и косинус y = cos x. Период 2π, значения от −1 до 1. Косинус — тот же график, сдвинутый на π/2 влево.">
        <FuncPlot
          xMin={-PI - 0.3}
          xMax={PI + 0.4}
          yMin={-1.5}
          yMax={1.5}
          grid={false}
          xTicks={xt}
          yTicks={[
            { at: -1, label: "−1" },
            { at: 1, label: "1" },
          ]}
          curves={[
            { f: Math.sin, color: PINE },
            { f: Math.cos, color: GOLD },
          ]}
          notes={[
            { x: 1.2, y: 1.15, text: "sin" },
            { x: 0.35, y: 1.15, text: "cos" },
          ]}
        />
      </Fig>
      <Fig caption="y = tg x имеет период π и вертикальные асимптоты x = π/2 + πk. В окрестности асимптоты график уходит на ±∞.">
        <FuncPlot
          xMin={-PI + 0.05}
          xMax={PI - 0.05}
          yMin={-4}
          yMax={4}
          grid={false}
          xTicks={[
            { at: -PI / 2, label: "−π/2" },
            { at: PI / 2, label: "π/2" },
          ]}
          vLines={[
            { x: -PI / 2, color: STONE },
            { x: PI / 2, color: STONE },
          ]}
          curves={[
            {
              f: (x) => (Math.abs(Math.cos(x)) < 0.08 ? Number.NaN : Math.tan(x)),
              color: BARK,
            },
          ]}
        />
      </Fig>
    </FigureRow>
  );
}

function SineEquation() {
  return (
    <Fig caption="Уравнение sin x = 1/2 на круге — горизонталь y = 1/2. Она встречает окружность в двух точках периода: x = π/6 и x = π − π/6 = 5π/6. Дальше оба угла повторяются через 2π.">
      <UnitCircleFig mark={[30, 150]} chord={0.5} />
    </Fig>
  );
}

function SineIneq() {
  return (
    <Fig caption="sin x > 1/2 там, где точка круга выше прямой y = 1/2. На одном обороте это дуга от π/6 до 5π/6. Концы в строгое неравенство не входят.">
      <UnitCircleFig mark={[30, 150]} chord={0.5} arc={[30, 150]} />
    </Fig>
  );
}

function InverseTrig() {
  return (
    <FigureRow>
      <Fig caption="y = arcsin x определён на [−1; 1], значения лежат в [−π/2; π/2]. Это обратная к синусу, суженному на этот отрезок.">
        <FuncPlot
          xMin={-1.5}
          xMax={1.5}
          yMin={-2}
          yMax={2}
          grid={false}
          yTicks={[
            { at: -PI / 2, label: "−π/2" },
            { at: PI / 2, label: "π/2" },
          ]}
          xTicks={[
            { at: -1, label: "−1" },
            { at: 1, label: "1" },
          ]}
          curves={[{ f: (x) => (x < -1 || x > 1 ? Number.NaN : Math.asin(x)) }]}
          points={[
            { x: -1, y: -PI / 2 },
            { x: 1, y: PI / 2 },
            { x: 0, y: 0 },
          ]}
        />
      </Fig>
      <Fig caption="y = arctg x определён на всей прямой. Горизонтальные асимптоты y = π/2 и y = −π/2: график к ним подходит, но не достигает.">
        <FuncPlot
          xMin={-5}
          xMax={5}
          yMin={-2}
          yMax={2}
          grid={false}
          yTicks={[]}
          hLines={[
            { y: PI / 2, color: GOLD, label: "π/2" },
            { y: -PI / 2, color: GOLD, label: "−π/2" },
          ]}
          curves={[{ f: Math.atan, color: MOSS }]}
        />
      </Fig>
    </FigureRow>
  );
}

function LawOfSines() {
  const A = p(70, 200);
  const B = p(300, 200);
  const C = p(150, 62);
  const d =
    2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
  const ux =
    ((A.x * A.x + A.y * A.y) * (B.y - C.y) +
      (B.x * B.x + B.y * B.y) * (C.y - A.y) +
      (C.x * C.x + C.y * C.y) * (A.y - B.y)) /
    d;
  const uy =
    ((A.x * A.x + A.y * A.y) * (C.x - B.x) +
      (B.x * B.x + B.y * B.y) * (A.x - C.x) +
      (C.x * C.x + C.y * C.y) * (B.x - A.x)) /
    d;
  const R = Math.hypot(ux - A.x, uy - A.y);
  return (
    <Fig caption="Сторона a лежит против угла A, b против B, c против C. Теорема синусов: a/sin A = b/sin B = c/sin C = 2R, где R — радиус описанной окружности. Теорема косинусов связывает сторону с углом напротив: c² = a² + b² − 2ab cos C.">
      <SvgFrame w={380} h={320}>
        <circle cx={ux} cy={uy} r={R} fill={FILL} stroke={GOLD} strokeWidth={1.5} />
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="none" stroke={PINE} strokeWidth={2} />
        <Tx x={A.x - 16} y={A.y + 16}>A</Tx>
        <Tx x={B.x + 14} y={B.y + 16}>B</Tx>
        <Tx x={C.x} y={C.y - 14}>C</Tx>
        <Tx x={(B.x + C.x) / 2 + 16} y={(B.y + C.y) / 2} size={14} italic>a</Tx>
        <Tx x={(A.x + C.x) / 2 - 16} y={(A.y + C.y) / 2} size={14} italic>b</Tx>
        <Tx x={(A.x + B.x) / 2} y={A.y + 18} size={14} italic>c</Tx>
        <Tx x={ux + 10} y={uy} size={13} fill={GOLD} anchor="start">O</Tx>
      </SvgFrame>
    </Fig>
  );
}

export const trigFigures: Record<string, ReactNode> = {
  "school-trig-01": <RightTrig />,
  "school-trig-02": (
    <Fig caption="Единичная окружность. Угол откладывают от оси Ox против часовой стрелки. Косинус — абсцисса точки, синус — ордината. В I четверти оба положительны, во II положителен синус, в III оба отрицательны, в IV положителен косинус. Отмечен угол π/3.">
      <UnitCircleFig mark={[60]} />
    </Fig>
  ),
  "school-trig-08": <TrigGraphs />,
  "school-trig-09": <SineEquation />,
  "school-trig-10": <SineEquation />,
  "school-trig-12": <SineIneq />,
  "school-trig-13": <InverseTrig />,
  "school-trig-15": <LawOfSines />,
};
