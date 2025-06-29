import { configureStore } from '@reduxjs/toolkit';
import customerSlice from '@pages/HomePage/slice/slice.ts';

export const store = configureStore({
  reducer: {
    customerData: customerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
