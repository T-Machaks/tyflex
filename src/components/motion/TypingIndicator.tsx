interface TypingIndicatorProps {
  className?: string;
  dotClassName?: string;
}

/**
 * Three-dot "typing" indicator for the AI chatbot (and anywhere else that
 * needs to signal "response incoming"). Pure CSS animation — no JS state.
 */
export default function TypingIndicator({ className, dotClassName }: TypingIndicatorProps) {
  return (
    <span className={`inline-flex items-center gap-1 ${className ?? ""}`}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full bg-brand-red animate-blink ${dotClassName ?? ""}`}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </span>
  );
}
