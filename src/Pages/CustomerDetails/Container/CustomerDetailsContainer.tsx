import HomepageComponent from '@pages/HomePage/component';
import { useAppDispatch, useAppSelector } from '@/store/reduxHook.ts';
import * as homepageSlice from '../slice/slice.ts';

const CustomerDetailsContainer = (props: any) => {

  const dispatch = useAppDispatch();

  const customer = useAppSelector((state) => state?.customerData?.payload?.
    results
  );
  const customerLoading = useAppSelector((state) => state?.customerData?.loading);

  props = { ...props, customer, customerLoading };
  const getCustomers = () => {
    return dispatch(homepageSlice.getCustomers());
  };


  return <HomepageComponent {...props} getCustomers={getCustomers}  />;
};
export default CustomerDetailsContainer;
