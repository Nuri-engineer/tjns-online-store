import { useCartActions } from '../../entities/cart/hooks/useCartActions';
import { CartItemCard } from '../../entities/cart/ui/CartItemCard';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { useEffect } from 'react';
import { getCartItems } from '../../entities/cart/model/cartThunks';
import React, { useState } from 'react';

export default function CartPage(): React.JSX.Element {
  const { items, totalPrice, handleAdd, handleRemove, handleDelete } = useCartActions();
  const { loading, error } = useAppSelector((store) => store.cart);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', items);

  useEffect(() => {
    void dispatch(getCartItems());
  }, []);

  if (items.length === 0) {
    return <div>Загрузка...</div>;
  }
  console.log('🧾 Товары для отображения в корзине:', items);

  const handleOrderClick = () => {
  
      setIsModalOpen(true);
    
  };

  const handleSubmit = () => {
    
    const phoneRegex = /^(\+7|8)\d{10}$/;
    
    if (phoneRegex.test(phoneNumber)) {
      setIsSubmitted(true);
    } else {
      alert('Укажите корректный номер телефона (+7XXXXXXXXXX или 8XXXXXXXXXX)');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPhoneNumber('');
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#E6F0FA] font-poppins py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl sm:text-4xl font-bold text-[#1A3C6D] mb-8"
          style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}
        >
          Корзина
        </h1>

        {items.length === 0 ? (
          <div className="bg-[#F1F5F9] text-[#1A3C6D] px-6 py-4 rounded-xl shadow-sm text-center">
            <p className="text-lg">Корзина пуста</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8">
              {items.map((item) => (
                <div key={item.id}>
                  <CartItemCard
                    image={item.product.images[0]}
                    name={item.product.name}
                    price={item.price}
                    quantity={item.quantity}
                    stock={item.product.stock}
                    add={() => handleAdd(item.productId)}
                    remove={() => handleRemove(item.productId)}
                    onDelete={() => handleDelete(item.productId)}
                    isOutOfStock={item.product.stock === 0}
                  />
                  <button
                    onClick={() => navigate(`/products/${String(item.productId)}`)}
                    className="text-[#1A3C6D]  hover:bg-[#D1E3F6] rounded px-2 py-1 transition-all duration-300"
                  >
                    Подробнее
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-end">
              <h4 className="text-xl font-bold text-[#1A3C6D] mb-4">
                Итого: {totalPrice.toLocaleString()} ₽
              </h4>
              
                <button
                  onClick={handleOrderClick}
                  className="bg-gradient-to-r from-[#1A3C6D] to-[#3B5A9A] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:scale-105 transition-all duration-300"
                >
                  Оформить заказ
                </button>
             
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full text-[#1A3C6D]">
            {!isSubmitted ? (
             <>
             <p className="text-lg text-center mb-4">Введите ваш номер телефона</p>
             <input
               type="number"
               value={phoneNumber}
               onChange={(e) => setPhoneNumber(e.target.value)}
               placeholder="+7 (XXX) XXX-XX-XX"
               className="w-full px-4 py-2 rounded-xl bg-[#F1F5F9] text-[#1A3C6D] border-2 border-[#D1E3F6] focus:ring-2 focus:ring-[#1A3C6D]/50 hover:border-[#1A3C6D]/50 transition-all duration-200 mb-4"
             />
             <div className="text-center flex justify-center gap-4"> {/* Добавлены flex и gap-4 */}
               <button
                 onClick={handleSubmit}
                 className="bg-[#1A3C6D] text-white rounded-xl px-4 py-2 hover:bg-[#3B5A9A] transition-all duration-300"
               >
                 Отправить
               </button>
               
               <button
                 onClick={closeModal}
                 className="bg-[#1A3C6D] text-white rounded-xl px-4 py-2 hover:bg-[#3B5A9A] transition-all duration-300"
               >
                 Закрыть
               </button>
             </div>
           </>
            ) : (
              <>
                <p className="text-lg text-center mb-4">
                  Ожидайте звонка, с вами свяжутся наши сотрудники и согласуют время и адрес доставки
                </p>
                <div className="text-center">
                  <button
                    onClick={closeModal}
                    className="bg-[#1A3C6D] text-white rounded-xl px-4 py-2 hover:bg-[#3B5A9A] transition-all duration-300"
                  >
                    Закрыть
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
