import React, { Fragment, useCallback, useEffect, useState } from 'react';
import DynamicTable from '@/components/Table/Table.tsx';
import { customerColumns } from '@/enums/tableEnums.ts';
import type { CustomerData } from '@/components/Table/types';



const HomepageComponent: React.FC<any> = (props: any) => {
  const { getCustomers, customer, customerLoading } = props;


  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    getCustomers();
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

  const handlePrev = useCallback(() => setPage(p => Math.max(p - 1, 1)), []);
  const handleNext = useCallback(() => setPage(p => p + 1), []);


  return (
      <Fragment>
        <DynamicTable
          viewRoutePrefix="/customers"
          renderExpandedRow={renderExpandedRow}
          loading={customerLoading}
          columns={customerColumns}
          data={customer}
          page={page}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </Fragment>
  );
};

export default HomepageComponent;
