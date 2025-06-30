import React, { Fragment, useState, memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import styles from './DynamicTable.module.scss';
import Button from '@/components/Button/Button.tsx';
import Loader from '@/components/Loader/Loader.tsx';
import type { DynamicTableProps, PaginationParams } from '@/components/Table/types.ts';
import { formatDate } from '@utility/helper.ts';



const DynamicTable: React.FC<DynamicTableProps> = ({sorting, hasPagination,total,viewRoutePrefix,renderExpandedRow,loading,columns, data, pagination,onPaginationChange }) => {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const handleRowClick = (idx: number) => {
    setExpandedRow(expandedRow === idx ? null : idx);
  };

  const handleSort = (key: string) => {
    const updatedParams: PaginationParams = {
      skip: 0,
      take: pagination.take,
      orderBy: undefined,
      orderByDesc: undefined
    };

    if (pagination?.orderByDesc && key ===  pagination?.orderByDesc ) {
      updatedParams.orderBy = key;
    }else if (pagination?.orderBy && key ===  pagination?.orderBy) {
      updatedParams.orderByDesc = key;
    }else {
      updatedParams.orderBy = key;
    }
    onPaginationChange(updatedParams);
  };


  const handlePrev = useCallback(() => {
    onPaginationChange({
      skip: Math.max(pagination?.skip - pagination?.take, 0),
      take: pagination?.take
    });
  }, [pagination, onPaginationChange]);

  const handleNext = useCallback(() => {
    onPaginationChange({
      skip: pagination?.skip + pagination?.take,
      take: pagination?.take
    });
  }, [pagination, onPaginationChange]);


  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.customerTable}>
          <thead>
          <tr>
            {columns?.map((col) => (
              <th key={col.key}>{col.label}  <span id={`sortkey${col.key}`} className={styles.sortIcon} onClick={() => sorting && (handleSort(col.key))}>
                {sorting && (
                  <Fragment>
                    {pagination?.orderBy !== col.key &&  pagination?.orderByDesc !== col.key
                      ? (  <FaSortUp
                        className={
                          styles.inactiveSortIcon
                        }
                      />) : pagination.orderBy === col.key ? (
                        <FaSortUp  className={styles?.activeSortIcon} />
                      ) : (
                        <FaSortDown
                          className={styles.activeSortIcon
                          }/>
                      )}
                  </Fragment>
                )}

                  </span></th>

            ))}
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {loading ? (
            <tr key="loading-row">
              <td colSpan={columns.length + 1}>
                <Loader minHeight="340px" />
              </td>
            </tr>
          ) : (
            data?.map((row, idx) => (
              <Fragment  key={row?.id ?? idx}>
                <tr key={idx}  onClick={() => handleRowClick(idx)}>
                  {columns?.map((col) => (
                    <td key={col?.key}>{row[col?.key] && col?.type  === 'date' ?  formatDate(row[col?.key] as string) : row[col?.key]}</td>
                  ))}
                  <td>
                    <Button
                      title={'VIEW'}
                      onClickHandler={() => {
                        navigate(`${viewRoutePrefix}/${row?.id}`, {
                          state: { customerData: row }
                        });
                      }}
                      className={` ${styles.viewDetails}`}
                    />
                  </td>
                </tr>
                {expandedRow === idx  && renderExpandedRow && (
                  <tr>
                    <td colSpan={columns.length + 1}>{renderExpandedRow(row)}</td>
                  </tr>
                )}
              </Fragment>

            ))
          )}
          </tbody>
        </table>
      </div>
      {hasPagination && (
        <div className={styles.pagination}>
          <button onClick={handlePrev} disabled={pagination.skip === 0}>Prev</button>
          <span>Page {Math.floor(pagination.skip / pagination.take) + 1}
            {total ? ` of ${Math.ceil(total / pagination.take)}` : ''}
        </span>
          <button onClick={handleNext} disabled={Math.floor(pagination.skip / pagination.take) + 1 ===  Math.ceil(total / pagination.take) -1}>Next</button>
        </div>
      )}

    </>
  );
};

export default memo(DynamicTable);
