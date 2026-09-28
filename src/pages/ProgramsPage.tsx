import { Link } from "react-router-dom";
import { SiteStatsLink } from "../components/SiteStats";
import { PROGRAM } from "../data/curriculum";
import { useLessons } from "../data/lessons";
import { currentGpa, isSchoolComplete } from "../lib/progress";
import { formatGpa } from "../lib/grading";
import { useStore } from "../state";

export function ProgramsPage() {
  const { state } = useStore();
  const lessons = useLessons();
  const gpa = currentGpa(state.records);
  const schoolDone = isSchoolComplete(lessons, state.records);
  const done = Object.keys(state.records).length;

  return (
    <div>
      <h1>Учебные программы</h1>
      <p className="muted">
        Академия будет расти: новые факультеты появятся рядом. Сейчас открыт курс математики.
      </p>
      <div className="grid" style={{ marginTop: 20 }}>
        <Link to="/program/mathematics" className="card" style={{ color: "inherit" }}>
          <span className="pill ok">Открыта</span>
          <h2 style={{ margin: "10px 0 6px" }}>{PROGRAM.title}</h2>
          <p className="muted">{PROGRAM.tagline}</p>
          <p>
            Пройдено занятий: {done} / {lessons.length}
            {gpa !== null ? ` · текущий средний балл (GPA) ${formatGpa(gpa)}` : ""}
          </p>
          <p className="muted">
            {schoolDone
              ? "Школьная программа закрыта — доступны вузовские треки. Диплом — за базовый курс (без анализа II–IV и топологии); полный курс даёт диплом лауреата."
              : "Сначала закройте школьную программу, затем откроется высшая математика. Основной диплом — за школу и базовый курс."}
          </p>
        </Link>
        <div className="card" style={{ opacity: 0.7 }}>
          <span className="pill lock">Скоро</span>
          <h2 style={{ margin: "10px 0 6px" }}>Физика</h2>
          <p className="muted">Следующая программа академии. Пока тропа не проложена.</p>
        </div>
        <div className="card" style={{ opacity: 0.7 }}>
          <span className="pill lock">Скоро</span>
          <h2 style={{ margin: "10px 0 6px" }}>Информатика</h2>
          <p className="muted">Готовится как отдельный факультет Deep Forest Academy.</p>
        </div>
      </div>
      <SiteStatsLink />
    </div>
  );
}
