"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send } from 'lucide-react';

import ReactMarkdown from 'react-markdown';

export function GlobalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: `Hi! I am the CureCart AI Medical Assistant. I use verified data from the FDA, WHO, and Mayo Clinic. How can I help you today?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    const newMessages: {role: 'user'|'bot', text: string}[] = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/health-bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, medicineName: 'General Health' })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: `Error: ${data.error}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Failed to connect to the medical assistant." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-zinc-900 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all z-50 hover:scale-110 group"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping opacity-75 group-hover:opacity-0 transition-opacity"></div>
        {isOpen ? <X className="w-6 h-6 relative z-10" /> : <MessageCircle className="w-6 h-6 relative z-10" />}
      </button>

      {/* Chat Window Overlay */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300 border border-gray-100">
          
          {/* Header */}
          <div className="bg-zinc-900 p-5 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-dot-pattern-white opacity-10"></div>
            <div className="relative z-10">
              <h3 className="font-black text-sm flex items-center gap-2">🤖 Medical AI Assistant</h3>
              <p className="text-xs text-zinc-400 mt-1 font-medium">Verified FDA/WHO Sources Only</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="relative z-10 text-zinc-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-zinc-50">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[85%] p-4 text-sm ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white ml-auto rounded-2xl rounded-tr-sm shadow-sm' 
                  : 'bg-white text-zinc-800 mr-auto rounded-2xl rounded-tl-sm shadow-sm border border-zinc-100'
              }`}>
                {msg.role === 'user' ? (
                  <div className="whitespace-pre-wrap font-medium">{msg.text}</div>
                ) : (
                  <div className="text-gray-700">
                    <ReactMarkdown
                      components={{
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="bg-white text-gray-500 p-4 rounded-2xl rounded-tl-sm mr-auto max-w-[85%] shadow-[0_2px_10px_rgb(0,0,0,0.06)]">
                <div className="flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                  </span>
                  <span className="text-xs font-medium ml-1">Thinking...</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 shrink-0">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask a medical question..."
                className="flex-1 bg-transparent border-0 py-3 text-sm focus:outline-none placeholder:text-gray-400 font-medium"
              />
              <button 
                onClick={sendMessage} 
                disabled={loading || !input.trim()} 
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-emerald-600 text-white flex items-center justify-center hover:scale-105 transition-all disabled:opacity-30 disabled:hover:scale-100 flex-shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
