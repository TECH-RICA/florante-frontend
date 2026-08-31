import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CommandSearch } from "../components/CommandSearch";

interface SearchModalCtx {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
}

const Ctx = createContext<SearchModalCtx>({
  isOpen: false,
  openSearch: () => {},
  closeSearch: () => {},
  toggleSearch: () => {},
});

export function SearchModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);

  const openSearch = useCallback(() => setOpen(true), []);
  const closeSearch = useCallback(() => setOpen(false), []);
  const toggleSearch = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        toggleSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSearch]);

  return (
    <Ctx.Provider value={{ isOpen, openSearch, closeSearch, toggleSearch }}>
      {children}
      <CommandSearch isOpen={isOpen} onClose={closeSearch} />
    </Ctx.Provider>
  );
}

export function useSearchModal() {
  return useContext(Ctx);
}
