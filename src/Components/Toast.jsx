import { CheckCircle2, XCircle } from "lucide-react";
import useAppStore from "../Store/useAppStore";

export default function Toast() {
  const toasts = useAppStore((s) => s.toasts);
  const dismissToast = useAppStore((s) => s.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 items-center px-4 w-full sm:w-auto">
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => dismissToast(t.id)}
          className={`glass flex items-center gap-2 px-4 py-3 rounded-full shadow-[var(--shadow-soft)] text-sm font-medium cursor-pointer animate-fade-up ${
            t.type === "error" ? "text-destructive" : "text-primary"
          }`}
        >
          {t.type === "error" ? (
            <XCircle className="w-4 h-4" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          {t.message}
        </div>
      ))}
    </div>
  );
}
