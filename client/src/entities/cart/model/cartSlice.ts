// import type { PayloadAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type {
  AddCartItemT,
  AddToCartT,
  CartItemT,
  CartSliceT,
  NewCartItem,
  ProductForCartT,
} from './cartTypes';
import {
  addCartItem,
  deleteCartItem,
  getCart,
  getCartItems,
  updateCartItem,
  validateCart,
  validateCartBeforeOrder,
} from './cartThunks';
import { toast } from 'react-toastify';
import type { RootState } from '../../../app/store';
// import {
//   addCartItem,
//   deleteCart,
//   deleteCartItem,
//   getCart,
//   getCartItems,
//   updateCartItem,
// } from './cartThunks';
// import { guestCartItemArraySchem } from './cartSchema';
// import type { GuestCartItemT } from './guestCartTypes';

const initialState: CartSliceT = {
  cart: null,
  items: [],
  guestItems: [],
  loading: false,
  error: null,
  hasMerged: false,
  cartIsValid: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setHasMerged: (state) => {
      state.hasMerged = true;
    },
    loadGuestCart: (state) => {
      const data = localStorage.getItem('guestCart');
      console.log('💾 Загружаем guestCart из localStorage:', data);
      if (data) {
        try {
          state.guestItems = JSON.parse(data);
          console.log('✅ guestItems после загрузки:', state.guestItems);
        } catch (error) {
          localStorage.removeItem('guestCart');
          state.guestItems = [];
          toast.error('Ошибка при чтении гостевой корзины. Корзина очищена.');
        }
      } else {
        state.guestItems = [];
      }
    },
    addGuestItemToCart: (
      state,
      action: PayloadAction<AddToCartT & { product: ProductForCartT }>,
    ) => {
      console.log('👉 Редьюсер addGuestItemToCart получил payload:', action.payload);
      const existing = state.guestItems.find((i) => i.productId === action.payload.productId);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.guestItems.push({
          id: Date.now(),
          cartId: -1,
          productId: action.payload.productId,
          quantity: 1,
          price: action.payload.price,
          product: action.payload.product,
        });
      }
      localStorage.setItem('guestCart', JSON.stringify(state.guestItems));
    },

    updateGuestItemQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.guestItems.find((i) => i.productId === productId);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem('guestCart', JSON.stringify(state.guestItems));
      }
    },
    removeItemLocally(state, action: PayloadAction<number>) {
      const updatedItems = state.guestItems.filter((item) => item.productId !== action.payload);
      state.guestItems = updatedItems;
      localStorage.setItem('guestCart', JSON.stringify(updatedItems));
    },
    clearGuestCart(state) {
      state.guestItems = [];
      localStorage.removeItem('guestCart');
    },
    replaceGuestCart(state, action: PayloadAction<CartItemT[]>) {
      state.guestItems = action.payload;
      localStorage.setItem('guestCart', JSON.stringify(action.payload));
    },
  },
  extraReducers(builder) {
    // Получение корзины
    builder.addCase(getCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при получении корзины';
    });

    builder.addCase(getCartItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCartItems.fulfilled, (state, action: PayloadAction<CartItemT[]>) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при получении элементов корзины';
      console.error(action.error);
    });

    // // Добавление элемента
    builder.addCase(addCartItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCartItem.fulfilled, (state, action: PayloadAction<AddCartItemT>) => {
      state.loading = false;
      state.items.push(action.payload);
    });
    builder.addCase(addCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при добавлении элемента';
      console.error(action.error);
    });

    // // Обновление элемента
    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCartItem.fulfilled, (state, action: PayloadAction<CartItemT>) => {
      const updatedItem = action.payload;
      const index = state.items.findIndex((i) => i.productId === updatedItem.id);
      if (index !== -1) {
        state.items[index] = updatedItem;
      }
    });
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при обновлении элемента';

      if (action.error.message?.includes('Товар не найден')) {
        const { itemId } = action.meta.arg;
        state.items = state.items.filter((i) => i.id !== itemId);
        toast.error('Этот товар больше не доступен в корзине');
      } else {
        toast.error(state.error);
      }
      console.error(action.error);
    });

    // // Удаление элемента
    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.loading = false;
      console.log(state.items, action.payload, '-----------------------');
      state.items = state.items.filter((item) => item.productId !== action.payload);
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при удалении элемента';
      console.error(action.error);
    });

    builder.addCase(validateCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(validateCart.fulfilled, (state) => {
      state.loading = false;
      state.cartIsValid = true;
    });
    builder.addCase(validateCart.rejected, (state) => {
      state.loading = false;
      state.cartIsValid = false;
      toast.error('Проверьте товары в корзине: что-то устарело');
    });
  },
});

export const {
  loadGuestCart,
  updateGuestItemQuantity,
  clearGuestCart,
  setHasMerged,
  addGuestItemToCart,
  removeItemLocally,
  replaceGuestCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectIsInCart = (state: RootState, productId: number): boolean => {
  const { user } = state.user;
  if (user) {
    return state.cart.items.some((item) => item.productId === productId);
  }
  return state.cart.guestItems.some((item) => item.productId === productId);
};
