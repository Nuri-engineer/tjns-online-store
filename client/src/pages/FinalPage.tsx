import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../shared/lib/hooks';
import { createMessage, findOrCreateChat, getAllMessagesByChat } from '../entities/chat/model/chatThunks';
import { io } from 'socket.io-client';
import type { MessageT } from '../entities/chat/model/chatTypes';
import { addMessage } from '../entities/chat/model/chatSlice';

const socket = io('http://localhost:3000');

function FinalPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const guestId = useAppSelector((state) => state.user.guestId);
  const chat = useAppSelector((state) => state.chat.chat);
  const [input, setInput] = React.useState<string>('');
  const messages = useAppSelector((state) => state.chat.messages);

  console.log(messages, 'messages');

  useEffect(() => {
    if (user === undefined && guestId === undefined) return;

    if (!user && !guestId) return;

    const payload: { userId?: number; guestId?: string } = {};
    if (user) payload.userId = user.id;
    else if (guestId) payload.guestId = guestId;

    void dispatch(findOrCreateChat(payload));
    console.log('Чат создан');
  }, [dispatch, user, guestId]);

  useEffect(() => {
    if (!chat?.id) return;
    console.log('Чат найден');

    socket.emit('join', chat.id);
    void dispatch(getAllMessagesByChat(chat.id));
    console.log('Сообщения получены');

    socket.on('message', (message: MessageT) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('message');
    };
  }, [chat?.id, dispatch]);

  const handleSend = (e: React.FormEvent<HTMLFormElement>): void => {
    console.log('1')
    e.preventDefault();
    console.log('2')
    if (!input.trim() || !chat?.id) return;
      console.log('3')
      const newMessage = {
        chatId: chat.id,
        content: input,
        sender: user ? 'user' : 'guest',
      }
      console.log('4')
      const result = dispatch(createMessage(newMessage)).unwrap();
      socket.emit('message', result);
      setInput('');
    
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>Чат</h2>
      <div style={{ border: '1px solid #ccc', height: 200, overflowY: 'scroll', marginBottom: 10 }}>
        {messages.map((msg, i) => <div key={i}>{msg.content}</div>)}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите сообщение"
        style={{ marginRight: 8 }}
      />
      <button onClick={handleSend}>Отправить</button>
    </div>
  )
}

export default FinalPage;
