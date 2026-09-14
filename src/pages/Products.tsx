import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { Spinner } from "../components/Spinner";
import { ErrorState } from "../components/ErrorState";
import { useApi } from "../hooks/useApi";
import type { Product } from "../lib/types";
import {
  IconArrowRight, IconSearch, IconCheck, IconGrid, IconList, IconSparkles
} from "../components/icons";
import { DEFAULT_PRODUCTS } from "../data/defaults";
import { useTalkModal } from "../hooks/useTalkModal";
import { ProductComparator } from "../components/ProductComparator";

const PRICING_FILTERS = [
  { value: "", label: "All pricing models" },
  { value: "one_time", label: "One-time fee" },
  { value: "monthly", label: "Monthly subscription" },
  { value: "annual", label: "Annual contract" },
  { value: "custom", label: "Custom enterprise quote" },
  { value: "free", label: "Free tier" },
];

export function Products() {
  const { data, loading, error, reload } = useApi<Product[]>("products/");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [pricing, setPricing] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showComparator, setShowComparator] = useState(false);
  const { openModal } = useTalkModal();

  const list = (data && data.length > 0) ? data : DEFAULT_PRODUCTS;

  const categories = useMemo(
    () => Array.from(new Set(list.map((p) => p.category).filter(Boolean))),
    [list]
  );

  const filtered = list.filter((p) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.short_description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.problem_solved && p.problem_solved.toLowerCase().includes(q)) ||
      (p.target_customer && p.target_customer.toLowerCase().includes(q));

    const matchesCategory = !category || p.category === category;
    const matchesPricing = !pricing || p.pricing_type === pricing;
    return matchesSearch && matchesCategory && matchesPricing;
  });

  return (
    <div>
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-florante-100 bg-moss/60 py-12 sm:py-16 md:py-24" data-track-section="hero">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-light opacity-60"
          style={{ backgroundSize: "48px 48px" }}
        />
        <div className="pointer-events-none absolute -left-32 -top-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="container-page relative">
          <SectionHeading
            index="P"
            eyebrow="Product Marketplace"
            title="Technology ready to deploy"
            subtitle="Explore professionally engineered digital platforms built for African institutions and businesses. Deploy, customize, and scale instantly."
          />

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => setShowComparator(true)}
              className="inline-flex items-center gap-2 rounded-full bg-florante-700 px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:bg-florante-800 hover:shadow-glow"
            >
              <IconSparkles size={16} className="text-accent" />
              Compare Products Side-by-Side
            </button>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section className="relative overflow-hidden bg-white py-12 md:py-20" data-track-section="catalog">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col gap-4 border-b border-florante-100 pb-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <IconSearch size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-florante-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products by name, problem, or industry..."
                  className="w-full rounded-full bg-moss/50 py-2.5 pl-10 pr-4 text-sm text-florante-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-florante-500/30"
                />
              </div>

              {/* Filters & View Toggles */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setCategory("")}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${!category ? "bg-florante-700 text-white" : "bg-florante-50 text-gray-600 hover:text-florante-700"
                      }`}
                  >
                    All Categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${category === c ? "bg-florante-700 text-white" : "bg-florante-50 text-gray-600 hover:text-florante-700"
                        }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={pricing}
                    onChange={(e) => setPricing(e.target.value)}
                    className="rounded-full bg-moss/50 px-4 py-2 text-xs font-medium text-florante-800 outline-none transition focus:bg-white focus:ring-2 focus:ring-florante-500/30"
                  >
                    {PRICING_FILTERS.map((f) => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>

                  <div className="flex items-center rounded-full border border-florante-100 bg-florante-50 p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`rounded-full p-1.5 transition-colors ${viewMode === "grid" ? "bg-white text-florante-800 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                      title="Grid View"
                    >
                      <IconGrid size={15} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`rounded-full p-1.5 transition-colors ${viewMode === "list" ? "bg-white text-florante-800 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                      title="List View"
                    >
                      <IconList size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Product Listing */}
          <div className="mt-8">
            {loading ? (
              <Spinner label="Loading products..." />
            ) : error ? (
              <ErrorState message={error} onRetry={reload} />
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-base text-gray-600">
                  No products match your current filters.
                </p>
                <button
                  onClick={() => { setSearch(""); setCategory(""); setPricing(""); }}
                  className="mt-3 text-xs font-semibold text-florante-700 hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* RICH PRODUCT CARDS GRID (Spec §11 & §12) */
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 60}>
                    <div className="group relative flex h-full flex-col rounded-3xl border border-florante-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-florante-200 hover:shadow-lift justify-between">
                      <div>
                        {/* Header Badge */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-florante-600 bg-florante-50 px-3 py-1 rounded-full">
                            {p.category}
                          </span>
                          <span className={`pill ${p.status === "available" ? "pill-green" : "bg-amber-50 text-amber-700"}`}>
                            {p.status.replace("_", " ")}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="mt-4 font-heading text-xl font-bold text-florante-900 group-hover:text-florante-700 transition-colors">
                          {p.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-2">
                          {p.short_description}
                        </p>

                        {/* Problem Solved */}
                        {p.problem_solved && (
                          <div className="mt-4 rounded-xl bg-florante-50/70 p-3 text-xs text-gray-700">
                            <span className="font-bold text-florante-900">Solves: </span>
                            <span className="line-clamp-2">{p.problem_solved}</span>
                          </div>
                        )}

                        {/* Target Customer */}
                        {p.target_customer && (
                          <p className="mt-3 text-xs text-gray-500 font-medium">
                            <span className="font-semibold text-gray-700">For: </span>
                            {p.target_customer}
                          </p>
                        )}

                        {/* 3-5 Key Features */}
                        {p.features && p.features.length > 0 && (
                          <div className="mt-4 border-t border-florante-50 pt-3">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Key Capabilities:</p>
                            <ul className="space-y-1.5">
                              {p.features.slice(0, 4).map((f) => (
                                <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                                  <IconCheck size={13} className="text-accent-dark shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Card Footer: Pricing & CTAs */}
                      <div className="mt-6 border-t border-florante-100 pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs text-gray-400 font-medium">Pricing</span>
                          <span className="font-heading text-sm font-bold text-florante-900">
                            {p.pricing || "Custom quote"}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            to={`/products/${p.slug}`}
                            className="flex items-center justify-center gap-1 rounded-full border border-florante-200 bg-white py-2.5 text-xs font-semibold text-florante-800 transition-colors hover:bg-florante-50"
                          >
                            View Product
                          </Link>
                          <button
                            onClick={() => openModal({ product: p.name, need: "Product Demo" })}
                            className="flex items-center justify-center gap-1 rounded-full bg-accent-grad py-2.5 text-xs font-semibold text-florante-950 shadow-glow-sm transition-all hover:brightness-105"
                          >
                            Request Demo
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              /* EDITORIAL LIST VIEW */
              <div className="editorial-list">
                {filtered.map((p, i) => (
                  <Reveal key={p.slug}>
                    <div className="group editorial-link md:grid-cols-[3rem_1fr_auto]">
                      <span className="editorial-num">{String(i + 1).padStart(2, "0")}</span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <Link to={`/products/${p.slug}`} className="font-heading text-xl font-bold text-florante-800 hover:text-florante-600">
                            {p.name}
                          </Link>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${p.status === "available"
                                ? "bg-accent/10 text-accent-dark"
                                : "bg-amber-50 text-amber-600"
                              }`}
                          >
                            {p.status.replace("_", " ")}
                          </span>
                        </div>
                        <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-gray-600">
                          {p.short_description}
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-florante-500">
                          {p.category} {p.target_customer ? `· For: ${p.target_customer}` : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 self-start md:self-center">
                        <span className="hidden font-heading text-sm font-bold text-florante-800 md:inline">
                          {p.pricing || "Custom quote"}
                        </span>
                        <Link
                          to={`/products/${p.slug}`}
                          className="editorial-arrow"
                        >
                          <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Comparator Modal */}
      <ProductComparator isOpen={showComparator} onClose={() => setShowComparator(false)} />
    </div>
  );
}