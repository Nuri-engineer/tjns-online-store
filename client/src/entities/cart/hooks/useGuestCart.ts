import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks'
import { addItemLocally, removeItemLocally, updateItemLocally } from '../model/cartSlice';

type UseGuestCartReturn = {
    quantity: number
    add: () => void
    remove: () => void
}

function useGuestCart(productId: number, stock: number, price: number): UseGuestCartReturn {
    const dispatch = useAppDispatch()
    const items = useAppSelector((state) => state.cart.items);

    const item = items.find((i) => i.productId === productId);

    const add = (): void => {
        if (!item) {
            dispatch(addItemLocally({ productId, quantity: 1, price, stock })); // Новый товар с stock
        } else if (item.quantity < (item.product?.stock ?? stock)) {
            dispatch(updateItemLocally({ productId, quantity: item.quantity + 1 })); // Увеличиваем существующий
        }
    }

    const remove = (): void => {
        if (item) {
            if (item.quantity === 1) {
                dispatch(removeItemLocally(productId));
            } else {
                dispatch(updateItemLocally({ productId, quantity: item.quantity - 1 }));
            }
        }
    }

  return {
    quantity: item?.quantity ?? 0,
    add,
    remove,
  }
}

export default useGuestCart