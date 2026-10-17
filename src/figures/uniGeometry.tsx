import type { ReactNode } from "react";
import { FuncPlot } from "./plot";
import { IsoMesh, SvgFrame } from "./solids";
import {
  BARK,
  FILL,
  FILL_GOLD,
  GOLD,
  MOSS,
  PINE,
  STONE,
  iso,
  mathArc,
  p,
  polar,
  type Pt,
  type V3,
} from "./theme";
import { Arc, Fig, FigureRow, Right, Tx } from "./ui";

function ring(at: Pt, s: number, r: number, z: number): string {
  const pts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const t = (2 * Math.PI * i) / 40;
    const q = iso(r * Math.cos(t), r * Math.sin(t), z, at, s);
    pts.push(`${i ? "L" : "M"}${q.x.toFixed(1)},${q.y.toFixed(1)}`);
  }
  return `${pts.join(" ")} Z`;
}

function open3(at: Pt, s: number, fn: (t: number) => V3, n = 32): string {
  let d = "";
  for (let i = 0; i <= n; i++) {
    const v = fn(i / n);
    const q = iso(v[0], v[1], v[2], at, s);
    d += `${i ? "L" : "M"}${q.x.toFixed(1)},${q.y.toFixed(1)}`;
  }
  return d;
}

function Ellipsoid({ at, s = 34 }: { at: Pt; s?: number }) {
  return (
    <g>
      <path d={ring(at, s, 1.15, 0)} fill={FILL} stroke={PINE} strokeWidth={1.5} />
      <path d={open3(at, s, (t) => [1.15 * Math.cos(2 * Math.PI * t), 0, 0.85 * Math.sin(2 * Math.PI * t)])} fill="none" stroke={GOLD} strokeWidth={1.4} />
      <path d={open3(at, s, (t) => [0, 0.8 * Math.cos(2 * Math.PI * t), 0.85 * Math.sin(2 * Math.PI * t)])} fill="none" stroke={MOSS} strokeWidth={1.4} />
    </g>
  );
}

function Hyperboloid1({ at, s = 28 }: { at: Pt; s?: number }) {
  const zs = [-1, -0.45, 0, 0.45, 1];
  return (
    <g>
      {zs.map((z) => (
        <path key={z} d={ring(at, s, Math.sqrt(1 + z * z) * 0.55, z * 0.7)} fill="none" stroke={PINE} strokeWidth={1.3} />
      ))}
    </g>
  );
}

function Hyperboloid2({ at, s = 26 }: { at: Pt; s?: number }) {
  const bowl = (sign: number) =>
    [1.05, 1.35, 1.7].map((z) => (
      <path key={`${sign}${z}`} d={ring(at, s, Math.sqrt(z * z - 1) * 0.45, sign * z * 0.55)} fill="none" stroke={PINE} strokeWidth={1.3} />
    ));
  return (
    <g>
      {bowl(1)}
      {bowl(-1)}
    </g>
  );
}

function ParaboloidE({ at, s = 30 }: { at: Pt; s?: number }) {
  return (
    <g>
      {[0.25, 0.55, 0.95, 1.4].map((z) => (
        <path key={z} d={ring(at, s, Math.sqrt(z) * 0.7, z * 0.55)} fill="none" stroke={PINE} strokeWidth={1.3} />
      ))}
    </g>
  );
}

function ParaboloidH({ at, s = 30 }: { at: Pt; s?: number }) {
  return (
    <g>
      <path d={open3(at, s, (t) => { const x = -1 + 2 * t; return [x, 0, x * x * 0.7]; })} fill="none" stroke={PINE} strokeWidth={1.6} />
      <path d={open3(at, s, (t) => { const y = -1 + 2 * t; return [0, y, -y * y * 0.7]; })} fill="none" stroke={GOLD} strokeWidth={1.6} />
    </g>
  );
}

function ConeSketch({ at, s = 32 }: { at: Pt; s?: number }) {
  const apex = iso(0, 0, 1.3, at, s);
  const base = ring(at, s, 0.9, 0);
  const lines = [0, 60, 120, 180, 240, 300].map((deg) => {
    const a = (deg * Math.PI) / 180;
    const q = iso(0.9 * Math.cos(a), 0.9 * Math.sin(a), 0, at, s);
    return `M${apex.x.toFixed(1)},${apex.y.toFixed(1)} L${q.x.toFixed(1)},${q.y.toFixed(1)}`;
  });
  return (
    <g>
      <path d={base} fill={FILL_GOLD} stroke={PINE} strokeWidth={1.3} />
      {lines.map((d) => (
        <path key={d} d={d} fill="none" stroke={PINE} strokeWidth={1.2} />
      ))}
    </g>
  );
}

function CylinderSketch({ at, s = 32 }: { at: Pt; s?: number }) {
  const lines = [0, 50, 130, 180, 230, 310].map((deg) => {
    const a = (deg * Math.PI) / 180;
    const p1 = iso(0.75 * Math.cos(a), 0.75 * Math.sin(a), 0, at, s);
    const p2 = iso(0.75 * Math.cos(a), 0.75 * Math.sin(a), 1.4, at, s);
    return `M${p1.x.toFixed(1)},${p1.y.toFixed(1)} L${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  });
  return (
    <g>
      <path d={ring(at, s, 0.75, 0)} fill={FILL} stroke={PINE} strokeWidth={1.3} />
      <path d={ring(at, s, 0.75, 1.4)} fill="none" stroke={PINE} strokeWidth={1.3} />
      {lines.map((d) => (
        <path key={d} d={d} fill="none" stroke={MOSS} strokeWidth={1.2} />
      ))}
    </g>
  );
}

function framePt(x: number, y: number, z: number, o: Pt, s: number): Pt {
  return {
    x: o.x + (x - y) * s * Math.cos(Math.PI / 6) + z * s * 0.42,
    y: o.y + (x + y) * s * 0.28 - z * s,
  };
}

function Basis() {
  const O = p(150, 178);
  const s = 46;
  const e1 = framePt(1.25, 0, 0, O, s);
  const e2 = framePt(0, 1.15, 0, O, s);
  const e3 = framePt(0, 0, 1.25, O, s);
  const v = framePt(1.25, 1.15, 1.25, O, s);
  const corner = framePt(1.25, 1.15, 0, O, s);
  return (
    <SvgFrame w={300} h={250}>
      <Arrow2 a={O} b={e1} color={GOLD} />
      <Arrow2 a={O} b={e2} color={MOSS} />
      <Arrow2 a={O} b={e3} color={PINE} />
      <line x1={e1.x} y1={e1.y} x2={corner.x} y2={corner.y} stroke={STONE} strokeDasharray="4 3" />
      <line x1={e2.x} y1={e2.y} x2={corner.x} y2={corner.y} stroke={STONE} strokeDasharray="4 3" />
      <line x1={corner.x} y1={corner.y} x2={v.x} y2={v.y} stroke={STONE} strokeDasharray="4 3" />
      <Arrow2 a={O} b={v} color={BARK} />
      <Tx x={e1.x + 8} y={e1.y} size={14} italic fill={GOLD}>e₁</Tx>
      <Tx x={e2.x - 8} y={e2.y} size={14} italic fill={MOSS}>e₂</Tx>
      <Tx x={e3.x + 10} y={e3.y} size={14} italic fill={PINE}>e₃</Tx>
      <Tx x={v.x + 8} y={v.y} size={14} italic fill={BARK}>v</Tx>
    </SvgFrame>
  );
}

function Arrow2({ a, b, color }: { a: Pt; b: Pt; color: string }) {
  const ang = Math.atan2(b.y - a.y, b.x - a.x);
  const s = 9;
  const w = 0.4;
  return (
    <g>
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth={2} />
      <polygon
        points={`${b.x},${b.y} ${b.x - s * Math.cos(ang - w)},${b.y - s * Math.sin(ang - w)} ${b.x - s * Math.cos(ang + w)},${b.y - s * Math.sin(ang + w)}`}
        fill={color}
      />
    </g>
  );
}

function Products() {
  const O = p(48, 150);
  const A = p(170, 150);
  const B = p(90, 48);
  const box: V3[] = [
    [0, 0, 0],
    [1.3, 0.15, 0],
    [0.25, 1.15, 0.1],
    [0.15, 0.2, 1.15],
  ];
  const a = box[1];
  const b = box[2];
  const c = box[3];
  const verts: V3[] = [
    [0, 0, 0],
    a,
    b,
    c,
    [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
    [a[0] + c[0], a[1] + c[1], a[2] + c[2]],
    [b[0] + c[0], b[1] + c[1], b[2] + c[2]],
    [a[0] + b[0] + c[0], a[1] + b[1] + c[1], a[2] + b[2] + c[2]],
  ];
  const edges: [V3, V3][] = [
    [verts[0], verts[1]],
    [verts[0], verts[2]],
    [verts[0], verts[3]],
    [verts[1], verts[4]],
    [verts[2], verts[4]],
    [verts[1], verts[5]],
    [verts[3], verts[5]],
    [verts[2], verts[6]],
    [verts[3], verts[6]],
    [verts[4], verts[7]],
    [verts[5], verts[7]],
    [verts[6], verts[7]],
  ];
  return (
    <FigureRow>
      <Fig caption="Векторное произведение a × b перпендикулярно плоскости векторов, а его длина равна площади параллелограмма, который они натягивают.">
        <SvgFrame w={260} h={190}>
          <polygon points="48,150 170,150 212,48 90,48" fill={FILL} stroke={PINE} strokeWidth={1.8} />
          <Arrow2 a={O} b={A} color={PINE} />
          <Arrow2 a={O} b={B} color={GOLD} />
          <Arrow2 a={p(130, 99)} b={p(130, 28)} color={BARK} />
          <Tx x={150} y={168} size={14} italic>a</Tx>
          <Tx x={70} y={70} size={14} italic>b</Tx>
          <Tx x={142} y={24} size={13} italic>a × b</Tx>
        </SvgFrame>
      </Fig>
      <Fig caption="Смешанное произведение (a, b, c) по модулю равно объёму параллелепипеда на этих трёх рёбрах. Нуль означает, что векторы лежат в одной плоскости.">
        <SvgFrame w={260} h={210}>
          <IsoMesh at={p(70, 160)} s={62} edges={edges} faces={[{ pts: [verts[0], verts[1], verts[4], verts[2]], fill: FILL_GOLD }]} />
        </SvgFrame>
      </Fig>
    </FigureRow>
  );
}

function LinePlane() {
  return (
    <Fig caption="Прямая несёт направляющий вектор d вдоль себя и нормальный вектор n поперёк. Уравнение прямой можно писать через любой из них: d задаёт параметрическое движение, n — условие «перпендикуляр к прямой».">
      <SvgFrame w={360} h={200}>
        <line x1={30} y1={160} x2={320} y2={50} stroke={PINE} strokeWidth={2} />
        <Arrow2 a={p(140, 118)} b={p(230, 82)} color={GOLD} />
        <Arrow2 a={p(175, 104)} b={p(130, 40)} color={BARK} />
        <circle cx={175} cy={104} r={3.5} fill={PINE} />
        <Tx x={210} y={70} size={14} italic fill={GOLD}>d</Tx>
        <Tx x={118} y={36} size={14} italic fill={BARK}>n</Tx>
        <Tx x={188} y={124} size={13}>M</Tx>
      </SvgFrame>
    </Fig>
  );
}

function PlaneFig() {
  const at = p(80, 170);
  const s = 70;
  const A: V3 = [1.7, 0, 0];
  const B: V3 = [0.25, 1.45, 0.2];
  const C: V3 = [A[0] + B[0], A[1] + B[1], A[2] + B[2]];
  const mid: V3 = [C[0] / 2, C[1] / 2, C[2] / 2];
  const n: V3 = [mid[0], mid[1] + 0.15, mid[2] + 1.05];
  const p0 = iso(mid[0], mid[1], mid[2], at, s);
  const p1 = iso(n[0], n[1], n[2], at, s);
  return (
    <Fig caption="Плоскость в пространстве. Нормаль n перпендикулярна каждому вектору плоскости. Уравнение Ax + By + Cz + D = 0 как раз и говорит: вектор (A, B, C) перпендикулярен плоскости.">
      <SvgFrame w={300} h={230}>
        <IsoMesh
          at={at}
          s={s}
          faces={[{ pts: [[0, 0, 0], A, C, B], fill: FILL }]}
          edges={[
            [[0, 0, 0], A],
            [A, C],
            [C, B],
            [B, [0, 0, 0]],
          ]}
        />
        <Arrow2 a={p0} b={p1} color={BARK} />
        <Tx x={p1.x + 8} y={p1.y} size={14} italic>n</Tx>
      </SvgFrame>
    </Fig>
  );
}

function SkewLines() {
  const at = p(90, 180);
  const s = 80;
  const a1 = iso(0, 0.2, 0.3, at, s);
  const a2 = iso(1.6, 0.2, 0.45, at, s);
  const b1 = iso(0.35, 1.15, 0.15, at, s);
  const b2 = iso(0.35, 1.15, 1.45, at, s);
  return (
    <Fig caption="Две скрещивающиеся прямые: направляющие не пропорциональны, и прямые не лежат в одной плоскости, поэтому не пересекаются и не параллельны. В пространстве это третий вариант взаимного расположения, его нет на плоскости.">
      <SvgFrame w={280} h={230}>
        <Arrow2 a={a1} b={a2} color={PINE} />
        <Arrow2 a={b1} b={b2} color={GOLD} />
        <Tx x={a2.x + 6} y={a2.y} size={13} italic>ℓ₁</Tx>
        <Tx x={b2.x + 6} y={b2.y} size={13} italic>ℓ₂</Tx>
      </SvgFrame>
    </Fig>
  );
}

function ellipseBranch(sign: number) {
  return (x: number) => {
    const t = 1 - (x * x) / 9;
    return t < 0 ? Number.NaN : sign * 2 * Math.sqrt(t);
  };
}

function EllipseFig() {
  return (
    <Fig caption="Эллипс x²/9 + y²/4 = 1. Большая полуось a = 3, малая b = 2, фокусы в точках (±√5; 0). Сумма расстояний от любой точки эллипса до двух фокусов равна 2a = 6.">
      <FuncPlot
        xMin={-4}
        xMax={4}
        yMin={-3}
        yMax={3}
        width={460}
        curves={[
          { f: ellipseBranch(1), from: -3, to: 3 },
          { f: ellipseBranch(-1), from: -3, to: 3 },
        ]}
        points={[
          { x: Math.sqrt(5), y: 0, color: GOLD, label: "F", dy: -16 },
          { x: -Math.sqrt(5), y: 0, color: GOLD, label: "F", dy: -16 },
          { x: 3, y: 0, label: "a", dy: -12 },
          { x: 0, y: 2, label: "b", dx: 14 },
        ]}
      />
    </Fig>
  );
}

function Conics() {
  return (
    <FigureRow>
      <Fig caption="Гипербола x² − y² = 1. Две ветви, асимптоты y = x и y = −x. Вершины (±1; 0).">
        <FuncPlot
          xMin={-3}
          xMax={3}
          yMin={-3}
          yMax={3}
          height={260}
          curves={[
            { f: (x) => (Math.abs(x) < 1 ? Number.NaN : Math.sqrt(x * x - 1)), color: PINE },
            { f: (x) => (Math.abs(x) < 1 ? Number.NaN : -Math.sqrt(x * x - 1)), color: PINE },
            { f: (x) => x, color: STONE, dash: "4 3", width: 1.2 },
            { f: (x) => -x, color: STONE, dash: "4 3", width: 1.2 },
          ]}
        />
      </Fig>
      <Fig caption="Парабола y = x²/4. Фокус F(0; 1), директриса y = −1. Для каждой точки параболы расстояние до фокуса равно расстоянию до директрисы.">
        <FuncPlot
          xMin={-3}
          xMax={3}
          yMin={-2}
          yMax={3}
          height={260}
          curves={[{ f: (x) => (x * x) / 4, color: MOSS }]}
          hLines={[{ y: -1, color: GOLD, label: "директриса" }]}
          points={[{ x: 0, y: 1, color: GOLD, label: "F", dx: 16 }]}
        />
      </Fig>
    </FigureRow>
  );
}

function Surfaces() {
  return (
    <Fig caption="Три невырожденные поверхности второго порядка: эллипсоид (замкнут), однополостный гиперболоид (одна компонента, есть «талия») и эллиптический параболоид (чаша).">
      <SvgFrame w={640} h={200}>
        <Ellipsoid at={p(100, 120)} />
        <Hyperboloid1 at={p(300, 120)} />
        <ParaboloidE at={p(500, 150)} />
        <Tx x={100} y={185} size={14}>эллипсоид</Tx>
        <Tx x={300} y={185} size={14}>гиперболоид</Tx>
        <Tx x={500} y={185} size={14}>параболоид</Tx>
      </SvgFrame>
    </Fig>
  );
}

function PrincipalAxes() {
  return (
    <Fig caption="Кривая xy = 1 — гипербола, повёрнутая на 45°. Оси u и v, наклонённые под π/4 к координатным, для неё главные: в них уравнение принимает вид u²/2 − v²/2 = 1, без члена с произведением.">
      <FuncPlot
        xMin={-3}
        xMax={3}
        yMin={-3}
        yMax={3}
        width={420}
        curves={[
          { f: (x) => 1 / x, color: PINE },
          { f: (x) => x, color: GOLD, width: 1.5 },
          { f: (x) => -x, color: MOSS, width: 1.5 },
        ]}
        notes={[
          { x: 2.2, y: 1.5, text: "u" },
          { x: 2.1, y: -1.4, text: "v" },
        ]}
      />
    </Fig>
  );
}

function AffineMap() {
  const cell = (map: (x: number, y: number) => Pt, x: number, y: number) => {
    const a = map(x, y);
    const b = map(x + 1, y);
    const c = map(x + 1, y + 1);
    const d = map(x, y + 1);
    return `${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`;
  };
  const left = (x: number, y: number) => p(30 + x * 28, 150 - y * 28);
  const right = (x: number, y: number) => p(230 + x * 28 + y * 16, 160 - y * 24 - x * 6);
  return (
    <Fig caption="Аффинное отображение переводит квадратную сетку в сетку параллелограммов. Прямые остаются прямыми, параллельность сохраняется, а длины и углы — нет. Закрашенная клетка показывает, как меняется площадь: коэффициент равен |det A|.">
      <SvgFrame w={430} h={190}>
        {[0, 1, 2, 3].flatMap((i) =>
          [0, 1, 2, 3].map((j) => (
            <polygon
              key={`L${i}${j}`}
              points={cell(left, i, j)}
              fill={i === 0 && j === 0 ? FILL_GOLD : "none"}
              stroke={PINE}
              strokeWidth={1.2}
            />
          )),
        )}
        {[0, 1, 2, 3].flatMap((i) =>
          [0, 1, 2, 3].map((j) => (
            <polygon
              key={`R${i}${j}`}
              points={cell(right, i, j)}
              fill={i === 0 && j === 0 ? FILL_GOLD : "none"}
              stroke={MOSS}
              strokeWidth={1.2}
            />
          )),
        )}
      </SvgFrame>
    </Fig>
  );
}

function ProjectiveLine() {
  const O = p(70, 200);
  const angles = [30, 55, 80, 110, 140];
  const yLine = 70;
  return (
    <Fig caption="Точка проективной прямой — это прямая через начало на плоскости. Горизонталь не пересекает аффинную карту y = 1: ей соответствует бесконечно удалённая точка [1 : 0]. Остальные прямые высекают на y = 1 обычную координату t.">
      <SvgFrame w={360} h={240}>
        <line x1={20} y1={O.y} x2={340} y2={O.y} stroke={GOLD} strokeWidth={2} />
        <line x1={30} y1={yLine} x2={330} y2={yLine} stroke={PINE} strokeWidth={2} />
        {angles.map((deg) => {
          const hit = polar(O.x, O.y, (O.y - yLine) / Math.sin((deg * Math.PI) / 180), deg);
          return <line key={deg} x1={O.x} y1={O.y} x2={hit.x} y2={hit.y} stroke={STONE} strokeWidth={1.4} />;
        })}
        <circle cx={O.x} cy={O.y} r={3.5} fill={PINE} />
        <Tx x={300} y={O.y + 16} size={13} fill={GOLD}>[1 : 0] = ∞</Tx>
        <Tx x={300} y={yLine - 12} size={13}>y = 1</Tx>
        <Tx x={O.x - 12} y={O.y + 16} size={13}>O</Tx>
      </SvgFrame>
    </Fig>
  );
}

function Classification() {
  return (
    <Fig caption="Аффинные типы невырожденных квадрик: эллипсоид, однополостный и двуполостный гиперболоиды, эллиптический и гиперболический параболоиды, конус. Конус и цилиндры уже вырождены: в уравнении после приведения пропадает часть переменных или ранг падает.">
      <SvgFrame w={680} h={230}>
        <Ellipsoid at={p(60, 90)} s={22} />
        <Hyperboloid1 at={p(170, 100)} s={20} />
        <Hyperboloid2 at={p(280, 100)} s={20} />
        <ParaboloidE at={p(390, 120)} s={22} />
        <ParaboloidH at={p(500, 110)} s={26} />
        <ConeSketch at={p(610, 120)} s={24} />
        <Tx x={60} y={175} size={12}>эллипсоид</Tx>
        <Tx x={170} y={175} size={12}>однополостный</Tx>
        <Tx x={280} y={175} size={12}>двуполостный</Tx>
        <Tx x={390} y={200} size={12}>элл. параболоид</Tx>
        <Tx x={500} y={200} size={12}>гип. параболоид</Tx>
        <Tx x={610} y={200} size={12}>конус</Tx>
      </SvgFrame>
    </Fig>
  );
}

function PolarFig() {
  const O = p(60, 170);
  const T = polar(O.x, O.y, 130, 42);
  return (
    <Fig caption="В полярных координатах точка задаётся расстоянием r от полюса и углом θ от полярной оси. Окружность r = const — множество точек с одним и тем же расстоянием.">
      <SvgFrame w={280} h={220}>
        <line x1={O.x} y1={O.y} x2={250} y2={O.y} stroke={STONE} strokeWidth={1.4} />
        <line x1={O.x} y1={O.y} x2={T.x} y2={T.y} stroke={PINE} strokeWidth={2} />
        <path d={mathArc(O, 40, 0, 42)} fill="none" stroke={GOLD} strokeWidth={2} />
        <circle cx={O.x} cy={O.y} r={130} fill="none" stroke={STONE} strokeDasharray="4 3" />
        <circle cx={T.x} cy={T.y} r={4} fill={PINE} />
        <Tx x={150} y={150} size={14} italic>r</Tx>
        <Tx x={100} y={158} size={14} fill={GOLD}>θ</Tx>
        <Tx x={T.x + 8} y={T.y} size={13} anchor="start">P</Tx>
      </SvgFrame>
    </Fig>
  );
}

function Barycentric() {
  const A = p(50, 190);
  const B = p(300, 190);
  const C = p(160, 36);
  const P = p(170, 130);
  const tri = (u: Pt, v: Pt, w: Pt) => `${u.x},${u.y} ${v.x},${v.y} ${w.x},${w.y}`;
  return (
    <Fig caption="Барицентрические координаты точки P — доли площадей: λA = S(PBC) / S, λB = S(PCA) / S, λC = S(PAB) / S. Внутри треугольника все три положительны и в сумме дают 1. На стороне, противолежащей вершине, соответствующая координата равна нулю.">
      <SvgFrame w={360} h={230}>
        <polygon points={tri(P, B, C)} fill="rgba(176,141,74,0.45)" stroke="none" />
        <polygon points={tri(P, C, A)} fill="rgba(45,106,79,0.28)" stroke="none" />
        <polygon points={tri(P, A, B)} fill="rgba(27,67,50,0.12)" stroke="none" />
        <polygon points="50,190 300,190 160,36" fill="none" stroke={PINE} strokeWidth={2} />
        <line x1={A.x} y1={A.y} x2={P.x} y2={P.y} stroke={PINE} strokeWidth={1.2} />
        <line x1={B.x} y1={B.y} x2={P.x} y2={P.y} stroke={PINE} strokeWidth={1.2} />
        <line x1={C.x} y1={C.y} x2={P.x} y2={P.y} stroke={PINE} strokeWidth={1.2} />
        <circle cx={P.x} cy={P.y} r={4} fill={PINE} />
        <Tx x={A.x} y={A.y + 16}>A</Tx>
        <Tx x={B.x} y={B.y + 16}>B</Tx>
        <Tx x={C.x} y={C.y - 12}>C</Tx>
        <Tx x={230} y={120} size={13} fill={GOLD}>λA</Tx>
        <Tx x={100} y={110} size={13} fill={MOSS}>λB</Tx>
        <Tx x={160} y={175} size={13}>λC</Tx>
      </SvgFrame>
    </Fig>
  );
}

function ProjectivePlane() {
  return (
    <Fig caption="На проективной плоскости любые две прямые пересекаются. Параллельные в аффинной карте встречаются на бесконечно удалённой прямой — на рисунке это линия горизонта, где сходятся два семейства.">
      <SvgFrame w={420} h={230}>
        <line x1={20} y1={40} x2={400} y2={40} stroke={GOLD} strokeWidth={2} />
        <Tx x={210} y={24} size={13} fill={GOLD}>бесконечно удалённая прямая</Tx>
        <line x1={40} y1={200} x2={160} y2={40} stroke={PINE} strokeWidth={1.7} />
        <line x1={120} y1={200} x2={160} y2={40} stroke={PINE} strokeWidth={1.7} />
        <line x1={220} y1={200} x2={300} y2={40} stroke={MOSS} strokeWidth={1.7} />
        <line x1={340} y1={200} x2={300} y2={40} stroke={MOSS} strokeWidth={1.7} />
        <circle cx={160} cy={40} r={3.5} fill={PINE} />
        <circle cx={300} cy={40} r={3.5} fill={MOSS} />
      </SvgFrame>
    </Fig>
  );
}

function DistanceFig() {
  const O = p(56, 200);
  const u = 32;
  const foot = p(O.x + 1.2 * u, O.y - 1.6 * u);
  const step = { x: -0.8 * u, y: -0.6 * u };
  const P1 = p(foot.x + 2.6 * step.x, foot.y + 2.6 * step.y);
  const P2 = p(foot.x - 2.2 * step.x, foot.y - 2.2 * step.y);
  return (
    <Fig caption="Расстояние от начала до прямой 3x + 4y − 10 = 0 равно 2: это длина перпендикуляра. Основание перпендикуляра — ближайшая точка прямой, здесь (1,2; 1,6).">
      <SvgFrame w={300} h={250}>
        <line x1={24} y1={O.y} x2={280} y2={O.y} stroke={STONE} />
        <line x1={O.x} y1={230} x2={O.x} y2={30} stroke={STONE} />
        <line x1={P1.x} y1={P1.y} x2={P2.x} y2={P2.y} stroke={PINE} strokeWidth={2} />
        <line x1={O.x} y1={O.y} x2={foot.x} y2={foot.y} stroke={GOLD} strokeWidth={2} />
        <Right c={foot} a={P2} b={O} size={12} />
        <circle cx={O.x} cy={O.y} r={3.5} fill={PINE} />
        <circle cx={foot.x} cy={foot.y} r={3.5} fill={GOLD} />
        <Tx x={O.x - 14} y={O.y + 14} size={13}>O</Tx>
        <Tx x={(O.x + foot.x) / 2 - 10} y={(O.y + foot.y) / 2} size={14} fill={GOLD}>2</Tx>
        <Tx x={200} y={70} size={13}>3x + 4y = 10</Tx>
      </SvgFrame>
    </Fig>
  );
}

function AnglesFig() {
  const O = p(70, 150);
  return (
    <FigureRow>
      <Fig caption="Угол между двумя прямыми на плоскости — меньший из углов между их направляющими. Он же получается из нормалей.">
        <SvgFrame w={260} h={200}>
          <line x1={20} y1={150} x2={240} y2={150} stroke={PINE} strokeWidth={2} />
          <line x1={40} y1={40} x2={230} y2={190} stroke={GOLD} strokeWidth={2} />
          <Arc v={O} a={p(180, 150)} b={p(140, 100)} r={32} color={BARK} />
          <Tx x={120} y={130} size={14} fill={BARK}>φ</Tx>
        </SvgFrame>
      </Fig>
      <Fig caption="Угол между плоскостями равен углу между их нормалями. На рисунке две плоскости пересекаются по прямой, и двугранный угол виден «в торец».">
        <SvgFrame w={280} h={200}>
          <IsoMesh
            at={p(40, 150)}
            s={70}
            faces={[
              { pts: [[0, 0, 0], [1.8, 0, 0], [1.8, 0.2, 0.9], [0, 0.2, 0.9]], fill: FILL },
              { pts: [[0, 0, 0], [1.8, 0, 0], [1.8, 1, 0], [0, 1, 0]], fill: FILL_GOLD },
            ]}
            edges={[
              [[0, 0, 0], [1.8, 0, 0]],
              [[1.8, 0, 0], [1.8, 0.2, 0.9]],
              [[1.8, 0.2, 0.9], [0, 0.2, 0.9]],
              [[0, 0.2, 0.9], [0, 0, 0]],
              [[0, 0, 0], [0, 1, 0]],
              [[1.8, 0, 0], [1.8, 1, 0]],
              [[1.8, 1, 0], [0, 1, 0]],
              [[0, 1, 0], [0, 0, 0]],
            ]}
          />
        </SvgFrame>
      </Fig>
    </FigureRow>
  );
}

function UniSphere() {
  const O = p(160, 140);
  const R = 96;
  const d = 40;
  const r = Math.sqrt(R * R - d * d);
  return (
    <Fig caption="Сечение сферы x² + y² + z² = R² плоскостью на расстоянии d от центра — окружность радиуса √(R² − d²). При d = 0 получается большой круг, при d = R плоскость касается сферы.">
      <SvgFrame w={340} h={270}>
        <circle cx={O.x} cy={O.y} r={R} fill={FILL} stroke={PINE} strokeWidth={2} />
        <line x1={O.x - r - 16} y1={O.y - d} x2={O.x + r + 16} y2={O.y - d} stroke={GOLD} strokeWidth={1.6} />
        <line x1={O.x} y1={O.y} x2={O.x} y2={O.y - d} stroke={BARK} strokeWidth={1.6} />
        <line x1={O.x} y1={O.y - d} x2={O.x + r} y2={O.y - d} stroke={MOSS} strokeWidth={2} />
        <Right c={p(O.x, O.y - d)} a={p(O.x + 30, O.y - d)} b={O} size={11} />
        <Tx x={O.x + 8} y={O.y - d / 2} size={14} fill={BARK} anchor="start">d</Tx>
        <Tx x={O.x + r / 2} y={O.y - d - 12} size={14} fill={MOSS}>√(R² − d²)</Tx>
        <Tx x={O.x + 36} y={O.y + 28} size={14}>R</Tx>
      </SvgFrame>
    </Fig>
  );
}

function Ruled() {
  return (
    <Fig caption="Цилиндр и конус — линейчатые поверхности. У цилиндра образующие параллельны, у конуса все образующие проходят через одну вершину. Сдвигом или гомотетией из окружности получается направляющая.">
      <SvgFrame w={460} h={210}>
        <CylinderSketch at={p(110, 160)} />
        <ConeSketch at={p(320, 165)} />
        <Tx x={110} y={198} size={14}>цилиндр</Tx>
        <Tx x={320} y={198} size={14}>конус</Tx>
      </SvgFrame>
    </Fig>
  );
}

function AffineFrame() {
  const O = p(46, 176);
  const e1 = p(130, 156);
  const e2 = p(86, 96);
  const P = p(O.x + (e1.x - O.x) * 2 + (e2.x - O.x), O.y + (e1.y - O.y) * 2 + (e2.y - O.y));
  return (
    <Fig caption="Аффинный репер — начало O и два неколлинеарных вектора e₁, e₂. Точка M = O + 2e₁ + e₂ имеет в этом репере координаты (2; 1). Углы репера не обязаны быть прямыми, длины e₁ и e₂ — равными.">
      <SvgFrame w={340} h={230}>
        <line x1={e1.x} y1={e1.y} x2={O.x + 2 * (e1.x - O.x)} y2={O.y + 2 * (e1.y - O.y)} stroke={STONE} strokeDasharray="4 3" />
        <line x1={O.x + 2 * (e1.x - O.x)} y1={O.y + 2 * (e1.y - O.y)} x2={P.x} y2={P.y} stroke={STONE} strokeDasharray="4 3" />
        <Arrow2 a={O} b={e1} color={GOLD} />
        <Arrow2 a={O} b={e2} color={MOSS} />
        <circle cx={P.x} cy={P.y} r={4} fill={PINE} />
        <Tx x={e1.x + 8} y={e1.y + 12} size={14} italic fill={GOLD}>e₁</Tx>
        <Tx x={e2.x - 26} y={e2.y - 2} size={14} italic fill={MOSS}>e₂</Tx>
        <Tx x={P.x + 10} y={P.y} size={14} anchor="start">M(2; 1)</Tx>
        <Tx x={O.x - 8} y={O.y + 14} size={13}>O</Tx>
      </SvgFrame>
    </Fig>
  );
}

export const uniGeometryFigures: Record<string, ReactNode> = {
  "uni-geometry-01": (
    <Fig caption="Базис e₁, e₂, e₃ и вектор v = e₁ + e₂ + e₃. Пунктир — параллелепипед координат: по нему читают, сколько каждого базисного вектора вошло в v.">
      <Basis />
    </Fig>
  ),
  "uni-geometry-02": <Products />,
  "uni-geometry-03": <LinePlane />,
  "uni-geometry-04": <PlaneFig />,
  "uni-geometry-05": <SkewLines />,
  "uni-geometry-06": <EllipseFig />,
  "uni-geometry-07": <Conics />,
  "uni-geometry-08": <Surfaces />,
  "uni-geometry-09": <PrincipalAxes />,
  "uni-geometry-10": <AffineMap />,
  "uni-geometry-11": <ProjectiveLine />,
  "uni-geometry-12": <Classification />,
  "uni-geometry-13": <PolarFig />,
  "uni-geometry-14": <Barycentric />,
  "uni-geometry-15": <ProjectivePlane />,
  "uni-geometry-16": <DistanceFig />,
  "uni-geometry-17": <AnglesFig />,
  "uni-geometry-18": <UniSphere />,
  "uni-geometry-19": <Ruled />,
  "uni-geometry-20": <AffineFrame />,
};
