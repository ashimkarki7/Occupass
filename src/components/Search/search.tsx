import { useState, useEffect } from 'react';
import HeaderStyles from '@/common/Header/Header.module.scss';
import {
  SearchIconSvg,
} from '@assets/svg';

import Button from '@/components/Button/Button.tsx';
import type { IObjectLiteral } from '@common/types.ts';
import { useAppDispatch } from '@/store/reduxHook.ts';
import { getOrder } from '@pages/Orders/slice/slice.ts';
import { getCustomers } from '@pages/HomePage/slice/slice.ts';

const HeaderSearch = ({ location }:IObjectLiteral) => {
  const dispatch = useAppDispatch();


  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (!debouncedTerm) return;

    const formData = {
      filters: [
        {
          field: 'Name',
          operator: 'Contains',
          value: debouncedTerm,
        },
      ],
      skip: 0,
      take: 10,
    };

    if (location.pathname === '/orders') {
      dispatch(getOrder(formData));
    } else {
      dispatch(getCustomers(formData));
    }
  }, [debouncedTerm, location.pathname, dispatch]);



  return (
    <>
      <input
        className={HeaderStyles.search_input}
        placeholder={`Search By Name`}
        id={'search_input'}
        anchor-name="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        ariaLabel="Search"
        anchor-target="search-input"
        hasIconOnly={true}
        title={<SearchIconSvg />}
        onClickHandler={() => {
          const formData = {
            filters: [
              {
                field: 'Name',
                operator: 'Contains',
                value: searchTerm,
              },
            ],
            skip: 0,
            take: 10,
          };
          if (location.pathname === '/orders') {
            dispatch(getOrder(formData));
          } else {
            dispatch(getCustomers(formData));
          }
        }}
        className={HeaderStyles.btnSearch}
      />
    </>
  );
};

export default HeaderSearch;