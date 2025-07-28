import React, { useState, useEffect, useRef } from 'react';
import styles from './Chatbot.module.css'; // Import the CSS Module

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Greetings! I am Evelyn Bot, your guide to Evelyn\'s career path, achievements, and professional expertise. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const botAvatarUrl =  '/me.png'; 
  const userAvatarUrl = '/user.png'; 

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>Evelyn Bot</div>
      <div className={styles.messagesContainer}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${styles.messageRow} ${msg.role === 'user' ? styles.userMessageRow : styles.botMessageRow}`}
          >
            <img
              src={msg.role === 'user' ? userAvatarUrl : botAvatarUrl}
              alt={`${msg.role} avatar`}
              className={styles.avatar}
            />
            <div
              className={`${styles.messageBubble} ${msg.role === 'user' ? styles.userBubble : styles.botBubble}`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className={styles.typingIndicator}>
             <img src={botAvatarUrl} alt="bot avatar" className={styles.avatar} />
             <div>Bot is typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputContainer}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !loading && sendMessage()}
          placeholder="Ask me about Evelyn..."
          className={styles.input}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={styles.button}
        >
          Send
        </button>
      </div>
      <div className={styles.footer}>
        Powered by OpenAI API
      </div>
    </div>
  );
};

export default ChatBot;