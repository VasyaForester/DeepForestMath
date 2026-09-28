import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { MathText } from "../components/MathText";
import { Scratchpad } from "../components/Scratchpad";
import { useLessons } from "../data/lessons";
import { answersMatch } from "../lib/answers";
import { letterFromGrade, scoreToGrade } from "../lib/grading";
import { isLessonUnlocked, nextLesson } from "../lib/progress";
import { LESSON_BACKGROUNDS } from "../data/lessonBackgrounds";
import { useStore } from "../state";
import type { Problem } from "../types";

function isCorrect(p: Problem, value: string): boolean {
  if (p.type === "choice") {
    const idx = Number(value);
    return idx === p.answerIndex;
  }
  return answersMatch(value, p.accepted);
}

export function LessonPage() {
  const { lessonId } = useParams();
  return <LessonView key={lessonId} />;
}

function LessonView() {
  const { lessonId } = useParams();
  const lessons = useLessons();
  const { state, saveRecord } = useStore();
  const lesson = lessons.find((l) => l.id === lessonId);

  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lessonId]);

  const existing = lesson ? state.records[lesson.id] : undefined;

  const result = useMemo(() => {
    if (!lesson || !submitted) return null;
    let correct = 0;
    for (const p of lesson.problems) {
      if (isCorrect(p, values[p.id] ?? "")) correct += 1;
    }
    const total = lesson.problems.length;
    return { correct, total, grade: scoreToGrade(correct, total) };
  }, [lesson, submitted, values]);

  if (!lesson) return <Navigate to="/program/mathematics" replace />;
  if (!isLessonUnlocked(lesson, lessons, state.records)) {
    return <Navigate to={`/course/${lesson.courseId}`} replace />;
  }

  const nxt = nextLesson(lesson, lessons, state.records);

  function setVal(id: string, v: string) {
    setValues((prev) => ({ ...prev, [id]: v }));
    setSubmitted(false);
  }

  function onSubmit() {
    if (!lesson) return;
    setSubmitted(true);
    let correct = 0;
    for (const p of lesson.problems) {
      if (isCorrect(p, values[p.id] ?? "")) correct += 1;
    }
    const total = lesson.problems.length;
    saveRecord(lesson.id, {
      grade: scoreToGrade(correct, total),
      correct,
      total,
      submittedAt: new Date().toISOString(),
    });
  }

  const background = LESSON_BACKGROUNDS[lesson.id];

  return (
    <>
      {background && (
        <div
          className="lesson-photo-bg"
          style={{ backgroundImage: `url(${background})` }}
          aria-hidden
        />
      )}
      <article className="lesson-article">
      <p className="muted">
        <Link to={`/course/${lesson.courseId}`}>К курсу</Link>
      </p>
      <h1>{lesson.title}</h1>

      {lesson.purpose && (
        <section className="purpose">
          <h3>Зачем это</h3>
          <MathText text={lesson.purpose} />
        </section>
      )}

      <section className="theory">
        <h3>Теория</h3>
        <MathText text={lesson.theory} />
      </section>

      {lesson.nonexample && (
        <section className="nonexample">
          <h3>{lesson.nonexample.title}</h3>
          <MathText text={lesson.nonexample.text} />
        </section>
      )}

      {lesson.examples.map((ex, i) => (
        <section className="example" key={i}>
          <h3>Пример {i + 1}. {ex.title}</h3>
          <p>
            <MathText inline text={ex.problem} />
          </p>
          <p>
            <strong>Решение. </strong>
            <MathText inline text={ex.solution} />
          </p>
        </section>
      ))}

      <section className="example sample">
        <h3>Задание 1 — с ответом и подробным решением</h3>
        <p>
          <MathText inline text={lesson.sample.prompt} />
        </p>
        {lesson.sample.type === "choice" && (
          <ol>
            {lesson.sample.options.map((o) => (
              <li key={o}>
                <MathText inline text={o} />
              </li>
            ))}
          </ol>
        )}
        <p>
          <strong>Решение. </strong>
          <MathText inline text={lesson.sample.solution} />
        </p>
        <p className="muted">Это задание — образец, в оценку занятия не входит.</p>
      </section>

      <div className="lesson-work">
        <div>
          <h2>Задания для оценки</h2>
          {lesson.problems.map((p, i) => (
            <ProblemCard
              key={`${lesson.id}-${p.id}`}
              n={i + 2}
              problem={p}
              formName={`${lesson.id}-${p.id}`}
              value={values[p.id] ?? ""}
              onChange={(v) => setVal(p.id, v)}
              show={submitted}
            />
          ))}

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
            <button className="btn" type="button" onClick={onSubmit}>
              Сдать занятие
            </button>
            <button
              className="btn secondary"
              type="button"
              onClick={() => {
                setValues({});
                setSubmitted(false);
              }}
            >
              Сбросить ответы
            </button>
          </div>

          {result && (
            <div className="grade-banner">
              <div>
                <div className="muted">Оценка за занятие</div>
                <div className="grade-num">
                  {result.grade.toFixed(1)} / 4.0 · {letterFromGrade(result.grade)}
                </div>
                <div>
                  Верно {result.correct} из {result.total}. В журнал пишется лучшая попытка
                  {existing && existing.grade > result.grade
                    ? ` (сейчас в журнале ${existing.grade.toFixed(1)})`
                    : ""}
                  .
                </div>
              </div>
              {nxt && (
                <Link className="btn" to={`/lesson/${nxt.id}`}>
                  Следующее занятие
                </Link>
              )}
            </div>
          )}
        </div>
        <Scratchpad lessonId={lesson.id} owner={state.login} />
      </div>

      <section className="sources">
        <h3>Источники</h3>
        <ul>
          {lesson.sources.map((s) => (
            <li key={s.title}>
              {s.authors}. <em>{s.title}</em>
              {s.note ? ` — ${s.note}` : ""}
            </li>
          ))}
        </ul>
      </section>
    </article>
    </>
  );
}

function HintStack({ hints }: { hints: string[] }) {
  const [shown, setShown] = useState(0);
  if (hints.length === 0) return null;
  return (
    <div className="hints">
      {hints.slice(0, shown).map((h, i) => (
        <p key={i}>
          <strong>Подсказка {i + 1}. </strong>
          <MathText inline text={h} />
        </p>
      ))}
      {shown < hints.length && (
        <button type="button" className="btn secondary hint-btn" onClick={() => setShown((n) => n + 1)}>
          {shown === 0 ? "Подсказка" : "Ещё подсказка"}
        </button>
      )}
    </div>
  );
}

function ProblemCard({
  n,
  problem,
  formName,
  value,
  onChange,
  show,
}: {
  n: number;
  problem: Problem;
  formName: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
}) {
  const ok = show && isCorrect(problem, value);
  const bad = show && !ok;

  return (
    <section className="problem">
      <h3>Задание {n}</h3>
      <p>
        <MathText inline text={problem.prompt} />
      </p>
      {problem.type === "choice" ? (
        <div className="options">
          {problem.options.map((opt, idx) => {
            const cls =
              show && idx === problem.answerIndex
                ? "option correct"
                : show && value === String(idx) && idx !== problem.answerIndex
                  ? "option wrong"
                  : "option";
            return (
              <label key={idx} className={cls}>
                <input
                  type="radio"
                  name={formName}
                  checked={value === String(idx)}
                  onChange={() => onChange(String(idx))}
                />
                <MathText inline text={opt} />
              </label>
            );
          })}
        </div>
      ) : (
        <label className="field">
          Ответ
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="как в условии: несократимая дробь или число"
            style={
              ok
                ? { borderColor: "var(--moss)", background: "#e8f5ee" }
                : bad
                  ? { borderColor: "var(--danger)", background: "#fbeaea" }
                  : undefined
            }
          />
          <span className="muted">
            Пишите ответ в виде из условия. Равносильная запись, например сократимая дробь, может не засчитаться.
          </span>
        </label>
      )}
      {!show && <HintStack hints={problem.hints ?? []} />}
      {show && (
        <p>
          <strong>{ok ? "Верно. " : "Пояснение. "}</strong>
          <MathText inline text={problem.explanation} />
        </p>
      )}
    </section>
  );
}
