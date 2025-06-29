import React, { Fragment, useEffect, useState } from 'react';
import DynamicTable from '@/components/Table/Table.tsx';
import { customerColumns } from '@/enums/tableEnums.ts';



const HomepageComponent: React.FC<any> = (props: any) => {
  const { getCustomers, customer, customerLoading } = props;


  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    getCustomers();
  }, []);

  return (
      <Fragment>
        <DynamicTable
          renderExpandedRow={(row) => (
            <div>
              <strong>Address:</strong> {row.address}, {row.city}, {row.postalCode}
              <br />
              <strong>ID:</strong> {row.id || '—'}
              <br />
              <strong>Fax:</strong> {row.fax}
            </div>
          )}
          loading={customerLoading}
          columns={customerColumns}
          data={customer}
          page={page}
          onPrev={() => setPage((p) => Math.max(p - 1, 1))}
          onNext={() => setPage((p) => p + 1)}
        />
      </Fragment>
  );
};

export default HomepageComponent;
