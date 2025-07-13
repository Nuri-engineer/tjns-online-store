import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { getCategories } from '../../../entities/category/model/categoryThunks';
import { logoutUser } from '../../../entities/user/model/userThunks';
import SearchComponent from '../../../features/searchOptions/ui/SearchComponent';
import { Heart, HeartFill, Cart, CartFill } from 'react-bootstrap-icons';
import type { SearchComponentRef } from '../../../features/searchOptions/ui/SearchComponent';

export default function NavigationBar(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const cartItems = useAppSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFavoriteHovered, setIsFavoriteHovered] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFavoriteFloatingHovered, setIsFavoriteFloatingHovered] = useState(false);
  const [isCartFloatingHovered, setIsCartFloatingHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [clearSearch, setClearSearch] = useState(false);
  const searchRef = useRef<SearchComponentRef>(null);

  console.log(clearSearch);

  // Функция для очистки поиска
  const handleClearSearch = (): void => {
    setClearSearch((prev) => !prev); // Триггерим очистку
    if (searchRef.current) {
      searchRef.current.clear();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    void dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = useAppSelector((store) => store.categories.categories);
  const toggleSidebar = (): void => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = (): void => setIsSidebarOpen(false);

  const favoriteCount = favorites.filter((fav) => fav.userId === user?.id).length;
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isAdmin = user?.status === 'admin' || user?.status === 'superadmin';

  const closeSidebarAndClearSearch = (): void => {
    closeSidebar();
    handleClearSearch();
  };

  return (
    <>
      {/* Затемнение фона при открытии сайдбара */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
      />

      {/* Навбар */}
      <nav
        className={`fixed top-0 left-0 w-full bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 z-20 font-poppins transition-transform duration-300 rounded-b-xl ${
          isScrolled ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="flex items-center gap-4 z-10">
          <button
            className="text-gray-600 text-2xl hover:text-blue-500 transition-colors duration-300 focus:outline-none p-2 rounded-full"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? '✕' : '☰'}
          </button>
          <Link
            to="/"
            className="text-gray-800 text-2xl font-semibold hover:text-blue-500 transition-colors duration-300 no-underline"
          >
            TJNS
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center gap-4 z-10">
          <div className="w-full max-w-md lg:max-w-lg">
            <SearchComponent ref={searchRef} onClear={() => setClearSearch(false)} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-500 transition-colors duration-200 relative"
              onClick={() => navigate('/favorites')}
              onMouseEnter={() => setIsFavoriteHovered(true)}
              onMouseLeave={() => setIsFavoriteHovered(false)}
              aria-label="Избранное"
            >
              {isFavoriteHovered ? <HeartFill size={20} /> : <Heart size={20} />}
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full z-100 h-4 w-4 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </button>

            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-500 transition-colors duration-200 relative"
              onClick={() => navigate('/cart')}
              onMouseEnter={() => setIsCartHovered(true)}
              onMouseLeave={() => setIsCartHovered(false)}
              aria-label="Корзина"
            >
              {isCartHovered ? <CartFill size={20} /> : <Cart size={20} />}
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full font-semibold hover:bg-blue-100 hover:text-blue-500 transition-colors duration-200"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
              >
                {user.name[0].toUpperCase()}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#D1E3F6] rounded-xl shadow-md overflow-hidden">
                  <div className="px-4 py-3 font-semibold text-[#1A3C6D] border-b border-[#D1E3F6]">
                    {user.name}
                  </div>
                  {isAdmin && (
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-[#1A3C6D] hover:bg-[#D1E3F6] hover:text-[#3B5A9A] transition-colors duration-300"
                      onClick={() => {
                        void navigate('/admin');
                        setIsUserMenuOpen(false);
                      }}
                    >
                      Личный кабинет
                    </button>
                  )}

                  <button
                    className="w-full text-left px-4 py-2 text-sm text-[#1A3C6D] hover:bg-[#D1E3F6] hover:text-[#3B5A9A] transition-colors duration-300"
                    onClick={() => {
                      void navigate('/favorites');
                      setIsUserMenuOpen(false);
                    }}
                  >
                    Избранное
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-[#1A3C6D] hover:bg-[#D1E3F6] hover:text-[#3B5A9A] transition-colors duration-300"
                    onClick={() => {
                      void navigate(isAdmin ? '/admin/chat' : '/chat');
                      setIsUserMenuOpen(false);
                    }}
                  >
                    Чат поддержки
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-[#1A3C6D] hover:bg-[#D1E3F6] hover:text-[#3B5A9A] transition-colors duration-300"
                    onClick={() => {
                      void dispatch(logoutUser());
                      void navigate('/');
                      setIsUserMenuOpen(false);
                    }}
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="text-gray-600 px-4 py-2 rounded-full hover:bg-blue-100 hover:text-blue-500 text-sm transition-colors duration-300"
                onClick={() => void navigate('/login')}
              >
                Войти
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition-colors duration-300"
                onClick={() => void navigate('/signup')}
              >
                Зарегистрироваться
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Сайдбар */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-9999 font-poppins ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 bg-gray-50 text-gray-800">
          <h2 className="text-xl font-semibold">Категории</h2>
          <button
            className="text-gray-600 hover:text-blue-500 transition-colors duration-300 p-2 rounded-full"
            onClick={closeSidebar}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="p-4 space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 rounded-lg transition-colors duration-300 no-underline font-medium"
              onClick={closeSidebarAndClearSearch}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              Все товары
            </Link>
          </li>

          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/categories/${category.id.toString()}`}
                className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 rounded-lg transition-colors duration-300 no-underline font-medium"
                onClick={closeSidebarAndClearSearch}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Плавающие кнопки в правом нижнем углу */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <button
          className="w-15 h-15 flex items-center justify-center rounded-full bg-[#F1F5F9] hover:bg-[#D1E3F6] text-[#1A3C6D] hover:text-[#3B5A9A] transition-colors duration-200 relative shadow-md"
          onClick={() => navigate('/favorites')}
          onMouseEnter={() => setIsFavoriteFloatingHovered(true)}
          onMouseLeave={() => setIsFavoriteFloatingHovered(false)}
          aria-label="Избранное"
        >
          {isFavoriteFloatingHovered ? <HeartFill size={20} /> : <Heart size={20} />}
          {favoriteCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center hover:bg-[#DC2626] transition-colors duration-200">
              {favoriteCount}
            </span>
          )}
        </button>

        <button
          className="w-15 h-15 flex items-center justify-center rounded-full bg-[#F1F5F9] hover:bg-[#D1E3F6] text-[#1A3C6D] hover:text-[#3B5A9A] transition-colors duration-200 relative shadow-md"
          onClick={() => navigate('/cart')}
          onMouseEnter={() => setIsCartFloatingHovered(true)}
          onMouseLeave={() => setIsCartFloatingHovered(false)}
          aria-label="Корзина"
        >
          {isCartFloatingHovered ? <CartFill size={20} /> : <Cart size={20} />}
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center hover:bg-[#DC2626] transition-colors duration-200">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
