import OrderComponent from '@pages/Orders/component';
import { useAppDispatch, useAppSelector } from '@/store/reduxHook.ts';
import * as orderSlice from '@pages/Orders/slice/slice.ts';


const OrderContainer = (props: any) => {
  const dispatch = useAppDispatch();

  const order = useAppSelector((state) => state?.orderData?.payload?.
    results
  );
  const orderLoading = useAppSelector((state) => state?.orderData?.loading);

  const total = useAppSelector((state) => state?.orderData?.payload?.
    total
  );
  props = { ...props, order, orderLoading,total };
  const getOrder = (formData: any): any => {
    return dispatch(orderSlice.getOrder(formData));
  };


  return <OrderComponent {...props}  getOrder={getOrder} />;
};
export default OrderContainer;
