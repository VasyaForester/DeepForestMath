import { Link, Navigate, useParams } from "react-router-dom";
import { courseById, courseLeadsTo, courseStandsOn, isCourseUnlocked, isLessonUnlocked, lessonsOf } from "../lib/progress";
import { useLessons } from "../data/lessons";
import { useStore } from "../state";
import { letterFromGrade } from "../lib/grading";
import type { Course } from "../types";

export function CoursePage() {
  const { courseId } = useParams();
  const lessons = useLessons();
  const { state } = useStore();
  const course = courseId ? courseById(courseId) : undefined;
  if (!course) return <Navigate to="/program/mathematics" replace />;
  const list = lessonsOf(lessons, course.id);
  const unlocked = isCourseUnlocked(course, lessons, state.records);

  if (!unlocked) {
    return (
      <section className="card locked-panel">
        <h1>{course.title}</h1>
        <p className="muted">
          Курс ещё закрыт.{" "}
          {course.phase === "school"
            ? "Сначала сдайте предыдущие школьные курсы."
            : "Сначала сдайте школьную программу и указанные предварительные курсы."}
        </p>
        <p>
          <strong>На выходе. </strong>
          {course.outcome}
        </p>
        <CourseContext course={course} />
        <Link className="btn secondary" to="/program/mathematics">
          К программе
        </Link>
      </section>
    );
  }

  return (
    <div>
      <p className="muted">
        <Link to="/program/mathematics">Математика</Link> / {course.phase === "school" ? "школа" : "вуз"}
      </p>
      <h1>{course.title}</h1>
      <p className="muted">{course.description}</p>
      <p>
        <strong>На выходе. </strong>
        {course.outcome}
      </p>
      <CourseContext course={course} />
      <div className="lesson-list">
        {list.map((l, i) => {
          const rec = state.records[l.id];
          const open = isLessonUnlocked(l, lessons, state.records);
          const inner = (
            <>
              <div className="num">{i + 1}</div>
              <div>
                <strong>{l.title}</strong>
              </div>
              <div>
                {rec ? (
                  <span className="pill ok">
                    {rec.grade.toFixed(1)} ({letterFromGrade(rec.grade)})
                  </span>
                ) : open ? (
                  <span className="pill">Открыт</span>
                ) : (
                  <span className="pill lock">Закрыт</span>
                )}
              </div>
            </>
          );
          if (!open) {
            return (
              <div key={l.id} className="lesson-row locked">
                {inner}
              </div>
            );
          }
          return (
            <Link key={l.id} className="lesson-row" to={`/lesson/${l.id}`}>
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function CourseContext({ course }: { course: Course }) {
  const stands = courseStandsOn(course);
  const leads = courseLeadsTo(course);
  const standsText = (() => {
    if (course.phase === "school") {
      if (stands.length === 0) return "Это начало школьной программы.";
      return `Сначала сдают: ${stands.map((c) => c.title).join("; ")}.`;
    }
    if (stands.length === 0) return "Нужна вся школьная программа.";
    return `Нужна вся школьная программа, а также: ${stands.map((c) => c.title).join("; ")}.`;
  })();
  const leadsText = (() => {
    if (course.phase === "school" && leads.length === 0) {
      return "После этого открывается вузовская программа.";
    }
    if (leads.length === 0) {
      return "Этот курс дальше ни от чего напрямую не требуется: он нужен сам по себе.";
    }
    return `${course.phase === "school" ? "Дальше:" : "Открывает:"} ${leads.map((c) => c.title).join("; ")}.`;
  })();
  return (
    <div className="course-context">
      <p>
        <strong>На чём стоит. </strong>
        {standsText}
      </p>
      <p>
        <strong>Куда ведёт. </strong>
        {leadsText}
      </p>
    </div>
  );
}
