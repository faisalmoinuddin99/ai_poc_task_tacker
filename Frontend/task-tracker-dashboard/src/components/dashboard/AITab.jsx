// src/components/tabs/AITab.jsx

import { useState, useEffect, useRef } from 'react';
// import { MessageCircle, Copy, Check } from '../icons'; // You'll need a Check icon
import { askAI } from '../../services/api';

import { MessageCircle } from '../icons/MessageCircle';
import { Copy } from '../icons/Copy';
import { Check } from '../icons/Check';
export const AITab = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null); // Track which message was copied

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); // Show check for 2s
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await askAI(input.trim());

      const assistantMessage = {
        role: 'assistant',
        content: response || 'No response from AI.',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('AI request failed:', err);
      setError('Failed to reach AI service.');

      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-gray-900 rounded-3xl flex flex-col shadow-2xl"
      style={{ height: 'calc(100vh - 280px)', minHeight: '600px' }}
    >
      {/* Header */}
      <div className="border-b border-gray-800 px-8 py-6">
        <h2 className="text-2xl font-bold flex items-center">
          <MessageCircle className="w-8 h-8 mr-3 text-orange-500" />
          AI Assistant v1
        </h2>
        <p className="text-gray-400 text-sm mt-1">Ask me anything about tasks, team, compliance, or insights</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {messages.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <MessageCircle className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">How can I help you today?</h3>
            <p className="text-gray-500 max-w-md">
              Try asking: "Summarize Rahul's tasks", "Who's falling behind on compliance?", or "Suggest task priorities"
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}
              >
                <div
                  className={`relative max-w-3xl rounded-3xl px-6 py-4 shadow-lg transition-all ${
                    msg.role === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-800 text-gray-100 border border-gray-700'
                  }`}
                >
                  {/* Message Content */}
                  <div className="pr-10 whitespace-pre-wrap leading-relaxed">{msg.content}</div>

                  {/* Copy Button - only for AI messages */}
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => handleCopy(msg.content, index)}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-gray-700"
                      title="Copy message"
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
                <div className="bg-gray-800 rounded-3xl px-6 py-4 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200" />
                    <span className="text-gray-400 ml-3 text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="bg-red-900 bg-opacity-30 border border-red-800 rounded-3xl p-5">
                <p className="text-red-300">⚠️ Connection error</p>
                <p className="text-sm text-red-400 mt-2">
                  Could not reach the AI service. Make sure your backend is running on port 8082.
                </p>
              </div>
            )}
          </>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-800 px-8 py-6">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={loading}
            className="flex-1 bg-gray-800 text-white rounded-3xl px-7 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 disabled:opacity-60 transition"
            autoFocus
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-3xl px-10 py-4 font-semibold transition-all transform hover:scale-105 disabled:hover:scale-100"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-3">
          AI responses may contain inaccuracies. Always verify important information.
        </p>
      </div>
    </div>
  );
};