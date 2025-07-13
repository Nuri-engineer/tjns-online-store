import React, { useState } from 'react';
import { useAppDispatch } from '../../../../shared/lib/hooks';
import { createCategory } from '../../../../entities/category/model/categoryThunks';
import { newCategorySchema } from '../../../../entities/category/model/categorySchema';
import { useNavigate } from 'react-router';

type FormData = {
  name: string;
};

export default function CategoryCreate(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: '',
  });

  const addCategoryHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      const validatedData = newCategorySchema.parse(formData);
      void dispatch(createCategory(validatedData));
      setFormData({ name: '' });
    } catch (error) {
      console.error('Ошибка создания категории', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#E6F0FA] font-poppins px-6 py-20 sm:py-24">
      <form onSubmit={addCategoryHandler} className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <label htmlFor="name" className="block text-sm font-medium text-[#1A3C6D]">
          Введите название категорию
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Введите название категорию"
          className="w-full px-4 py-2 rounded-xl bg-[#F1F5F9] text-[#1A3C6D] placeholder-[#6B7280] border-2 border-[#D1E3F6] focus:ring-2 focus:ring-[#1A3C6D]/50 hover:border-[#1A3C6D]/50 transition-all duration-200"
        />

        <button
          type="submit"
          className="w-28 px-4 py-2 bg-[#1A3C6D] text-white rounded-xl hover:bg-[#3B5A9A] shadow-md hover:scale-105 transition-all duration-300"
        >
          Добавить
        </button>
        <button
          className="w-28 px-4 py-2 bg-[#1A3C6D] text-white rounded-xl hover:bg-[#3B5A9A] shadow-md hover:scale-105 transition-all duration-300"
          onClick={() => navigate('/categories')}
        >
          Закрыть
        </button>
      </form>
    </div>
  );
}