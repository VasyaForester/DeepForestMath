export type SiteStats = {
  users: number;
  lessons: number;
};

const STATS_URL = "/stats.php";
const ABACUS = "https://abacus.jasoncameron.dev";
const ABACUS_NS = "deep-forest.online";
const ABACUS_USERS = "regcount";
const ABACUS_LESSONS = "lessoncount";
const USER_FLAG = "dfa-stats-user-v1:";
const LESSONS_KEY = "dfa-stats-lessons-v1:";

let phpProbe: Promise<boolean> | null = null;

function reportedLessons(login: string): Set<string> {
  try {
    const raw = localStorage.getItem(LESSONS_KEY + login);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === "string"));
  } catch {
    return new Set();
  }
}

function saveReportedLessons(login: string, ids: Set<string>): void {
  localStorage.setItem(LESSONS_KEY + login, JSON.stringify([...ids]));
}

function phpAvailable(): Promise<boolean> {
  if (!phpProbe) {
    phpProbe = fetch(STATS_URL, { cache: "no-store" })
      .then(async (res) => {
        const ctype = res.headers.get("content-type") ?? "";
        if (!res.ok || !ctype.includes("json")) return false;
        const data = (await res.json()) as { users?: unknown; lessons?: unknown };
        return Number.isFinite(Number(data.users)) && Number.isFinite(Number(data.lessons));
      })
      .catch(() => false);
  }
  return phpProbe;
}

async function postPhp(event: "register" | "lessons", count = 1): Promise<void> {
  const body =
    event === "lessons" ? JSON.stringify({ event, count }) : JSON.stringify({ event });
  const res = await fetch(STATS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body,
  });
  const ctype = res.headers.get("content-type") ?? "";
  if (!res.ok || !ctype.includes("json")) {
    throw new Error("stats unavailable");
  }
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function abacusHit(key: string): Promise<void> {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(`${ABACUS}/hit/${ABACUS_NS}/${key}`, { cache: "no-store" });
    if (res.status === 429) {
      await sleep(2000 * (attempt + 1));
      continue;
    }
    if (!res.ok) throw new Error("stats unavailable");
    return;
  }
  throw new Error("stats unavailable");
}

async function abacusGet(key: string): Promise<number> {
  const res = await fetch(`${ABACUS}/get/${ABACUS_NS}/${key}`, { cache: "no-store" });
  if (res.status === 404) return 0;
  if (!res.ok) throw new Error("stats unavailable");
  const data = (await res.json()) as { value?: unknown };
  const n = Number(data.value);
  return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
}

async function postEvent(event: "register" | "lessons", count = 1): Promise<void> {
  if (await phpAvailable()) {
    await postPhp(event, count);
    return;
  }
  if (event === "register") {
    await abacusHit(ABACUS_USERS);
    return;
  }
  const n = Math.max(1, Math.min(500, Math.floor(count)));
  for (let i = 0; i < n; i++) {
    await abacusHit(ABACUS_LESSONS);
  }
}

export async function fetchSiteStats(): Promise<SiteStats> {
  if (await phpAvailable()) {
    const res = await fetch(STATS_URL, { cache: "no-store" });
    const ctype = res.headers.get("content-type") ?? "";
    if (!res.ok || !ctype.includes("json")) {
      throw new Error("stats unavailable");
    }
    const data = (await res.json()) as Partial<SiteStats>;
    const users = Number(data.users);
    const lessons = Number(data.lessons);
    if (!Number.isFinite(users) || !Number.isFinite(lessons)) {
      throw new Error("stats unavailable");
    }
    return { users: Math.max(0, Math.floor(users)), lessons: Math.max(0, Math.floor(lessons)) };
  }
  const [users, lessons] = await Promise.all([abacusGet(ABACUS_USERS), abacusGet(ABACUS_LESSONS)]);
  return { users, lessons };
}

export function syncSiteStats(login: string, lessonIds: string[]): void {
  if (!login) return;
  void syncSiteStatsAsync(login, lessonIds);
}

async function syncSiteStatsAsync(login: string, lessonIds: string[]): Promise<void> {
  if (!localStorage.getItem(USER_FLAG + login)) {
    try {
      await postEvent("register");
      localStorage.setItem(USER_FLAG + login, "1");
    } catch {
      /* retry on the next visit */
    }
  }

  const reported = reportedLessons(login);
  const fresh = lessonIds.filter((id) => id && !reported.has(id));
  if (fresh.length === 0) return;

  if (await phpAvailable()) {
    try {
      await postEvent("lessons", fresh.length);
      for (const id of fresh) reported.add(id);
      saveReportedLessons(login, reported);
    } catch {
      /* retry on the next visit */
    }
    return;
  }

  for (const id of fresh) {
    try {
      await postEvent("lessons", 1);
      reported.add(id);
      saveReportedLessons(login, reported);
    } catch {
      break;
    }
  }
}
