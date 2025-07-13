import { createAsyncThunk } from '@reduxjs/toolkit';
import CartService from '../api/CartService';
import type { AddCartItemT, AddToCartT, CartItemT, UpdateCartT } from './cartTypes';
import type { RootState } from '../../../app/store';
import { clearGuestCart, setHasMerged } from './cartSlice';
import axios from 'axios';
import { GuestCartItemT } from './guestCartTypes';
// import type { CartItemCheckT, CartItemValidationResponseT } from './cartTypes';
// import { type NewCartItemT, type UpdateCartItemT } from './cartTypes';
// import { cartItemCheckArraySchema, guestCartItemArraySchem } from './cartSchema';

export const getCart = createAsyncThunk('cart/getCart', () => CartService.getOrCreateCart());

// export const deleteCart = createAsyncThunk('cart/deleteCart', () => CartService.deleteCart());

export const getCartItems = createAsyncThunk('cart/getCartItems', () => CartService.getCartItems());

export const addCartItem = createAsyncThunk('cart/addCartItem', (item: AddCartItemT) =>
  CartService.addCartItem(item),
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  ({ itemId, updateData }: { itemId: number; updateData: UpdateCartT }) =>
    CartService.updateCartItem(itemId, updateData),
);

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async (itemId: number) => {
  await CartService.deleteCartItem(itemId)
  return itemId
});

export const mergeGuestCart = createAsyncThunk('cart/mergeGuestCart', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const { guestItems } = state.cart;

  for (const guestItem of guestItems) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await CartService.addCartItemForMerge({
        productId: guestItem.productId,
        price: guestItem.price,
        quantity: guestItem.quantity
      });
    } catch (error) {
      console.error(`Ошибка при переносе товара ${guestItem.productId.toString()}:`, error);
    }
  }

  thunkAPI.dispatch(clearGuestCart());
  thunkAPI.dispatch(setHasMerged());
  return true;
});


export const validateCart = createAsyncThunk(
  'cart/validateCart',
  async (items: GuestCartItemT[]) => {
    console.log('🛠 validateCart — items:', items);
    const response = await axios.post('/api/carts/validate', { items });
    console.log('🛠 validateCart — response:', response.data);
    return response.data; // должно быть: { valid: boolean, updatedItems?: GuestCartItemT[] }
  }
);