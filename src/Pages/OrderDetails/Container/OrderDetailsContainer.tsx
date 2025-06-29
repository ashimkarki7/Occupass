import OrderComponent from '@pages/Orders/component';
import { useAppDispatch, useAppSelector } from '@/store/reduxHook.ts';
import * as orderSlice from '@pages/Orders/slice/slice.ts';


const OrderDetailsContainer = (props: any) => {
  const dispatch = useAppDispatch();

  const order = useAppSelector((state) => state?.orderData?.payload?.
    results
  );
  const orderLoading = useAppSelector((state) => state?.orderData?.loading);

  props = { ...props, order, orderLoading };
  const getOrder = () => {
    return dispatch(orderSlice.getOrder());
  };


  return <OrderComponent {...props}  getOrder={getOrder} />;
};
export default OrderDetailsContainer;
