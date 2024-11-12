/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import { MoreVertical, Download, Edit, Trash2 } from "lucide-react";
import { Order, SortConfig, SortDirection } from "./types";
import { SortableHeader } from "./table/sortable-header";
import { OrderEditModal } from "./modal-order";

const useSortableData = (
  items: Order[],
  config: SortConfig<Order> | null = null
) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<Order> | null>(
    config
  );

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a: any, b: any) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key.toLowerCase().includes("date")) {
          aValue = new Date(aValue.split("-").reverse().join("-"))
            .getTime()
            .toString();
          bValue = new Date(bValue.split("-").reverse().join("-"))
            .getTime()
            .toString();
        }

        if (sortConfig.key === "id") {
          return sortConfig.direction === "ascending"
            ? parseInt(aValue) - parseInt(bValue)
            : parseInt(bValue) - parseInt(aValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: keyof Order) => {
    let direction: SortDirection = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const OrderTable: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditModal = (order: Order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedOrder(null);
    setIsEditModalOpen(false);
  };

  const handleSaveOrder = (updatedOrder: Order) => {
    console.log("Ordem atualizada:", updatedOrder);
    handleCloseEditModal();
  };

  const orders: Order[] = [
    {
      id: "1596",
      status: "Confirmado",
      orderDate: "21-03-2022",
      executionDate: "23-03-2022",
      modality: "Preventiva",
      paymentDate: "21-03-2022",
      value: "306,99/376,37BRL",
      details: [
        {
          id: 1,
          name: "MSHybcidGLASSBacterio",
          code: "TRANSPORTE",
          quantity: 2,
          netValue: "305,99 BRL",
          grossValue: "376,37 BRL",
        },
        {
          id: 2,
          name: "Transporte",
          code: "TRANSPORTE",
          quantity: 1,
          netValue: "305,99 BRL",
          grossValue: "376,37 BRL",
        },
      ],
    },
    {
      id: "1595",
      status: "Confirmado",
      orderDate: "21-03-2022",
      executionDate: "22-03-2022",
      modality: "Corretiva",
      paymentDate: "21-03-2022",
      value: "306,99/376,37BRL",
    },
    {
      id: "1593",
      status: "Enviado",
      orderDate: "08-03-2022",
      executionDate: "09-03-2022",
      modality: "Preventiva",
      paymentDate: "21-03-2022",
      value: "306,99/376,37BRL",
    },
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
                  name="modality"
                  label="Modalidade"
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
              {items.map((order) => (
                <React.Fragment key={order.id}>
                  <tr
                    className={`border-b ${
                      order.status === "Confirmado" ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm 
                        ${
                          order.status === "Confirmado"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm">{order.orderDate}</td>
                    <td className="p-4 text-sm">{order.executionDate}</td>
                    <td className="p-4 text-sm">{order.id}</td>
                    <td className="p-4 text-sm">{order.modality}</td>
                    <td className="p-4 text-sm">{order.paymentDate}</td>
                    <td className="p-4 text-sm">{order.value}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-purple-600 hover:bg-purple-50 rounded">
                          <Download size={16} />
                        </button>
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          onClick={() => handleOpenEditModal(order)}
                        >
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
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Página</span>
            <span className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded">
              1
            </span>
            <span className="text-sm text-gray-600">30</span>
          </div>
        </div>
      </div>
      {selectedOrder && (
        <OrderEditModal
          order={selectedOrder}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveOrder}
        />
      )}
    </div>
  );
};

export default OrderTable;
