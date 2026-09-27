import type { AppState, LessonRecord } from "../types";

const USERS_KEY = "dfa-users-v1";
const SESSION_KEY = "dfa-session-v1";
const LEGACY_KEY = "dfa-math-v1";
const REMAP_FLAG = "dfa-id-remap-school-progress-v1";
const ORDER_REMAP_FLAG = "dfa-id-remap-lesson-order-v1";

/** Старые номера занятий → новые, одним шагом, без цепочки. */
const PROGRESS_ID_REMAP: Record<string, string> = {
  "school-progress-05": "school-progress-06",
  "school-progress-06": "school-progress-07",
  "school-progress-07": "school-progress-08",
  "school-progress-08": "school-progress-05",
};

export type StoredUser = {
  login: string;
  salt: string;
  passwordHash: string;
  name: string;
  records: Record<string, LessonRecord>;
};

const empty: AppState = { login: "", name: "", records: {} };

function remapLessonIds<T>(records: Record<string, T>, map: Record<string, string>): Record<string, T> {
  const moved: Record<string, T> = {};
  for (const [from, to] of Object.entries(map)) {
    if (records[from] !== undefined) moved[to] = records[from];
  }
  const next = { ...records };
  for (const from of Object.keys(map)) delete next[from];
  return { ...next, ...moved };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function idMap(course: string, oldToNewIndex: Record<number, number>): Record<string, string> {
  const map: Record<string, string> = {};
  for (const [oldIndex, newIndex] of Object.entries(oldToNewIndex)) {
    if (Number(oldIndex) === newIndex) continue;
    map[`${course}-${pad(Number(oldIndex) + 1)}`] = `${course}-${pad(newIndex + 1)}`;
  }
  return map;
}

const ORDER_ID_REMAP: Record<string, string> = {
  ...idMap("school-functions", {
    2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 11, 9: 12, 10: 13, 11: 14, 12: 2, 13: 9, 14: 10,
  }),
  ...idMap("school-trig", {
    0: 1, 1: 2, 2: 5, 3: 8, 4: 12, 5: 14, 6: 3, 7: 6, 8: 7, 9: 11, 10: 0, 11: 4, 12: 9, 13: 10, 14: 13,
  }),
  ...idMap("school-geometry", {
    0: 1, 1: 5, 2: 8, 3: 10, 4: 13, 5: 15, 6: 16, 7: 19, 8: 14, 9: 3, 10: 9, 11: 18, 12: 0, 13: 2, 14: 6, 15: 7, 16: 4, 17: 11, 18: 12, 19: 17,
  }),
  ...idMap("school-precalc", {
    2: 3, 3: 4, 4: 6, 5: 11, 6: 13, 7: 14, 8: 7, 9: 8, 10: 2, 11: 5, 12: 9, 13: 10, 14: 12,
  }),
  ...idMap("school-discrete", {
    0: 1, 1: 2, 2: 4, 3: 7, 4: 6, 6: 8, 7: 3, 8: 0,
  }),
};

function remapDraftKeys(map: Record<string, string>): void {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("dfa-draft-v1:")) keys.push(key);
  }
  const pending: { from: string; to: string; value: string }[] = [];
  for (const key of keys) {
    const lessonId = key.slice(key.lastIndexOf(":") + 1);
    const nextId = map[lessonId];
    if (!nextId) continue;
    const value = localStorage.getItem(key);
    if (value === null) continue;
    pending.push({ from: key, to: key.slice(0, key.lastIndexOf(":") + 1) + nextId, value });
  }
  for (const item of pending) localStorage.removeItem(item.from);
  for (const item of pending) localStorage.setItem(item.to, item.value);
}

function remapStatsLessons(map: Record<string, string>): void {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("dfa-stats-lessons-v1:")) keys.push(key);
  }
  for (const key of keys) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) ?? "[]") as unknown;
      if (!Array.isArray(parsed)) continue;
      const ids = parsed.filter((id): id is string => typeof id === "string");
      const mapped = remapLessonIds(Object.fromEntries(ids.map((id) => [id, true])), map);
      localStorage.setItem(key, JSON.stringify(Object.keys(mapped)));
    } catch {
      /* leave the set as stored */
    }
  }
}

function migrateProgressLessonIds(): void {
  if (localStorage.getItem(REMAP_FLAG)) return;
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) {
      const users = JSON.parse(raw) as Record<string, StoredUser>;
      if (users && typeof users === "object") {
        for (const user of Object.values(users)) {
          if (user?.records) user.records = remapLessonIds(user.records, PROGRESS_ID_REMAP);
        }
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    }
    const legacyRaw = localStorage.getItem(LEGACY_KEY);
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw) as { name?: string; records?: Record<string, LessonRecord> };
      if (legacy?.records) {
        legacy.records = remapLessonIds(legacy.records, PROGRESS_ID_REMAP);
        localStorage.setItem(LEGACY_KEY, JSON.stringify(legacy));
      }
    }
    remapDraftKeys(PROGRESS_ID_REMAP);
    remapStatsLessons(PROGRESS_ID_REMAP);
  } catch {
    /* keep the flag unset and retry next visit */
    return;
  }
  localStorage.setItem(REMAP_FLAG, "1");
}

function migrateLessonOrder(): void {
  if (localStorage.getItem(ORDER_REMAP_FLAG)) return;
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) {
      const users = JSON.parse(raw) as Record<string, StoredUser>;
      if (users && typeof users === "object") {
        for (const user of Object.values(users)) {
          if (user?.records) user.records = remapLessonIds(user.records, ORDER_ID_REMAP);
        }
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    }
    const legacyRaw = localStorage.getItem(LEGACY_KEY);
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw) as { name?: string; records?: Record<string, LessonRecord> };
      if (legacy?.records) {
        legacy.records = remapLessonIds(legacy.records, ORDER_ID_REMAP);
        localStorage.setItem(LEGACY_KEY, JSON.stringify(legacy));
      }
    }
    remapDraftKeys(ORDER_ID_REMAP);
    remapStatsLessons(ORDER_ID_REMAP);
  } catch {
    return;
  }
  localStorage.setItem(ORDER_REMAP_FLAG, "1");
}

function loadUsers(): Record<string, StoredUser> {
  migrateProgressLessonIds();
  migrateLessonOrder();
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, StoredUser>;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, StoredUser>): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function normalizeLogin(raw: string): string {
  return raw.trim().toLowerCase();
}

export function validateLogin(login: string): string | null {
  if (!/^[a-z0-9._-]{3,32}$/.test(login)) {
    return "Логин: 3–32 символа, латиница, цифры, точка, дефис или подчёркивание.";
  }
  return null;
}

function toHex(bytes: Uint8Array): string {
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha256Hex(text: string): Promise<string> {
  if (!crypto.subtle) {
    throw new Error("Нужен браузер с защищённым соединением (https).");
  }
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return toHex(new Uint8Array(buf));
}

function randomSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return toHex(bytes);
}

async function hashPassword(password: string, salt: string): Promise<string> {
  return sha256Hex(`${salt}:${password}`);
}

function getSession(): string | null {
  const login = localStorage.getItem(SESSION_KEY);
  return login ? normalizeLogin(login) : null;
}

function setSession(login: string | null): void {
  if (login) localStorage.setItem(SESSION_KEY, login);
  else localStorage.removeItem(SESSION_KEY);
}

function userToState(user: StoredUser): AppState {
  return { login: user.login, name: user.name, records: user.records ?? {} };
}

function loadLegacy(): { name: string; records: Record<string, LessonRecord> } | null {
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { name?: string; records?: Record<string, LessonRecord> };
    if (!parsed || typeof parsed !== "object") return null;
    const name = typeof parsed.name === "string" ? parsed.name : "";
    const records = parsed.records && typeof parsed.records === "object" ? parsed.records : {};
    if (!name && Object.keys(records).length === 0) return null;
    return { name, records };
  } catch {
    return null;
  }
}

export function peekLegacyName(): string {
  return loadLegacy()?.name ?? "";
}

export function loadState(): AppState {
  const login = getSession();
  if (!login) return empty;
  const user = loadUsers()[login];
  if (!user) {
    setSession(null);
    return empty;
  }
  return userToState(user);
}

function persist(user: StoredUser): AppState {
  const users = loadUsers();
  users[user.login] = user;
  saveUsers(users);
  setSession(user.login);
  const state = userToState(user);
  localStorage.setItem(LEGACY_KEY, JSON.stringify({ name: state.name, records: state.records }));
  return state;
}

export function saveState(state: AppState): void {
  if (!state.login) return;
  const users = loadUsers();
  const prev = users[state.login];
  if (!prev) return;
  users[state.login] = {
    ...prev,
    name: state.name,
    records: state.records,
  };
  saveUsers(users);
  localStorage.setItem(LEGACY_KEY, JSON.stringify({ name: state.name, records: state.records }));
}

export async function registerAccount(
  loginRaw: string,
  password: string,
  nameRaw: string,
): Promise<AppState> {
  const login = normalizeLogin(loginRaw);
  const name = nameRaw.trim();
  const loginErr = validateLogin(login);
  if (loginErr) throw new Error(loginErr);
  if (password.length < 6) throw new Error("Пароль — не короче шести символов.");
  if (name.length < 2) throw new Error("Укажите имя — оно появится на дипломе.");
  const users = loadUsers();
  if (users[login]) throw new Error("Такой логин уже занят.");
  const salt = randomSalt();
  const passwordHash = await hashPassword(password, salt);
  const firstAccount = Object.keys(users).length === 0;
  const legacy = firstAccount ? loadLegacy() : null;
  const user: StoredUser = {
    login,
    salt,
    passwordHash,
    name,
    records: legacy?.records ?? {},
  };
  return persist(user);
}

export async function loginAccount(loginRaw: string, password: string): Promise<AppState> {
  const login = normalizeLogin(loginRaw);
  if (!login || !password) throw new Error("Введите логин и пароль.");
  const user = loadUsers()[login];
  if (!user) throw new Error("Неверный логин или пароль.");
  const hash = await hashPassword(password, user.salt);
  if (hash !== user.passwordHash) throw new Error("Неверный логин или пароль.");
  setSession(login);
  return userToState(user);
}

export function logoutAccount(): AppState {
  setSession(null);
  return empty;
}
