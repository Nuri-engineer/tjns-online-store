import type { z } from 'zod';
import type { addCartItemSchema, addFormMerge, addToCartSchema, cartItemSchema, cartSchema, cartValidationPayloadSchema, newCartItemSchema, productForCartSchema, updateCartItemPayload, updateCartItemSchema } from './cartSchema';
export type ProductForCartT = z.infer<typeof productForCartSchema>;
export type CartItemT = z.infer<typeof cartItemSchema>;
export type CartT = z.infer<typeof cartSchema>;
export type AddToCartT = z.infer<typeof addToCartSchema>;
export type UpdateCartT = z.infer<typeof updateCartItemPayload>;
export type CartValidationPayload = z.infer<typeof cartValidationPayloadSchema>;
export type NewCartItem = z.infer<typeof newCartItemSchema>;
export type AddCartItemT = z.infer<typeof addCartItemSchema>;
export type UpdateCartItemT = z.infer<typeof updateCartItemSchema>;

export type AddForMergeT = z.infer<typeof addFormMerge>;

export type CartSliceT = {
  cart: CartT | null;
  items: NewCartItem[];
  guestItems: CartItemT[];
  loading: boolean;
  error: string | null;
  hasMerged: boolean;
  cartIsValid: boolean;
};
