"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const RealityCloseContext = createContext<() => void>(() => {});

export function useRealityClose() {
  return useContext(RealityCloseContext);
}

/**
 * RealityDialog — native <dialog> as a temporary second reality.
 * Click something → a completely different interface opens on top; close → instantly back.
 */
export function RealityDialog({
  trigger,
  children,
  onOpen,
}: {
  trigger: ReactNode;
  children: ReactNode;
  onOpen?: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [closeFn, setCloseFn] = useState<() => void>(() => () => {});

  useEffect(() => {
    const id = requestAnimationFrame(() =>
      setCloseFn(() => () => dialogRef.current?.close())
    );
    const dlg = dialogRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dlg?.open) dlg.close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const open = () => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (typeof dlg.showModal === "function") {
      dlg.showModal();
      onOpen?.();
    }
  };

  return (
    <>
      <span onClick={open} className="cursor-pointer">
        {trigger}
      </span>
      <dialog
        ref={dialogRef}
        className="m-auto w-[min(960px,92vw)] max-h-[88vh] border-2 border-ink bg-paper p-0 shadow-[10px_10px_0_0_#051024] backdrop:bg-ink/60 backdrop:backdrop-blur-[2px]"
      >
        <RealityCloseContext.Provider value={closeFn}>{children}</RealityCloseContext.Provider>
      </dialog>
    </>
  );
}
