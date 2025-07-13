import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getAdmin, getUsers } from '../../entities/user/model/userThunks';
import { getProducts } from '../../entities/products/model/productThunk';
import { useNavigate } from 'react-router';
import SignUpAdminModal from '../../shared/ui/signUpAdminModal/SignUpAdminModal';

export default function SuperAdminPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.user);
  const admins = useAppSelector((state) => state.user.admin);
  const products = useAppSelector((state) => state.products.products);
  const users = useAppSelector((state) => state.user.users);
  const onlyusers = users.filter((user) => user.status === 'user');

  useEffect(() => {
    void dispatch(getAdmin());
    void dispatch(getProducts());
    void dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#E6F0FA] font-poppins py-20 sm:py-24">
      <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#1A3C6D] mb-8" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
          Панель Администратора
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#F1F5F9] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
            <p className="text-sm text-[#6B7280]">Всего товаров</p>
            <p className="text-xl font-semibold text-[#1A3C6D]">{products.length}</p>
          </div>

          <div className="bg-[#F1F5F9] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center">
            <p className="text-sm text-[#6B7280]">Админов</p>
            <p className="text-xl font-semibold text-[#1A3C6D] mb-2">{admins.length}</p>
            {user?.status === 'superadmin' && <SignUpAdminModal />}
          </div>

          <div className="bg-[#F1F5F9] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center">
            <p className="text-sm text-[#6B7280]">Пользователей</p>
            <p className="text-xl font-semibold text-[#1A3C6D] mb-2">{onlyusers.length}</p>
          </div>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#1A3C6D]">Сотрудники</h2>
            <button
              onClick={() => navigate('/products/create')}
              className="bg-[#1A3C6D] text-white px-4 py-2 rounded-xl shadow-md hover:bg-[#3B5A9A] hover:scale-105 transition-all duration-300"
            >
              Добавить товар
            </button>
          </div>

          <ul className="space-y-2">
            {admins.map((admin) => (
              <li key={admin.id} className="bg-[#F1F5F9] px-4 py-3 rounded-xl shadow-sm text-[#1A3C6D]">
                {admin.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => navigate('/admin/products')}
            className="text-[#379683] hover:text-[#5CD8B5] hover:underline transition-colors duration-300"
          >
            Перейти к списку товаров
          </button>
          <button
            onClick={() => navigate('/categories')}
            className="text-[#379683] hover:text-[#5CD8B5] hover:underline block transition-colors duration-300"
          >
            Управление категориями
          </button>
        </div>
      </div>
    </div>
  );
}