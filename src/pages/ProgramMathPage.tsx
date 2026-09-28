import { Link } from "react-router-dom";
import { courses, isCoreCourse, PROGRAM } from "../data/curriculum";
import { useLessons } from "../data/lessons";
import {
  currentGpa,
  isCourseComplete,
  isCourseUnlocked,
  isSchoolComplete,
  lessonsOf,
} from "../lib/progress";
import { formatGpa, letterFromGrade } from "../lib/grading";
import { useStore } from "../state";
import type { Course } from "../types";

export function ProgramMathPage() {
  const { state } = useStore();
  const lessons = useLessons();
  const gpa = currentGpa(state.records);
  const schoolDone = isSchoolComplete(lessons, state.records);
  const school = courses.filter((c) => c.phase === "school");
  const uniCore = courses.filter((c) => c.phase === "university" && isCoreCourse(c.id));
  const uniAdv = courses.filter((c) => c.phase === "university" && !isCoreCourse(c.id));

  const renderCourse = (c: Course, kind: "school" | "core" | "advanced") => {
    const list = lessonsOf(lessons, c.id);
    const unlocked = isCourseUnlocked(c, lessons, state.records);
    const complete = isCourseComplete(c.id, lessons, state.records);
    const done = list.filter((l) => state.records[l.id]).length;
    return (
      <Link
        key={c.id}
        to={unlocked ? `/course/${c.id}` : "#"}
        className="card"
        style={{ color: "inherit", opacity: unlocked ? 1 : 0.55, pointerEvents: unlocked ? "auto" : "none" }}
      >
        <span className={`pill ${complete ? "ok" : unlocked ? "" : "lock"}`}>
          {complete ? "Закрыт" : unlocked ? "Открыт" : kind === "school" ? "Закрыт до предыдущего курса" : "Ждёт предварительные курсы"}
        </span>
        {kind !== "school" && (
          <span className={`pill ${kind === "core" ? "core" : "advanced"}`} style={{ marginLeft: 6 }}>
            {kind === "core" ? "Базовый курс" : "Углубленный курс"}
          </span>
        )}
        <h3>{c.title}</h3>
        {kind === "school" ? (
          <>
            <p className="muted">{c.description}</p>
            <p className="muted">На выходе: {c.outcome}</p>
          </>
        ) : (
          <>
            <p className="muted">{c.subtitle}</p>
            <p className="muted">{c.description}</p>
            <p className="muted">На выходе: {c.outcome}</p>
          </>
        )}
        <p>
          {done}/{list.length} занятий
        </p>
      </Link>
    );
  };

  return (
    <div>
      <p className="pill">Программа</p>
      <h1>{PROGRAM.title}</h1>
      <p className="muted">
        {lessons.length} занятий. После школы параллельно идут линейная алгебра, анализ I,
        аналитическая геометрия и дискретная математика. Алгебра групп, колец и полей открывается
        после линейной алгебры, теория чисел — после дискретной математики, дифференциальные
        уравнения — после анализа I. Основной диплом — за школу и базовый курс. Анализ II–IV,
        топология и остальные предметы углубленного курса для диплома не обязательны; если закрыть
        всю программу, Академия выдаёт диплом лауреата.
      </p>
      {gpa !== null && (
        <p>
          Текущий GPA: <strong>{formatGpa(gpa)}/4.0</strong> ({letterFromGrade(gpa)})
        </p>
      )}

      <h2>Школьная программа</h2>
      <div className="grid">{school.map((c) => renderCourse(c, "school"))}</div>

      <h2>Базовый курс</h2>
      {!schoolDone && (
        <p className="muted">Откроется, когда будут сданы все школьные занятия.</p>
      )}
      <div className="grid">{uniCore.map((c) => renderCourse(c, "core"))}</div>

      <h2>Углубленный курс</h2>
      <p className="muted">
        Не обязательно для основного диплома. Полный курс, включая анализ II–IV и топологию, даёт
        диплом лауреата.
      </p>
      <div className="grid">{uniAdv.map((c) => renderCourse(c, "advanced"))}</div>
    </div>
  );
}
