import React from 'react';
import ChatBot from '../components/Chatbot';

export default function Home() {
  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '40px',
  };

  return (
    <div style={pageStyle}>
      <ChatBot />
    </div>
  );
}
