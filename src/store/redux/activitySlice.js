

// src/redux/apiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



// Initial state
const initialState = {
  data: [],
  loading: false,
  error: null,
};





// src/redux/apiSlice.js
export const fetchData = createAsyncThunk('api/fetchData', async () => {
    const response = await fetch('https://influencers-o6yr.onrender.com/stats/new-dashboard');
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    //console.log('Fetched data:', data); // Check the structure here
    return data;
  });
  

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
     
  },

});

export default activitySlice.reducer;



