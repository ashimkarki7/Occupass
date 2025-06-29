export interface Column {
  key: string;
  label: string;
}

interface CustomerData {
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
}

export interface DynamicTableProps {
  loading: boolean;
  columns: Column[];
  data: CustomerData[];
  page: number;
  onPrev: () => void;
  onNext: () => void;
}

export interface TableState {
  sortKey: string;
  sortOrder: 'asc' | 'desc';
  currentPage: number;
}