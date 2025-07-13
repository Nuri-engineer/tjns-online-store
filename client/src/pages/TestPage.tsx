// Chat.tsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function Chat(): React.JSX.Element {
  const [chatId, setChatId] = useState('123');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.emit('join', chatId);

    socket.on('message', (data) => {
      setMessages((prev) => [...prev, `${data.user}: ${data.text}`]);
    });

    return () => {
      socket.off('message');
    };
  }, [chatId]);

  const handleSend = () => {
    if (message.trim()) {
      socket.emit('message', {
        chatId,
        text: message,
        user: 'Яна',
      });
      setMessage('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Чат {chatId}</h2>
      <div style={{ border: '1px solid #ccc', height: 200, overflowY: 'scroll', marginBottom: 10 }}>
        {messages.map((msg, i) => <div key={i}>{msg}</div>)}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Введите сообщение"
        style={{ marginRight: 8 }}
      />
      <button onClick={handleSend}>Отправить</button>
    </div>
  );
}
