import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { createMessage, getAllMessagesByChat } from '../../entities/chat/model/chatThunks';
import { io } from 'socket.io-client';
import type { MessageT } from '../../entities/chat/model/chatTypes';
import { addMessage, removeChat } from '../../entities/chat/model/chatSlice';

const socket = io('http://localhost:3000');

function AdminChatPage(): React.JSX.Element {
    const [input, setInput] = React.useState<string>('');
    const { chatId } = useParams();
    const dispatch = useAppDispatch();
    const messages = useAppSelector((state) => state.chat.messages);
    const navigate = useNavigate();

    useEffect(() => {
        void dispatch(getAllMessagesByChat(Number(chatId)));
    }, [chatId]);

    useEffect(() => {
        socket.emit('join', chatId);

        socket.on('message', (message: MessageT) => {
            dispatch(addMessage(message));
        });

        return () => {
            socket.off('message');
        };
    }, [chatId]);

    const handleSend = () => {
        if (!input.trim() || !chatId) return;

        const newMessage = {
            chatId: Number(chatId),
            content: input,
            sender: 'admin',
        };

        try {
            const result = dispatch(createMessage(newMessage)).unwrap();
            socket.emit('message', result);
            setInput('');
        } catch (error) {
            console.error('Не удалось отправить сообщение:', error);
        }
    };

    return (
        <div className="min-h-screen bg-[#E6F0FA] font-poppins py-20 sm:py-24">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl">

            <button
                        onClick={() => navigate(`/admin/chat`)}
                        className="bg-[#1A3C6D] text-white px-6 py-2 rounded-xl hover:bg-[#3B5A9A] shadow-md hover:scale-105 transition-all duration-300"
                    >
                        Назад
                    </button>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3C6D] mb-6" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
                    Чат #{chatId}
                </h2>
                <div className="bg-[#F1F5F9] p-6 rounded-xl shadow-md h-96 overflow-y-auto space-y-2">
                    {messages.map((msg) => (
                        <div key={msg.id} className="bg-white p-3 rounded-lg shadow-sm mb-2">
                            <div className="text-sm text-[#6B7280]">{msg.sender}</div>
                            <div className="text-[#1A3C6D]">{msg.content}</div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-4 mt-6">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-xl bg-[#F1F5F9] text-[#1A3C6D] placeholder-[#6B7280] border-2 border-[#D1E3F6] focus:ring-2 focus:ring-[#1A3C6D]/50 hover:border-[#1A3C6D]/50 transition-all duration-200"
                        placeholder="Введите сообщение..."
                    />
                    <button
                        onClick={handleSend}
                        className="bg-[#1A3C6D] text-white px-6 py-2 rounded-xl hover:bg-[#3B5A9A] shadow-md hover:scale-105 transition-all duration-300"
                    >
                        Отправить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminChatPage;