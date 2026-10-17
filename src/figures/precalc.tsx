import type { ReactNode } from "react";
import { FuncPlot } from "./plot";
import { SvgFrame } from "./solids";
import { GOLD, MOSS, PINE, STONE } from "./theme";
import { Fig, FigureRow, Tx } from "./ui";

const BARK = "#6b4f3a";

function LimitHole() {
  return (
    <Fig caption="Функция (x² − 4)/(x − 2) совпадает с прямой y = x + 2 всюду, кроме x = 2, где она не определена. Дырка стоит на высоте 4: предел при x → 2 равен 4, хотя значения в самой точке нет.">
      <FuncPlot
        xMin={-1}
        xMax={5}
        yMin={-1}
        yMax={7}
        width={480}
        curves={[
          { f: (x) => x + 2, from: -1, to: 1.9 },
          { f: (x) => x + 2, from: 2.1, to: 5 },
        ]}
        points={[{ x: 2, y: 4, open: true, label: "не задана", dx: -62, dy: -8 }]}
        vLines={[{ x: 2, color: GOLD, label: "x = 2" }]}
      />
    </Fig>
  );
}

function DerivativePic() {
  return (
    <Fig caption="На y = x²/4 в точке x = 2 касательная имеет наклон f′(2) = 1. Секущая через x = 2 и x = 4 круче. Когда вторая точка приближается к первой, секущая садится на касательную — это и есть производная.">
      <FuncPlot
        xMin={-0.4}
        xMax={5}
        yMin={-1.6}
        yMax={5}
        width={500}
        curves={[
          { f: (x) => (x * x) / 4, color: PINE },
          { f: (x) => 1.5 * x - 2, color: GOLD, dash: "6 4", width: 1.7 },
          { f: (x) => x - 1, color: BARK, width: 2.2 },
        ]}
        points={[
          { x: 2, y: 1 },
          { x: 4, y: 4, color: GOLD },
        ]}
        notes={[
          { x: 1.2, y: 0.85, text: "касательная" },
          { x: 3.2, y: 3.35, text: "секущая" },
        ]}
      />
    </Fig>
  );
}

function TangentNormal() {
  return (
    <Fig caption="Касательная к y = x²/4 в точке (2; 1) имеет наклон 1. Нормаль перпендикулярна ей, поэтому наклон нормали равен −1. Вместе они задают локальную «систему координат» графика.">
      <FuncPlot
        xMin={-0.2}
        xMax={4.5}
        yMin={-1.5}
        yMax={4}
        width={480}
        curves={[
          { f: (x) => (x * x) / 4, color: PINE },
          { f: (x) => x - 1, color: BARK },
          { f: (x) => -x + 3, color: GOLD },
        ]}
        points={[{ x: 2, y: 1 }]}
        notes={[
          { x: 3.4, y: 2.6, text: "касательная" },
          { x: 0.7, y: 2.5, text: "нормаль" },
        ]}
      />
    </Fig>
  );
}

function Monotonicity() {
  return (
    <FigureRow>
      <Fig caption="y = x³ − 3x. Производная меняет знак: функция растёт до x = −1, убывает до x = 1 и снова растёт. В (−1; 2) локальный максимум, в (1; −2) локальный минимум.">
        <FuncPlot
          xMin={-2.3}
          xMax={2.3}
          yMin={-3}
          yMax={3}
          curves={[{ f: (x) => x ** 3 - 3 * x }]}
          points={[
            { x: -1, y: 2, label: "max", dy: -12 },
            { x: 1, y: -2, label: "min", dy: 14 },
          ]}
        />
      </Fig>
      <Fig caption="У y = x³ производная в нуле равна нулю, но знака не меняет: функция всё время растёт. Горизонтальная касательная здесь — точка перегиба, а не экстремум.">
        <FuncPlot
          xMin={-1.6}
          xMax={1.6}
          yMin={-2}
          yMax={2}
          curves={[{ f: (x) => x ** 3, color: BARK }]}
          hLines={[{ y: 0, color: GOLD }]}
          points={[{ x: 0, y: 0, label: "перегиб", dy: -16 }]}
        />
      </Fig>
    </FigureRow>
  );
}

function Convexity() {
  return (
    <FigureRow>
      <Fig caption="y = x² выпукла вниз: график лежит выше касательной. Касательная в точке x = 1 имеет уравнение y = 2x − 1.">
        <FuncPlot
          xMin={-0.5}
          xMax={2.5}
          yMin={-1.5}
          yMax={5}
          curves={[
            { f: (x) => x * x, color: PINE },
            { f: (x) => 2 * x - 1, color: GOLD },
          ]}
          points={[{ x: 1, y: 1 }]}
        />
      </Fig>
      <Fig caption="y = x³. Касательная в нуле — ось Ox. Слева от нуля график ниже касательной, справа выше: выпуклость меняется, это точка перегиба.">
        <FuncPlot
          xMin={-1.5}
          xMax={1.5}
          yMin={-2}
          yMax={2}
          curves={[{ f: (x) => x ** 3, color: MOSS }]}
          points={[{ x: 0, y: 0, label: "перегиб", dy: -14 }]}
        />
      </Fig>
    </FigureRow>
  );
}

function IntegralArea() {
  return (
    <Fig caption="Интеграл ∫ от 0 до 4 функции y = x равен площади треугольника под прямой. Основание 4, высота 4, площадь (1/2)·4·4 = 8. По Ньютону–Лейбницу то же число: x²/2 от 0 до 4.">
      <FuncPlot
        xMin={-0.4}
        xMax={5}
        yMin={-0.4}
        yMax={5}
        width={460}
        shades={[{ f: (x) => x, from: 0, to: 4 }]}
        curves={[{ f: (x) => x, from: 0, to: 4.6 }]}
        points={[
          { x: 0, y: 0 },
          { x: 4, y: 4, label: "(4; 4)", dx: -28, dy: -12 },
        ]}
        notes={[{ x: 2.2, y: 1.1, text: "S = 8" }]}
      />
    </Fig>
  );
}

function ComplexPlane() {
  const O = { x: 70, y: 170 };
  const u = 36;
  const Z = { x: O.x + 2 * u, y: O.y - 3 * u };
  const Zb = { x: O.x + 2 * u, y: O.y + 3 * u };
  return (
    <Fig caption="Число z = 2 + 3i — точка плоскости. По горизонтали откладывают действительную часть, по вертикали мнимую. Сопряжённое 2 − 3i симметрично относительно оси Re. Модуль |z| — длина радиус-вектора. Точка i лежит на оси Im, а i² = −1 — на отрицательной действительной полуоси.">
      <SvgFrame w={280} h={320}>
        <line x1={24} y1={O.y} x2={250} y2={O.y} stroke={STONE} strokeWidth={1.4} />
        <line x1={O.x} y1={300} x2={O.x} y2={24} stroke={STONE} strokeWidth={1.4} />
        <line x1={O.x} y1={O.y} x2={Z.x} y2={Z.y} stroke={PINE} strokeWidth={2} />
        <line x1={Z.x} y1={Z.y} x2={Zb.x} y2={Zb.y} stroke={GOLD} strokeDasharray="4 3" />
        <circle cx={Z.x} cy={Z.y} r={4.5} fill={PINE} />
        <circle cx={Zb.x} cy={Zb.y} r={4.5} fill={GOLD} />
        <circle cx={O.x} cy={O.y - u} r={3.5} fill={MOSS} />
        <circle cx={O.x - u} cy={O.y} r={3.5} fill={MOSS} />
        <Tx x={240} y={O.y + 16} size={13}>Re</Tx>
        <Tx x={O.x + 16} y={36} size={13}>Im</Tx>
        <Tx x={Z.x + 8} y={Z.y} size={13} anchor="start">2 + 3i</Tx>
        <Tx x={Zb.x + 8} y={Zb.y} size={13} anchor="start">2 − 3i</Tx>
        <Tx x={(O.x + Z.x) / 2 - 8} y={(O.y + Z.y) / 2} size={13} italic>|z|</Tx>
        <Tx x={O.x + 12} y={O.y - u} size={13} anchor="start">i</Tx>
        <Tx x={O.x - u} y={O.y + 16} size={13}>−1</Tx>
      </SvgFrame>
    </Fig>
  );
}

export const precalcFigures: Record<string, ReactNode> = {
  "school-precalc-02": <LimitHole />,
  "school-precalc-04": <DerivativePic />,
  "school-precalc-08": <TangentNormal />,
  "school-precalc-10": <Monotonicity />,
  "school-precalc-11": <Convexity />,
  "school-precalc-14": <IntegralArea />,
  "school-precalc-15": <ComplexPlane />,
};
