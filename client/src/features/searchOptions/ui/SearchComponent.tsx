import type { ForwardedRef } from 'react';
import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { searchProducts } from '../../../entities/searchOptions/model/searchThunks';
import { getCategories } from '../../../entities/category/model/categoryThunks';
import { useNavigate } from 'react-router';



function SearchComponent(): React.JSX.Element {
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { results } = useAppSelector((state) => state.search);
  const navigate = useNavigate();

  const categories = useAppSelector((state) => state.categories.categories);

  useEffect(() => {
    void dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void dispatch(searchProducts(query));
    }, 500);
    return () => clearTimeout(timer);
  }, [query, dispatch]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setQuery(value);
    setIsDropdownOpen(value.length > 0);
  };

  const handleItemClick = (itemName: string): void => {
    setQuery(itemName);
    setIsDropdownOpen(false);
  
    void navigate('/');
  };

  const handleClear = (): void => {
    setQuery('');
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }

    };

    const handleItemClick = (itemName: string): void => {
      setQuery(itemName);
      setIsDropdownOpen(false);
      void navigate('/');
    };

    const handleClear = (): void => {
      setQuery('');
      setIsDropdownOpen(false);
      onClear?.();
    };

  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto font-poppins" ref={dropdownRef}>
      <div className="flex items-center">
        <div className="relative w-full">
          <input
            type="search"
            value={query}
            onChange={handleChange}
            onFocus={() => setIsDropdownOpen(query.length > 0)}
            className="block w-full py-2.5 px-4 text-sm text-[#1A3C6D] bg-[#F1F5F9] rounded-lg border-none focus:ring-2 focus:ring-[#1A3C6D] outline-none transition-all duration-300 placeholder-[#6B7280] hover:bg-[#D1E3F6]"
            placeholder="Поиск товаров или категорий..."
            required
          />
          {query && (


            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 h-full text-white bg-[#1A3C6D] hover:bg-[#3B5A9A] rounded-r-lg border-none focus:ring-2 focus:ring-[#1A3C6D]/50 transition-all duration-300"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>

          )}
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 h-full text-white bg-[#1A3C6D] hover:bg-[#3B5A9A] rounded-r-lg border-none focus:ring-2 focus:ring-[#1A3C6D]/50 transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </div>

      {isDropdownOpen && (results.length > 0 || filteredCategories.length > 0) && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-sm max-h-80 overflow-auto transition-all duration-300">
          {/* Секция категорий */}
          {filteredCategories.length > 0 && (
            <div className="border-b border-[#D1E3F6]">
              <div className="px-4 py-2 text-xs font-semibold text-[#1A3C6D] bg-[#F1F5F9]">
                Категории
              </div>
              <ul>
                {filteredCategories.map((category) => (
                  <li key={category.id} className="hover:bg-[#D1E3F6] transition-all duration-300">
                    <button
                      type="button"
                      onClick={() => navigate(`/categories/${category.id.toString()}`)}
                      className="flex items-center w-full px-4 py-3 text-left"
                    >
                      <div className="mr-3 text-[#1A3C6D]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </div>
                      <span className="font-medium text-[#1A3C6D]">{category.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Секция товаров */}
          {results.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-[#1A3C6D] bg-[#F1F5F9]">
                Товары
              </div>
              <ul>
                {results.map((item) => (
                  <li
                    key={item.id}
                    className="hover:bg-[#D1E3F6] transition-all duration-300 border-t border-[#D1E3F6]"
                  >
                    <button
                      type="button"
                      onClick={() => handleItemClick(item.name)}
                      className="flex items-center w-full px-4 py-3 text-left"
                    >
                      <div className="mr-3 text-[#1A3C6D]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </div>
                      <div>
                        <span className="block font-medium text-[#1A3C6D]">{item.name}</span>
                        <span className="block text-xs text-[#6B7280] mt-1">
                          Категория:{' '}
                          {categories.find((c) => c.id === item.categoryId)?.name ?? 'Не указана'}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


export default SearchComponent;
