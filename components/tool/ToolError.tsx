type ToolErrorProps = {
  message: string;
  onRetry?: () => void;
  debugId?: string;
};

export default function ToolError({ message, onRetry, debugId }: ToolErrorProps) {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span>{message}</span>
        {onRetry ? (
          <button
            type="button"
            className="rounded-full border border-rose-300 px-3 py-1 text-xs font-semibold text-rose-700 transition hover:border-rose-500"
            onClick={onRetry}
          >
            Try again
          </button>
        ) : null}
      </div>
      {debugId ? (
        <p className="mt-2 text-xs text-rose-600/80">Debug ID: {debugId}</p>
      ) : null}
    </div>
  );
}
