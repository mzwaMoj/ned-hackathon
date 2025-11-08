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
        "bg-white",
        "border border-zinc-200",
        "text-left text-sm text-zinc-700",
        "hover:bg-zinc-50",
        "hover:border-[#00C853]",
        "transition-colors",
        "flex items-center gap-2"
      )}
    >
      <Sparkles className="w-4 h-4 text-[#00C853] flex-shrink-0" />
      <span className="flex-1">{text}</span>
    </button>
  );
}

