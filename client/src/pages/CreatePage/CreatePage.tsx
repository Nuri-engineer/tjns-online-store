import React, { useState } from 'react';
import { useAppDispatch } from '../../shared/lib/hooks';
import { create } from '../../entities/products/model/productThunk';

export default function CreatePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const product = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      categoryId: Number(formData.get('categoryId')),
      brand: formData.get('brand') as string,
      stock: Number(formData.get('stock')),
      files: formData.getAll('images') as File[],
    };

    void dispatch(create(product));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6F0FA] px-6 py-20 sm:py-24 font-poppins">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10 space-y-8"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1A3C6D]" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
          Добавить товар
        </h2>

        {[
          { label: 'Название', name: 'name', type: 'text' },
          { label: 'Описание', name: 'description', type: 'text' },
          { label: 'Цена', name: 'price', type: 'number' },
          { label: 'Категория (ID)', name: 'categoryId', type: 'number' },
          { label: 'Бренд', name: 'brand', type: 'text' },
          { label: 'Количество на складе', name: 'stock', type: 'number' },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block mb-2 text-sm font-medium text-[#1A3C6D]" htmlFor={name}>
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              required
              className="w-full px-5 py-3 rounded-xl bg-[#F1F5F9] text-[#1A3C6D] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#1A3C6D]/50 hover:border-[#1A3C6D]/50 border-2 border-[#D1E3F6] transition-all duration-200"
              placeholder={`Введите ${label.toLowerCase()}`}
            />
          </div>
        ))}

        <div>
          <label className="block mb-2 text-sm font-medium text-[#1A3C6D]" htmlFor="images">
            Добавить фото
          </label>
          <input
            id="images"
            name="images"
            type="file"
            multiple
            className="w-full file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-[#1A3C6D] file:text-[#1A3C6D] file:font-semibold hover:file:bg-[#3B5A9A] hover:file:text-[#3B5A9A] transition-all duration-300"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#1A3C6D] text-white font-bold text-lg rounded-full hover:bg-[#3B5A9A] shadow-md hover:scale-105 transition-all duration-300"
        >
          Сохранить товар
        </button>
      </form>
    </div>
  );
}