import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Crest } from "./Crest";
import { useStore } from "../state";
import { currentGpa } from "../lib/progress";
import { formatGpa } from "../lib/grading";

export function Layout() {
  const { state, logout } = useStore();
  const nav = useNavigate();
  const gpa = currentGpa(state.records);

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/programs" className="brand">
          <Crest />
          <div className="brand-name">
            <strong>Deep Forest Academy</strong>
          </div>
        </NavLink>
        <nav className="nav">
          <NavLink to="/programs" end>
            Программы
          </NavLink>
          <NavLink to="/program/mathematics">Математика</NavLink>
          <NavLink to="/glossary">Словарь</NavLink>
          <NavLink to="/diploma">Диплом</NavLink>
          <NavLink to="/profile">{state.name || "Профиль"}</NavLink>
          {gpa !== null && <span className="pill ok">Средний балл {formatGpa(gpa)}</span>}
          <button
            type="button"
            className="linkish"
            onClick={() => {
              logout();
              nav("/");
            }}
          >
            Выйти
          </button>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        Deep Forest Academy
      </footer>
    </div>
  );
}
