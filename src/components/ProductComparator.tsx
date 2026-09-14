import { useState } from "react";
import { IconClose, IconCheck, IconArrowRight, IconSparkles } from "./icons";
import { DEFAULT_PRODUCTS } from "../data/defaults";
import { useTalkModal } from "../hooks/useTalkModal";

export function ProductComparator({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { openModal } = useTalkModal();
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([
    "unicrib",
    "florante-core-erp",
    "sentinel-audit"
  ]);

  if (!isOpen) return null;

  const toggleProduct = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      if (selectedSlugs.length > 1) {
        setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
      }
    } else {
      if (selectedSlugs.length < 3) {
        setSelectedSlugs([...selectedSlugs, slug]);
      }
    }
  };

  const selectedProducts = DEFAULT_PRODUCTS.filter((p) => selectedSlugs.includes(p.slug));

  return (
    <div
      className="modal-backdrop-root"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-panel-blooming-wide no-scrollbar flex flex-col my-auto mx-2 sm:mx-auto">
        {/* Header */}
        <div className="relative flex items-center justify-between bg-green-grad px-6 py-5 text-white shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/20 text-accent">
                <IconSparkles size={14} />
              </span>
              <h2 className="font-heading text-lg font-bold">Product Feature & Tier Comparator</h2>
            </div>
            <p className="mt-1 text-xs text-white/70">
              Select up to 3 products to compare capabilities, pricing models, and deployment readiness.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <IconClose size={16} />
          </button>
        </div>

        {/* Product selector pills */}
        <div className="border-b border-florante-100 bg-florante-50/60 p-4 shrink-0 overflow-x-auto">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-florante-700">Select products to compare (Max 3):</p>
          <div className="flex flex-wrap gap-2">
            {DEFAULT_PRODUCTS.map((p) => {
              const active = selectedSlugs.includes(p.slug);
              return (
                <button
                  key={p.slug}
                  onClick={() => toggleProduct(p.slug)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${active
                      ? "bg-florante-700 text-white shadow-sm"
                      : "bg-white text-gray-600 border border-florante-200 hover:border-florante-400"
                    }`}
                >
                  {active && "✓ "}
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {selectedProducts.map((p) => (
              <div key={p.slug} className="flex flex-col rounded-2xl border border-florante-100 bg-white p-5 shadow-soft justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-florante-600 bg-florante-50 px-2.5 py-1 rounded-full">
                    {p.category}
                  </span>
                  <h3 className="mt-3 font-heading text-base font-bold text-florante-900">{p.name}</h3>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2">{p.short_description}</p>

                  <div className="mt-4 border-t border-florante-50 pt-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Target User</p>
                    <p className="mt-0.5 text-xs font-medium text-florante-800">{p.target_customer || "Enterprises & SMBs"}</p>
                  </div>

                  <div className="mt-3 border-t border-florante-50 pt-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Pricing Model</p>
                    <p className="mt-0.5 text-sm font-bold text-accent-dark">{p.pricing || "Custom quote"}</p>
                  </div>

                  <div className="mt-3 border-t border-florante-50 pt-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Key Features</p>
                    <ul className="mt-2 space-y-1.5">
                      {p.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-xs text-gray-600">
                          <IconCheck size={13} className="text-accent-dark shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 border-t border-florante-100 pt-4">
                  <button
                    onClick={() => {
                      onClose();
                      openModal({ product: p.name, need: "Product Demo" });
                    }}
                    className="w-full flex items-center justify-center gap-1.5 rounded-full bg-florante-700 py-2.5 text-xs font-semibold text-white transition-all hover:bg-florante-800 shadow-sm"
                  >
                    Request Demo for {p.name.split(" ")[0]}
                    <IconArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}