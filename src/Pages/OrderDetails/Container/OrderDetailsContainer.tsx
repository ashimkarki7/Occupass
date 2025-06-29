import OrderComponent from '@pages/OrderDetails/component';
import { useAppDispatch, useAppSelector } from '@/store/reduxHook.ts';
import * as orderSlice from '@pages/OrderDetails/slice/slice.ts';


const OrderDetailsContainer = (props: any) => {
  const dispatch = useAppDispatch();

  const order = useAppSelector((state) => state?.orderDetailData?.payload?.results?.[0]
  );
  const orderLoading = useAppSelector((state) => state?.orderDetailData?.loading);



  props = { ...props, order, orderLoading };


  const getOrderDetail = (formData: any): any => {
    return dispatch(orderSlice.getOrderDetail(formData));
  };


  return <OrderComponent {...props}  getOrderDetail={getOrderDetail} />;
};
export default OrderDetailsContainer;
