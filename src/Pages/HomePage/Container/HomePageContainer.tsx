import HomepageComponent from '@pages/HomePage/component';
import { useAppDispatch, useAppSelector } from '@/store/reduxHook.ts';
import * as homepageSlice from '../slice/slice.ts';

const HomePageContainer = (props: any) => {

  const dispatch = useAppDispatch();

  const customer = useAppSelector((state) => state?.customerData?.payload?.
    results
  );

  const total = useAppSelector((state) => state?.customerData?.payload?.
    total
  );
  const customerLoading = useAppSelector((state) => state?.customerData?.loading);

  props = { ...props, customer, customerLoading,total };


  const getCustomers = (formData: any): any => {
    return dispatch(homepageSlice.getCustomers(formData));
  };




  return <HomepageComponent {...props} getCustomers={getCustomers}  />;
};
export default HomePageContainer;
