"use client";
import React, { useState } from "react";

type ChatRole = "user" | "bot";

interface ChatMessage {
  from: ChatRole;
  text: string;
}

const defaultGreeting: ChatMessage = {
  from: "bot",
  text: "Welcome! Import your study material to get tailored help.",
};

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([defaultGreeting]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hasImportedFile, setHasImportedFile] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const resetToGreeting = () => {
    setMessages([defaultGreeting]);
    setInput("");
    setLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleImportConfirm = async () => {
    if (!selectedFile) return;

    setIsImporting(true);
    try {
      // Placeholder for real upload; simulate latency for polish
      await new Promise((resolve) => setTimeout(resolve, 600));

      setHasImportedFile(true);
      setMessages([
        {
          from: "bot",
          text: `Great! I've loaded "${selectedFile.name}". Ask me anything about it or request summaries, quizzes, and more.`,
        },
      ]);
    } finally {
      setIsImporting(false);
    }
  };

  const handleResetImport = () => {
    setSelectedFile(null);
    setHasImportedFile(false);
    resetToGreeting();
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
      const botMessage: ChatMessage = { from: "bot", text: data.reply };
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
        <div className="flex w-[22rem] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className="flex items-start justify-between gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4">
            <div className="flex flex-col gap-1 text-left">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
                Concept Master
              </p>
              <span className="text-base font-semibold text-gray-900">
                {hasImportedFile ? "AI Study Chat" : "Import study material"}
              </span>
              <p className="text-xs text-gray-500">
                {hasImportedFile
                  ? selectedFile
                    ? `Working with: ${selectedFile.name}`
                    : "Ready to chat about your uploaded content."
                  : "Upload a study file to personalise your tutor session."}
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

          {!hasImportedFile ? (
            <div className="flex flex-col gap-4 px-5 py-6">
              <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/70 p-6 text-center">
                <span className="material-symbols-outlined mx-auto mb-3 block text-4xl text-blue-500">
                  upload_file
                </span>
                <p className="text-sm font-medium text-gray-800">
                  Import your study material
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Supported formats: PDF, DOCX, TXT · Max size 10&nbsp;MB
                </p>
                <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm ring-1 ring-blue-100 transition-colors hover:bg-blue-50">
                  <span className="material-symbols-outlined text-base">file_upload</span>
                  Choose file
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                {selectedFile && (
                  <p className="mt-3 truncate text-xs font-medium text-blue-600">
                    {selectedFile.name}
                  </p>
                )}
              </div>

              <button
                onClick={handleImportConfirm}
                disabled={!selectedFile || isImporting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {isImporting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-base">
                      autorenew
                    </span>
                    Importing...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">start</span>
                    Import & Start Chatting
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                Importing lets the tutor tailor answers to your material.
              </p>
            </div>
          ) : (
            <div className="flex flex-1 flex-col">
              {selectedFile && (
                <div className="flex items-center justify-between gap-2 bg-blue-50 px-5 py-2 text-xs text-blue-700">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="material-symbols-outlined text-base">description</span>
                    <span className="truncate">{selectedFile.name}</span>
                  </div>
                  <button
                    onClick={handleResetImport}
                    className="font-medium text-blue-600 transition-colors hover:text-blue-800"
                  >
                    Change file
                  </button>
                </div>
              )}

              <div
                className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
                style={{ maxHeight: 320 }}
              >
                {messages.map((msg, index) => (
                  <div
                    key={`${msg.from}-${index}-${msg.text.slice(0, 6)}`}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl px-3 py-2 text-sm shadow-sm ${
                        msg.from === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-500">
                      Typing...
                    </div>
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSend}
                className="flex items-center gap-2 border-t border-gray-100 bg-gray-50 px-5 py-4"
              >
                <input
                  className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Ask a question about your material..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-1 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  <span className="material-symbols-outlined text-base">send</span>
                  Send
                </button>
              </form>
            </div>
          )}
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
