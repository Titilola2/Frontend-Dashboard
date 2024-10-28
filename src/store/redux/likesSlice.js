// src/redux/likeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMostLikedData = createAsyncThunk(
  'like/fetchMostLikedData',
  async (platform) => {
    const response = await fetch(`https://influencers-o6yr.onrender.com/stats/most-like?platform=${platform}`);
    if (!response.ok) throw new Error('Failed to fetch most liked data');
    const data = await response.json();
    return data;
  }
);

const initialState = {
  mostLikedData: [],
  loading: false,
  error: null,
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMostLikedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMostLikedData.fulfilled, (state, action) => {
        state.loading = false;
        state.mostLikedData = action.payload;
      })
      .addCase(fetchMostLikedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default likeSlice.reducer;
