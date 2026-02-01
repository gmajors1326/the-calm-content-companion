type ToolErrorProps = {
  message: string;
  onRetry?: () => void;
};

export default function ToolError({ message, onRetry }: ToolErrorProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
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
  );
}
