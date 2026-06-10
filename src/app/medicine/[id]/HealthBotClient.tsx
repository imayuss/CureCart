'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function HealthBotClient({ medicineName }: { medicineName: string }) {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: `Hi! I am the CureCart AI Medical Assistant. I use verified data from the FDA, WHO, and Mayo Clinic. What would you like to know about ${medicineName}?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/health-bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, medicineName })
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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[400px]">
        {messages.map((msg, i) => (
          <div key={i} className={`p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white ml-8' : 'bg-gray-100 text-gray-800 mr-8 whitespace-pre-wrap'}`}>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="bg-gray-100 text-gray-800 p-3 rounded-lg mr-8 w-fit text-sm animate-pulse">
            Consulting verified sources...
          </div>
        )}
      </div>
      
      <div className="mt-auto flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={`Ask about ${medicineName}...`}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
        />
        <Button onClick={sendMessage} disabled={loading || !input.trim()} className="bg-blue-600 hover:bg-blue-700">
          Send
        </Button>
      </div>
    </div>
  );
}
