import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v2Fetch } from '@/utility/httpUtil.ts';


const initialState: any = {
  payload: [],
  error: '',
  loading: true,
};
export const getOrderDetail = createAsyncThunk(
  'orderDetailSlice/fetch',
  (formData:any, { rejectWithValue }) => {
    let queryParams = '';
    Object.keys(formData).forEach((key) => {
      switch (key) {
        case 'id': {
          if (formData[key]) queryParams += `customerId=${formData[key]}`;
          break;
        }
      }
    });
    return v2Fetch(`api/GetOrders?${queryParams}`)
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

const orderDetailSlice = createSlice({
  name: 'orderDetailSlice',
  initialState,
  reducers: {
    cleanOrderDetailData(state) {
      state.loading = false;
      state.payload = [];
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderDetail.pending, (state) => {
      state.loading = true;
      state.error = '';
      state.payload = [];
    });

    builder.addCase(getOrderDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.payload = action.payload;
    });
    builder.addCase(getOrderDetail.rejected, (state, action) => {
      state.loading = false;
      state.payload = [];
      state.error = action.payload?.toString();
    });
  },
});

export const { cleanOrderDetailData } = orderDetailSlice.actions;
export default orderDetailSlice.reducer;
