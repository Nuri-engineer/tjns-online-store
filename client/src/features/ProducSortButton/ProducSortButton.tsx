import React, { useState } from 'react';

type SortType = 'none' | 'rating-asc' | 'rating-desc' | 'price-asc' | 'price-desc';

type ProductSortButtonsProps = {
  sortType: SortType;
  onSortChange: (sortType: SortType) => void;
  className?: string;
};

export default function ProductSortButtons({
  sortType,
  onSortChange,
  className,
}: ProductSortButtonsProps): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const sortOptions = [
    { label: 'Без сортировки', value: 'none' },
    { label: 'По рейтингу ↑', value: 'rating-asc' },
    { label: 'По рейтингу ↓', value: 'rating-desc' },
    { label: 'По цене ↑', value: 'price-asc' },
    { label: 'По цене ↓', value: 'price-desc' },
  ];

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="group inline-flex items-center justify-center w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-[#1A3C6D] bg-[#F1F5F9] rounded-lg hover:bg-[#D1E3F6] hover:text-[#3B5A9A] transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none font-poppins"
      >
        Сортировать: {sortOptions.find((o) => o.value === sortType)?.label}
        <svg
          className="ml-2 h-4 sm:h-5 w-4 sm:w-5 text-[#1A3C6D] transition-colors duration-300 group-hover:text-[#3B5A9A]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="absolute mt-2 w-48 sm:w-52 rounded-lg shadow-md bg-white border border-[#D1E3F6] z-60 font-poppins">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value as SortType);
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm sm:text-base text-[#1A3C6D] transition-all duration-300 ${
                  sortType === option.value
                    ? 'bg-[#1A3C6D] text-white font-bold'
                    : 'hover:bg-[#D1E3F6] hover:text-[#3B5A9A]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}