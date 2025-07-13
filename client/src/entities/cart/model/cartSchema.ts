import { number, z } from 'zod';

export const productForCartSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  price: z.number(),
  brand: z.string(),
  stock: z.number(),
  categoryId: z.number(),
});

export const cartItemSchema = z.object({
  id: z.number(),
  cartId: z.number(),
  productId: z.number(),
  quantity: z.number(),
  price: z.number(),
  product: productForCartSchema,
});

export const cartSchema = z.object({
  id: z.number(),
  userId: z.number(),
  cartItems: z.array(cartItemSchema),
});

export const addToCartSchema = z.object({
  productId: z.number(),
  price: z.number(),
});

export const newCartItemSchema = z.object({
  id: number(),
  cartId: z.number(),
  productId: z.number(),
  quantity: z.number(),
  price: z.number(),
});

export const updateCartItemPayload = z.object({
  productId: z.number(),
  quantity: z.number(),
});

export const cartValidationItemSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  price: z.number(),
});

export const cartValidationPayloadSchema = z.object({
  userId: z.number().optional(),
  items: z.array(cartValidationItemSchema),
});

export const guestOrderSchema = z.object({
  name: z.string().min(2, 'Введите имя'),
  email: z.string().email('Некорректный email'),
  phone: z.string().min(5, 'Введите номер телефона'),
  address: z.string().min(5, 'Введите адрес'),
  city: z.string().min(2, 'Введите город'),
  postalCode: z.string().min(4, 'Введите почтовый индекс'),
  items: z
    .array(
      z.object({
        productId: z.number(),
        price: z.number(),
        quantity: z.number(),
      }),
    )
    .min(1, 'Корзина пуста'),
});

export const addCartItemSchema = z.object({
  id: z.number(),
  cartId: z.number(),
  productId: z.number(),
  quantity: z.number(),
  price: z.number(),
  product: productForCartSchema,
});

export const updateCartItemSchema = z.object({
    id: z.number(),
    cartId: z.number(),
    productId: z.number(),
    quantity: z.number(),
    price: z.number(),
  });

export const addFormMerge = z.object({
    price: z.number(),
    productId: z.number(),
    quantity: z.number(),
})