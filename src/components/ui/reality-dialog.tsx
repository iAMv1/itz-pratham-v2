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
      setCloseFn(() => () => {
        const dlg = dialogRef.current;
        if (!dlg) return;
        const doClose = () => dlg.close();
        if ("startViewTransition" in document) {
          (document as unknown as { startViewTransition: (cb: () => void) => unknown }).startViewTransition(doClose);
        } else {
          doClose();
        }
      })
    );
    return () => cancelAnimationFrame(id);
  }, []);

  const open = () => {
    const dlg = dialogRef.current;
    if (!dlg || typeof dlg.showModal !== "function") return;
    const doOpen = () => {
      dlg.showModal();
      onOpen?.();
    };
    if ("startViewTransition" in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => unknown }).startViewTransition(doOpen);
    } else {
      doOpen();
    }
  };

  // Escape closes through the same transition path
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dialogRef.current?.open) {
        const dlg = dialogRef.current;
        const doClose = () => dlg.close();
        if ("startViewTransition" in document) {
          (document as unknown as { startViewTransition: (cb: () => void) => unknown }).startViewTransition(doClose);
        } else {
          doClose();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <span onClick={open} className="cursor-pointer">
        {trigger}
      </span>
      <dialog
        ref={dialogRef}
        className="reality-dialog m-auto w-[min(960px,92vw)] max-h-[88vh] border-2 border-ink bg-paper p-0 shadow-[10px_10px_0_0_var(--shadow-ink)] backdrop:bg-ink/60 backdrop:backdrop-blur-[2px]"
      >
        <RealityCloseContext.Provider value={closeFn}>{children}</RealityCloseContext.Provider>
      </dialog>
    </>
  );
}
