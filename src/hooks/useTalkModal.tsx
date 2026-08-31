import { createContext, useContext, useState, useCallback } from "react";

interface TalkModalCtx {
  isOpen: boolean;
  openModal:  (opts?: { product?: string; need?: string }) => void;
  closeModal: () => void;
  defaults:   { product?: string; need?: string };
}

const Ctx = createContext<TalkModalCtx>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  defaults: {},
});

export function TalkModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [defaults, setDefaults] = useState<{ product?: string; need?: string }>({});

  const openModal = useCallback((opts: { product?: string; need?: string } = {}) => {
    setDefaults(opts);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <Ctx.Provider value={{ isOpen, openModal, closeModal, defaults }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTalkModal() {
  return useContext(Ctx);
}
