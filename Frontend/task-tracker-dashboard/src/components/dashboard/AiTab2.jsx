// src/components/tabs/AITab2.jsx (or wherever it lives)

import { useState, useEffect, useRef } from 'react';
import { MessageCircle } from '../icons/MessageCircle';
import { askAI } from '../../services/api';

export const AITab2 = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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
      setError('Failed to reach AI service. Is the backend running on port 8082?');

      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please check if the AI server is running.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-gray-800 rounded-3xl p-6 flex flex-col"
      style={{ height: 'calc(100vh - 280px)', minHeight: '600px' }}
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <MessageCircle className="w-7 h-7 mr-3 text-orange-500" />
        AI Assistant v2
      </h2>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-2">
        {messages.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <MessageCircle className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg font-medium">How can I help you today?</p>
            <p className="text-sm mt-2">
              Ask about tasks, team capacity, compliance, or anything else.
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xl rounded-2xl px-5 py-3 ${
                    msg.role === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Loading bubbles */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 rounded-2xl px-5 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}

            {/* Connection Error Alert */}
            {error && (
              <div className="bg-red-900 bg-opacity-50 border border-red-600 rounded-2xl p-4 text-sm">
                <p className="text-red-200">{error}</p>
                <p className="text-xs mt-2 opacity-80">
                  Make sure your backend is running: <code className="bg-black px-2 py-1 rounded">http://localhost:8082</code>
                </p>
              </div>
            )}
          </>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
          className="flex-1 bg-gray-700 text-white rounded-2xl px-6 py-3.5 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-2xl px-8 py-3.5 font-semibold transition-colors"
        >
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  );
};