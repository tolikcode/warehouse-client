import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getProducts, patchProducts, postProductSell, UpdateProductDto } from '../apis/warehouseApi';
import { RequestState } from '../helpers/RequestState';

export const defaultPageSize = 10;

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const products = await getProducts();
  return products;
});

export const sellProduct = createAsyncThunk('products/sell', async (productId: string) => {
  postProductSell(productId);
});

export const updateProducts = createAsyncThunk('products/update', async (productUpdates: UpdateProductDto[]) => {
  await patchProducts(productUpdates);
});

export interface ProductsState {
  requestState: string;
  saleRequestState: string;
  payload: any;
}

const initialState: ProductsState = {
  requestState: RequestState.NotRequested,
  saleRequestState: RequestState.NotRequested,
  payload: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(fetchProducts.pending, sellProduct.pending, updateProducts.pending), (state) => {
      state.requestState = RequestState.InProgress;
    });
    builder.addMatcher(
      isAnyOf(fetchProducts.fulfilled, sellProduct.fulfilled, updateProducts.fulfilled),
      (state, action) => {
        if (action.payload) {
          state.payload = action.payload;
        }
        state.requestState = RequestState.Finished;
      }
    );
    builder.addMatcher(isAnyOf(fetchProducts.rejected, sellProduct.rejected, updateProducts.rejected), (state) => {
      state.requestState = RequestState.Failed;
    });
  },
});
