"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/** MirrorTitle — let the visitor write their own version of your title (session-only). */
export function MirrorTitle({ defaultValue, onCommit }: { defaultValue: string; onCommit?: (v: string) => void }) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(defaultValue);
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (editing) {
      ref.current?.focus();
      const range = document.createRange();
      range.selectNodeContents(ref.current!);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [editing]);

  const commit = () => {
    setEditing(false);
    const v = (ref.current?.textContent ?? "").trim();
    if (v) {
      setValue(v);
      onCommit?.(v);
    } else {
      ref.current!.textContent = value;
    }
  };

  return (
    <span className="group inline-flex items-center gap-2">
      <span
        ref={ref}
        role="textbox"
        tabIndex={0}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setEditing(true)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            ref.current?.blur();
          }
          if (e.key === "Escape") {
            ref.current!.textContent = value;
            ref.current?.blur();
          }
        }}
        className={`cursor-text outline-none transition-colors focus:bg-marigold/30 ${
          reduced ? "" : "transition-all"
        }`}
      >
        {value}
      </span>
      <span
        aria-hidden
        className={`hidden font-mono text-[10px] tracking-widest text-muted-foreground group-focus-within:inline ${
          editing ? "inline" : ""
        }`}
      >
        ✎ EDIT — TYPE YOUR OWN
      </span>
    </span>
  );
}
