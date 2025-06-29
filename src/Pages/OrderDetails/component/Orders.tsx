import React, { Fragment, useEffect } from 'react';
import styles from './Order.module.scss';
import DetailCard from '@common/DetailCard';
import { useParams,useNavigate } from 'react-router';
import { formatDate } from '@utility/helper.ts';



const OrderDetail: React.FC<any> = (props: any) => {
  const { getOrderDetail, order } = props;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    getOrderDetail({id:id});
  }, []);



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
                { label: 'customerId', value: order?.customerId },
                { label: 'shipVia', value: order?.shipVia },
                { label: 'Address', value: `${order?.shipAddress}, ${order?.shipCity},${order?.shipCountry}, ${order?.shipPostalCode}` },
                { label: 'Order Date', value: formatDate(order?.orderDate) },
                { label: 'Required Date', value: formatDate(order?.requiredDate) },
              ]}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetail;
