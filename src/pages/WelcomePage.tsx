import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Crest } from "../components/Crest";
import { peekLegacyName } from "../lib/storage";
import { useStore } from "../state";

type Mode = "login" | "register";

export function WelcomePage() {
  const { state, login, register } = useStore();
  const nav = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState(peekLegacyName());
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  if (state.login) return <Navigate to="/programs" replace />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      if (mode === "login") {
        await login(loginValue, password);
      } else {
        if (password !== password2) {
          throw new Error("Пароли не совпадают.");
        }
        await register(loginValue, password, name);
      }
      nav("/programs");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Не удалось войти.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="main">
      <section className="card hero">
        <Crest />
        <div>
          <h1>Deep Forest Academy</h1>
          <p className="muted">углубленное изучение математики</p>
          <div className="auth-tabs" role="tablist">
            <button
              type="button"
              className={`auth-tab ${mode === "login" ? "on" : ""}`}
              onClick={() => {
                setMode("login");
                setErr("");
              }}
            >
              Войти
            </button>
            <button
              type="button"
              className={`auth-tab ${mode === "register" ? "on" : ""}`}
              onClick={() => {
                setMode("register");
                setErr("");
              }}
            >
              Регистрация
            </button>
          </div>
          <form onSubmit={onSubmit}>
            <label className="field">
              Логин
              <input
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                autoComplete="username"
                autoFocus
                placeholder="латиницей"
              />
            </label>
            <label className="field">
              Пароль
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
            </label>
            {mode === "register" && (
              <>
                <label className="field">
                  Повторите пароль
                  <input
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    autoComplete="new-password"
                  />
                </label>
                <label className="field">
                  Имя (для диплома)
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="Например, Анна Лесная"
                  />
                </label>
              </>
            )}
            {err && <p style={{ color: "var(--danger)" }}>{err}</p>}
            <button className="btn" type="submit" disabled={busy}>
              {mode === "login" ? "Войти" : "Зарегистрироваться"}
            </button>
          </form>
          <p className="muted" style={{ marginTop: 16 }}>
            Учётная запись хранится в этом браузере на этом устройстве. Логин — для входа, имя —
            отдельно, оно пишется на дипломе.
            {peekLegacyName()
              ? " Если вы уже занимались раньше, зарегистрируйтесь — оценки перенесутся на новый логин."
              : ""}
          </p>
        </div>
      </section>
    </div>
  );
}
