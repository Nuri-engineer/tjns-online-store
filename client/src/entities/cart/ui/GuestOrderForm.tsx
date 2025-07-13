import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { clearGuestCart } from '../model/cartSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { guestOrderSchema } from '../model/cartSchema';

export function GuestOrderForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const guestItems = useAppSelector((state) => state.cart.guestItems);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        items: guestItems.map(({ productId, quantity, price }) => ({ productId, quantity, price })),
      };

      guestOrderSchema.parse(payload);

      const response = await axios.post('/api/orders/guest', payload);
      if (response.status === 201) {
        toast.success('Заказ успешно оформлен!');
        dispatch(clearGuestCart());
      }
    } catch (error) {
      console.error(error);
      toast.error('Не удалось оформить заказ');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border p-4 rounded">
      <h4>Оформление заказа</h4>

      <input
        type="text"
        name="name"
        placeholder="Имя"
        value={form.name}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Телефон"
        value={form.phone}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Адрес"
        value={form.address}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        name="city"
        placeholder="Город"
        value={form.city}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Почтовый индекс"
        value={form.postalCode}
        onChange={handleChange}
        className="form-control mb-3"
        required
      />

      <button type="submit" className="btn btn-success">
        Подтвердить заказ
      </button>
    </form>
  );
}