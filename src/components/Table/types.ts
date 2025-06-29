import {type ReactNode} from 'react';

export interface Column {
  key: string;
  label: string;
  type?: string;
}

export interface CustomerData {
  id: string;
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  fax: string;
  email?: string;
  [key: string]: string | number | undefined;
}

export interface PaginationParams {
  skip: number;
  take: number;
  orderBy?:string|undefined
  orderByDesc?:string|undefined
}

export interface DynamicTableProps {
  total: number;
  viewRoutePrefix?: string;
  renderExpandedRow?: (row: CustomerData) => ReactNode;
  loading: boolean;
  columns: Column[];
  data: CustomerData[];
  pagination: PaginationParams;
  onPaginationChange: (params: PaginationParams) => void;
}

