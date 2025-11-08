"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { QuerySuggestion } from "@/components/chat/QuerySuggestion";
import { Pin, Settings, ArrowRight, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

const EXAMPLE_QUERIES = [
  "What was my total spending last month?",
  "Show me all transactions over $1,000",
  "What's my current account balance?",
  "Find payments to vendors in Q4",
];

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setMessages([
      {
        id: "1",
        role: "system",
        content: "Connected to your business account. All data is encrypted and queries are audited.",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Based on your bank statements, here's what I found...",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleQuerySuggestion = (query: string) => {
    handleSendMessage(query);
  };

  const showWelcome = messages.length === 1 && isMounted;

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <header className="flex-shrink-0 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Chat with My Bank
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/pins")}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg",
                "text-sm font-medium text-zinc-700 dark:text-zinc-300",
                "hover:bg-zinc-100 dark:hover:bg-zinc-900",
                "transition-colors"
              )}
            >
              <Pin className="w-4 h-4" />
              <span className="hidden sm:inline">Pins</span>
            </button>
            <button
              className={cn(
                "p-2 rounded-lg",
                "text-zinc-600 dark:text-zinc-400",
                "hover:bg-zinc-100 dark:hover:bg-zinc-900",
                "transition-colors"
              )}
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              className={cn(
                "p-2 rounded-lg",
                "text-zinc-600 dark:text-zinc-400",
                "hover:bg-zinc-100 dark:hover:bg-zinc-900",
                "transition-colors"
              )}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full">
          {showWelcome && (
            <>
              <div className="px-4 sm:px-6 py-12 space-y-6">
                <div className="text-center space-y-3">
                  <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
                    Ask me anything about your finances
                  </h2>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                    Query your transactions, balances, and statements with natural language. All answers include citations to source data.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {EXAMPLE_QUERIES.map((query, idx) => (
                    <QuerySuggestion
                      key={idx}
                      text={query}
                      onClick={() => handleQuerySuggestion(query)}
                    />
                  ))}
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg",
                      "text-sm font-medium text-zinc-700 dark:text-zinc-300",
                      "border border-zinc-200 dark:border-zinc-800",
                      "bg-white dark:bg-zinc-900",
                      "hover:bg-zinc-50 dark:hover:bg-zinc-800",
                      "transition-colors"
                    )}
                  >
                    <Upload className="w-4 h-4" />
                    Upload statements
                  </button>
                </div>
              </div>

              {messages[0] && (
                <div className="px-4 sm:px-6">
                  <ChatMessage
                    role="system"
                    content={messages[0].content}
                    timestamp={messages[0].timestamp}
                  />
                </div>
              )}
            </>
          )}

          {!showWelcome && (
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}

              {isProcessing && (
                <ChatMessage
                  role="assistant"
                  content="Analyzing your statements..."
                  timestamp={new Date()}
                  isStreaming
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <ChatInput onSend={handleSendMessage} disabled={isProcessing} />
        </div>
      </div>
    </div>
  );
}
