'use client'

import { ReactNode } from 'react';

type TableProps = {
  children: ReactNode;
};

type TableColumn = {
  label: string;
};

type TableRowData = {
  [key: string]: string;
};

type TableRowProps = {
  data: TableRowData;
  onEdit?: () => void;
};

// Componente raiz da tabela
export const TableRoot = ({ children }: TableProps) => (
  <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
    <table className="w-full text-left table-auto min-w-max">{children}</table>
  </div>
);

// Componente para o cabeçalho da tabela
export const TableHead = ({ columns }: { columns: TableColumn[] }) => (
  <thead>
    <tr>
      {columns.map((column, index) => (
        <th
          key={index}
          className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
        >
          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            {column.label}
          </p>
        </th>
      ))}
      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"></th>
    </tr>
  </thead>
);

// Componente para o corpo da tabela
export const TableBody = ({ children }: TableProps) => <tbody>{children}</tbody>;

// Componente para cada linha da tabela
export const TableRow = ({ data, onEdit }: TableRowProps) => (
  <tr className="even:bg-blue-gray-50/50">
    {Object.values(data).map((value, index) => (
      <td key={index} className="p-4">
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          {value}
        </p>
      </td>
    ))}
    <td className="p-4">
      <button
        onClick={onEdit}
        className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
      >
        Editar
      </button>
    </td>
  </tr>
);
