import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { articlesSlice } from './articlesSlice';
import { productSlice } from './productsSlice';

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    articles: articlesSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
