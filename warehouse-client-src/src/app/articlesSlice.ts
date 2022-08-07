import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ArticleDto, patchArticles } from '../apis/warehouseApi';
import { RequestState } from '../helpers/RequestState';

export const updateArticles = createAsyncThunk('articles/update', async (articles: ArticleDto[]) => {
  await patchArticles(articles);
});

export interface ArticlesState {
  requestState: string;
}

const initialState: ArticlesState = {
  requestState: RequestState.NotRequested,
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateArticles.pending, (state) => {
      state.requestState = RequestState.InProgress;
    });
    builder.addCase(updateArticles.fulfilled, (state) => {
      state.requestState = RequestState.Finished;
    });
    builder.addCase(updateArticles.rejected, (state) => {
      state.requestState = RequestState.Failed;
    });
  },
});
