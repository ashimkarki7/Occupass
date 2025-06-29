import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v2Fetch } from '@/utility/httpUtil.ts';


const initialState: any = {
  payload: [],
  error: '',
  loading: true,
};
export const getOrder = createAsyncThunk(
  'orderSlice/fetch',
  (formData:any, { rejectWithValue }) => {
    let queryParams = '';
    Object.keys(formData).forEach((key) => {
      switch (key) {
        case 'skip': {
          if (formData[key] || formData[key] === 0) queryParams += `skip=${encodeURIComponent(formData[key])}`;
          break;
        }
        case 'take': {
          if (formData[key] || formData[key] === 0)
            queryParams += `&take=${encodeURIComponent(formData[key])}`;
          break;
        }
        case 'orderBy': {
          if (formData[key] && formData[key] !== undefined )
            queryParams += `&orderBy=${encodeURIComponent(formData[key])}`;
          break;
        }
        case 'orderByDesc': {
          if (formData[key] || formData[key] !== undefined )
            queryParams += `&orderByDesc=${encodeURIComponent(formData[key])}`;
          break;
        }
      }
    });
    return v2Fetch(`query/orders?${queryParams}&Include=total`)
      .then((response: any) => {
        if (response.status === 200) {
          return Promise.resolve(response?.data);
        }
      })
      .catch((error: any) => {
        const errorThrown = JSON.parse(error);
        return rejectWithValue(errorThrown?.message);
      });
  }
);

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    cleanOrderData(state) {
      state.loading = false;
      state.payload = [];
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrder.pending, (state) => {
      state.loading = true;
      state.error = '';
      state.payload = [];
    });

    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.payload = action.payload;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.loading = false;
      state.payload = [];
      state.error = action.payload?.toString();
    });
  },
});

export const { cleanOrderData } = orderSlice.actions;
export default orderSlice.reducer;
