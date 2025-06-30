import React, { Fragment, useCallback, useEffect, useState } from 'react';
import styles from './CustomerDetail.module.scss';

import DetailCard from '@common/DetailCard';
import { useParams,useNavigate } from 'react-router';
import DynamicTable from '@/components/Table/Table.tsx';
import { orderColumns } from '@/enums/tableEnums.ts';
import type { PaginationParams } from '@/components/Table/types.ts';



const CustomerDetail: React.FC<any> = (props: any) => {
  const { getCustomerDetails, customer,orders } = props;
  const { id } = useParams<{ id: string }>();
  const [pagination, setPagination] = useState<PaginationParams>({ skip: 0, take: 10,orderBy: 'contactName',  orderByDesc: undefined });

  const navigate = useNavigate();
  useEffect(() => {
    getCustomerDetails({id:id});
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
          <button className={styles.backBtn} onClick={() => navigate(-1)}>&larr; Back to Customers</button>

          <h1 className={styles.customerName}>{customer?.companyName}</h1>

          <div className={styles.infoSection}>
            <div className={styles.detailBox}>
              <DetailCard
                styles={styles}
                title={`Customer Information`}
                fields={[
                  { label: 'Contact Name', value: customer?.contactName },
                  { label: 'Phone', value: customer?.phone },
                  { label: 'Address', value: `${customer?.address}, ${customer?.city}, ${customer?.country}` },
                  { label: 'Postal Code', value: customer?.postalCode },
                  { label: 'Fax', value: customer?.fax },
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
              columns={orderColumns}
              data={orders}
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

export default CustomerDetail;
