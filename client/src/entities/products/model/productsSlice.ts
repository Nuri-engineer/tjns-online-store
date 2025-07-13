import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ProductSliceT } from './types';
import { create, deleteById, getById, getOneProduct, getProducts, update } from './productThunk';

const initialState: ProductSliceT = {
  products: [],
  loading: false,
  product: null,
  productsByCategory: null,
  productsTodisplay: [],
  sortBy: 'price',
  sortOrder: 1,
  searchProducts: '',
  pagination: null,
  categoryPagination: null,
};

export const companySlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<'price' | 'name' | 'averageRating'>) => {
      state.sortBy = action.payload;
      state.products.sort((a, b) => {
        const valueA = a[action.payload];
        const valueB = b[action.payload];

        if (typeof valueA === 'number' && typeof valueB === 'number')
          return (valueA - valueB) * state.sortOrder;
        if (typeof valueA === 'string' && typeof valueB === 'string')
          return valueA.localeCompare(valueB) * state.sortOrder;
        return 0;
      });

      if (state.productsByCategory) {
        state.productsByCategory.sort((a, b) => {
          const valueA = a[action.payload];
          const valueB = b[action.payload];

          if (typeof valueA === 'number' && typeof valueB === 'number')
            return (valueA - valueB) * state.sortOrder;
          if (typeof valueA === 'string' && typeof valueB === 'string')
            return valueA.localeCompare(valueB) * state.sortOrder;
          return 0;
        });
      }
    },
    reverseSortOrder: (state) => {
      state.sortOrder *= -1;
      state.products.reverse();
      if (state.productsByCategory) {
        state.productsByCategory.reverse();
      }
    },

    // searchProducts
    setSearchProducts: (state, action: PayloadAction<ProductSliceT['searchProducts']>) => {
      state.searchProducts = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Все продукты
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      console.error(action.error);
    });
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });

    // Продукт по id
    builder.addCase(getOneProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getOneProduct.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      console.error(action.error);
    });
    builder.addCase(getOneProduct.pending, (state) => {
      state.loading = true;
      state.product = null;
    });

    // По id категории
    builder.addCase(getById.fulfilled, (state, action) => {
      state.loading = false;
      state.productsByCategory = action.payload.products;
      state.categoryPagination = action.payload.pagination;
    });
    builder.addCase(getById.rejected, (state, action) => {
      state.loading = false;
      state.productsByCategory = null;
      console.error(action.error);
    });
    builder.addCase(getById.pending, (state) => {
      state.loading = true;
    });

    // удаление
    builder.addCase(deleteById.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter((product) => product.id !== action.payload);
    });
    builder.addCase(deleteById.rejected, (state, action) => {
      state.loading = false;
      console.error(action.error);
    });
    builder.addCase(deleteById.pending, (state) => {
      state.loading = true;
    });

    // добавление
    builder.addCase(create.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    });
    builder.addCase(create.rejected, (state, action) => {
      state.loading = false;
      console.error(action.error);
    });
    builder.addCase(create.pending, (state) => {
      state.loading = true;
    });

    // изменение
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product,
      );
    });
    builder.addCase(update.rejected, (state, action) => {
      state.loading = false;
      console.error(action.error);
    });
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
  },
});

// Action creators are generated for each case reducer function

export const { setSortBy, reverseSortOrder, setSearchProducts, setRating, setCurrentPage } =
  companySlice.actions;


export default companySlice.reducer;
