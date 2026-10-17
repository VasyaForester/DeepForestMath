import type { ReactNode } from "react";
import { algebraFigures } from "./algebra";
import { functionFigures } from "./functions";
import { geometryFigures } from "./geometry";
import { precalcFigures } from "./precalc";
import { trigFigures } from "./trig";
import { uniGeometryFigures } from "./uniGeometry";

const figures: Record<string, ReactNode> = {
  ...algebraFigures,
  ...functionFigures,
  ...geometryFigures,
  ...precalcFigures,
  ...trigFigures,
  ...uniGeometryFigures,
};

export function LessonFigures({ lessonId }: { lessonId: string }) {
  const node = figures[lessonId];
  if (!node) return null;
  return <div className="lesson-figures">{node}</div>;
}
