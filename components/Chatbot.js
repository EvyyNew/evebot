import React, { useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am Evelyn Bot. Ask me anything about Evelyn!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });
    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    setInput('');
    setLoading(false);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 16, borderRadius: 8, maxWidth: 400 }}>
      <div style={{ minHeight: 200, marginBottom: 8 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <b>{msg.role === 'user' ? 'You' : 'Evelyn Bot'}:</b> {msg.content}
          </div>
        ))}
        {loading && <div>Bot is typing...</div>}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Ask me about Evelyn..."
        style={{ width: '80%' }}
      />
      <button onClick={sendMessage} disabled={loading}>Send</button>
    </div>
  );
};

export default ChatBot;