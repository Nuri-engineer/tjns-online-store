import { toast } from 'react-toastify';
import type { ProductT } from '../../products/model/types';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { createFavorite, deleteFavorite } from '../model/favoriteThunks';

type UseFavoriteActionsReturn = {
  handleFavoriteAction: (
    product: ProductT,
    setShowAuthModal?: (value: boolean) => void,
  ) => Promise<void>;
  isProductLiked: (productId: number) => boolean;
  loading: boolean;
};

export const useFavoriteActions = (): UseFavoriteActionsReturn => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const loading = useAppSelector((state) => state.favorites.loading);

  const isProductLiked = (productId: number): boolean =>
    favorites.some((favorite) => favorite.productId === productId && favorite.userId === user?.id);

  const handleFavoriteAction = async (
    product: ProductT,
    setShowAuthModal?: (value: boolean) => void,
  ): Promise<void> => {
    if (!user) {
      toast.info('Войдите, чтобы добавлять товары в избранное');
      setShowAuthModal?.(true);
      return;
    }

    try {
      if (isProductLiked(product.id)) {
        await dispatch(deleteFavorite({ userId: user.id, productId: product.id })).unwrap();
        toast.success('Товар удалён из избранного');
      } else {
        await dispatch(createFavorite({ userId: user.id, productId: product.id })).unwrap();
        toast.success('Товар добавлен в избранное');
      }
    } catch (error) {
      console.error('Ошибка при работе с избранным', error);
      toast.error('Произошла ошибка');
    }
  };

  return {
    handleFavoriteAction,
    isProductLiked,
    loading,
  };
};
