import type { IncomingMessage, ServerResponse } from "node:http";
import type { Connect, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

type SiteStats = { users: number; lessons: number };

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, status: number, data: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(data));
}

function statsDevPlugin(): Plugin {
  const store: SiteStats = { users: 0, lessons: 0 };

  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    const url = req.url?.split("?")[0];
    if (url !== "/stats.php") {
      next();
      return;
    }

    void (async () => {
      if (req.method === "GET") {
        sendJson(res, 200, store);
        return;
      }
      if (req.method === "POST") {
        let event = "";
        let count = 1;
        try {
          const parsed = JSON.parse(await readBody(req)) as { event?: string; count?: number };
          event = String(parsed.event ?? "");
          count = Number(parsed.count ?? 1);
        } catch {
          sendJson(res, 400, { error: "event" });
          return;
        }
        if (event === "register") {
          store.users += 1;
        } else if (event === "lessons") {
          if (!Number.isFinite(count) || count < 1) count = 1;
          if (count > 500) count = 500;
          store.lessons += Math.floor(count);
        } else {
          sendJson(res, 400, { error: "event" });
          return;
        }
        sendJson(res, 200, store);
        return;
      }
      sendJson(res, 405, { error: "method" });
    })();
  };

  const attach = (server: { middlewares: Connect.Server }) => {
    server.middlewares.use(middleware);
  };

  return {
    name: "dfa-stats-dev",
    configureServer: attach,
    configurePreviewServer: attach,
  };
}

function pythonPreviewFallback(): Plugin {
  return {
    name: "dfa-python-preview",
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (url === "/python" || url.startsWith("/python/")) {
          const leaf = url.split("/").pop() ?? "";
          if (!leaf.includes(".")) req.url = "/python/index.html";
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), statsDevPlugin(), pythonPreviewFallback()],
  server: {
    port: 5173,
    strictPort: true,
    host: "localhost",
  },
  preview: {
    port: 4173,
    strictPort: true,
    host: "localhost",
  },
});
