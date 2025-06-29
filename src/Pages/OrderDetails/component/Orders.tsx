import React, { Fragment, useCallback, useEffect, useState } from 'react';
import DynamicTable from '@/components/Table/Table.tsx';
import {  orderColumns } from '@/enums/tableEnums.ts';
import type { CustomerData } from '@/components/Table/types.ts';


const OrderComponent: React.FC<any> = (props: any) => {
  const { getOrder, order, orderLoading } = props;


  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    getOrder();
  }, []);


  const renderExpandedRow = useCallback((row: CustomerData) => (
    <div>
      <strong>Ship Address:</strong> {row.shipAddress}, {row.shipCity}, {row.shipCountry},{row.shipPostalCode}
      <br />
      <strong>Ship Name:</strong> {row.shipName || '—'}
      <br />
      <strong>shipVia:</strong> {row.shipVia}
    </div>
  ), []);

  const handlePrev = useCallback(() => setPage(p => Math.max(p - 1, 1)), []);
  const handleNext = useCallback(() => setPage(p => p + 1), []);



  return (
    <Fragment>
      <DynamicTable
        viewRoutePrefix="/orders"
        renderExpandedRow={renderExpandedRow}
        loading={orderLoading}
        columns={orderColumns}
        data={order}
        page={page}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </Fragment>
  );
};

export default OrderComponent;
