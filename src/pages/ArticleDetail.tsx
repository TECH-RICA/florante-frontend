import { useParams, Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { Spinner } from "../components/Spinner";
import { NotFoundDetail } from "../components/NotFoundDetail";
import { CTAButton } from "../components/CTAButton";
import { useApi } from "../hooks/useApi";
import type { Article } from "../lib/types";
import { IconChevronRight, IconEye } from "../components/icons";

import { DEFAULT_ARTICLES_MAP } from "../data/defaults";

export function ArticleDetail() {
  const { slug } = useParams();
  const { data: apiArticle, loading, notFound } = useApi<Article>(`insights/${slug}/`);

  // API data takes priority; defaults are the crafted content fallback.
  // Only show Coming Soon when slug is truly unknown (not in defaults AND API 404'd).
  const defaultData = slug ? DEFAULT_ARTICLES_MAP[slug] : null;
  const a = apiArticle || defaultData;

  if (loading && !a) return <Spinner label="Loading article..." />;
  if (!a || (notFound && !defaultData))
    return <NotFoundDetail type="article" indexPath="/insights" indexLabel="Browse insights" slug={slug} />;

  const published = a.published_at
    ? new Date(a.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <article>
      <section className="relative overflow-hidden border-b border-florante-100 bg-moss/60 py-12 sm:py-16 md:py-24" data-track-section="article-hero">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-light opacity-60"
          style={{ backgroundSize: "48px 48px" }}
        />
        <div className="pointer-events-none absolute -left-32 -top-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="container-narrow relative">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-600">
            <Link to="/" className="transition-colors hover:text-florante-700">Home</Link>
            <IconChevronRight size={13} />
            <Link to="/insights" className="transition-colors hover:text-florante-700">Insights</Link>
            <IconChevronRight size={13} />
            <span className="text-florante-700">{a.category}</span>
          </nav>
          <Reveal>
            <h1 className="mt-4 font-heading text-2xl font-bold leading-tight tracking-tightest sm:mt-6 sm:text-4xl md:text-5xl">
              {a.title}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-florante-100 pt-6 text-sm text-gray-600">
              <span className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-grad font-heading text-xs font-bold text-white">
                  {a.author_name
                    ? a.author_name.split(" ").map((n) => n[0]).slice(0, 2).join("")
                    : "FT"}
                </span>
                <span className="font-semibold text-florante-800">{a.author_name || "Florante Team"}</span>
                {a.author_role && <span className="text-gray-600">· {a.author_role}</span>}
              </span>
              {published && <span>{published}</span>}
              <span className="flex items-center gap-1.5">
                <IconEye size={15} className="text-gray-600" /> {a.views_count} views
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20" data-track-section="article-content">
        <div className="container-narrow">
          <Reveal>
            <div className="prose-florante max-w-none text-base leading-relaxed">{a.content}</div>
          </Reveal>

          {a.tags?.length > 0 && (
            <Reveal className="mt-12 flex flex-wrap gap-2">
              {a.tags.map((t) => (
                <span key={t} className="rounded-full bg-florante-50 px-4 py-1.5 text-xs font-medium text-florante-700">
                  #{t}
                </span>
              ))}
            </Reveal>
          )}

          <Reveal className="mt-14">
            <div className="relative overflow-hidden rounded-3xl bg-green-grad p-10 text-white shadow-lift">
              <div
                className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60"
                style={{ backgroundSize: "44px 44px" }}
              />
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-blob rounded-full bg-accent/20 blur-3xl" />
              <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <h2 className="font-heading text-2xl font-bold">Want to put these ideas to work?</h2>
                  <p className="mt-2 max-w-md text-sm text-florante-100/80">
                    Talk to Florante about applying this thinking to your organization.
                  </p>
                </div>
                <CTAButton to="/contact" variant="lime" withArrow>
                  Talk to Florante
                </CTAButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}