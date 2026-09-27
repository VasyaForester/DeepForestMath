import { useEffect, useRef, useState } from "react";
import { fetchSiteStats, type SiteStats } from "../lib/stats";

function formatCount(n: number): string {
  return n.toLocaleString("ru-RU");
}

export function SiteStatsLink() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [stats, setStats] = useState<SiteStats | null>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setStatus("loading");
    fetchSiteStats()
      .then((data) => {
        if (cancelled) return;
        setStats(data);
        setStatus("ok");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("err");
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onPointer(e: MouseEvent) {
      const node = e.target as Node;
      if (rootRef.current && !rootRef.current.contains(node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <div className="stats-corner no-print" ref={rootRef}>
      {open && (
        <div className="stats-pop" role="status">
          {status === "loading" || status === "idle" ? (
            <p>Загрузка…</p>
          ) : status === "err" ? (
            <p>Не удалось загрузить статистику.</p>
          ) : (
            <>
              <p>Зарегистрировалось: {formatCount(stats?.users ?? 0)}</p>
              <p>Уроков пройдено: {formatCount(stats?.lessons ?? 0)}</p>
            </>
          )}
        </div>
      )}
      <button
        type="button"
        className="stats-link"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
      >
        stats
      </button>
    </div>
  );
}
