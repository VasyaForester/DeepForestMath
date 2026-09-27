import { useMemo } from "react";
import katex from "katex";

const KATEX_MACROS = {
  "\\neq": "\\mathrel{\\htmlClass{dfa-neq}{\\char\"2260}}",
  "\\ne": "\\neq",
};

function renderKatex(tex: string, display: boolean): string {
  try {
    return katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      strict: false,
      output: "html",
      trust: (ctx) => ctx.command === "\\htmlClass",
      macros: KATEX_MACROS,
    });
  } catch {
    return tex;
  }
}

function inlineHtml(input: string): string {
  const parts: string[] = [];
  const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input))) {
    parts.push(escapeHtml(input.slice(last, m.index)).replaceAll("\n", " "));
    if (m[1] !== undefined) {
      parts.push(renderKatex(m[1].trim(), true));
    } else {
      parts.push(renderKatex(m[2], false));
    }
    last = m.index + m[0].length;
  }
  parts.push(escapeHtml(input.slice(last)).replaceAll("\n", " "));
  return parts.join("");
}

function toBlockHtml(input: string): string {
  const paragraphs = input
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (paragraphs.length === 0) return "";
  return paragraphs.map((p) => `<p class="math-p">${inlineHtml(p)}</p>`).join("");
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function MathText({
  text,
  className,
  inline = false,
}: {
  text: string;
  className?: string;
  inline?: boolean;
}) {
  const html = useMemo(
    () => (inline ? inlineHtml(text) : toBlockHtml(text)),
    [text, inline],
  );
  if (inline) {
    return (
      <span
        className={className ? `math-text ${className}` : "math-text"}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return (
    <div
      className={className ? `math-text ${className}` : "math-text"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
