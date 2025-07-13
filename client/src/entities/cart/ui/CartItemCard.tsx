
import { useNavigate } from 'react-router';

type CartItemCardProps = {
  image: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  add: () => void;
  remove: () => void;
  onDelete: () => void;
  isOutOfStock?: boolean;
};

export function CartItemCard({
 
  image,
  name,
  price,
  quantity,
  stock,
  add,
  remove,
  onDelete,
  isOutOfStock = false,
}: CartItemCardProps): React.JSX.Element {
  console.log('Рендер CartItemCard:', {
    name,
    quantity,
    stock,
    isOutOfStock,
  });
  const totalItemPrice = price * quantity;
  const isMaxReached = quantity >= stock;

  return (
    <div className="bg-white shadow-md rounded-xl p-3 transition-all duration-300">
      <div className="flex gap-4">
        <div className="w-40 h-40 overflow-hidden bg-white shadow-sm rounded-lg">
          <img
            src={image}
            className="h-full w-full object-contain p-3"
            alt={name}
          />
        </div>

        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-[#1A3C6D] truncate">
              {name}
            </h3>
            {isOutOfStock ? (
              <p className="text-xs text-[#EF4444]">Нет в наличии</p>
            ) : (
              <>
                <p className="text-sm text-[#1A3C6D]">
                  {price.toLocaleString()} ₽ × {quantity} шт. = <span className="font-bold">{totalItemPrice.toLocaleString()} ₽</span>
                </p>
                {isMaxReached && (
                  <p className="text-xs text-[#EF4444]">Максимум на складе</p>
                )}
              </>
            )}
          </div>

          <div className="flex gap-2 items-center mt-2 flex-wrap">
            <button
              className="text-[#1A3C6D] border border-[#1A3C6D] hover:bg-[#D1E3F6] rounded px-2 py-1 transition-all duration-300"
              onClick={remove}
              disabled={isOutOfStock || quantity <= 0}
            >
              -
            </button>
            <span className="text-sm text-[#1A3C6D]">{quantity}</span>
            <button
              className="text-[#1A3C6D] border border-[#1A3C6D] hover:bg-[#D1E3F6] rounded px-2 py-1 transition-all duration-300"
              onClick={add}
              disabled={isOutOfStock || isMaxReached}
            >
              +
            </button>
           
            <button
              className="text-[#EF4444] border border-[#EF4444] hover:bg-[#FEE2E2] rounded px-2 py-1 transition-all duration-300"
              onClick={onDelete}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}