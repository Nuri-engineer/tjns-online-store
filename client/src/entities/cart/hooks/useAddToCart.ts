import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { useAuth } from '../../user/hooks/useAuth';
import { addItemLocally, removeItemLocally, updateItemLocally } from '../model/cartSlice';
import { addCartItem, deleteCartItem, updateCartItem } from '../model/cartThunks';
import type { CartItemT } from '../model/cartTypes';

type UseAddToCartReturn = {
  addToCart: (product: { id: number; price: number }) => void;
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
  getQuantity: (productId: number) => number;
}

export const useAddToCart = (): UseAddToCartReturn => {
  const { isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const addToCart = (product: { id: number; price: number }): void => {
    if (isAuthenticated) {
      void dispatch(
        addCartItem({
          productId: product.id,
          quantity: 1,
          price: product.price,
        }),
      );
    } else {
      const localItem: CartItemT = {
        id: Date.now(),
        cartId: 0,
        productId: product.id,
        quantity: 1,
        price: product.price,
        addedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
      dispatch(addItemLocally(localItem));
    }
  };

  const increment = (productId: number): void => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;

    if (isAuthenticated) {
      void dispatch(
        updateCartItem({
          itemId: item.id,
          updateData: { quantity: item.quantity + 1 },
        })
      );
    } else {
      dispatch(updateItemLocally({ productId, quantity: item.quantity + 1 }));
    }
  };

  const decrement = (productId: number): void => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;

    if (item.quantity === 1) {
      if (isAuthenticated) {
        void dispatch(deleteCartItem(item.id));
      } else {
        dispatch(removeItemLocally(item.productId));
      }
    } else {
      if (isAuthenticated) {
        dispatch(
          updateCartItem({
            itemId: item.id,
            updateData: { quantity: item.quantity - 1 },
          })
        );
      } else {
        dispatch(updateItemLocally({ productId, quantity: item.quantity - 1 }));
      }
    }
  }

  const getQuantity = (productId: number): number => {
    const item = items.find((i) => i.productId === productId);
    return item ? item.quantity : 0;
  }

  return { addToCart, increment, decrement, getQuantity };
};
