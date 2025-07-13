import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { addMessage, setMessage } from '../../entities/chat/model/chatSlice';
import ChatWidget from '../../features/Chat/ChatWidget';
import { findOrCreateChat, getAllMessagesByChat } from '../../entities/chat/model/chatThunks';
import { io } from 'socket.io-client';
import type { MessageT } from '../../entities/chat/model/chatTypes';

const socket = io('http://localhost:3000');

function ChatPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const guestId = useAppSelector((state) => state.user.guestId);
  const chat = useAppSelector((state) => state.chat.chat);

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

  return (
    <div className="min-h-screen bg-[#E6F0FA] font-poppins py-20 sm:py-24">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
        {chat?.id ? (
          <ChatWidget socket={socket} />
        ) : (
          <div className="bg-[#F1F5F9] text-[#1A3C6D] px-6 py-4 rounded-xl shadow-sm text-center text-lg">
            Чат не инициализирован
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatPage;