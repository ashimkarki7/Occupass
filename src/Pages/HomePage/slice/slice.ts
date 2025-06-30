import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v2Fetch } from '@/utility/httpUtil.ts';


const initialState: any = {
  payload: [],
  error: '',
  loading: true,
};
export const getCustomers = createAsyncThunk(
  'customerSlice/fetch',
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
    return v2Fetch(`api/QueryCustomers?${queryParams}&Include=total`)
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
