import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
  index?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
  index,
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <Reveal className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow && (
        <span className={dark ? "eyebrow-dark" : "eyebrow"}>
          {index && (
            <span
              className={`mr-1.5 inline-flex h-5 items-center rounded-full px-1.5 font-mono text-[10px] font-bold ${
                dark
                  ? "bg-white/15 text-accent-soft"
                  : "bg-accent/15 text-accent-dark"
              }`}
            >
              {index}
            </span>
          )}
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-3 sm:mt-5 font-heading text-2xl font-bold leading-tight tracking-tightest sm:text-4xl md:text-[2.75rem] ${
          dark ? "text-white" : "text-florante-800"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-2.5 sm:mt-4 text-sm leading-relaxed sm:text-base md:text-lg ${
            dark ? "text-florante-100/85" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}