import React, { Fragment, useCallback, useEffect, useState } from 'react';
import styles from './Order.module.scss';
import DetailCard from '@common/DetailCard';
import { useNavigate,useLocation } from 'react-router';
import { formatDate } from '@utility/helper.ts';
import DynamicTable from '@/components/Table/Table.tsx';
import { orderDetailColumns } from '@/enums/tableEnums.ts';
import type { PaginationParams } from '@/components/Table/types.ts';



const OrderDetail: React.FC<any> = (props: any) => {
  const { getOrderDetail, order } = props;
  const location = useLocation();
  const customerData = location.state?.customerData;
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<PaginationParams>({ skip: 0, take: 10,orderBy: 'contactName',  orderByDesc: undefined });

  useEffect(() => {
    getOrderDetail({id:customerData?.customerId});
  }, []);

  const handlePaginationChange = useCallback(
    (params: { skip: number; take: number; orderBy?:string|undefined;  orderByDesc?:string|undefined;  }) => {
      setPagination(params);
    },
    []
  );


  return (
    <Fragment>
      <div className={styles.wrapper}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>&larr; Back to Orders</button>

        <h1 className={styles.customerName}>Order ID: {order?.id}</h1>

        <div className={styles.infoSection}>
          <div className={styles.detailBox}>
            <DetailCard
              styles={styles}
              title="Order Information"
              fields={[
                { label: 'customerId', value: order?.order?.customerId },
                { label: 'shipVia', value:  order?.order?.shipVia },
                { label: 'Address', value: `${ order?.order?.shipAddress}, ${ order?.order?.shipCity},${order?.shipCountry}, ${ order?.order?.shipPostalCode}` },
                { label: 'Order Date', value: formatDate(order?.orderDate) },
                { label: 'Required Date', value: formatDate( order?.order?.requiredDate) },
              ]}
            />
          </div>
        </div>

        <div className={styles.orderSection}>
          <h2>Orders</h2>
          <DynamicTable
            sorting={false}
            hasPagination={false}
            total={80}
            columns={orderDetailColumns}
            data={order?.orderDetails}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            loading={false}
            viewRoutePrefix={`/orders`}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetail;
