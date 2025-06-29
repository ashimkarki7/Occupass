import React, { Fragment, useEffect, useState } from 'react';
import DynamicTable from '@/components/Table/Table.tsx';
import {  orderColumns } from '@/enums/tableEnums.ts';


const OrderComponent: React.FC<any> = (props: any) => {
  const { getOrder, order, orderLoading } = props;


  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    getOrder();
  }, []);



  return (
    <Fragment>
      <DynamicTable
        renderExpandedRow={(row) => (
          <div>
            <strong>Ship Address:</strong> {row.shipAddress}, {row.shipCity}, {row.shipCountry},{row.shipPostalCode}
            <br />
            <strong>Ship Name:</strong> {row.shipName || '—'}
            <br />
            <strong>shipVia:</strong> {row.shipVia}
          </div>
        )}
        loading={orderLoading}
        columns={orderColumns}
        data={order}
        page={page}
        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
        onNext={() => setPage((p) => p + 1)}
      />
    </Fragment>
  );
};

export default OrderComponent;
