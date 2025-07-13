import React from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import type { Socket } from 'socket.io-client';
import { createMessage } from '../../entities/chat/model/chatThunks';

type ChatWidgetProps = {
  socket: Socket;
};

function ChatWidget({ socket }: ChatWidgetProps): React.JSX.Element {
  const [input, setInput] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chat.messages);
  const user = useAppSelector((state) => state.user.user);
  const chat = useAppSelector((state) => state.chat.chat);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!input.trim() || !chat?.id || !socket) return;

    const newMessage = {
      chatId: chat.id,
      content: input,
      sender: user ? 'user' : 'guest',
    };

    try {
      const result = dispatch(createMessage(newMessage)).unwrap();
      socket.emit('message', result); // отправляем уже сохранённое сообщение
      setInput('');
    } catch (err) {
      console.error('Не удалось отправить сообщение:', err);
    }
  };

  return (
    <div className="flex flex-col h-[500px] max-h-[500px] bg-[#F1F5F9] rounded-2xl shadow-lg">
      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="bg-white p-3 rounded-xl shadow-sm">
            <div className="text-sm text-[#6B7280]">{msg.sender}</div>
            <div className="mt-1 text-[#1A3C6D] text-base">{msg.content}</div>
          </div>
        ))}
      </div>

      {/* Форма */}
      <form onSubmit={handleSubmit} className="flex items-center border-t p-4 space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
          className="flex-1 px-4 py-2 rounded-xl bg-[#F1F5F9] text-[#1A3C6D] placeholder-[#6B7280] border-2 border-[#D1E3F6] focus:ring-2 focus:ring-[#1A3C6D]/50 hover:border-[#1A3C6D]/50 transition-all duration-200"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-[#1A3C6D] text-white rounded-xl hover:bg-[#3B5A9A] shadow-md hover:scale-105 transition-all duration-300"
        >
          Отправить
        </button>
      </form>
    </div>
  );
}

export default ChatWidget;