"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { User, Bot, AlertCircle } from "lucide-react";

type MessageRole = "user" | "assistant" | "system";

interface ChatMessageProps {
  role: MessageRole;
  content: string;
  timestamp?: Date;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, timestamp, isStreaming }: ChatMessageProps) {
  const [mounted, setMounted] = useState(false);
  const isUser = role === "user";
  const isSystem = role === "system";

  useEffect(() => {
    setMounted(true);
  }, []);

  const formattedTime = mounted && timestamp
    ? timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <div
      className={cn(
        "flex gap-3 py-4 px-4 sm:px-6",
        isUser && "bg-zinc-50 dark:bg-zinc-900/30",
        isSystem && "bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 dark:border-green-400"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
          isUser ? "bg-zinc-200 dark:bg-zinc-800" : isSystem ? "bg-green-500 dark:bg-green-600" : "bg-blue-100 dark:bg-blue-900"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
        ) : isSystem ? (
          <AlertCircle className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        )}
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            {isUser ? "You" : isSystem ? "System" : "Assistant"}
          </span>
          {formattedTime && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {formattedTime}
            </span>
          )}
        </div>
        
        <div className={cn(
          "text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap",
          isStreaming && "animate-pulse"
        )}>
          {content}
          {isStreaming && <span className="inline-block w-1 h-4 ml-1 bg-blue-500 animate-pulse" />}
        </div>
      </div>
    </div>
  );
}

