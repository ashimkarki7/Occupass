import React, { Fragment, useState, memo } from 'react';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import styles from './DynamicTable.module.scss';
import Button from '@/components/Button/Button.tsx';
import Loader from '@/components/Loader/Loader.tsx';
import type { DynamicTableProps, TableState } from '@/components/Table/types.ts';



const DynamicTable: React.FC<DynamicTableProps> = ({ viewRoutePrefix,renderExpandedRow,loading,columns, data, page, onPrev, onNext }) => {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [tableState, setTableState] = useState<TableState>({
    sortKey: 'contactName',
    sortOrder: 'asc',
    currentPage: page
  });
  const handleRowClick = (idx: number) => {
    setExpandedRow(expandedRow === idx ? null : idx);
  };

  const handleSort = (key: string) => {
    setTableState((prev) => ({
      ...prev,
      sortKey: key,
      sortOrder: prev.sortKey === key && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const formatDate = (dateStr: string): string => {
    const match = /\/Date\((\d+)(?:[+-]\d+)?\)\//.exec(dateStr);
    if (!match) return dateStr;
    const timestamp = parseInt(match[1], 10);
    return dayjs(timestamp).format('MM/DD/YYYY');
  };


  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.customerTable}>
          <thead>
          <tr>
            {columns?.map((col) => (
              <th key={col.key}>{col.label}  <span id={`sortkey${col.key}`} className={styles.sortIcon} onClick={() => handleSort(col.key)}>
             {tableState.sortKey === col.key && tableState.sortOrder === 'asc' && <FaSortUp />}
                {tableState.sortKey === col.key && tableState.sortOrder === 'desc' && <FaSortDown />}
                  </span></th>

            ))}
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {loading ? (
            <tr key="loading-row">
              <td colSpan={columns.length + 1}>
                <Loader minHeight="400px" />
              </td>
            </tr>
          ) : (
            data?.map((row, idx) => (
              <Fragment key={idx}>
                <tr key={idx}  onClick={() => handleRowClick(idx)}>
                  {columns?.map((col) => (
                    <td key={col.key}>{row[col.key] && col.type  === 'date' ?  formatDate(row[col.key] as string) : row[col.key]}</td>
                  ))}
                  <td>
                    <Button
                      title={'VIEW'}
                      onClickHandler={() => {
                        navigate(`${viewRoutePrefix}/${row.id}`)
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
      <div className={styles.pagination}>
        <button onClick={onPrev} disabled={page === 1}>mock</button>
        <span>mock {page}</span>
        <button onClick={onNext}>mock</button>
      </div>
    </>
  );
};

export default memo(DynamicTable);
