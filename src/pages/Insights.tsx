import { useState } from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { Spinner } from "../components/Spinner";
import { ErrorState } from "../components/ErrorState";
import { useApi } from "../hooks/useApi";
import type { Article, ArticleCategory } from "../lib/types";
import { IconArrowUpRight, IconSparkles } from "../components/icons";

function FeaturedArticle({ a }: { a: Article }) {
  return (
    <Link
      to={`/insights/${a.slug}`}
      className="card-hover group relative flex h-full flex-col justify-between overflow-hidden rounded-[2.5rem] bg-green-grad p-10 text-white shadow-lift md:p-14"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60"
        style={{ backgroundSize: "44px 44px" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 animate-blob rounded-full bg-accent/20 blur-3xl" />
      <div className="relative">
        <span className="eyebrow-dark">
          <IconSparkles size={14} className="text-accent" /> Featured
        </span>
        <h2 className="mt-6 max-w-2xl font-heading text-2xl font-bold leading-tight tracking-tightest sm:text-3xl md:text-4xl">
          {a.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-florante-100/80">{a.excerpt}</p>
      </div>
      <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-grad font-heading text-sm font-bold text-florante-950">
            {a.author_name
              ? a.author_name.split(" ").map((n) => n[0]).slice(0, 2).join("")
              : "FT"}
          </span>
          <div className="text-sm">
            <p className="font-semibold text-white">{a.author_name || "Florante Team"}</p>
            <p className="text-xs text-florante-100/80">
              {a.published_at
                ? new Date(a.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                : ""}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          Read article
          <IconArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </Link>
  );
}

function ArticleRow({ a, i }: { a: Article; i: number }) {
  return (
    <Link to={`/insights/${a.slug}`} className="group editorial-link md:grid-cols-[3rem_1fr_auto]">
      <span className="editorial-num">{String(i + 1).padStart(2, "0")}</span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="font-heading text-lg font-bold leading-snug text-florante-800 md:text-xl">
            {a.title}
          </h3>
          <span className="text-xs font-semibold uppercase tracking-widest text-florante-500">
            {a.category}
          </span>
        </div>
        <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-gray-600">{a.excerpt}</p>
      </div>
      <span className="editorial-arrow self-start md:self-center">
        <span className="hidden text-right text-xs text-gray-500 md:inline">
          {a.published_at &&
            new Date(a.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
        <IconArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </span>
    </Link>
  );
}

import { DEFAULT_CATEGORIES, DEFAULT_ARTICLES } from "../data/defaults";

export function Insights() {
  const [category, setCategory] = useState("");
  const categories = useApi<ArticleCategory[]>("insights/categories/");
  const articles = useApi<Article[]>(`insights/${category ? `?category=${category}` : ""}`);

  const catList = (categories.data && categories.data.length > 0) ? categories.data : DEFAULT_CATEGORIES;
  const rawList = (articles.data && articles.data.length > 0) ? articles.data : DEFAULT_ARTICLES;
  const list = category ? rawList.filter((a) => a.category.toLowerCase().includes(category.toLowerCase()) || a.slug.includes(category)) : rawList;
  const [featured, ...rest] = list;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-florante-100 bg-moss/60 py-12 sm:py-16 md:py-24" data-track-section="hero">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-light opacity-60"
          style={{ backgroundSize: "48px 48px" }}
        />
        <div className="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="container-page relative">
          <SectionHeading
            index="N"
            eyebrow="Florante Intelligence"
            title="Ideas shaping African technology"
            subtitle="Perspectives on AI, cybersecurity and digital transformation — written for leaders who build."
          />

          <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setCategory("")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                !category
                  ? "bg-florante-700 text-white shadow-soft"
                  : "bg-white text-gray-600 hover:text-florante-700"
              }`}
            >
              All topics
            </button>
            {catList.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCategory(c.slug)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  category === c.slug
                    ? "bg-florante-700 text-white shadow-soft"
                    : "bg-white text-gray-600 hover:text-florante-700"
                }`}
              >
                {c.label}
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-14 md:py-20" data-track-section="articles-list">
        <div className="container-page">
          {articles.loading ? (
            <Spinner label="Loading insights..." />
          ) : articles.error ? (
            <ErrorState message={articles.error} onRetry={articles.reload} />
          ) : list.length === 0 ? (
            <p className="py-16 text-center text-gray-600">
              No articles published yet in this topic. Check back soon.
            </p>
          ) : (
            <>
              {featured && (
                <Reveal>
                  <FeaturedArticle a={featured} />
                </Reveal>
              )}
              <div className="editorial-list mt-10">
                {rest.map((a, i) => (
                  <Reveal key={a.slug} delay={i * 60}>
                    <ArticleRow a={a} i={i + 1} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}