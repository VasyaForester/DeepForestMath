import type { ReactNode } from "react";
import { FuncPlot } from "./plot";
import { SvgFrame } from "./solids";
import { BARK, FILL, FILL_GOLD, GOLD, MOSS, PINE, STONE } from "./theme";
import { Fig, FigureRow, Tx } from "./ui";

const exp = (a: number) => (x: number) => a ** x;
const log2 = (x: number) => Math.log(x) / Math.LN2;
const logHalf = (x: number) => Math.log(x) / Math.log(0.5);

function VerticalTest() {
  return (
    <FigureRow>
      <Fig caption="Парабола y = x² — график функции: вертикальная прямая x = 1 пересекает её ровно в одной точке.">
        <FuncPlot
          xMin={-2.5}
          xMax={2.5}
          yMin={-1}
          yMax={5}
          curves={[{ f: (x) => x * x }]}
          vLines={[{ x: 1, color: GOLD, label: "x = 1" }]}
          points={[{ x: 1, y: 1, label: "(1; 1)", dx: 28 }]}
        />
      </Fig>
      <Fig caption="Окружность x² + y² = 1 не задаёт функцию y от x: прямая x = 0 пересекает её в двух точках, (0; 1) и (0; −1).">
        <FuncPlot
          xMin={-1.6}
          xMax={1.6}
          yMin={-1.6}
          yMax={1.6}
          grid={false}
          curves={[
            { f: (x) => Math.sqrt(Math.max(0, 1 - x * x)), from: -1, to: 1 },
            { f: (x) => -Math.sqrt(Math.max(0, 1 - x * x)), from: -1, to: 1 },
          ]}
          vLines={[{ x: 0, color: GOLD }]}
          points={[
            { x: 0, y: 1, label: "(0; 1)", dy: -12 },
            { x: 0, y: -1, label: "(0; −1)", dy: 14 },
          ]}
          yTicks={[
            { at: 1, label: "1" },
            { at: -1, label: "−1" },
          ]}
          xTicks={[
            { at: -1, label: "−1" },
            { at: 1, label: "1" },
          ]}
        />
      </Fig>
    </FigureRow>
  );
}

function LinearQuadratic() {
  return (
    <FigureRow>
      <Fig caption="Прямая y = 2x − 1. Угловой коэффициент 2 > 0, поэтому прямая растёт. Она пересекает ось Oy в (0; −1) и ось Ox в (1/2; 0).">
        <FuncPlot
          xMin={-1}
          xMax={3}
          yMin={-2}
          yMax={4}
          curves={[{ f: (x) => 2 * x - 1 }]}
          points={[
            { x: 0, y: -1, label: "(0; −1)", dx: 36, dy: 8 },
            { x: 0.5, y: 0, label: "(1/2; 0)", dy: -14, dx: 8 },
          ]}
        />
      </Fig>
      <Fig caption="Парабола y = x². Ветви вверх, вершина — начало координат, ось симметрии x = 0.">
        <FuncPlot
          xMin={-3}
          xMax={3}
          yMin={-1}
          yMax={6}
          curves={[{ f: (x) => x * x, color: MOSS }]}
          points={[{ x: 0, y: 0, label: "вершина", dy: 16 }]}
        />
      </Fig>
    </FigureRow>
  );
}

function VertexZeros() {
  return (
    <FigureRow>
      <Fig caption="y = x² − 4x + 3 = (x − 1)(x − 3). Корни 1 и 3, вершина (2; −1) — минимум, ось симметрии x = 2, ветви вверх.">
        <FuncPlot
          xMin={-0.5}
          xMax={4.5}
          yMin={-2}
          yMax={4}
          curves={[{ f: (x) => x * x - 4 * x + 3 }]}
          vLines={[{ x: 2, color: GOLD, label: "x = 2" }]}
          points={[
            { x: 1, y: 0, label: "1", dy: 16 },
            { x: 3, y: 0, label: "3", dy: 16 },
            { x: 2, y: -1, label: "вершина", dy: 16 },
          ]}
        />
      </Fig>
      <Fig caption="Если a < 0, ветви смотрят вниз, вершина — максимум. Здесь y = −(x − 1)² + 2, максимум в точке (1; 2).">
        <FuncPlot
          xMin={-1.5}
          xMax={3.5}
          yMin={-2}
          yMax={3}
          curves={[{ f: (x) => -((x - 1) ** 2) + 2, color: BARK }]}
          points={[{ x: 1, y: 2, label: "max", dy: -14 }]}
        />
      </Fig>
    </FigureRow>
  );
}

function Transforms() {
  return (
    <FigureRow>
      <Fig caption="Пунктир — y = x². Сплошная кривая y = (x − 2)² + 3 получается сдвигом на 2 вправо и на 3 вверх. Вершина уезжает из (0; 0) в (2; 3).">
        <FuncPlot
          xMin={-2}
          xMax={5}
          yMin={-1}
          yMax={8}
          curves={[
            { f: (x) => x * x, dash: "5 4", color: STONE, width: 1.6 },
            { f: (x) => (x - 2) ** 2 + 3, color: PINE },
          ]}
          points={[
            { x: 0, y: 0, color: STONE, open: true },
            { x: 2, y: 3, label: "(2; 3)", dx: 26 },
          ]}
        />
      </Fig>
      <Fig caption="y = |x| и y = −|x|. Вторая кривая — отражение первой относительно оси Ox: каждое значение меняет знак.">
        <FuncPlot
          xMin={-3}
          xMax={3}
          yMin={-3.2}
          yMax={3.2}
          curves={[
            { f: (x) => Math.abs(x), color: PINE },
            { f: (x) => -Math.abs(x), color: GOLD },
          ]}
          notes={[
            { x: 2.1, y: 2.2, text: "|x|" },
            { x: 2.1, y: -2.2, text: "−|x|" },
          ]}
        />
      </Fig>
    </FigureRow>
  );
}

function Inverse() {
  return (
    <Fig caption="Графики y = 2x + 1 и обратной y = (x − 1)/2 симметричны относительно прямой y = x. Точка (0; 1) переходит в (1; 0): аргумент и значение меняются местами.">
      <FuncPlot
        xMin={-2}
        xMax={4}
        yMin={-2}
        yMax={4}
        width={480}
        curves={[
          { f: (x) => 2 * x + 1, color: PINE },
          { f: (x) => (x - 1) / 2, color: GOLD },
          { f: (x) => x, color: STONE, dash: "5 4", width: 1.4 },
        ]}
        points={[
          { x: 0, y: 1, label: "(0; 1)", dx: -28 },
          { x: 1, y: 0, label: "(1; 0)", dy: 16 },
        ]}
        notes={[{ x: 3.2, y: 2.4, text: "y = x" }]}
      />
    </Fig>
  );
}

function Exponential() {
  return (
    <Fig caption="y = 2ˣ возрастает, y = (1/2)ˣ убывает. Обе определены на всей прямой, обе проходят через (0; 1) и приближаются к оси Ox, но не пересекают её: значение всегда положительно.">
      <FuncPlot
        xMin={-3}
        xMax={3}
        yMin={-0.6}
        yMax={8}
        width={500}
        height={320}
        curves={[
          { f: exp(2), color: PINE },
          { f: exp(0.5), color: GOLD },
        ]}
        points={[{ x: 0, y: 1, label: "(0; 1)", dx: 36, dy: -4 }]}
        notes={[
          { x: 1.7, y: 4.2, text: "2ˣ" },
          { x: -1.7, y: 4.2, text: "(1/2)ˣ" },
        ]}
      />
    </Fig>
  );
}

function Logarithm() {
  return (
    <FigureRow>
      <Fig caption="y = log₂ x определён только при x > 0. График проходит через (1; 0) и (2; 1), ось Oy — вертикальная асимптота.">
        <FuncPlot
          xMin={-0.6}
          xMax={6}
          yMin={-3}
          yMax={3}
          curves={[{ f: log2, from: 0.08, to: 6, color: PINE }]}
          points={[
            { x: 1, y: 0, label: "(1; 0)", dy: 16 },
            { x: 2, y: 1, label: "(2; 1)", dx: 8, dy: -14 },
            { x: 4, y: 2, label: "(4; 2)", dx: 8 },
          ]}
        />
      </Fig>
      <Fig caption="Логарифм — функция, обратная показательной. y = 2ˣ и y = log₂ x симметричны относительно прямой y = x.">
        <FuncPlot
          xMin={-0.8}
          xMax={4.6}
          yMin={-1.6}
          yMax={4.6}
          curves={[
            { f: exp(2), from: -1.5, to: 2.15, color: PINE },
            { f: log2, from: 0.12, to: 4.5, color: GOLD },
            { f: (x) => x, color: STONE, dash: "5 4", width: 1.4 },
          ]}
          notes={[
            { x: 1.5, y: 3.5, text: "2ˣ" },
            { x: 3.6, y: 1.2, text: "log₂ x" },
          ]}
        />
      </Fig>
    </FigureRow>
  );
}

function LogEquation() {
  return (
    <Fig caption="Уравнение log₂ x = 2 — это пересечение графика логарифма с горизонталью y = 2. Корень один: x = 4. Левее оси Oy логарифм не существует, поэтому посторонних корней слева быть не может.">
      <FuncPlot
        xMin={-0.5}
        xMax={6}
        yMin={-2}
        yMax={3.2}
        width={480}
        curves={[{ f: log2, from: 0.1, to: 6 }]}
        hLines={[{ y: 2, color: GOLD, label: "y = 2" }]}
        points={[{ x: 4, y: 2, label: "x = 4", dy: -14, dx: -8 }]}
      />
    </Fig>
  );
}

function ExpIneq() {
  return (
    <FigureRow>
      <Fig caption="Основание 2 > 1, функция возрастает. 2ˣ > 4 = 2² ровно тогда, когда x > 2. Жирным выделен кусок графика, где неравенство верно.">
        <FuncPlot
          xMin={-1}
          xMax={4}
          yMin={-0.5}
          yMax={10}
          curves={[
            { f: exp(2), color: STONE, width: 1.6 },
            { f: exp(2), from: 2, to: 3.3, color: MOSS, width: 3.4 },
          ]}
          hLines={[{ y: 4, color: GOLD, label: "y = 4" }]}
          points={[{ x: 2, y: 4 }]}
        />
      </Fig>
      <Fig caption="Основание 1/2 < 1, функция убывает, знак меняется. (1/2)ˣ > 1/4 = (1/2)² ровно тогда, когда x < 2.">
        <FuncPlot
          xMin={-1}
          xMax={3.2}
          yMin={-0.15}
          yMax={2.4}
          curves={[
            { f: exp(0.5), color: STONE, width: 1.6 },
            { f: exp(0.5), from: -0.8, to: 2, color: MOSS, width: 3.4 },
          ]}
          hLines={[{ y: 0.25, color: GOLD, label: "y = 1/4" }]}
          points={[{ x: 2, y: 0.25, label: "x = 2", dx: 18, dy: -12 }]}
        />
      </Fig>
    </FigureRow>
  );
}

function LogIneq() {
  return (
    <FigureRow>
      <Fig caption="log₂ x > 1 при x > 2. Основание больше 1, неравенство сохраняет направление. Жирным выделен кусок графика, где неравенство верно.">
        <FuncPlot
          xMin={-0.4}
          xMax={6}
          yMin={-2}
          yMax={3}
          curves={[
            { f: log2, from: 0.12, to: 6, color: STONE, width: 1.6 },
            { f: log2, from: 2, to: 6, color: MOSS, width: 3.4 },
          ]}
          hLines={[{ y: 1, color: GOLD, label: "y = 1" }]}
          points={[{ x: 2, y: 1 }]}
        />
      </Fig>
      <Fig caption="У log с основанием 1/2 знак меняется: log₁/₂ x > 1 при 0 < x < 1/2. Область определения по-прежнему только x > 0.">
        <FuncPlot
          xMin={-0.3}
          xMax={2.5}
          yMin={-2}
          yMax={3}
          curves={[
            { f: logHalf, from: 0.08, to: 2.4, color: STONE, width: 1.6 },
            { f: logHalf, from: 0.08, to: 0.5, color: MOSS, width: 3.4 },
          ]}
          hLines={[{ y: 1, color: GOLD, label: "y = 1" }]}
          points={[{ x: 0.5, y: 1, label: "1/2", dy: 16 }]}
        />
      </Fig>
    </FigureRow>
  );
}

function EvenOdd() {
  return (
    <FigureRow>
      <Fig caption="y = x² чётная: график симметричен относительно оси Oy. Точки (2; 4) и (−2; 4) лежат на одной высоте.">
        <FuncPlot
          xMin={-3}
          xMax={3}
          yMin={-1}
          yMax={6}
          curves={[{ f: (x) => x * x }]}
          points={[
            { x: 2, y: 4, label: "(2; 4)", dx: 8 },
            { x: -2, y: 4, label: "(−2; 4)", dx: -8 },
          ]}
        />
      </Fig>
      <Fig caption="y = x³ нечётная: график симметричен относительно начала координат. Вместе с (1,5; 3,4) на кривой лежит (−1,5; −3,4).">
        <FuncPlot
          xMin={-2}
          xMax={2}
          yMin={-4}
          yMax={4}
          curves={[{ f: (x) => x ** 3, color: BARK }]}
          points={[
            { x: 1.5, y: 3.375, label: "(1,5; 3,4)", dx: -20, dy: -12 },
            { x: -1.5, y: -3.375, label: "(−1,5; −3,4)", dx: 16, dy: 14 },
          ]}
        />
      </Fig>
    </FigureRow>
  );
}

function PowerFns() {
  return (
    <FigureRow>
      <Fig caption="Чётная степень y = x² симметрична относительно Oy. Нечётная y = x³ симметрична относительно начала и идёт из третьей четверти в первую.">
        <FuncPlot
          xMin={-2}
          xMax={2}
          yMin={-4}
          yMax={4}
          curves={[
            { f: (x) => x * x, color: PINE },
            { f: (x) => x ** 3, color: GOLD },
          ]}
          notes={[
            { x: 1.35, y: 2.5, text: "x²" },
            { x: 1.45, y: 3.6, text: "x³" },
          ]}
        />
      </Fig>
      <Fig caption="y = √x существует при x ≥ 0. y = 1/x — гипербола: вертикальная асимптота x = 0 и горизонтальная y = 0.">
        <FuncPlot
          xMin={-4}
          xMax={4}
          yMin={-4}
          yMax={4}
          curves={[
            { f: (x) => (x >= 0 ? Math.sqrt(x) : Number.NaN), color: MOSS },
            { f: (x) => 1 / x, color: BARK },
          ]}
          notes={[
            { x: 2.6, y: 2.1, text: "√x" },
            { x: 2.2, y: 0.7, text: "1/x" },
          ]}
        />
      </Fig>
    </FigureRow>
  );
}

function Piecewise() {
  return (
    <Fig caption="f(x) = x + 1 при x < 0 и f(x) = 2x при x ≥ 0. В нуле действует вторая формула, поэтому (0; 0) закрашена, а (0; 1) — пустая: левый кусок к ней подходит, но значение в нуле другое.">
      <FuncPlot
        xMin={-3}
        xMax={3}
        yMin={-2}
        yMax={6}
        width={480}
        curves={[
          { f: (x) => (x < 0 ? x + 1 : Number.NaN), color: PINE },
          { f: (x) => (x >= 0 ? 2 * x : Number.NaN), color: GOLD },
        ]}
        points={[
          { x: 0, y: 1, open: true, label: "пусто", dx: -36, dy: -18 },
          { x: 0, y: 0, label: "f(0) = 0", dx: 36, dy: 10 },
        ]}
      />
    </Fig>
  );
}

function Composition() {
  return (
    <FigureRow>
      <Fig caption="Сначала внутренняя функция: g(3) = 3² = 9. Потом внешняя: f(9) = 2·9 + 1 = 19. Это (f ∘ g)(3), а не произведение f и g.">
        <SvgFrame w={520} h={130}>
          {[
            { x: 8, w: 62, t: "x = 3", fill: FILL },
            { x: 96, w: 108, t: "квадрат", fill: FILL_GOLD },
            { x: 230, w: 44, t: "9", fill: FILL },
            { x: 300, w: 108, t: "2t + 1", fill: FILL_GOLD },
            { x: 434, w: 70, t: "19", fill: FILL },
          ].map((b) => (
            <g key={b.t}>
              <rect x={b.x} y={42} width={b.w} height={42} rx={10} fill={b.fill} stroke={PINE} strokeWidth={1.6} />
              <Tx x={b.x + b.w / 2} y={63} size={14}>{b.t}</Tx>
            </g>
          ))}
          <line x1={70} y1={63} x2={90} y2={63} stroke={PINE} strokeWidth={1.6} />
          <polygon points="90,63 80,58 80,68" fill={PINE} />
          <line x1={204} y1={63} x2={224} y2={63} stroke={PINE} strokeWidth={1.6} />
          <polygon points="224,63 214,58 214,68" fill={PINE} />
          <line x1={274} y1={63} x2={294} y2={63} stroke={PINE} strokeWidth={1.6} />
          <polygon points="294,63 284,58 284,68" fill={PINE} />
          <line x1={408} y1={63} x2={428} y2={63} stroke={PINE} strokeWidth={1.6} />
          <polygon points="428,63 418,58 418,68" fill={PINE} />
        </SvgFrame>
      </Fig>
      <Fig caption="Порядок важен. Для f(t) = t² и g(t) = t + 1 график (f ∘ g)(x) = (x + 1)² — сдвинутая парабола, а (g ∘ f)(x) = x² + 1 — та же парабола, поднятая на 1.">
        <FuncPlot
          xMin={-3}
          xMax={2}
          yMin={-1}
          yMax={6}
          curves={[
            { f: (x) => (x + 1) ** 2, color: PINE },
            { f: (x) => x * x + 1, color: GOLD },
          ]}
          notes={[
            { x: -2.2, y: 2.2, text: "(x+1)²" },
            { x: 1.1, y: 2.6, text: "x²+1" },
          ]}
        />
      </Fig>
    </FigureRow>
  );
}

function AtInfinity() {
  return (
    <FigureRow>
      <Fig caption="y = 1/x при x → ±∞ приближается к нулю, но не достигает его. Прямая y = 0 — горизонтальная асимптота, прямая x = 0 — вертикальная.">
        <FuncPlot
          xMin={-4}
          xMax={4}
          yMin={-4}
          yMax={4}
          curves={[{ f: (x) => 1 / x, color: PINE }]}
        />
      </Fig>
      <Fig caption="y = 2 + 1/x при больших |x| садится на прямую y = 2. Это и есть горизонтальная асимптота: график к ней приближается и не обязан её пересекать.">
        <FuncPlot
          xMin={-4}
          xMax={4}
          yMin={-2}
          yMax={6}
          curves={[{ f: (x) => 2 + 1 / x, color: MOSS }]}
          hLines={[{ y: 2, color: GOLD, label: "y = 2" }]}
        />
      </Fig>
    </FigureRow>
  );
}

export const functionFigures: Record<string, ReactNode> = {
  "school-functions-01": <VerticalTest />,
  "school-functions-02": <LinearQuadratic />,
  "school-functions-03": <VertexZeros />,
  "school-functions-04": <Transforms />,
  "school-functions-05": <Inverse />,
  "school-functions-06": <Exponential />,
  "school-functions-07": <Logarithm />,
  "school-functions-08": <LogEquation />,
  "school-functions-09": (
    <>
      <ExpIneq />
      <LogIneq />
    </>
  ),
  "school-functions-10": <ExpIneq />,
  "school-functions-11": <LogIneq />,
  "school-functions-12": <EvenOdd />,
  "school-functions-13": <PowerFns />,
  "school-functions-14": <Piecewise />,
  "school-functions-15": <Composition />,
  "school-functions-16": <AtInfinity />,
};
