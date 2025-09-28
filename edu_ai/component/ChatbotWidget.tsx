"use client";
import React, { useState } from "react";

type ChatRole = "user" | "bot";

interface ChatMessage {
  from: ChatRole;
  text: string;
}

const defaultGreeting: ChatMessage = {
  from: "bot",
  text: "Hi! I'm Brain, your campus AI. I remember everything you've shared and can answer questions about your courses, goals, and study history.",
};

const memoryHint: ChatMessage = {
  from: "bot",
  text: "Need a recap? Ask me things like “What did I study last week?” or “Summarize my Organic Chem notes.”",
};

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([defaultGreeting, memoryHint]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const resetToGreeting = () => {
    setMessages([defaultGreeting, memoryHint]);
    setInput("");
    setLoading(false);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();
      const botMessage: ChatMessage = {
        from: "bot",
        text:
          data.reply ||
          "I'm still syncing your knowledge graph. Ask me another question in a moment!",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Error: Unable to reach AI service." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-3">
      {open ? (
        <div className="flex w-[24rem] flex-col overflow-hidden rounded-3xl border border-blue-100 bg-white/95 shadow-2xl backdrop-blur">
          <div className="flex items-start justify-between gap-3 border-b border-blue-100/70 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
            <div className="flex flex-col gap-1 text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-600">
                <span className="material-symbols-outlined text-sm">psychology</span>
                Brain AI
              </div>
              <span className="text-base font-semibold text-gray-900">
                Your personal campus intelligence
              </span>
              <p className="text-xs text-gray-500">
                I remember your study history, goals, drafts, and deadlines. Ask me anything.
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 transition-colors hover:text-gray-700"
              aria-label="Close chatbot"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex flex-col">
            <div
              className="flex-1 overflow-y-auto px-6 py-5 space-y-3"
              style={{ maxHeight: 320 }}
            >
              {messages.map((msg, index) => (
                <div
                  key={`${msg.from}-${index}-${msg.text.slice(0, 6)}`}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                      msg.from === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-blue-50 text-blue-900"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-2 text-sm text-blue-600">
                    <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                    Thinking…
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSend}
              className="flex flex-col gap-3 border-t border-blue-100/60 bg-white/90 px-6 py-4"
            >
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-blue-500">
                <span className="material-symbols-outlined text-sm">lock</span>
                Private to your account · Synced across sessions
              </div>
              <div className="flex items-center gap-3">
                <input
                  className="flex-1 rounded-2xl border border-blue-100 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  type="text"
                  placeholder="Ask Brain about your progress, notes, or upcoming deadlines..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  <span className="material-symbols-outlined text-base">send</span>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-white shadow-lg transition-colors hover:bg-blue-700 focus:outline-none"
          onClick={() => {
            setOpen(true);
            resetToGreeting();
          }}
        >
          <span className="material-symbols-outlined text-2xl">chat</span>
          Chat with us
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
