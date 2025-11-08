"use client";

import { useState, KeyboardEvent } from "react";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSend, 
  disabled = false,
  placeholder = "Ask about your transactions, balances, or statements..."
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "w-full px-4 py-3 pr-12 rounded-lg border border-zinc-200 dark:border-zinc-800",
            "bg-white dark:bg-zinc-900",
            "text-zinc-900 dark:text-zinc-50",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
            "focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        />
      </div>
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full",
          "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700",
          "text-white",
          "flex items-center justify-center",
          "transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}

