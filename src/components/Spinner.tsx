export function Spinner({ size = 28, label }: { size?: number; label?: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-20"
      role="status"
      aria-live="polite"
    >
      <span className="relative flex items-center justify-center">
        <span
          className="absolute h-full w-full animate-spin rounded-full border-2 border-florante-100"
          style={{ width: size, height: size }}
        />
        <span
          className="absolute h-full w-full animate-spin rounded-full border-2 border-transparent border-t-accent"
          style={{ width: size, height: size, animationDirection: "reverse" }}
        />
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z"
            fill="#1a472a"
          />
        </svg>
      </span>
      {label && (
        <span className="text-xs font-medium uppercase tracking-widest text-gray-600">
          {label}
        </span>
      )}
    </div>
  );
}