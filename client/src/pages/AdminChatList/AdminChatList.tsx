import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks";
import { getAllChats } from "../../entities/chat/model/chatThunks";
import { useNavigate } from "react-router";
// import { io } from "socket.io-client";

export function AdminChatList(): React.JSX.Element {
    const dispatch = useAppDispatch();
    const allChats = useAppSelector((s) => s.chat.allChats);
    const navigate = useNavigate();
    // const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    // const socket = useMemo(() => io('http://localhost:3000'), []);

    useEffect(() => {
      void dispatch(getAllChats());
    }, [dispatch]);

    const handleOpenChat = (chatId: number): void => {
      void navigate(`/admin/chat/${(chatId).toString()}`);
    }

    return (
      <div className="min-h-screen bg-[#E6F0FA] font-poppins py-20 sm:py-24">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#1A3C6D] mb-8" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
            Все чаты
          </h1>
          {allChats.length === 0 ? (
            <div className="bg-[#F1F5F9] text-[#1A3C6D] px-6 py-4 rounded-xl shadow-sm text-center text-lg">
              Нет активных чатов
            </div>
          ) : (
            <div className="space-y-4">
              {allChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleOpenChat(chat.id)}
                  className="bg-[#F1F5F9] p-4 rounded-xl shadow-sm hover:bg-[#D1E3F6] cursor-pointer transition-all duration-300"
                >
                  <div className="text-lg font-medium text-[#1A3C6D]">
                    {chat.userId ? `Пользователь #${(chat.userId).toString()}` : `Гость: ${chat?.guestId}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
}