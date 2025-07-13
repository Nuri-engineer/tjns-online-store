import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductsService from '../api/ProductsService';
import type { NewProductT, ProductSendT, ProductT } from './types';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async ({ page, limit }: ProductSendT) => await ProductsService.getProducts(page, limit),
);

export const getById = createAsyncThunk(
  'products/getById',
  async ({ id, page, limit }: { id: number; page: number; limit: number }) =>
    await ProductsService.getProductsById(id, page, limit),
);

export const getOneProduct = createAsyncThunk(
  'products/getOneProduct',
  async (id: ProductT['id']) => ProductsService.getOneProduct(id),
);

export const deleteById = createAsyncThunk(
  'products/deleteById',
  async (id: number): Promise<ProductT['id']> => {
    await ProductsService.deleteById(id);
    return id;
  },
);

export const create = createAsyncThunk('products/create', (product: NewProductT) =>
  ProductsService.create(product),
);

export const update = createAsyncThunk('products/update', (product: ProductT) =>
  ProductsService.update(product),
);
