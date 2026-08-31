import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { IconArrowRight } from "./icons";

interface CTAButtonProps {
  to?: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "accent" | "white" | "lime";
  children: ReactNode;
  className?: string;
  withArrow?: boolean;
}

export function CTAButton({
  to,
  href,
  variant = "primary",
  children,
  className = "",
  withArrow = false,
}: CTAButtonProps) {
  const variants: Record<string, string> = {
    primary:
      "bg-florante-700 text-white hover:bg-florante-800 hover:shadow-glow shadow-soft active:scale-95",
    accent:
      "bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-florante-950 font-bold shadow-[0_0_25px_rgba(52,211,153,0.35)] hover:shadow-[0_0_35px_rgba(52,211,153,0.5)] active:scale-95",
    secondary:
      "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/40 shadow-sm active:scale-95",
    ghost: "text-florante-700 hover:bg-florante-50 active:scale-95",
    white: "bg-white text-florante-800 shadow-soft hover:bg-florante-50 hover:shadow-glow active:scale-95",
    lime: "bg-accent-grad text-florante-950 shadow-glow hover:brightness-105 active:scale-95",
  };

  const base = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${variants[variant]} ${className}`;

  const track = { "data-track-click": "cta" } as const;

  const content = (
    <>
      {children}
      {withArrow && (
        <IconArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={base} {...track}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={base} target="_blank" rel="noopener noreferrer" {...track}>
        {content}
      </a>
    );
  }
  return (
    <button className={base} {...track}>
      {content}
    </button>
  );
}