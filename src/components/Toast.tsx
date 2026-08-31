import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { ReactNode } from "react";
import { IconCheck, IconClose, IconMailReply } from "./icons";

type ToastKind = "success" | "error" | "info";

interface ToastItem {
  id: number;
  kind: ToastKind;
  title: string;
  message?: string;
}

interface ToastContextValue {
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const KIND_STYLES: Record<ToastKind, { ring: string; icon: ReactNode }> = {
  success: {
    ring: "border-green-200 bg-green-50",
    icon: <IconCheck size={16} />,
  },
  error: {
    ring: "border-red-200 bg-red-50",
    icon: <IconClose size={16} />,
  },
  info: {
    ring: "border-accent/30 bg-florante-50",
    icon: <IconMailReply size={16} />,
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (kind: ToastKind, title: string, message?: string) => {
      const id = ++counter.current;
      setToasts((prev) => [...prev.slice(-3), { id, kind, title, message }]);
      window.setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  const value: ToastContextValue = {
    success: (t, m) => push("success", t, m),
    error: (t, m) => push("error", t, m),
    info: (t, m) => push("info", t, m),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(92vw,22rem)] flex-col gap-2.5">
        {toasts.map((t) => {
          const style = KIND_STYLES[t.kind];
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-glow-sm backdrop-blur animate-toast-in ${style.ring}`}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-florante-700 shadow-card">
                {style.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-florante-900">{t.title}</p>
                {t.message && <p className="mt-0.5 text-xs leading-relaxed text-gray-600">{t.message}</p>}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="shrink-0 rounded-full p-1 text-gray-400 transition hover:bg-white hover:text-florante-800"
                aria-label="Dismiss notification"
              >
                <IconClose size={13} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}