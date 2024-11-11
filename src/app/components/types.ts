// types.ts
export interface OrderDetail {
  id: number;
  name: string;
  code: string;
  quantity: number;
  netValue: string;
  grossValue: string;
}

export interface Order {
  id: string;
  status: 'Confirmado' | 'Enviado';
  orderDate: string;
  executionDate: string;
  document: string;
  paymentDate: string;
  value: string;
  details?: OrderDetail[];
}

export type SortDirection = 'ascending' | 'descending';

export interface SortConfig {
  key: keyof Order;
  direction: SortDirection;
}

export interface SortableHeaderProps {
  name: keyof Order;
  label: string;
  sortConfig: SortConfig | null;
  requestSort: (key: keyof Order) => void;
}