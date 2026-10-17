import type { ReactNode } from "react";
import { FuncPlot, NumberLine } from "./plot";
import { SvgFrame } from "./solids";
import { FILL, FILL_GOLD, GOLD, PINE } from "./theme";
import { Fig, FigureRow, Tx } from "./ui";

function NumberSets() {
  return (
    <Fig caption="Действительная прямая: целые точки, иррациональные √2 и π. Ниже — отрезок [−1; 2] (концы входят) и открытый луч (3; +∞) (точка 3 не входит).">
      <NumberLine
        min={-3}
        max={5}
        marks={[
          { at: -2, label: "−2" },
          { at: 0, label: "0" },
          { at: 1, label: "1" },
          { at: 1.41, label: "√2" },
          { at: 3.14, label: "π" },
        ]}
      />
      <NumberLine
        min={-3}
        max={6}
        marks={[
          { at: -1, label: "−1" },
          { at: 2, label: "2" },
          { at: 3, label: "3", filled: false },
        ]}
        bands={[
          { from: -1, to: 2 },
          { from: 3, to: 6 },
        ]}
      />
    </Fig>
  );
}

function SquareSum() {
  return (
    <Fig caption="Квадрат со стороной a + b разрезан на a², b² и два прямоугольника ab. Отсюда (a + b)² = a² + 2ab + b².">
      <SvgFrame w={280} h={280}>
        <rect x={36} y={36} width={150} height={150} fill={FILL} stroke={PINE} strokeWidth={1.6} />
        <rect x={186} y={36} width={62} height={150} fill={FILL_GOLD} stroke={PINE} strokeWidth={1.6} />
        <rect x={36} y={186} width={150} height={62} fill={FILL_GOLD} stroke={PINE} strokeWidth={1.6} />
        <rect x={186} y={186} width={62} height={62} fill="#f3ece3" stroke={PINE} strokeWidth={1.6} />
        <Tx x={111} y={111} italic>a²</Tx>
        <Tx x={217} y={111} italic>ab</Tx>
        <Tx x={111} y={217} italic>ab</Tx>
        <Tx x={217} y={217} italic>b²</Tx>
        <Tx x={111} y={22} italic>a</Tx>
        <Tx x={217} y={22} italic>b</Tx>
        <Tx x={18} y={111} italic>a</Tx>
        <Tx x={18} y={217} italic>b</Tx>
      </SvgFrame>
    </Fig>
  );
}

function LinearSystems() {
  return (
    <FigureRow>
      <Fig caption="x + y = 5 и x − y = 1 пересекаются в одной точке (3; 2) — единственное решение.">
        <FuncPlot
          xMin={0}
          xMax={5}
          yMin={0}
          yMax={5}
          height={240}
          curves={[
            { f: (x) => 5 - x, color: PINE },
            { f: (x) => x - 1, color: GOLD },
          ]}
          points={[{ x: 3, y: 2, label: "(3; 2)", dy: -12 }]}
        />
      </Fig>
      <Fig caption="Прямые y = x и y = x + 2 параллельны и различны. Общих точек нет — система не имеет решений.">
        <FuncPlot
          xMin={-1}
          xMax={3}
          yMin={-1}
          yMax={5}
          height={240}
          curves={[
            { f: (x) => x, color: PINE },
            { f: (x) => x + 2, color: GOLD },
          ]}
        />
      </Fig>
      <Fig caption="Оба уравнения задают одну и ту же прямую y = x. Решений бесконечно много: годится любая её точка.">
        <FuncPlot
          xMin={-1}
          xMax={3}
          yMin={-1}
          yMax={3}
          height={240}
          curves={[
            { f: (x) => x, color: PINE, width: 3 },
            { f: (x) => x, color: GOLD, dash: "6 4", width: 2 },
          ]}
        />
      </Fig>
    </FigureRow>
  );
}

function LinearIneq() {
  return (
    <Fig caption="Два разных неравенства, каждое на своей прямой. Строгое x > 2 — открытый луч, точка 2 не входит. Нестрогое x ≤ −1 — закрытый луч, точка −1 входит.">
      <NumberLine
        title="x > 2"
        min={-4}
        max={5}
        marks={[{ at: 2, label: "2", filled: false }]}
        bands={[{ from: 2, to: 5 }]}
      />
      <NumberLine
        title="x ≤ −1"
        min={-4}
        max={5}
        marks={[{ at: -1, label: "−1" }]}
        bands={[{ from: -4, to: -1 }]}
      />
    </Fig>
  );
}

function IntervalMethod() {
  return (
    <Fig caption="Парабола y = (x − 2)(x − 3) смотрит вверх и положительна вне корней. На прямой знаки +, −, +. Неравенство (x − 2)(x − 3) > 0 выполняется при x < 2 и при x > 3; сами корни не входят.">
      <FuncPlot
        xMin={0}
        xMax={5}
        yMin={-1.5}
        yMax={3}
        height={240}
        curves={[{ f: (x) => (x - 2) * (x - 3) }]}
        points={[
          { x: 2, y: 0, label: "2", dy: 16 },
          { x: 3, y: 0, label: "3", dy: 16 },
        ]}
      />
      <NumberLine
        min={0}
        max={5}
        marks={[
          { at: 2, label: "2", filled: false },
          { at: 3, label: "3", filled: false },
        ]}
        signs={[
          { at: 1, text: "+" },
          { at: 2.5, text: "−" },
          { at: 4, text: "+" },
        ]}
        bands={[
          { from: 0, to: 2 },
          { from: 3, to: 5 },
        ]}
      />
    </Fig>
  );
}

function ModulusLine() {
  return (
    <Fig caption="|x − 3| — расстояние от x до 3. Уравнение |x − 3| = 5 даёт две точки, −2 и 8. Неравенство |x − 3| < 5 — открытый промежуток между ними.">
      <NumberLine
        title="|x − 3| = 5"
        min={-4}
        max={10}
        marks={[
          { at: -2, label: "−2" },
          { at: 3, label: "3" },
          { at: 8, label: "8" },
        ]}
      />
      <NumberLine
        title="|x − 3| < 5"
        min={-4}
        max={10}
        marks={[
          { at: -2, label: "−2", filled: false },
          { at: 3, label: "3" },
          { at: 8, label: "8", filled: false },
        ]}
        bands={[{ from: -2, to: 8 }]}
      />
    </Fig>
  );
}

function IneqSystem() {
  return (
    <Fig caption="Система x ≥ −1 и x < 3 — пересечение лучей. Общая часть [−1; 3): левый конец входит, правый нет.">
      <NumberLine
        min={-4}
        max={5}
        marks={[{ at: -1, label: "x ≥ −1" }]}
        bands={[{ from: -1, to: 5 }]}
      />
      <NumberLine
        min={-4}
        max={5}
        marks={[{ at: 3, label: "x < 3", filled: false }]}
        bands={[{ from: -4, to: 3 }]}
      />
      <NumberLine
        min={-4}
        max={5}
        marks={[
          { at: -1, label: "−1" },
          { at: 3, label: "3", filled: false },
        ]}
        bands={[{ from: -1, to: 3 }]}
      />
    </Fig>
  );
}

function RationalIneq() {
  return (
    <Fig caption="Метод интервалов для (x − 1) / (x − 2) < 0. В точке 1 числитель обнуляется, в точке 2 знаменатель: туда крест, точка не входит. Знак минус только между ними, ответ (1; 2).">
      <NumberLine
        min={-1}
        max={4}
        marks={[
          { at: 1, label: "1", filled: false },
          { at: 2, label: "2", hole: true },
        ]}
        signs={[
          { at: 0, text: "+" },
          { at: 1.5, text: "−" },
          { at: 3, text: "+" },
        ]}
        bands={[{ from: 1, to: 2 }]}
      />
    </Fig>
  );
}

export const algebraFigures: Record<string, ReactNode> = {
  "school-algebra-02": <NumberSets />,
  "school-algebra-06": <SquareSum />,
  "school-algebra-08": <LinearSystems />,
  "school-algebra-11": <LinearIneq />,
  "school-algebra-12": <IntervalMethod />,
  "school-algebra-13": <ModulusLine />,
  "school-algebra-15": <IneqSystem />,
  "school-algebra-17": <RationalIneq />,
};
