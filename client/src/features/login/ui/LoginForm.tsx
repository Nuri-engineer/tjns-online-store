import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import React, { useState } from 'react';
import { userLoginFormSchema } from '../../../entities/user/model/schema';
import { loginUser } from '../../../entities/user/model/userThunks';
import { Link, useNavigate } from 'react-router';
import { mergeGuestChatWithUser } from '../../../entities/chat/model/chatThunks';
import { setError, setIsLoading } from '../../../entities/chat/model/chatSlice';

export default function LoginForm(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const guestId = useAppSelector((state) => state.user.guestId);
  const chat = useAppSelector((state) => state.chat.chat);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const validatedData = userLoginFormSchema.parse(data);
      void dispatch(loginUser(validatedData))
        .unwrap()
        .then((user) => {
          if (guestId && chat?.id) {
            return dispatch(mergeGuestChatWithUser({ guestId, userId: user.id })).unwrap();
          }
        })
        .then(() => navigate('/'));
    } catch (error) {
      setError('Неверный email или пароль');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#E6F0FA] px-4 sm:px-6 py-20 sm:py-24 font-roboto">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md sm:max-w-lg bg-white text-[#1A3C6D] p-8 sm:p-10 rounded-3xl shadow-lg space-y-8 transition-all duration-300"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1A3C6D]" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
          Вход
        </h2>

        {error && (
          <p className="text-[#1A3C6D] text-sm text-center bg-[#F1F5F9]/50 p-2 rounded-lg">
            {error}
          </p>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm sm:text-base font-medium text-[#1A3C6D]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Введите email"
            className="w-full px-4 sm:px-5 py-3 rounded-xl bg-[#F1F5F9] text-[#1A3C6D] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#1A3C6D]/50 hover:border-[#1A3C6D]/50 border-2 border-[#D1E3F6] transition-all duration-200"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm sm:text-base font-medium text-[#1A3C6D]">
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Введите пароль"
            className="w-full px-4 sm:px-5 py-3 rounded-xl bg-[#F1F5F9] text-[#1A3C6D] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#1A3C6D]/50 hover:border-[#1A3C6D]/50 border-2 border-[#D1E3F6] transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-6 py-3 bg-[#1A3C6D] text-white font-semibold rounded-xl hover:bg-[#3B5A9A] shadow-md hover:scale-105 transition-all duration-300 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Загрузка...' : 'Войти'}
        </button>

        <p className="text-center text-sm sm:text-base text-[#1A3C6D]">
          Нет аккаунта?{' '}
          <Link
            to="/signup"
            className="text-[#379683] hover:text-[#5CD8B5] hover:underline transition-colors duration-200"
          >
            Зарегистрируйтесь
          </Link>
        </p>
      </form>
    </div>
  );
}