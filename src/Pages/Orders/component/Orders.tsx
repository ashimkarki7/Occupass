import React, { Fragment, useCallback, useEffect, useState } from 'react';
import DynamicTable from '@/components/Table/Table.tsx';
import {  orderColumns } from '@/enums/tableEnums.ts';
import type { CustomerData, PaginationParams } from '@/components/Table/types.ts';


interface Props {
  getOrder:(params: { skip?: number; take?: number,orderBy?:string|undefined,  orderByDesc?:string|undefined  }) => void;
  order: CustomerData[];
  orderLoading: boolean;
  total: number;
}

const OrderComponent: React.FC<Props> = (props) => {
  const { getOrder, order, orderLoading,total } = props;

  const [pagination, setPagination] = useState<PaginationParams>({ skip: 0, take: 10,orderBy: 'customerId',  orderByDesc: undefined });

  useEffect(() => {
    getOrder(pagination);
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


  const handlePaginationChange = useCallback(
    (params: { skip: number; take: number; orderBy?:string|undefined;  orderByDesc?:string|undefined;  }) => {
      setPagination(params);
      getOrder(params);
    },
    []
  );


  return (
    <Fragment>
      <div style={{
        margin: '2rem 1.5rem 0'
      }}>
      <DynamicTable
        total={total}
        viewRoutePrefix="/orders"
        renderExpandedRow={renderExpandedRow}
        loading={orderLoading}
        columns={orderColumns}
        data={order}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />
      </div>
    </Fragment>
  );
};

export default OrderComponent;
