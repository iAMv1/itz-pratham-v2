"use client";

import { useEffect, useState } from "react";

/**
 * GitHub README rendered inside a real iframe (jsDelivr CDN — no X-Frame-Options wall).
 *
 * Markdown SUBSET (documented contract — see README):
 *   h1-h3, ordered/unordered lists, fenced code blocks, inline code, links, tables,
 *   **bold**, *emphasis*, hr (---/***), paragraphs.
 * NOT supported: images, blockquotes, nested lists, footnotes, HTML passthrough.
 * Anything outside the subset renders as plain text — safe by design.
 */
export function RepoFrame({ src }: { src?: string }) {
  const [state, setState] = useState<"loading" | "ready" | "error">(src ? "loading" : "error");
  const [srcdoc, setSrcdoc] = useState("");

  useEffect(() => {
    if (!src) return;
    let alive = true;
    const ctl = new AbortController();
    const timer = window.setTimeout(() => ctl.abort(), 8000);
    const cacheKey = `repo-frame:${src}`;

    // fallback chain: live fetch → last-rendered copy (localStorage) → error state
    const fromCache = () => {
      try {
        return localStorage.getItem(cacheKey);
      } catch {
        return null;
      }
    };

    fetch(`https://cdn.jsdelivr.net/gh/${src}`, { signal: ctl.signal })
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then((md) => {
        if (!alive) return;
        const html = renderMarkdown(md);
        try {
          localStorage.setItem(cacheKey, html);
        } catch {
          /* storage unavailable */
        }
        setSrcdoc(html);
        setState("ready");
      })
      .catch(() => {
        if (!alive) return;
        const cached = fromCache();
        if (cached) {
          setSrcdoc(cached);
          setState("ready");
        } else {
          setState("error");
        }
      })
      .finally(() => window.clearTimeout(timer));
    return () => {
      alive = false;
      ctl.abort();
    };
  }, [src]);

  if (state === "loading") {
    return (
      <div className="flex min-h-[300px] items-center justify-center border-2 border-dashed border-ink/30 p-8 font-mono text-xs tracking-widest text-muted-foreground">
        FETCHING README FROM THE REPO…
      </div>
    );
  }

  if (state === "error" || !src) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 border-2 border-dashed border-ink/30 p-8 text-center">
        <p className="font-mono text-xs tracking-widest text-muted-foreground">
          {src ? "THIS PROJECT'S REPO HAS NO PUBLIC README" : "THIS PROJECT LIVES IN A PRIVATE WORKSPACE"}
        </p>
        {src && (
          <a
            href={`https://github.com/${src.split("@")[0]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-ink px-4 py-2 font-mono text-xs tracking-wider transition-colors hover:bg-ink hover:text-paper"
          >
            OPEN ON GITHUB ↗
          </a>
        )}
      </div>
    );
  }

  return (
    <iframe
      title="Project README"
      srcDoc={srcdoc}
      className="h-[min(520px,60vh)] w-full border-2 border-ink bg-paper"
      sandbox="allow-same-origin allow-popups"
    />
  );
}

/** Minimal markdown → styled-HTML for the iframe (headings, lists, code, links, tables). */
function renderMarkdown(md: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  let inCode = false;
  let inTable = false;

  const inline = (s: string) =>
    s
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`);

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        out.push("</pre>");
        inCode = false;
      } else {
        out.push("<pre>");
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      out.push(esc(line));
      continue;
    }
    const t = line.trim();
    if (t.startsWith("|")) {
      if (!inTable) {
        out.push("<table>");
        inTable = true;
      }
      const cells = t.split("|").filter((c) => c.trim() !== "" && !/^:?-+:?$/.test(c.trim()));
      if (cells.length) out.push(`<tr>${cells.map((c) => `<td>${inline(c.trim())}</td>`).join("")}</tr>`);
      continue;
    }
    if (inTable) {
      out.push("</table>");
      inTable = false;
    }
    if (/^#{1,3} /.test(t)) {
      const lvl = t.match(/^#+/)?.[0].length ?? 1;
      out.push(`<h${lvl}>${inline(t.replace(/^#+ /, ""))}</h${lvl}>`);
    } else if (/^- /u.test(t)) {
      out.push(`<li>${inline(t.replace(/^- /u, ""))}</li>`);
    } else if (/^\d+\. /.test(t)) {
      out.push(`<li>${inline(t.replace(/^\d+\. /, ""))}</li>`);
    } else if (t === "---" || t === "***") {
      out.push("<hr/>");
    } else if (t === "") {
      out.push("<br/>");
    } else {
      out.push(`<p>${inline(t)}</p>`);
    }
  }
  if (inCode) out.push("</pre>");
  if (inTable) out.push("</table>");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;line-height:1.7;color:#222;background:#F4EFE6;padding:20px 24px;margin:0;overflow-wrap:break-word}
    h1{font-size:20px;border-bottom:2px solid #222;padding-bottom:6px} h2{font-size:16px;margin-top:22px} h3{font-size:14px}
    h1,h2,h3{font-family:Georgia,serif;letter-spacing:.02em}
    a{color:#1D5B9E} strong{color:#000}
    code{background:#E7DFCB;padding:1px 5px;border-radius:3px;font-size:12px}
    pre{background:#0B1B33;color:#E7DFCB;padding:14px;overflow-x:auto;border-radius:4px} pre code{background:none;padding:0}
    table{border-collapse:collapse;width:100%;margin:10px 0} td,th{border:1px solid #999;padding:6px 10px;text-align:left}
    li{margin:3px 0} hr{border:none;border-top:2px dashed #999;margin:16px 0}
    img{max-width:100%;height:auto}
  </style></head><body>${out.join("\n")}</body></html>`;
}
