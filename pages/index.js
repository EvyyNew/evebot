import React from 'react';
import ChatBot from '../components/Chatbot';

export default function Home() {
  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f0f2f5', // A soft background color for the page
    boxSizing: 'border-box' // Ensures padding doesn't add to the total height
  };

  return (
    <div style={pageStyle}>
      <ChatBot />
    </div>
  );
}
