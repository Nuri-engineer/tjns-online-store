import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getFavorites } from '../../entities/favorite/model/favoriteThunks';
import { Container } from 'react-bootstrap';
import { getProducts } from '../../entities/products/model/productThunk';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { useFavoriteActions } from '../../entities/favorite/api/likeHook';
import { LikeModal } from '../../features/LikeModal/ui/LikeModal';

export default function FavoritePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { handleFavoriteAction, isProductLiked } = useFavoriteActions();

  const favorites = useAppSelector((state) => state.favorites.favorites);
  const userId = useAppSelector((state) => state.user.user?.id);
  const products = useAppSelector((state) => state.products.products);

  useEffect(() => {
    if (userId) {
      void dispatch(getFavorites(userId));
      void dispatch(getProducts());
    }
  }, [dispatch, userId]);

  const favoriteProductIds = favorites
    .filter((fav) => fav.userId === userId)
    .map((fav) => fav.productId);

  const favoriteProducts = products.filter((product) => favoriteProductIds.includes(product.id));

  if (!userId) {
    return (
      <div className="min-h-screen bg-[#E6F0FA] font-poppins py-20 sm:py-24">
        <Container>
          <div className="bg-[#F1F5F9] text-[#1A3C6D] px-5 py-4 rounded-xl shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Пожалуйста, войдите в систему, чтобы просмотреть избранное
            </h2>
          </div>
        </Container>
      </div>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen bg-[#E6F0FA] font-poppins py-20 sm:py-24">
        <Container>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A3C6D] mb-6" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
            Избранные товары
          </h2>
          <div className="bg-[#F1F5F9] text-[#1A3C6D] px-5 py-4 rounded-xl shadow-sm">
            <p className="text-lg">У вас пока нет избранных товаров</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#E6F0FA] font-poppins py-20 sm:py-24">
        <Container>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A3C6D] mb-8" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
            Вам понравилось:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => {
              // Предполагаем, что у продукта есть поле reviews для рейтинга
              const rate = product.reviews?.length
                ? product.reviews.map((review) => review.rating).reduce((a, b) => a + b, 0) / product.reviews.length
                : 0;

              return (
                <div
                  key={product.id}
                  className="relative flex flex-col transition-all duration-300 cursor-pointer w-full"
                  onClick={() => navigate(`/products/${product.id.toString()}`)}
                >
               

                  {/* Кнопка избранного */}
                  <div className="absolute top-3 right-3 flex gap-2 z-10">
                    <button
                      className="p-1.5 bg-[#D1E3F6] rounded-full hover:bg-[#B3CFF5] transition-colors duration-300"
                      title="Избранное"
                      onClick={(e) => {
                        e.stopPropagation();
                        void handleFavoriteAction(product, setShowAuthModal);
                      }}
                    >
                      {isProductLiked(product.id) ? (
                        <BiSolidHeart className="text-[#EF4444]" size={20} />
                      ) : (
                        <BiHeart className="text-[#6B7280]" size={20} />
                      )}
                    </button>
                  </div>

                  {/* Изображение товара */}
                  <div className="h-48 bg-white shadow-sm rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-contain rounded-xl p-4"
                    />
                  </div>

                  {/* Информация о товаре */}
                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-[#1A3C6D] truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#6B7280] flex-grow line-clamp-2 mt-0.5">
                      {product.description}
                    </p>
                    <p className="text-lg font-bold text-[#1A3C6D] mt-1">
                      {product.price.toLocaleString()} ₽
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      <LikeModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />
    </>
  );
}