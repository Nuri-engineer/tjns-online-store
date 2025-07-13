import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { refreshUser } from '../../entities/user/model/userThunks';
import MainPage from '../../pages/Main/MainPage';
import CreatePage from '../../pages/CreatePage/CreatePage';
import UpdatePage from '../../pages/UpdatePage/UpdatePage';
import CategoryPage from '../../pages/CategoryPage/CategoryPage';
import CategoryUpdate from '../../features/categoryOptions/categoryUpdate/ui/CategoryUpdate';
import CategoryCreate from '../../features/categoryOptions/categoryCreate/ui/CategoryCreate';
import SignupPage from '../../pages/Signup/SignupPage';
import LoginPage from '../../pages/Login/LoginPage';
import Layout from '../../pages/Layout/Layout';
import OneProductPage from '../../pages/OneProductPage/OneProductPage';
import FilteredCardList from '../../features/FilteredCardList/FilteredCardList';
import CartPage from '../../pages/CartPage/CartPage';
import SuperAdminPage from '../../pages/SuperAdminPage/SuperAdminPage';
import ProtectedRoute from '../../shared/ui/ProtectedRoute';
import { initGuestId } from '../../entities/user/model/userSlice';
import ChatPage from '../../pages/ChatPage/ChatPage';

import { AdminChatList } from '../../pages/AdminChatList/AdminChatList';
import AdminChatPage from '../../pages/AdminChatPage/AdminChatPage';
import { loadGuestCart } from '../../entities/cart/model/cartSlice';
import { getCart, getCartItems, mergeGuestCart } from '../../entities/cart/model/cartThunks';

import FavoritePage from '../../pages/FavoritePage/FavoritePage';

function RouterProvider(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { user, isRefreshLoading } = useAppSelector((state) => state.user);
  const guestItems = useAppSelector((state) => state.cart.guestItems);

  useEffect(() => {
    void dispatch(refreshUser());
    void dispatch(initGuestId());
  }, [dispatch]);

  useEffect(() => {
    if (isRefreshLoading) return;
    if (!user) {
      dispatch(loadGuestCart());
    } else {
      void dispatch(getCart()).unwrap()
      .then(() => dispatch(getCartItems()).unwrap())
      .then(() => {
        if (guestItems.length > 0) {
          return dispatch(mergeGuestCart()).unwrap(); 
        }
      })
      .then(() => {
        console.log('Все операции с корзиной завершены');
      })
      .catch((err) => {
        console.error('Ошибка при работе с корзиной:', err);
      });
  }
}, [dispatch, isRefreshLoading, user, guestItems.length]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/products/:id" element={<OneProductPage />} />
        <Route path="categories/:id" element={<FilteredCardList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/favorites" element={<FavoritePage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/products/create" element={<CreatePage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/admin" element={<SuperAdminPage />} />
          <Route path="/categories/create" element={<CategoryCreate />} />
          <Route path="/categories/:id/edit" element={<CategoryUpdate />} />
          <Route path="/products/edit/:id" element={<UpdatePage />} />
          <Route path="/admin/chat" element={<AdminChatList />} />
          <Route path="/admin/chat/:chatId" element={<AdminChatPage />} />
        </Route>

        <Route path="*" element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default RouterProvider;
