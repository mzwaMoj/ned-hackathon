"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuerySuggestionProps {
  text: string;
  onClick: () => void;
}

export function QuerySuggestion({ text, onClick }: QuerySuggestionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full px-4 py-3 rounded-lg",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200 dark:border-zinc-800",
        "text-left text-sm text-zinc-700 dark:text-zinc-300",
        "hover:bg-zinc-50 dark:hover:bg-zinc-800",
        "hover:border-green-500 dark:hover:border-green-400",
        "transition-colors",
        "flex items-center gap-2"
      )}
    >
      <Sparkles className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0" />
      <span className="flex-1">{text}</span>
    </button>
  );
}

