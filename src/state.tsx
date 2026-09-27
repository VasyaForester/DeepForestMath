import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AppState, LessonRecord } from "./types";
import { syncSiteStats } from "./lib/stats";
import {
  loadState,
  loginAccount,
  logoutAccount,
  registerAccount,
  saveState,
} from "./lib/storage";

interface Store {
  state: AppState;
  register: (login: string, password: string, name: string) => Promise<void>;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
  setName: (name: string) => void;
  saveRecord: (lessonId: string, record: LessonRecord) => void;
  resetProgress: () => void;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState());

  useEffect(() => {
    if (!state.login) return;
    syncSiteStats(state.login, Object.keys(state.records));
  }, [state.login, state.records]);

  const api = useMemo<Store>(
    () => ({
      state,
      register: async (login, password, name) => {
        const next = await registerAccount(login, password, name);
        setState(next);
      },
      login: async (login, password) => {
        const next = await loginAccount(login, password);
        setState(next);
      },
      logout: () => {
        setState(logoutAccount());
      },
      setName: (name) => {
        const next = { ...state, name: name.trim() };
        setState(next);
        saveState(next);
      },
      saveRecord: (lessonId, record) => {
        const prev = state.records[lessonId];
        const keep = prev && prev.grade >= record.grade ? prev : record;
        const next = { ...state, records: { ...state.records, [lessonId]: keep } };
        setState(next);
        saveState(next);
      },
      resetProgress: () => {
        const next = { login: state.login, name: state.name, records: {} };
        setState(next);
        saveState(next);
      },
    }),
    [state],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const v = useContext(Ctx);
  if (!v) throw new Error("Store missing");
  return v;
}
