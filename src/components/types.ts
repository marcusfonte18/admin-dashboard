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
  status: "Confirmado" | "Enviado";
  orderDate: string;
  executionDate: string;
  modality: string;
  paymentDate: string;
  value: string;
  details?: OrderDetail[];
}

// Customer Details

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  totalOrders: number;
  lastOrderDate: string;
  status: "active" | "inactive";
  totalSpent: string;
}

export type SortDirection = "ascending" | "descending";

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

export interface SortableHeaderProps<T> {
  name: keyof T;
  label: string;
  sortConfig: SortConfig<T> | null;
  requestSort: (key: keyof T) => void;
}
