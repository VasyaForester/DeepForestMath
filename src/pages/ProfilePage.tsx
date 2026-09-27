import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLessons } from "../data/lessons";
import { currentGpa } from "../lib/progress";
import { formatGpa, letterFromGrade } from "../lib/grading";
import { useStore } from "../state";

export function ProfilePage() {
  const { state, setName, resetProgress, logout } = useStore();
  const lessons = useLessons();
  const nav = useNavigate();
  const [name, setLocal] = useState(state.name);
  const gpa = currentGpa(state.records);

  return (
    <section className="card">
      <h1>Профиль слушателя</h1>
      <p>
        Логин: <strong>{state.login}</strong>
      </p>
      <label className="field">
        Имя (для диплома)
        <input value={name} onChange={(e) => setLocal(e.target.value)} />
      </label>
      <button className="btn" type="button" onClick={() => setName(name)}>
        Сохранить имя
      </button>
      <p>
        Сдано занятий: {Object.keys(state.records).length} / {lessons.length}
      </p>
      {gpa !== null && (
        <p>
          Текущий GPA: {formatGpa(gpa)}/4.0 ({letterFromGrade(gpa)})
        </p>
      )}
      <p className="muted">
        Оценка занятия — доля верных ответов, переведённая в шкалу 0.0–4.0. В журнал пишется
        лучшая попытка. Основной диплом — после школы и базового курса; диплом лауреата — если
        сданы все курсы.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          className="btn secondary"
          type="button"
          onClick={() => {
            if (confirm("Сбросить все оценки? Логин и имя сохранятся.")) {
              resetProgress();
              nav("/program/mathematics");
            }
          }}
        >
          Сбросить прогресс
        </button>
        <button
          className="btn secondary"
          type="button"
          onClick={() => {
            logout();
            nav("/");
          }}
        >
          Выйти
        </button>
      </div>
    </section>
  );
}
