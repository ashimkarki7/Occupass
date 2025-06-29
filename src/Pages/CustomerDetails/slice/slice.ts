import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v2Fetch } from '@/utility/httpUtil.ts';


const initialState: any = {
  payload: [],
  error: '',
  loading: true,
};
export const getCustomers = createAsyncThunk(
  'customerSlice/fetch',
  (_, { rejectWithValue }) => {
    return v2Fetch(`query/customers`)
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

const customerSlice = createSlice({
  name: 'customerSlice',
  initialState,
  reducers: {
    cleanCustomerData(state) {
      state.loading = false;
      state.payload = [];
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomers.pending, (state) => {
      state.loading = true;
      state.error = '';
      state.payload = [];
    });

    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.payload = action.payload;
    });
    builder.addCase(getCustomers.rejected, (state, action) => {
      state.loading = false;
      state.payload = [];
      state.error = action.payload?.toString();
    });
  },
});

export const { cleanCustomerData } = customerSlice.actions;
export default customerSlice.reducer;
