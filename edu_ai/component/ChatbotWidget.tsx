"use client";
import React, { useState } from "react";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'bot', text: "I'm just a demo chatbot!" }]);
    }, 600);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-80 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-xl">
            <span className="font-semibold text-gray-900">AI Chatbot</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2" style={{ maxHeight: 320 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-3 py-2 rounded-lg text-sm ${msg.from === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>{msg.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
            <input
              className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button type="submit" className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      ) : (
        <button
          className="flex items-center gap-2 rounded-full bg-blue-600 text-white px-5 py-3 shadow-lg hover:bg-blue-700 focus:outline-none"
          onClick={() => setOpen(true)}
        >
          <span className="material-symbols-outlined text-2xl">chat</span>
          Chat with us
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;