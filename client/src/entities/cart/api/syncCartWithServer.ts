import api from '../../../shared/api/axiosInstance';
import type { AppDispatch } from '../../../app/store';
import { setCartItems } from '../model/cartSlice';
import type { CartItemT } from '../model/cartTypes';
async function syncCartWithServer(items: CartItemT[], dispatch: AppDispatch): Promise<void> {
  if (items.length === 0) return;

  try {
    const productIds = items.map((item) => item.productId);

    const response = await api.get<{ id: number; stock: number; name: string; price: number; images: string[] }[]>(`/products`, {
      params: { ids: productIds },
    });

    const updatedProducts: {
      id: number;
      stock: number;
      name: string;
      price: number;
      images: string[];
    }[] = response.data;

    const updatedItems = items.map((item) => {
      const updatedProduct = updatedProducts.find((p) => p.id === item.productId);

      if (!updatedProduct) {
        return item;
      }

      return {
        ...item,
        quantity: Math.min(item.quantity, updatedProduct.stock),
        product: {
          ...((item.product ?? {}) as {
            id: number;
            name: string;
            price: number;
            stock: number;
            images: string[];
            description: string;
            categoryId: number;
          }),
          name: updatedProduct.name,
          price: updatedProduct.price,
          stock: updatedProduct.stock,
          images: updatedProduct.images,
          description: item.product?.description ?? '',
          categoryId: item.product?.categoryId ?? 0,
        },
      };
    });

    dispatch(setCartItems(updatedItems));
    localStorage.setItem('guestCart', JSON.stringify(updatedItems));
  } catch (error) {
    console.error('Ошибка при синхронизации корзины:', error);
  }
}

export default syncCartWithServer;