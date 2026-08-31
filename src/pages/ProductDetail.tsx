import { useParams, Link } from "react-router-dom";
import { CTAButton } from "../components/CTAButton";
import { Reveal } from "../components/Reveal";
import { Spinner } from "../components/Spinner";
import { NotFoundDetail } from "../components/NotFoundDetail";
import { useApi } from "../hooks/useApi";
import type { Product } from "../lib/types";
import {
  IconCheck,
  IconChevronRight,
  IconQuote,
  IconShield,
  IconLock,
  IconRocket,
} from "../components/icons";

import { useTalkModal } from "../hooks/useTalkModal";

function OpenList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="border-t border-florante-100 pt-8">
      <div className="flex items-baseline gap-3">
        <h3 className="font-heading text-lg font-bold text-florante-800">{title}</h3>
        <span className="font-mono text-xs font-bold text-florante-300">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-5 grid gap-x-12 gap-y-3.5 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
              <IconCheck size={12} />
            </span>
            <span className="text-sm leading-snug text-gray-600">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OpenBlock({
  Icon,
  title,
  text,
  tone = "moss",
}: {
  Icon: typeof IconShield;
  title: string;
  text: string;
  tone?: "moss" | "dark";
}) {
  return (
    <div className="border-t border-florante-100 pt-8">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            tone === "dark" ? "bg-green-grad text-white" : "bg-moss text-florante-700"
          }`}
        >
          <Icon size={18} />
        </span>
        <h2 className="font-heading text-2xl font-bold text-florante-800">{title}</h2>
      </div>
      <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-relaxed text-gray-600">
        {text}
      </p>
    </div>
  );
}

import { DEFAULT_PRODUCTS_MAP } from "../data/defaults";

export function ProductDetail() {
  const { slug } = useParams();
  const { data: apiProduct, loading, notFound } = useApi<Product>(`products/${slug}/`);
  const { openModal } = useTalkModal();

  // API data takes priority; defaults are the crafted content fallback.
  // Only show Coming Soon when slug is truly unknown (not in defaults AND API 404'd).
  const defaultData = slug ? DEFAULT_PRODUCTS_MAP[slug] : null;
  const p = apiProduct || defaultData;

  if (loading && !p) return <Spinner label="Loading product..." />;
  if (!p || (notFound && !defaultData))
    return <NotFoundDetail type="product" indexPath="/products" indexLabel="Browse products" slug={slug} />;

  const whatsappUrl = `https://wa.me/254770428297?text=${encodeURIComponent(
    `Hello Florante, I'm interested in ${p.name} and would like a demo.`
  )}`;

  return (
    <div>
      <section className="relative overflow-hidden bg-green-grad pt-28 pb-14 text-white sm:pt-36 sm:pb-20 md:py-32" data-track-section="hero">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70"
          style={{ backgroundSize: "48px 48px" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 animate-blob rounded-full bg-accent/15 blur-3xl" />
        <div className="container-page relative grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-florante-100/85">
              <Link to="/" className="transition-colors hover:text-white">Home</Link>
              <IconChevronRight size={13} />
              <Link to="/products" className="transition-colors hover:text-white">Products</Link>
              <IconChevronRight size={13} />
              <span className="text-accent-soft">{p.name}</span>
            </nav>
            <Reveal>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-accent-soft sm:mt-6">{p.category}</p>
              <h1 className="mt-2 max-w-3xl font-heading text-2xl font-bold leading-tight tracking-tightest sm:text-5xl md:text-6xl">
                {p.name}
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-florante-100/90 sm:mt-6 sm:text-lg">
                {p.long_description || p.short_description}
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold sm:text-sm">
                  {p.pricing || "Custom quote"}
                </span>
                <span className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold capitalize text-accent-soft">
                  {p.status.replace("_", " ")}
                </span>
              </div>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <button
                  onClick={() => openModal({ product: p.name, need: "Product Demo" })}
                  className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 px-8 py-3.5 text-sm font-bold text-florante-950 shadow-[0_0_25px_rgba(52,211,153,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(52,211,153,0.55)] active:scale-95 sm:w-auto"
                >
                  <span>Request a demo</span>
                  <IconRocket size={15} />
                </button>
                <CTAButton href={whatsappUrl} variant="secondary" className="w-full sm:w-auto !py-3.5 !px-8 hover:scale-[1.02] active:scale-95">
                  Chat on WhatsApp
                </CTAButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="hidden lg:block">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-florante-100/85">
                  Snapshot
                </p>
                <span className="flex h-2.5 w-2.5 animate-pulse-soft rounded-full bg-accent" />
              </div>
              <div className="mt-5 divide-y divide-white/10">
                {[
                  { label: "Deployment", value: "Cloud / On-premise" },
                  { label: "Support", value: "Training included" },
                  { label: "Customization", value: "Fully tailorable" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-3">
                    <span className="text-xs text-florante-100/80">{row.label}</span>
                    <span className="text-xs font-semibold text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 md:py-20" data-track-section="details">
        <div className="container-page grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-12">
            {p.problem_solved && (
              <Reveal>
                <OpenBlock Icon={IconRocket} title="The problem it solves" text={p.problem_solved} />
              </Reveal>
            )}

            <Reveal>
              <OpenList title="Key features" items={p.features} />
            </Reveal>
            <Reveal>
              <OpenList title="Benefits" items={p.benefits} />
            </Reveal>

            {p.how_it_works && (
              <Reveal>
                <OpenBlock Icon={IconShield} title="How it works" text={p.how_it_works} />
              </Reveal>
            )}

            {p.target_customer && (
              <Reveal>
                <div className="border-t border-florante-100 pt-8">
                  <h2 className="font-heading text-2xl font-bold text-florante-800">Who it's for</h2>
                  <p className="mt-4 text-base leading-relaxed text-gray-600">{p.target_customer}</p>
                </div>
              </Reveal>
            )}

            {p.security_notes && (
              <Reveal>
                <OpenBlock Icon={IconLock} title="Security by design" text={p.security_notes} tone="dark" />
              </Reveal>
            )}

            {p.testimonials?.length > 0 && (
              <Reveal>
                <div className="border-t border-florante-100 pt-8">
                  <h2 className="font-heading text-2xl font-bold text-florante-800">What clients say</h2>
                  <div className="mt-6 grid gap-8 sm:grid-cols-2">
                    {p.testimonials.map((t, i) => (
                      <figure key={t.id} className="relative">
                        <span className="pointer-events-none absolute right-1 top-1 font-heading text-4xl font-bold leading-none text-florante-900/[0.05]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <IconQuote size={26} className="text-florante-200" />
                        <blockquote className="mt-3 text-[15px] leading-relaxed text-gray-700">
                          "{t.quote}"
                        </blockquote>
                        <figcaption className="mt-4 text-sm font-semibold text-florante-800">
                          {t.author}
                          {t.company && <span className="font-normal text-gray-600"> · {t.company}</span>}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] bg-green-grad p-8 text-white shadow-lift">
                <div
                  className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50"
                  style={{ backgroundSize: "36px 36px" }}
                />
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-2xl" />
                <div className="relative">
                  <span className="eyebrow-dark">Demo</span>
                  <h3 className="mt-5 font-heading text-xl font-bold">See {p.name} in action</h3>
                  <p className="mt-2 text-sm text-florante-100/80">
                    Request a personalized demo tailored to your organization.
                  </p>
                  <div className="mt-6 flex flex-col gap-2.5">
                    <CTAButton to="/contact" variant="white" withArrow className="w-full">
                      Request demo
                    </CTAButton>
                    <CTAButton href={whatsappUrl} variant="secondary" className="w-full border-white/25">
                      WhatsApp us
                    </CTAButton>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="editorial-list">
                <div className="border-b border-florante-100 py-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-florante-500">
                    Technologies
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.technologies?.length ? (
                      p.technologies.map((t) => (
                        <span key={t} className="rounded-full border border-florante-100 px-3 py-1 text-xs font-medium text-florante-700">
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </div>
                </div>
                {p.integrations?.length > 0 && (
                  <div className="border-b border-florante-100 py-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-florante-500">
                      Integrations
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.integrations.map((t) => (
                        <span key={t} className="rounded-full border border-florante-100 px-3 py-1 text-xs font-medium text-florante-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {p.industries?.length > 0 && (
                  <div className="border-b border-florante-100 py-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-florante-500">
                      Built for industries
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.industries.map((ind) => (
                        <span key={ind} className="rounded-full bg-florante-50 px-3 py-1 text-xs font-medium text-florante-700">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="py-5">
                  <p className="flex items-start gap-3 text-xs leading-relaxed text-gray-600">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-moss text-florante-700">
                      <IconShield size={15} />
                    </span>
                    Enterprise-grade security, backed by Kenyan-built infrastructure you can trust.
                  </p>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>

        {p.faqs?.length > 0 && (
          <div className="container-page mt-16">
            <Reveal>
              <h2 className="text-center font-heading text-2xl font-bold text-florante-800">
                Frequently asked questions
              </h2>
              <div className="mx-auto mt-8 max-w-3xl border-t border-florante-100">
                {p.faqs.map((f) => (
                  <details key={f.question} className="group border-b border-florante-100 py-4">
                    <summary className="cursor-pointer list-none text-sm font-semibold text-florante-800">
                      <span className="flex items-center justify-between gap-3">
                        {f.question}
                        <IconChevronRight size={15} className="shrink-0 text-florante-400 transition-transform duration-300 group-open:rotate-90" />
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{f.answer}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        )}
      </section>
    </div>
  );
}