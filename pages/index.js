import React from 'react';
import ChatBot from '../components/Chatbot';

export default function Home() {
  const pageStyle = {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',    
    height: '100vh',         
    width: '100vw',          
  };

  return (
    <div style={pageStyle}>
      <ChatBot />
    </div>
  );
}
