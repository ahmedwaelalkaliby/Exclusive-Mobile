export type ToastKind = "success" | "error" | "info" | "warning";
export interface ToastMessage {
  id: number;
  message: string;
  kind: ToastKind;
  duration: number;
}
type Listener = (message: ToastMessage) => void;
const listeners = new Set<Listener>();
let nextId = 1;

function emit(
  kind: ToastKind,
  message: string,
  options?: { autoClose?: number },
) {
  const toastMessage = {
    id: nextId++,
    message,
    kind,
    duration: options?.autoClose ?? 2800,
  };
  listeners.forEach((listener) => listener(toastMessage));
}

export const toast = {
  success: (message: string, options?: { autoClose?: number }) =>
    emit("success", message, options),
  error: (message: string, options?: { autoClose?: number }) =>
    emit("error", message, options),
  info: (message: string, options?: { autoClose?: number }) =>
    emit("info", message, options),
  warning: (message: string, options?: { autoClose?: number }) =>
    emit("warning", message, options),
};

export function subscribeToToasts(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
