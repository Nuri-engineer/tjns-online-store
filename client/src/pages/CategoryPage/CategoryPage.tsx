import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { deleteCategory, getCategories } from '../../entities/category/model/categoryThunks';
import { useNavigate } from 'react-router';

export default function CategoryPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    void dispatch(getCategories());
  }, [dispatch]);

  const categories = useAppSelector((state) => state.categories.categories);

  const deleteHandler = async (id: number): Promise<void> => {
    try {
      await dispatch(deleteCategory(id));
    } catch (error) {
      console.error('Ошибка удаление категорию', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#E6F0FA] font-poppins px-6 py-20 sm:py-24">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-4 bg-[#F1F5F9] rounded-xl shadow-sm mb-2 hover:bg-[#D1E3F6] transition-all duration-300"
          >
            <div className="text-[#1A3C6D] font-medium text-lg">{category.name}</div>
            <div className="flex items-center">
              <img
                src="../../../../../public/icons/edit.png"
                alt="Редактировать"
                className="w-6 h-6 cursor-pointer mr-2 hover:opacity-75 transition-opacity duration-200"
                onClick={() => navigate(`/categories/${category.id.toString()}/edit`)}
              />
              <img
                src="../../../../../public/icons/delete-2.png"
                alt="Удалить"
                className="w-6 h-6 cursor-pointer hover:opacity-75 transition-opacity duration-200"
                onClick={() => deleteHandler(category.id)}
              />
            </div>
          </div>
        ))}
        <button
          className="mt-6 px-4 py-2 bg-[#1A3C6D] text-white rounded-xl hover:bg-[#3B5A9A] shadow-md hover:scale-105 transition-all duration-300"
          onClick={() => navigate('/categories/create')}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}