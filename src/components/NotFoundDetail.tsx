import { CTAButton } from "./CTAButton";
import { IconSparkles, IconArrowRight } from "./icons";

export function NotFoundDetail({
  type,
  indexPath,
  indexLabel,
  slug,
}: {
  type: string;
  indexPath: string;
  indexLabel: string;
  slug?: string;
}) {
  const displaySlug = slug?.replace(/-/g, " ");

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-florante-50 via-moss/30 to-white" />
      <div
        className="pointer-events-none absolute inset-0 bg-grid-light opacity-40"
        style={{ backgroundSize: "52px 52px" }}
      />
      <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-20 h-72 w-72 rounded-full bg-florante-200/40 blur-3xl" />

      <div className="container-page relative text-center">
        {/* Icon */}
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-accent-grad shadow-glow">
          <IconSparkles size={32} className="text-florante-950" />
        </span>

        {/* Eyebrow */}
        <p className="eyebrow mx-auto mt-8">Resource coming soon</p>

        {/* Heading */}
        <h1 className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-bold leading-tight tracking-tightest text-florante-900 sm:text-4xl md:text-5xl">
          This {type} is still being{" "}
          <span className="text-gradient-bright">prepared</span>
        </h1>

        {/* Slug hint */}
        {displaySlug && (
          <p className="mx-auto mt-4 max-w-sm rounded-full border border-florante-200 bg-white/80 px-4 py-2 font-mono text-sm text-florante-700 shadow-soft backdrop-blur">
            /{type}/{displaySlug}
          </p>
        )}

        {/* Body */}
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-gray-600">
          Our team is still crafting this content. Check back soon, browse
          what's already live, or reach out and we'll fast-track it for you.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <CTAButton to={indexPath}>
            <span className="flex items-center gap-2">
              {indexLabel}
              <IconArrowRight size={15} />
            </span>
          </CTAButton>
          <CTAButton to="/contact" variant="ghost" withArrow>
            Talk to Florante
          </CTAButton>
        </div>

        {/* Divider note */}
        <p className="mt-10 text-xs text-gray-400">
          You can also message us on{" "}
          <a
            href="https://wa.me/254770428297"
            className="font-semibold text-florante-600 underline hover:text-florante-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>{" "}
          and we'll get back to you right away.
        </p>
      </div>
    </section>
  );
}