import CustomerDetailComponent from '@pages/CustomerDetails/component';
import { useAppDispatch, useAppSelector } from '@/store/reduxHook.ts';
import * as detailSlice from '../slice/slice.ts';
import type { IObjectLiteral } from '@common/types.ts';

const CustomerDetailsContainer = (props: any) => {

  const dispatch = useAppDispatch();

  const customer = useAppSelector((state) => state?.customerDetail?.payload?.customer
  );
  const orders = useAppSelector((state) => state?.customerDetail?.payload?.orders?.map((res:IObjectLiteral)=>{
    return {...res?.order,...res?.orderDetails};
    })
  );

  const customerLoading = useAppSelector((state) => state?.customerDetail?.loading);

  props = { ...props, customer, customerLoading,orders };
  const getCustomerDetails = (formData:any) => {
    return dispatch(detailSlice.getCustomerDetails(formData));
  };


  return <CustomerDetailComponent {...props} getCustomerDetails={getCustomerDetails}  />;
};
export default CustomerDetailsContainer;
