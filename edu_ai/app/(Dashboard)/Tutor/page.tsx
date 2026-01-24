
"use client";

import React, { useState, useRef, useEffect } from "react";
import { ApiService } from "../../../lib/api";

interface MegaFileItem {
  id: string;
  name: string | null;
  sizeBytes: number | null;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'quiz' | 'summary' | 'example';
}

const LIB_API_BASE_URL = process.env.NEXT_PUBLIC_MEGA_API_BASE_URL || "http://localhost:8000";

const formatBytes = (bytes: number | null | undefined): string => {
  if (bytes === null || bytes === undefined) return "—";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, exponent);
  return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
};

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const TutorPage = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'quiz' | 'summary' | 'examples'>('chat');
  const [currentTopic, setCurrentTopic] = useState('Introduction');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [studyMode, setStudyMode] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [selectedStudyFile, setSelectedStudyFile] = useState<File | null>(null);
  const [hasImportedStudyFile, setHasImportedStudyFile] = useState(false);
  const [isImportingStudyFile, setIsImportingStudyFile] = useState(false);
  const [isTranscriptGenerating, setIsTranscriptGenerating] = useState(false);
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
  const [libraryFiles, setLibraryFiles] = useState<MegaFileItem[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryError, setLibraryError] = useState<string | null>(null);
  const [selectedLibraryIds, setSelectedLibraryIds] = useState<Set<string>>(new Set());
  const [selectedLibraryFiles, setSelectedLibraryFiles] = useState<MegaFileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const openLibraryModal = async () => {
    if (libraryLoading) return;
    setIsLibraryModalOpen(true);
    if (libraryFiles.length === 0) {
      setLibraryLoading(true);
      setLibraryError(null);
      try {
        const response = await fetch(`${LIB_API_BASE_URL}/list`);
        if (!response.ok) {
          throw new Error(`Failed to fetch library files: ${response.statusText}`);
        }
        const data = await response.json();
        const files: MegaFileItem[] = (data?.files || []).map((item: { id: string; name?: string; size_bytes?: number }) => ({
          id: item.id,
          name: item.name ?? "Untitled",
          sizeBytes: typeof item.size_bytes === "number" ? item.size_bytes : null,
        }));
        setLibraryFiles(files);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to load library files.";
        setLibraryError(message);
      } finally {
        setLibraryLoading(false);
      }
    }
  };
  const triggerStudyFilePicker = () => {
    if (isImportingStudyFile) return;
    fileInputRef.current?.click();
  };

  const handleStudyFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedStudyFile(file);
    setSelectedLibraryFiles([]);
    setSelectedLibraryIds(new Set());
    if (file) setHasImportedStudyFile(false);
  };

  const confirmStudyFileImport = async () => {
    if (!selectedStudyFile) return;
    setIsImportingStudyFile(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setHasImportedStudyFile(true);
      setActiveTab('chat');
      const welcomeMessage: Message = {
        role: 'assistant',
        content: `I've loaded "${selectedStudyFile.name}". Ask me anything about it!`,
        timestamp: new Date(),
      };
      setChatMessages([welcomeMessage]);
      setQuizQuestions([]);
      setCurrentQuizIndex(0);
      setSelectedAnswer(null);
      setShowQuizResult(false);
      setQuizScore({ correct: 0, total: 0 });
      setSelectedLibraryFiles([]);
      setSelectedLibraryIds(new Set());
    } finally {
      setIsImportingStudyFile(false);
    }
  };
  const toggleLibrarySelection = (fileId: string) => {
    setSelectedLibraryIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(fileId)) {
        updated.delete(fileId);
      } else {
        updated.add(fileId);
      }
      return updated;
    });
  };

  const confirmLibrarySelection = () => {
    if (selectedLibraryIds.size === 0) {
      setIsLibraryModalOpen(false);
      return;
    }

    const selectedItems = libraryFiles.filter((file) => selectedLibraryIds.has(file.id));
    if (selectedItems.length > 0) {
      setSelectedStudyFile(null);
      setSelectedLibraryFiles(selectedItems);
      setHasImportedStudyFile(true);
      setActiveTab('chat');
      const names = selectedItems.map((file) => file.name ?? file.id).join(", ");
      const message: Message = {
        role: 'assistant',
        content: `I've linked the following Mega documents: ${names}.
You can start asking questions about them!`,
        timestamp: new Date(),
      };
      setChatMessages([message]);
      setQuizQuestions([]);
      setCurrentQuizIndex(0);
      setSelectedAnswer(null);
      setShowQuizResult(false);
      setQuizScore({ correct: 0, total: 0 });
    }

    setSelectedLibraryIds(new Set());
    setIsLibraryModalOpen(false);
  };

  const closeLibraryModal = () => {
    setIsLibraryModalOpen(false);
  };

  const manageLibrarySelection = () => {
    setSelectedLibraryIds(new Set(selectedLibraryFiles.map((file) => file.id)));
    void openLibraryModal();
  };

  const resetStudyFileImport = () => {
    setSelectedStudyFile(null);
    setSelectedLibraryFiles([]);
    setSelectedLibraryIds(new Set());
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setHasImportedStudyFile(false);
    setChatMessages([]);
    setActiveTab('chat');
    setQuizQuestions([]);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowQuizResult(false);
    setQuizScore({ correct: 0, total: 0 });
  };

  const handleRemoveSelectedStudyFile = () => {
    if (isImportingStudyFile) return;
    setSelectedStudyFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChangeStudyFile = () => {
    if (isImportingStudyFile) return;
    resetStudyFileImport();
    setTimeout(() => triggerStudyFilePicker(), 0);
  };

  const exportChatTranscript = async () => {
    if (!chatMessages.length || isTranscriptGenerating) return;
    try {
      setIsTranscriptGenerating(true);
      const header = `AI Tutor Transcript\nTopic: ${currentTopic}\nGenerated: ${new Date().toLocaleString()}\n\n`;
      const lines = chatMessages.map((message) => {
        const timestamp = message.timestamp.toLocaleString();
        const speaker = message.role === 'user' ? 'You' : 'AI Tutor';
        return `[${timestamp}] ${speaker}:\n${message.content}`;
      });
      const blob = new Blob([header + lines.join('\n\n')], {
        type: 'text/plain;charset=utf-8'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `tutor-transcript-${Date.now()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsTranscriptGenerating(false);
    }
  };

  const clearChatHistory = () => {
    if (!chatMessages.length) return;
    const shouldClear = window.confirm('This will clear your current conversation. Continue?');
    if (!shouldClear) return;
    setChatMessages([]);
    setSelectedAnswer(null);
    setShowQuizResult(false);
    setQuizQuestions([]);
    setCurrentQuizIndex(0);
    setQuizScore({ correct: 0, total: 0 });
  };

  const handleSendMessage = async (customMessage?: string) => {
    if (!hasImportedStudyFile) return;
    const messageToSend = customMessage || inputMessage;
    if (!messageToSend.trim()) return;

    setInputMessage('');
    const newMessage: Message = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await ApiService.tutorChat(messageToSend);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, assistantMessage]);
      setConnectionStatus('connected');
    } catch (error) {
      setConnectionStatus('disconnected');

      try {
        const fallbackResponse = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: messageToSend })
        });

        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          const assistantMessage: Message = {
            role: 'assistant',
            content: `🔄 Using fallback mode: ${fallbackData.reply}`,
            timestamp: new Date()
          };
          setChatMessages(prev => [...prev, assistantMessage]);
          return;
        }
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }

      let errorContent = 'Sorry, I encountered an error. Please try again.';

      if (error instanceof Error) {
        if (error.message.includes('Cannot connect to backend')) {
          errorContent = `🔌 Backend server is not running.\n\nTo fix this:\n1. Open a terminal\n2. Run: start-backend.bat\n3. Wait for "Application startup complete"\n4. Try your message again\n\nAlternatively, fallback chat may still work with limited features.`;
        } else if (error.message.includes('HTTP error')) {
          errorContent = '⚠️ Server error occurred. Please try again in a moment.';
        }
      }

      const errorMessage: Message = {
        role: 'assistant',
        content: errorContent,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateQuiz = async () => {
    if (!hasImportedStudyFile) return;
    setIsLoading(true);
    try {
      const response = await ApiService.generateQuiz(currentTopic, studyMode);

      try {
        const quizData = JSON.parse(response.response);
        setQuizQuestions(quizData.questions || []);
        setCurrentQuizIndex(0);
        setQuizScore({ correct: 0, total: 0 });
        setShowQuizResult(false);
        setActiveTab('quiz');
      } catch {
        const fallbackQuiz: QuizQuestion[] = [
          {
            question: `What is a key concept in ${currentTopic}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: 0,
            explanation: 'This is the correct answer based on fundamental principles.'
          }
        ];
        setQuizQuestions(fallbackQuiz);
        setCurrentQuizIndex(0);
        setQuizScore({ correct: 0, total: 0 });
        setShowQuizResult(false);
        setActiveTab('quiz');
      }
    } catch (error) {
      console.error('Quiz generation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowQuizResult(true);

    const isCorrect = answerIndex === quizQuestions[currentQuizIndex].correct;
    if (isCorrect) {
      setQuizScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    }
    setQuizScore(prev => ({ ...prev, total: prev.total + 1 }));
  };

  const nextQuestion = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowQuizResult(false);
    }
  };

  const generateSummary = async () => {
    if (!hasImportedStudyFile) return;
    setIsLoading(true);
    setActiveTab('summary');
    try {
      const response = await ApiService.generateSummary(currentTopic, studyMode);

      const summaryMessage: Message = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
        type: 'summary'
      };
      setChatMessages(prev => [...prev, summaryMessage]);
    } catch (error) {
      console.error('Summary generation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateExample = async () => {
    if (!hasImportedStudyFile) return;
    setIsLoading(true);
    setActiveTab('examples');
    try {
      const response = await ApiService.generateExamples(currentTopic, studyMode);

      const exampleMessage: Message = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
        type: 'example'
      };
      setChatMessages(prev => [...prev, exampleMessage]);
    } catch (error) {
      console.error('Example generation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Explain this concept simply",
    "Give me an example",
    "How is this used in real life?",
    "What are the key points?",
    "Help me understand better",
    "Show me step by step"
  ];

  const isActionsDisabled = !hasImportedStudyFile || isImportingStudyFile;

  return (
    <div className="flex min-h-screen w-full flex-col font-sans bg-white">
      <div className="flex h-full grow">
        <main className="flex-1 px-6 py-6">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={handleStudyFileChange}
          />

          {!hasImportedStudyFile ? (
            <div className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-3xl border border-dashed border-blue-300 bg-gradient-to-b from-blue-50 via-white to-blue-50 px-6 py-8 text-center shadow-lg">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <span className="material-symbols-outlined text-3xl">auto_stories</span>
              </div>
              <h1 className="mb-1 text-2xl font-semibold text-gray-900">Personalize your tutor in seconds</h1>
              <p className="mx-auto max-w-md text-sm text-gray-600">
                Upload course notes, worksheets, or any study document. I’ll tailor explanations, quizzes, summaries,
                and real-world examples to match the material you provide.
              </p>
              {(selectedStudyFile || selectedLibraryFiles.length > 0) && (
                <div className="mx-auto mt-6 flex w-full max-w-md items-center justify-between rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-medium text-blue-700 shadow-sm">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">description</span>
                      {selectedStudyFile ? (
                        <span className="truncate" title={selectedStudyFile.name}>{selectedStudyFile.name}</span>
                      ) : (
                        <span className="truncate" title={selectedLibraryFiles.map((file) => file.name ?? file.id).join(', ')}>
                          {selectedLibraryFiles.length === 1
                            ? selectedLibraryFiles[0].name ?? selectedLibraryFiles[0].id
                            : `${selectedLibraryFiles.length} files selected`}
                        </span>
                      )}
                    </div>
                    {selectedLibraryFiles.length > 1 && (
                      <div className="text-xs text-blue-500">
                        {selectedLibraryFiles
                          .slice(0, 3)
                          .map((file) => file.name ?? file.id)
                          .join(', ')}{selectedLibraryFiles.length > 3 ? '…' : ''}
                      </div>
                    )}
                  </div>
                  {selectedStudyFile ? (
                    <button
                      onClick={handleRemoveSelectedStudyFile}
                      className="text-xs font-semibold text-blue-600 transition-colors hover:text-blue-800"
                      aria-label="Remove selected file"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={manageLibrarySelection}
                      className="text-xs font-semibold text-blue-600 transition-colors hover:text-blue-800"
                    >
                      Edit
                    </button>
                  )}
                </div>
              )}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  onClick={triggerStudyFilePicker}
                  disabled={isImportingStudyFile}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-base">upload_file</span>
                  Choose document
                </button>
                <button
                  onClick={confirmStudyFileImport}
                  disabled={!selectedStudyFile || isImportingStudyFile}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {isImportingStudyFile ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                      Importing…
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">auto_mode</span>
                      Import & start learning
                    </>
                  )}
                </button>
                <button
                  onClick={openLibraryModal}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm transition-colors hover:bg-blue-50"
                >
                  <span className="material-symbols-outlined text-base">library_books</span>
                  Import from library
                </button>
              </div>
              <dl className="mt-8 grid w-full max-w-xl grid-cols-1 gap-4 text-left text-sm text-gray-500 sm:grid-cols-3">
                <div className="rounded-xl bg-white/70 p-4 shadow-sm">
                  <dt className="font-semibold text-gray-700">Supported Files</dt>
                  <dd>PDF, DOCX, TXT (≤10&nbsp;MB)</dd>
                </div>
                <div className="rounded-xl bg-white/70 p-4 shadow-sm">
                  <dt className="font-semibold text-gray-700">Privacy</dt>
                  <dd>Your document stays on this device.</dd>
                </div>
                <div className="rounded-xl bg-white/70 p-4 shadow-sm">
                  <dt className="font-semibold text-gray-700">Tip</dt>
                  <dd>Use concise, well-structured notes for best results.</dd>
                </div>
              </dl>
            </div>
          ) : (
            <div className="mx-auto flex max-w-5xl flex-col gap-6">
              <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-white/90 p-5 shadow-sm">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">AI Tutor</h1>
                  <p className="text-sm text-gray-600">
                    Topic: <span className="font-semibold text-blue-600">{currentTopic}</span>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">
                    <span className="material-symbols-outlined text-sm">radio_button_checked</span>
                    <span>{connectionStatus === 'connected' ? 'Online' : connectionStatus === 'disconnected' ? 'Offline' : 'Checking…'}</span>
                  </div>
                  {selectedStudyFile && (
                    <button
                      onClick={handleChangeStudyFile}
                      className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
                    >
                      <span className="material-symbols-outlined text-sm">swap_horiz</span>
                      Change file
                    </button>
                  )}
                </div>
              </header>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={exportChatTranscript}
                  disabled={!chatMessages.length || isTranscriptGenerating}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  {isTranscriptGenerating ? 'Preparing…' : 'Export transcript'}
                </button>
                <button
                  onClick={clearChatHistory}
                  disabled={!chatMessages.length}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-base">delete_sweep</span>
                  Clear session
                </button>
              </div>

              {activeTab === 'chat' && (
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-3">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">Quick prompts</h3>
                      <p className="text-xs text-gray-500">Tap to send suggested questions instantly.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quickPrompts.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => handleSendMessage(prompt)}
                          disabled={isLoading}
                          className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 transition hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-96 space-y-3 overflow-y-auto bg-gray-50 p-4">
                    {chatMessages.length === 0 ? (
                      <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-gray-500">
                        <span className="material-symbols-outlined text-4xl text-blue-400">smart_toy</span>
                        <p className="text-sm">Start the conversation with a question about {currentTopic}.</p>
                      </div>
                    ) : (
                      chatMessages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[75%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                            <div
                              className={`rounded-2xl px-4 py-3 shadow-sm ${
                                message.role === 'user'
                                  ? 'ml-auto bg-blue-600 text-white'
                                  : 'bg-white text-gray-900'
                              }`}
                            >
                              <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                              <div className={`mt-2 text-xs ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="rounded-full bg-white px-4 py-2 shadow-sm">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className="h-3 w-3 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                            Thinking…
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="border-t border-gray-200 px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => {/* TODO: hook voice mode */}}
                        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-blue-300 hover:text-blue-600"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-sm">keyboard_voice</span>
                        Voice mode
                      </button>
                      <div className="flex min-w-0 flex-1 gap-2">
                        <input
                          type="text"
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                          placeholder={`Ask me about ${currentTopic}...`}
                          className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          disabled={isLoading}
                        />
                        <button
                          onClick={() => handleSendMessage()}
                          disabled={isLoading || !inputMessage.trim()}
                          className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                        >
                          <span className="material-symbols-outlined text-base">send</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'quiz' && (
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  {quizQuestions.length === 0 ? (
                    <div className="py-12 text-center">
                      <span className="material-symbols-outlined mb-4 block text-6xl text-gray-400">quiz</span>
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">No Quiz Available</h3>
                      <p className="mb-6 text-gray-600">Generate a quiz to test your knowledge on {currentTopic}</p>
                      <button
                        onClick={generateQuiz}
                        disabled={isLoading}
                        className="rounded-lg bg-green-500 px-6 py-3 text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isLoading ? 'Generating...' : 'Generate Quiz'}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900">
                          Question {currentQuizIndex + 1} of {quizQuestions.length}
                        </h3>
                        <div className="text-sm text-gray-600">
                          Score: {quizScore.correct}/{quizScore.total}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="mb-4 text-lg font-medium text-gray-900">
                          {quizQuestions[currentQuizIndex]?.question}
                        </h4>
                        <div className="space-y-3">
                          {quizQuestions[currentQuizIndex]?.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => !showQuizResult && handleQuizAnswer(index)}
                              disabled={showQuizResult}
                              className={`w-full rounded-lg border p-3 text-left transition-colors ${
                                showQuizResult
                                  ? index === quizQuestions[currentQuizIndex].correct
                                    ? 'border-green-500 bg-green-100 text-green-800'
                                    : index === selectedAnswer && index !== quizQuestions[currentQuizIndex].correct
                                    ? 'border-red-500 bg-red-100 text-red-800'
                                    : 'border-gray-200 bg-gray-50'
                                  : 'border-gray-200 bg-white hover:bg-gray-50'
                              }`}
                            >
                              <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      {showQuizResult && (
                        <div className="mb-6 rounded-lg bg-blue-50 p-4">
                          <h5 className="mb-2 font-medium text-blue-900">Explanation:</h5>
                          <p className="text-sm text-blue-800">
                            {quizQuestions[currentQuizIndex]?.explanation}
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <button
                          onClick={() => {
                            setQuizQuestions([]);
                            setCurrentQuizIndex(0);
                            setSelectedAnswer(null);
                            setShowQuizResult(false);
                          }}
                          className="px-4 py-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
                        >
                          Reset Quiz
                        </button>
                        {showQuizResult && (
                          <button
                            onClick={nextQuestion}
                            disabled={currentQuizIndex >= quizQuestions.length - 1}
                            className="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {currentQuizIndex >= quizQuestions.length - 1 ? 'Quiz Complete!' : 'Next Question'}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'summary' && (
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">Summary: {currentTopic}</h3>
                    <button
                      onClick={generateSummary}
                      disabled={isLoading}
                      className="rounded-lg bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isLoading ? 'Generating...' : 'Refresh Summary'}
                    </button>
                  </div>

                  <div className="prose max-w-none">
                    {chatMessages.filter((m) => m.type === 'summary').length === 0 ? (
                      <div className="py-12 text-center">
                        <span className="material-symbols-outlined mb-4 block text-6xl text-gray-400">summarize</span>
                        <h4 className="mb-2 text-lg font-medium text-gray-900">No Summary Available</h4>
                        <p className="text-gray-600">Generate a comprehensive summary of {currentTopic}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {chatMessages
                          .filter((m) => m.type === 'summary')
                          .map((message, index) => (
                            <div key={index} className="rounded-lg bg-gray-50 p-4">
                              <div className="whitespace-pre-wrap text-gray-900">{message.content}</div>
                              <div className="mt-2 text-xs text-gray-500">Generated: {message.timestamp.toLocaleString()}</div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'examples' && (
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">Real-World Examples: {currentTopic}</h3>
                    <button
                      onClick={generateExample}
                      disabled={isLoading}
                      className="rounded-lg bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isLoading ? 'Generating...' : 'Get New Example'}
                    </button>
                  </div>

                  <div className="prose max-w-none">
                    {chatMessages.filter((m) => m.type === 'example').length === 0 ? (
                      <div className="py-12 text-center">
                        <span className="material-symbols-outlined mb-4 block text-6xl text-gray-400">lightbulb</span>
                        <h4 className="mb-2 text-lg font-medium text-gray-900">No Examples Available</h4>
                        <p className="text-gray-600">Generate practical examples and applications of {currentTopic}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {chatMessages
                          .filter((m) => m.type === 'example')
                          .map((message, index) => (
                            <div key={index} className="rounded-lg bg-gray-50 p-4">
                              <div className="whitespace-pre-wrap text-gray-900">{message.content}</div>
                              <div className="mt-2 text-xs text-gray-500">Generated: {message.timestamp.toLocaleString()}</div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        <aside className="sticky top-0 flex h-screen w-80 flex-col gap-6 overflow-y-auto border-l border-gray-200 bg-white p-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-bold text-gray-900">AI Tutor</h1>
            <p className="text-sm text-gray-500">
              {hasImportedStudyFile
                ? 'Personalized Learning Assistant'
                : 'Import material to unlock personalized learning.'}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            {hasImportedStudyFile && selectedStudyFile ? (
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-blue-500">task_alt</span>
                  <span>Study material imported</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm">
                  <span className="material-symbols-outlined text-base text-blue-500">description</span>
                  <span className="truncate">{selectedStudyFile.name}</span>
                </div>
                <button
                  onClick={handleChangeStudyFile}
                  className="w-full rounded-full border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                >
                  Import different file
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  Ready a document to start. Personalised tutoring unlocks after you import your study material.
                </p>
                <button
                  onClick={triggerStudyFilePicker}
                  disabled={isImportingStudyFile}
                  className="w-full rounded-full bg-white px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-blue-100 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Choose file
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Study Level</label>
            <select
              value={studyMode}
              onChange={(e) => setStudyMode(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
              className="rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900"
              disabled={isActionsDisabled}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-gray-700">Quick Actions</h3>
            <button
              onClick={generateQuiz}
              disabled={isActionsDisabled || isLoading}
              className="flex items-center gap-2 rounded-md bg-green-500 px-3 py-2 text-sm text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">quiz</span>
              Generate Quiz
            </button>
            <button
              onClick={generateSummary}
              disabled={isActionsDisabled || isLoading}
              className="flex items-center gap-2 rounded-md bg-purple-500 px-3 py-2 text-sm text-white transition-colors hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">summarize</span>
              Get Summary
            </button>
            <button
              onClick={generateExample}
              disabled={isActionsDisabled || isLoading}
              className="flex items-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-sm text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">lightbulb</span>
              Show Examples
            </button>
          </div>

          <div className="mt-auto space-y-2 rounded-xl border border-gray-200 bg-white p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Messages</span>
              <span className="font-semibold text-gray-900">{chatMessages.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Quiz Score</span>
              <span className="font-semibold text-gray-900">{quizScore.total > 0 ? `${quizScore.correct}/${quizScore.total}` : '0/0'}</span>
            </div>
          </div>
        </aside>
      </div>
      {isLibraryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Import from library</h2>
                <p className="text-xs text-gray-500">Select one or more files stored in Mega.</p>
              </div>
              <button
                onClick={closeLibraryModal}
                className="rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <div className="max-h-[420px] overflow-y-auto px-6 py-4">
              {libraryLoading ? (
                <div className="flex items-center justify-center gap-2 py-16 text-sm text-gray-500">
                  <span className="material-symbols-outlined animate-spin text-base text-blue-500">progress_activity</span>
                  Loading library…
                </div>
              ) : libraryError ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">error</span>
                    <span>{libraryError}</span>
                  </div>
                </div>
              ) : libraryFiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-16 text-sm text-gray-500">
                  <span className="material-symbols-outlined text-4xl text-blue-300">folder_off</span>
                  No files found in your Mega library yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {libraryFiles.map((file) => {
                    const isSelected = selectedLibraryIds.has(file.id);
                    return (
                      <div
                        key={file.id}
                        className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 shadow-sm transition ${
                          isSelected ? 'border-blue-400 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-200'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                            <span className="material-symbols-outlined text-base text-blue-500">description</span>
                            <span className="truncate" title={file.name ?? file.id}>
                              {file.name ?? file.id}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                            <span>{formatBytes(file.sizeBytes)}</span>
                            <span className="truncate" title={file.id}>
                              ID: {file.id}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleLibrarySelection(file.id)}
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                            isSelected
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'border border-blue-200 bg-white text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          <span className="material-symbols-outlined text-base">{isSelected ? 'check' : 'add'}</span>
                          {isSelected ? 'Added' : 'Add'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-6 py-4">
              <div className="text-xs text-gray-500">
                {selectedLibraryIds.size === 0
                  ? 'Select files to link them with the tutor.'
                  : `${selectedLibraryIds.size} file${selectedLibraryIds.size === 1 ? '' : 's'} selected`}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={closeLibraryModal}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLibrarySelection}
                  disabled={selectedLibraryIds.size === 0}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white transition enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  <span className="material-symbols-outlined text-base">file_upload</span>
                  Import selected files
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorPage;
