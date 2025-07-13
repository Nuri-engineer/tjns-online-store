import type { ProductT } from '../../entities/products/model/types';
import { useNavigate } from 'react-router';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useState } from 'react';
import { LikeModal } from '../LikeModal/ui/LikeModal';
import { useFavoriteActions } from '../../entities/favorite/api/likeHook';

type Props = {
  product: ProductT;
  rating?: number;
};

export default function ProductCard({ product, rating }: Props): React.JSX.Element {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { handleFavoriteAction, isProductLiked, loading } = useFavoriteActions();
  const isLiked = isProductLiked(product.id);

  if (loading) return <div className="text-[#1A3C6D] text-center font-poppins">Загрузка...</div>;

  return (
    <>
      <div
        className="relative flex flex-col transition-all duration-300 cursor-pointer w-full"
        onClick={() => navigate(`/products/${product.id.toString()}`)}
      >
        {/* Рейтинг */}
        {rating !== undefined && (
          <div className="absolute top-3 left-3 bg-[#FBBF24] text-[#1A3C6D] text-xs font-semibold px-2 py-1 rounded-lg">
            ★ {rating.toFixed(1)}
          </div>
        )}

        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button
            className="p-1.5 bg-[#D1E3F6] rounded-full hover:bg-[#B3CFF5] transition-colors duration-300"
            title="Избранное"
            onClick={(e) => {
              e.stopPropagation();
              void handleFavoriteAction(product, setShowAuthModal);
            }}
          >
            {isLiked ? (
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

      <LikeModal
        show={showAuthModal}
        onHide={() => {
          setShowAuthModal(false);
        }}
      />
    </>
  );
}