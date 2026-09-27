import { useCallback, useEffect, useRef, useState } from "react";

type Tool = "pen" | "line" | "eraser";

type Point = { x: number; y: number };

type Stroke = {
  tool: Tool;
  color: string;
  width: number;
  points: Point[];
};

type Draft = {
  notes: string;
  strokes: Stroke[];
};

const COLORS = [
  { id: "pine", value: "#1b4332", label: "зелёный" },
  { id: "moss", value: "#40916c", label: "мох" },
  { id: "gold", value: "#b08d4a", label: "охра" },
  { id: "red", value: "#9b3d3d", label: "красный" },
  { id: "blue", value: "#1d4e89", label: "синий" },
  { id: "ink", value: "#243028", label: "чёрный" },
];

const WIDTHS = [2, 4, 7];

const KEY_ROWS: { title: string; keys: string[] }[] = [
  { title: "Степени и корни", keys: ["√", "∛", "²", "³", "ⁿ", "±", "×", "÷", "·"] },
  { title: "Сравнения", keys: ["=", "≠", "≈", "<", ">", "≤", "≥"] },
  { title: "Греческие", keys: ["α", "β", "γ", "δ", "ε", "θ", "λ", "μ", "π", "σ", "φ", "ω", "Δ", "Σ", "Π"] },
  { title: "Множества", keys: ["ℕ", "ℤ", "ℚ", "ℝ", "∈", "∉", "⊂", "∪", "∩", "∅", "∞"] },
  { title: "Логика", keys: ["⇒", "⇔", "∀", "∃", "∧", "∨", "¬"] },
  { title: "Скобки", keys: ["(", ")", "[", "]", "{", "}", "|"] },
];

function storageKey(owner: string, lessonId: string) {
  return `dfa-draft-v1:${owner}:${lessonId}`;
}

function loadDraft(owner: string, lessonId: string): Draft {
  try {
    const raw =
      localStorage.getItem(storageKey(owner, lessonId)) ??
      localStorage.getItem(`dfa-draft-v1:${lessonId}`);
    if (!raw) return { notes: "", strokes: [] };
    const parsed = JSON.parse(raw) as Draft;
    return {
      notes: typeof parsed.notes === "string" ? parsed.notes : "",
      strokes: Array.isArray(parsed.strokes) ? parsed.strokes : [],
    };
  } catch {
    return { notes: "", strokes: [] };
  }
}

function saveDraft(owner: string, lessonId: string, draft: Draft) {
  localStorage.setItem(storageKey(owner, lessonId), JSON.stringify(draft));
}

function drawStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
  if (stroke.points.length === 0) return;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = stroke.width;
  if (stroke.tool === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "rgba(0,0,0,1)";
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = stroke.color;
  }
  ctx.beginPath();
  if (stroke.tool === "line" && stroke.points.length >= 2) {
    const a = stroke.points[0];
    const b = stroke.points[stroke.points.length - 1];
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
  } else {
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
    }
  }
  ctx.stroke();
  ctx.restore();
}

export function Scratchpad({ lessonId, owner }: { lessonId: string; owner: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const drawing = useRef(false);
  const current = useRef<Stroke | null>(null);

  const [open, setOpen] = useState(() =>
    typeof window === "undefined" ? true : window.innerWidth >= 1100,
  );
  const [notes, setNotes] = useState("");
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState(COLORS[0].value);
  const [width, setWidth] = useState(4);

  const skipSave = useRef(true);

  useEffect(() => {
    const draft = loadDraft(owner, lessonId);
    skipSave.current = true;
    setNotes(draft.notes);
    setStrokes(draft.strokes);
    current.current = null;
    drawing.current = false;
  }, [owner, lessonId]);

  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    saveDraft(owner, lessonId, { notes, strokes });
  }, [owner, lessonId, notes, strokes]);

  const paint = useCallback((extra?: Stroke) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of strokes) drawStroke(ctx, s);
    if (extra) drawStroke(ctx, extra);
  }, [strokes]);

  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || 300;
    const cssH = canvas.clientHeight || 220;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    paint(current.current ?? undefined);
  }, [paint]);

  useEffect(() => {
    sizeCanvas();
  }, [sizeCanvas, open]);

  useEffect(() => {
    const onResize = () => sizeCanvas();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sizeCanvas]);

  useEffect(() => {
    paint();
  }, [paint]);

  function pointFromEvent(e: React.PointerEvent<HTMLCanvasElement>): Point {
    const canvas = canvasRef.current!;
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    const p = pointFromEvent(e);
    current.current = { tool, color, width, points: [p] };
    paint(current.current);
  }

  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current || !current.current) return;
    const p = pointFromEvent(e);
    if (current.current.tool === "line") {
      current.current.points = [current.current.points[0], p];
    } else {
      current.current.points.push(p);
    }
    paint(current.current);
  }

  function onPointerUp() {
    if (!drawing.current || !current.current) return;
    drawing.current = false;
    const done = current.current;
    current.current = null;
    if (done.points.length >= 1) {
      setStrokes((prev) => [...prev, done]);
    }
  }

  function insertSymbol(sym: string) {
    const el = notesRef.current;
    if (!el) {
      setNotes((n) => n + sym);
      return;
    }
    const start = el.selectionStart ?? notes.length;
    const end = el.selectionEnd ?? notes.length;
    const next = notes.slice(0, start) + sym + notes.slice(end);
    setNotes(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + sym.length;
      el.setSelectionRange(pos, pos);
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        className="scratch-fab"
        onClick={() => setOpen(true)}
        aria-label="Открыть черновик"
      >
        Черновик
      </button>
    );
  }

  return (
    <aside className="scratchpad" aria-label="Черновик к заданиям">
      <header className="scratch-head">
        <strong>Черновик</strong>
        <button type="button" className="btn ghost scratch-hide" onClick={() => setOpen(false)}>
          Скрыть
        </button>
      </header>
      <p className="muted scratch-hint">
        Записи и рисунок остаются на этом занятии. В оценку не входят.
      </p>

      <label className="field scratch-notes">
        Записи
        <textarea
          ref={notesRef}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          placeholder="Черновые выкладки, подстановка, идея…"
        />
      </label>

      <div className="math-keys">
        {KEY_ROWS.map((row) => (
          <div key={row.title} className="math-keys-row">
            <span className="math-keys-label">{row.title}</span>
            <div className="math-keys-btns">
              {row.keys.map((k) => (
                <button key={k} type="button" className="key-btn" onClick={() => insertSymbol(k)}>
                  {k}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="draw-toolbar">
        <button
          type="button"
          className={`tool-btn ${tool === "pen" ? "on" : ""}`}
          onClick={() => setTool("pen")}
        >
          Карандаш
        </button>
        <button
          type="button"
          className={`tool-btn ${tool === "line" ? "on" : ""}`}
          onClick={() => setTool("line")}
        >
          Отрезок
        </button>
        <button
          type="button"
          className={`tool-btn ${tool === "eraser" ? "on" : ""}`}
          onClick={() => setTool("eraser")}
        >
          Ластик
        </button>
      </div>
      <div className="draw-toolbar">
        {COLORS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`color-dot ${color === c.value ? "on" : ""}`}
            style={{ background: c.value }}
            aria-label={c.label}
            onClick={() => {
              setColor(c.value);
              if (tool === "eraser") setTool("pen");
            }}
          />
        ))}
        {WIDTHS.map((w) => (
          <button
            key={w}
            type="button"
            className={`width-btn ${width === w ? "on" : ""}`}
            onClick={() => setWidth(w)}
          >
            {w}
          </button>
        ))}
        <button type="button" className="tool-btn" onClick={() => setStrokes((s) => s.slice(0, -1))}>
          Отменить
        </button>
        <button type="button" className="tool-btn" onClick={() => setStrokes([])}>
          Очистить
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="scratch-canvas"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
    </aside>
  );
}
