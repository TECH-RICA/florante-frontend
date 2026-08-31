import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IconSearch, IconClose, IconArrowRight } from "./icons";
import { DEFAULT_PRODUCTS, DEFAULT_SOLUTIONS, DEFAULT_ARTICLES } from "../data/defaults";

interface SearchItem {
  id: string;
  title: string;
  category: string;
  type: "Product" | "Solution" | "Industry" | "Insight";
  url: string;
  desc: string;
}

const ITEMS: SearchItem[] = [
  ...DEFAULT_SOLUTIONS.map((s) => ({
    id: `sol-${s.slug}`,
    title: s.title,
    category: s.category,
    type: "Solution" as const,
    url: `/solutions/${s.slug}`,
    desc: s.short_description,
  })),
  ...DEFAULT_PRODUCTS.map((p) => ({
    id: `prod-${p.slug}`,
    title: p.name,
    category: p.category,
    type: "Product" as const,
    url: `/products/${p.slug}`,
    desc: p.short_description,
  })),
  { id: "ind-edu", title: "Education Industry Solutions", category: "Industry", type: "Industry", url: "/industries/education", desc: "Campus management & student portals" },
  { id: "ind-sme", title: "SME & Enterprise Automation", category: "Industry", type: "Industry", url: "/industries/smes", desc: "Affordable tech for growing businesses" },
  { id: "ind-fin", title: "Financial Services & Fintech", category: "Industry", type: "Industry", url: "/industries/financial-services", desc: "Compliance, security & core banking tech" },
  { id: "ind-org", title: "Organizations & NGO Digitization", category: "Industry", type: "Industry", url: "/industries/organizations", desc: "Paperless workflows & multi-branch reporting" },
  ...DEFAULT_ARTICLES.map((a) => ({
    id: `art-${a.slug}`,
    title: a.title,
    category: a.category,
    type: "Insight" as const,
    url: `/insights/${a.slug}`,
    desc: a.excerpt,
  })),
];

export function CommandSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.desc.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : ITEMS.slice(0, 6);

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-panel animate-scale-in max-w-2xl bg-white shadow-mega rounded-2xl overflow-hidden my-auto mx-4 sm:mx-auto">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-florante-100 px-4 py-3.5 bg-florante-50/50">
          <IconSearch size={20} className="text-florante-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search products, solutions, insights... (Press Esc to close)"
            className="w-full bg-transparent px-3 text-sm text-florante-900 placeholder:text-gray-400 outline-none"
          />
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-200/60 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
          >
            <IconClose size={15} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-500">
              No results found for "<span className="font-semibold">{query}</span>"
            </div>
          ) : (
            <div className="space-y-1">
              <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                {query.trim() ? "Search Results" : "Quick Links"}
              </p>
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.url)}
                  className="w-full flex items-start justify-between gap-3 rounded-xl p-3 text-left transition-colors hover:bg-florante-50 group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-sm font-bold text-florante-900 group-hover:text-florante-700">
                        {item.title}
                      </span>
                      <span className="rounded-full bg-florante-100 px-2 py-0.5 text-[10px] font-semibold text-florante-700">
                        {item.type}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-1">{item.desc}</p>
                  </div>
                  <IconArrowRight size={16} className="text-gray-300 group-hover:text-florante-700 shrink-0 self-center transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-florante-100 bg-gray-50/80 px-4 py-2 text-right">
          <span className="text-[11px] text-gray-400 font-medium">Use <kbd className="rounded bg-white px-1.5 py-0.5 text-[10px] shadow-sm border border-gray-200">Ctrl</kbd> + <kbd className="rounded bg-white px-1.5 py-0.5 text-[10px] shadow-sm border border-gray-200">K</kbd> to toggle search</span>
        </div>
      </div>
    </div>
  );
}
