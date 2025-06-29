import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v2Fetch } from '@/utility/httpUtil.ts';


const initialState: any = {
  payload: [],
  error: '',
  loading: true,
};
export const getCustomerDetails = createAsyncThunk(
  'customerDetailSlice/fetch',
  (formData: any, { rejectWithValue }) => {
    let queryParams = '';
    Object.keys(formData).forEach((key) => {
      switch (key) {
        case 'id': {
          if (formData[key]) queryParams += `id=${formData[key]}`;
          break;
        }
        case 'name': {
          if (formData[key])
            queryParams += `&name=${encodeURIComponent(formData[key])}`;
          break;
        }
      }
    });
    return v2Fetch(`api/GetCustomerDetails?${queryParams}`)
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

const customerDetailSlice = createSlice({
  name: 'customerDetailSlice',
  initialState,
  reducers: {
    cleanCustomerDetailData(state) {
      state.loading = false;
      state.payload = [];
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomerDetails.pending, (state) => {
      state.loading = true;
      state.error = '';
      state.payload = [];
    });

    builder.addCase(getCustomerDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.payload = action.payload;
    });
    builder.addCase(getCustomerDetails.rejected, (state, action) => {
      state.loading = false;
      state.payload = [];
      state.error = action.payload?.toString();
    });
  },
});

export const { cleanCustomerDetailData } = customerDetailSlice.actions;
export default customerDetailSlice.reducer;
