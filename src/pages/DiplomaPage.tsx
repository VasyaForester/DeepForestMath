import { Certificate } from "../components/Certificate";
import { courses, isCoreCourse } from "../data/curriculum";
import { useLessons } from "../data/lessons";
import { formatGpa } from "../lib/grading";
import {
  coreGpa,
  coreLessons,
  isCoreComplete,
  isCourseComplete,
  latinHonors,
  programGpa,
} from "../lib/progress";
import { useStore } from "../state";
import { Link } from "react-router-dom";

export function DiplomaPage() {
  const { state } = useStore();
  const lessons = useLessons();
  const core = coreGpa(lessons, state.records);
  const full = programGpa(lessons, state.records);
  const coreList = coreLessons(lessons);
  const coreDone = coreList.filter((l) => state.records[l.id]).length;
  const date = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  if (!isCoreComplete(lessons, state.records) || core === null) {
    const missing = courses
      .filter((c) => isCoreCourse(c.id) && !isCourseComplete(c.id, lessons, state.records))
      .map((c) => c.title);
    return (
      <section className="card locked-panel">
        <h1>Диплом ещё не готов</h1>
        <p className="muted">
          Основной диплом выдаётся за школьную программу и базовый курс: анализ I, линейную
          алгебру, алгебру, аналитическую геометрию и дискретную математику. Анализ II–IV, топология,
          теория чисел и остальные предметы углублённого курса для диплома не обязательны — за полный
          курс Академия выдаёт диплом лауреата. Сдано {coreDone} из {coreList.length} занятий базового
          курса.
        </p>
        {missing.length > 0 && (
          <p className="muted">Ещё не закрыты: {missing.join(", ")}.</p>
        )}
        <Link className="btn" to="/program/mathematics">
          Продолжить учёбу
        </Link>
      </section>
    );
  }

  const laureate = full !== null;

  return (
    <div className="diploma-wrap">
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ margin: 0 }}>{laureate ? "Диплом лауреата" : "Диплом"}</h1>
        <button className="btn secondary" type="button" onClick={() => window.print()}>
          Печать / PDF
        </button>
      </div>
      {laureate && full !== null ? (
        <div className="diploma-stack">
          <Certificate
            name={state.name}
            gpa={full}
            date={date}
            tier="laureate"
            honors={latinHonors(full)}
          />
          <p className="muted no-print" style={{ textAlign: "center", margin: "8px 0 0" }}>
            Ниже — диплом базового курса (средний балл {formatGpa(core)}/4.0).
          </p>
          <Certificate name={state.name} gpa={core} date={date} tier="bachelor" />
        </div>
      ) : (
        <Certificate name={state.name} gpa={core} date={date} tier="bachelor" />
      )}
    </div>
  );
}
