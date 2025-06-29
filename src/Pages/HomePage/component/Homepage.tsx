import React, { Fragment, useCallback, useEffect, useState } from 'react';
import DynamicTable from '@/components/Table/Table.tsx';
import { customerColumns } from '@/enums/tableEnums.ts';
import type { CustomerData, PaginationParams } from '@/components/Table/types';

interface Props {
  getCustomers: (params: { skip?: number; take?: number,orderBy?:string|undefined,  orderByDesc?:string|undefined  }) => void;
  customer: CustomerData[];
  customerLoading: boolean;
}

const HomepageComponent: React.FC<Props> = (props) => {
  const { getCustomers, customer, customerLoading } = props;


  const [pagination, setPagination] = useState<PaginationParams>({ skip: 0, take: 10,orderBy: 'contactName',  orderByDesc: undefined });
  useEffect(() => {
    getCustomers(pagination);
  }, []);

  const renderExpandedRow = useCallback((row: CustomerData) => (
    <div>
      <strong>Address:</strong> {row.address}, {row.city}, {row.postalCode}
      <br />
      <strong>ID:</strong> {row.id || '—'}
      <br />
      <strong>Fax:</strong> {row.fax}
    </div>
  ), []);

  const handlePaginationChange = useCallback(
    (params: { skip: number; take: number; orderBy?:string|undefined;  orderByDesc?:string|undefined;  }) => {
      setPagination(params);
      getCustomers(params);
    },
    []
  );

  return (
      <Fragment>
        <DynamicTable
          viewRoutePrefix="/customers"
          renderExpandedRow={renderExpandedRow}
          loading={customerLoading}
          columns={customerColumns}
          data={customer}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
        />
      </Fragment>
  );
};

export default HomepageComponent;
