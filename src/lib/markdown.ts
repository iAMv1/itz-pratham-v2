/** Minimal markdown → styled HTML (documented subset: h1-3, lists, code, links, tables, emphasis, hr, paragraphs). */
export function renderMarkdown(md: string): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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

  return out.join("\n");
}

/** Content styling for markdown rendered into the page (dark/light via tokens). */
export const markdownContentClass =
  "[&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:uppercase [&_h3]:mt-5 [&_h3]:mb-1.5 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:uppercase [&_p]:my-3 [&_p]:text-[15px] [&_p]:leading-relaxed [&_li]:ml-5 [&_li]:my-1 [&_li]:list-disc [&_code]:bg-paper-2 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:border-2 [&_pre]:border-ink [&_pre]:bg-ink-2 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-[12.5px] [&_pre]:leading-relaxed [&_pre]:text-paper [&_a]:text-cobalt [&_a]:underline [&_a]:underline-offset-4 [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-ink/20 [&_td]:px-3 [&_td]:py-1.5 [&_td]:font-mono [&_td]:text-[12.5px] [&_hr]:my-6 [&_hr]:border-ink/30";
