/* eslint-disable react-hooks/purity */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { QuerySuggestion } from "@/components/chat/QuerySuggestion";
import { Bell, MessageCircle, Target, CreditCard, Plus, Users, MoreHorizontal, Upload, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSendMessageMutation } from "@/lib/api/chatApi";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

const EXAMPLE_QUERIES = [
  "What was my total spending last month?",
  "Show me all transactions over R 10,000",
  "How many payments where made via payshap",
  "How many payments were made this week?",
];

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [sendMessage, { isLoading: isProcessing }] = useSendMessageMutation();

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

    try {
      const response = await sendMessage({ message: content }).unwrap();
      
      let messageContent = "I received your message.";
      
      if (Array.isArray(response) && response.length > 0) {
        const firstItem = response[0];
        if (firstItem && typeof firstItem === 'object' && 'output' in firstItem) {
          messageContent = firstItem.output || messageContent;
        }
      } else if (response && typeof response === 'object' && 'output' in response) {
        messageContent = response.output || messageContent;
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: messageContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Error: ${error?.data?.message || error?.data || error?.message || "Failed to send message. Please try again."}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleQuerySuggestion = (query: string) => {
    handleSendMessage(query);
  };

  const showWelcome = messages.length === 1 && isMounted;

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="bg-[#00C853] text-white">
        <div className="flex justify-between items-center px-6 pt-2 pb-1 text-sm">
          <span>8:54</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              <div className="w-1 h-1.5 bg-white rounded-sm"></div>
              <div className="w-1 h-2 bg-white rounded-sm"></div>
              <div className="w-1 h-2.5 bg-white rounded-sm"></div>
              <div className="w-1 h-3 bg-white rounded-sm"></div>
            </div>
            <div className="w-4 h-3 border border-white rounded-sm ml-1">
              <div className="w-2 h-1.5 bg-white rounded-sm m-0.5"></div>
            </div>
            <div className="w-6 h-3 border border-white rounded-sm ml-2">
              <div className="w-full h-full bg-white rounded-sm"></div>
            </div>
          </div>
        </div>

        <header className="flex items-center justify-between px-6 py-4">
          <button onClick={() => router.push('/overview')} className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <h1 className="text-lg font-semibold">Chat</h1>
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6" strokeWidth={1.5} />
            <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
          </div>
        </header>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto w-full">
          {showWelcome && (
            <>
              <div className="px-4 sm:px-6 py-12 space-y-6">
                <div className="text-center space-y-3">
                  <h2 className="text-3xl font-semibold text-zinc-900">
                    Ask me anything about your finances
                  </h2>
                  <p className="text-base text-zinc-600 max-w-xl mx-auto">
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
                      "text-sm font-medium text-zinc-700",
                      "border border-zinc-200",
                      "bg-white",
                      "hover:bg-zinc-50",
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
            <div className="divide-y divide-zinc-200">
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

      <div className="flex-shrink-0 border-t border-zinc-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <ChatInput onSend={handleSendMessage} disabled={isProcessing} />
        </div>
      </div>

      <nav className="border-t border-zinc-200 bg-white">
        <div className="flex items-center justify-around px-2 py-3">
          <button onClick={() => router.push('/overview')} className="flex flex-col items-center gap-1">
            <Target className="w-5 h-5 text-zinc-600" strokeWidth={2} />
            <span className="text-xs text-zinc-600">Overview</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <CreditCard className="w-5 h-5 text-zinc-600" strokeWidth={2} />
            <span className="text-xs text-zinc-600">Cards</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Plus className="w-5 h-5 text-zinc-600" strokeWidth={2} />
            <span className="text-xs text-zinc-600">Transact</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Users className="w-5 h-5 text-zinc-600" strokeWidth={2} />
            <span className="text-xs text-zinc-600">Recipients</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <MoreHorizontal className="w-5 h-5 text-zinc-600" strokeWidth={2} />
            <span className="text-xs text-zinc-600">More</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
