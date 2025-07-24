import React from 'react';
import ChatBot from '../components/ChatBot';

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
      <ChatBot />
    </div>
  );
}