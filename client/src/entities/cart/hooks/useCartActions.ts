import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks"
import { deleteCartItem, updateCartItem } from "../model/cartThunks"
import { removeItemLocally, updateGuestItemQuantity } from "../model/cartSlice"

export const useCartActions = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.user)
    const items = useAppSelector((state) => user ? state.cart.items : state.cart.guestItems);

    const handleAdd = (productId: number): void => {
        const item = items.find(i => i.productId === productId);
        const product = item?.product;

        if (!item || !product) return;

        const newQuantity = item.quantity + 1;
        
        if (newQuantity > product.stock) {
            toast.error(`На складе только ${(product.stock).toString()} шт.`);
            return;
        }

        if (user) {
            void dispatch(updateCartItem({
                itemId: item.id,
                updateData: { productId, quantity: newQuantity }
            }))
        } else {
            dispatch(updateGuestItemQuantity({ productId, quantity: newQuantity }))
        }
    };

    

    const handleDelete = (productId: number): void => {
        if (user) {
            void dispatch(deleteCartItem(productId))
        } else {
            dispatch(removeItemLocally(productId))
        }
    };

    const handleRemove = (productId: number): void => {
        const item = items.find(i => i.productId === productId);
        if (!item) return;

        const newQuantity = item.quantity - 1;

        if (newQuantity < 1) {
            handleDelete(productId);
            return;
        }

        if (user) {
            void dispatch(updateCartItem({
                itemId: item.id,
                updateData: { productId, quantity: newQuantity }
            }))
        } else {
            dispatch(updateGuestItemQuantity({ productId, quantity: newQuantity }))
        }
    };

    const totalPrice = items.reduce((sum, item) => {
        const stock = item.product?.stock ?? 0;
        return stock > 0 ? sum + item.price * item.quantity : sum;
      }, 0);

    return {
        items,
        handleAdd,
        handleRemove,
        handleDelete,
        totalPrice,
    }
}
