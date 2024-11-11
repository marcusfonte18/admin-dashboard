/* eslint-disable @typescript-eslint/no-explicit-any */
// OrderTable.tsx
import React, { useState, useMemo } from 'react';
import { MoreVertical, Download, Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { Order, SortConfig, SortDirection, SortableHeaderProps } from './types';

const useSortableData = (items: Order[], config: SortConfig | null = null) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(config);

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a: any, b: any) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key.toLowerCase().includes('date')) {
          aValue = new Date(aValue.split('-').reverse().join('-')).getTime().toString();
          bValue = new Date(bValue.split('-').reverse().join('-')).getTime().toString();
        }
        
        if (sortConfig.key === 'id') {
          return sortConfig.direction === 'ascending' 
            ? parseInt(aValue) - parseInt(bValue)
            : parseInt(bValue) - parseInt(aValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: keyof Order) => {
    let direction: SortDirection = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const SortableHeader: React.FC<SortableHeaderProps> = ({ 
  name, 
  label, 
  sortConfig, 
  requestSort 
}) => {
  const direction = sortConfig?.key === name ? sortConfig.direction : undefined;
  
  return (
    <th 
      className="p-4 text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-50"
      onClick={() => requestSort(name)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <div className="flex flex-col">
          <ChevronUp 
            size={14} 
            className={`${direction === 'ascending' ? 'text-purple-600' : 'text-gray-300'}`}
          />
          <ChevronDown 
            size={14} 
            className={`${direction === 'descending' ? 'text-purple-600' : 'text-gray-300'}`}
          />
        </div>
      </div>
    </th>
  );
};

const OrderTable: React.FC = () => {
  const orders: Order[] = [
    {
      id: '1596',
      status: 'Confirmado',
      orderDate: '21-03-2022',
      executionDate: '23-03-2022',
      document: 'PROFORMA/77/03/2022',
      paymentDate: '21-03-2022',
      value: '306,99/376,37BRL',
      details: [
        { id: 1, name: 'MSHybcidGLASSBacterio', code: 'TRANSPORTE', quantity: 2, netValue: '305,99 BRL', grossValue: '376,37 BRL' },
        { id: 2, name: 'Transporte', code: 'TRANSPORTE', quantity: 1, netValue: '305,99 BRL', grossValue: '376,37 BRL' }
      ]
    },
    {
      id: '1595',
      status: 'Confirmado',
      orderDate: '21-03-2022',
      executionDate: '22-03-2022',
      document: 'PROFORMA/77/03/2022',
      paymentDate: '21-03-2022',
      value: '306,99/376,37BRL',
    },
    {
      id: '1593',
      status: 'Enviado',
      orderDate: '08-03-2022',
      executionDate: '09-03-2022',
      document: 'PROFORMA/77/03/2022',
      paymentDate: '21-03-2022',
      value: '306,99/376,37BRL',
    }
  ];

  const { items, requestSort, sortConfig } = useSortableData(orders);

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <SortableHeader 
                  name="status" 
                  label="Status" 
                  sortConfig={sortConfig} 
                  requestSort={requestSort}
                />
                <SortableHeader 
                  name="orderDate" 
                  label="Data do Pedido" 
                  sortConfig={sortConfig} 
                  requestSort={requestSort}
                />
                <SortableHeader 
                  name="executionDate" 
                  label="Data de Execução" 
                  sortConfig={sortConfig} 
                  requestSort={requestSort}
                />
                <SortableHeader 
                  name="id" 
                  label="Nº" 
                  sortConfig={sortConfig} 
                  requestSort={requestSort}
                />
                <SortableHeader 
                  name="document" 
                  label="Documento" 
                  sortConfig={sortConfig} 
                  requestSort={requestSort}
                />
                <SortableHeader 
                  name="paymentDate" 
                  label="Data de Pagamento" 
                  sortConfig={sortConfig} 
                  requestSort={requestSort}
                />
                <SortableHeader 
                  name="value" 
                  label="Valor Líquido/Bruto" 
                  sortConfig={sortConfig} 
                  requestSort={requestSort}
                />
                <th className="p-4 text-sm font-medium text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((order, index) => (
                <React.Fragment key={order.id}>
                  <tr className={`border-b ${order.status === 'Confirmado' ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm 
                        ${order.status === 'Confirmado' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm">{order.orderDate}</td>
                    <td className="p-4 text-sm">{order.executionDate}</td>
                    <td className="p-4 text-sm">{order.id}</td>
                    <td className="p-4 text-sm">{order.document}</td>
                    <td className="p-4 text-sm">{order.paymentDate}</td>
                    <td className="p-4 text-sm">{order.value}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-purple-600 hover:bg-purple-50 rounded">
                          <Download size={16} />
                        </button>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {index === 0 && order.details && (
                    <tr className="bg-purple-50">
                      <td colSpan={8} className="p-4">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left">
                              <th className="p-2 text-sm font-medium text-gray-600">Nº</th>
                              <th className="p-2 text-sm font-medium text-gray-600">Nome</th>
                              <th className="p-2 text-sm font-medium text-gray-600">Código</th>
                              <th className="p-2 text-sm font-medium text-gray-600">Quantidade</th>
                              <th className="p-2 text-sm font-medium text-gray-600">Valor Líquido</th>
                              <th className="p-2 text-sm font-medium text-gray-600">Valor Bruto</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.details.map((detail) => (
                              <tr key={detail.id}>
                                <td className="p-2 text-sm">{detail.id}</td>
                                <td className="p-2 text-sm">{detail.name}</td>
                                <td className="p-2 text-sm">{detail.code}</td>
                                <td className="p-2 text-sm">{detail.quantity}</td>
                                <td className="p-2 text-sm">{detail.netValue}</td>
                                <td className="p-2 text-sm">{detail.grossValue}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="flex justify-end mt-4">
                          <button className="flex items-center px-4 py-2 text-sm text-white bg-purple-600 rounded hover:bg-purple-700">
                            <Download size={16} className="mr-2" />
                            Baixar Proforma
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Página</span>
            <span className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded">1</span>
            <span className="text-sm text-gray-600">30</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;