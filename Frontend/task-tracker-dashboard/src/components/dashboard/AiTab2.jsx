// src/components/tabs/AITab2.jsx

import { useState, useEffect, useRef } from 'react';
import { askAI } from '../../services/api';

import { MessageCircle } from '../icons/MessageCircle';
import { Copy } from '../icons/Copy';
import { Check } from '../icons/Check';
import { Sparkles } from '../icons/Sparkles'; // Optional: nice AI icon

export const AiTab2 = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [loading]);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }).catch(() => {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const userMessage = {
      role: 'user',
      content: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await askAI(userText); // This now calls v2 correctly

      const assistantMessage = {
        role: 'assistant',
        content: response || 'No response from AI.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('AI request failed:', err);

      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I couldn\'t connect to the AI service. Please check if the backend is running on port 8082 and try again.',
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className="bg-gray-900 rounded-3xl flex flex-col shadow-2xl overflow-hidden"
      style={{ height: 'calc(100vh - 280px)', minHeight: '600px' }}
    >
      {/* Header */}
      <div className="border-b border-gray-800 px-8 py-6 bg-gradient-to-r from-gray-900 to-gray-850">
        <h2 className="text-2xl font-bold flex items-center text-white">
          <Sparkles className="w-8 h-8 mr-3 text-orange-500" />
          AI Assistant
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Ask about tasks, compliance, workload, priorities, or team insights
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {messages.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-8 shadow-2xl">
              <Sparkles className="w-16 h-16 text-orange-500 opacity-80" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-3">Hello! I'm your AI Assistant</h3>
            <p className="text-lg max-w-lg leading-relaxed text-gray-400">
              I can summarize tasks, check compliance, suggest priorities, and give team insights.
            </p>
            <div className="mt-8 space-y-3 text-left text-sm bg-gray-800 rounded-2xl p-6 max-w-xl">
              <p className="text-orange-400 font-medium">Try asking:</p>
              <ul className="space-y-2 text-gray-300">
                <li>• "Summary and critical tasks for Priya"</li>
                <li>• "Show all tasks for Test User"</li>
                <li>• "What tasks need attention today?"</li>
                <li>• "Who has the heaviest workload?"</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}
              >
                <div
                  className={`
                    relative max-w-3xl rounded-3xl px-6 py-4 shadow-lg transition-all
                    ${msg.role === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                      : msg.isError
                      ? 'bg-red-900/40 border border-red-800 text-red-200'
                      : 'bg-gray-800 text-gray-100 border border-gray-700'
                    }
                  `}
                >
                  <div className="pr-12 whitespace-pre-wrap leading-relaxed text-base">
                    {msg.content}
                  </div>

                  <div className="text-xs opacity-60 mt-2">
                    {msg.timestamp && formatTime(msg.timestamp)}
                  </div>

                  {/* Copy button only for successful assistant messages */}
                  {msg.role === 'assistant' && !msg.isError && (
                    <button
                      onClick={() => handleCopy(msg.content, index)}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-gray-700/50"
                      title="Copy response"
                      aria-label="Copy"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-3xl px-6 py-4 border border-gray-700 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" />
                      <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-100" />
                      <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-200" />
                    </div>
                    <span className="text-gray-400 font-medium">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-800 px-8 py-6 bg-gray-850">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about tasks, compliance, priorities..."
            disabled={loading}
            className="flex-1 bg-gray-800 text-white rounded-3xl px-7 py-4 focus:outline-none focus:ring-4 focus:ring-orange-500/30 placeholder-gray-500 disabled:opacity-60 transition-shadow text-base"
            autoFocus
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-3xl px-10 py-4 font-semibold text-white transition-all transform hover:scale-105 active:scale-100 disabled:hover:scale-100 shadow-lg hover:shadow-orange-500/25"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          AI responses are based on current task data • Always verify important details
        </p>
      </div>
    </div>
  );
};