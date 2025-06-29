import { configureStore } from '@reduxjs/toolkit';
import customerSlice from '@pages/HomePage/slice/slice.ts';
import orderSlice from '@pages/Orders/slice/slice.ts';
import customerDetailSlice from '@pages/CustomerDetails/slice/slice.ts';
import orderDetailSlice from '@pages/OrderDetails/slice/slice.ts';

export const store = configureStore({
  reducer: {
    customerData: customerSlice,
    customerDetail:customerDetailSlice,
    orderDetailData:orderDetailSlice,
    orderData :orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
