export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9l6 6M15 9l-6 6" />
        </svg>
      </span>
      <div>
        <p className="font-heading text-sm font-semibold text-gray-700">Couldn't load this content</p>
        <p className="mt-1 text-sm text-gray-600">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-full bg-florante-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-florante-800"
        >
          Try Again
        </button>
      )}
    </div>
  );
}