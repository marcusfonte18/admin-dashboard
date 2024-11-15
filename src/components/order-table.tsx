import React, { useState } from "react";
import { Download, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Order } from "./types";
import { SortableHeader } from "./sortable-header";
import { OrderEditModal } from "./modal-order";
import useSortable from "@/hooks/useSortableTable";
import { Table } from "./ui/table";
import { Button } from "./ui/button";

interface HeaderCell {
  id: keyof Order;
  label: string;
}

const OrderTable = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<string>("");

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

  const toggleRow = (orderId: string) => {
    setExpandedRows((prev) => {
      if (prev === orderId) {
        return "";
      }

      return orderId;
    });
  };

  const orders: Order[] = [
    {
      id: "1596",
      status: "Confirmado",
      orderDate: "21-03-2022",
      executionDate: "23-03-2022",
      modality: "Preventiva",
      idEquipament: "1231231",
      details: [
        {
          id: 1,
          description: "Ajustes na valvula de escape",
          employee: "Roberto da Silva",
        },
        {
          id: 2,
          description: "Ajustes na valvula de escape",
          employee: "Roberto da Silva",
        },
      ],
    },
    {
      id: "1595",
      status: "Confirmado",
      orderDate: "21-03-2022",
      executionDate: "22-03-2022",
      idEquipament: "1231231",
      modality: "Corretiva",
    },
    {
      id: "1593",
      status: "Enviado",
      orderDate: "08-03-2022",
      executionDate: "09-03-2022",
      idEquipament: "1231231",
      modality: "Preventiva",
    },
  ];

  const { items, requestSort, sortConfig } = useSortable<Order>(orders);

  const headerCells: HeaderCell[] = [
    { id: "status", label: "Status" },
    { id: "orderDate", label: "Data do Pedido" },
    { id: "executionDate", label: "Data de Execução" },
    { id: "id", label: "Nº" },
    { id: "modality", label: "Modalidade" },
    { id: "idEquipament", label: "ID Equipamento" },
  ];

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <Table.Root className="w-full">
            <Table.Header>
              <Table.Row>
                {headerCells.map((cell) => (
                  <SortableHeader
                    key={cell.id}
                    name={cell.id}
                    label={cell.label}
                    sortConfig={sortConfig}
                    requestSort={requestSort}
                  />
                ))}

                {/* <SortableHeader
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
                  name="idEquipament"
                  label="ID do Equipamento"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                /> */}
                <Table.Head className="p-4 text-sm font-medium text-gray-600">
                  Ações
                </Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items.map((order) => (
                <React.Fragment key={order.id}>
                  <Table.Row
                    onClick={() => toggleRow(order.id)}
                    className={`border-b ${
                      order.status === "Confirmado" ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.status === "Confirmado"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <Table.Cell>{order.orderDate}</Table.Cell>
                    <Table.Cell>{order.executionDate}</Table.Cell>
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell>{order.modality}</Table.Cell>
                    <Table.Cell>{order.idEquipament}</Table.Cell>
                    <Table.Cell className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded"
                        >
                          <Download size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          onClick={() => handleOpenEditModal(order)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          className=" p-2 text-gray-600 hover:bg-gray-200 rounded"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleRow(order.id);
                          }}
                        >
                          {expandedRows.includes(order.id) ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  {expandedRows.includes(order.id) && order.details && (
                    <tr className="bg-purple-50">
                      <td colSpan={7} className="p-4">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left">
                              <th className="p-2 text-sm font-medium text-gray-600">
                                Nº
                              </th>
                              <th className="p-2 text-sm font-medium text-gray-600">
                                Descrição
                              </th>
                              <th className="p-2 text-sm font-medium text-gray-600">
                                Técnico
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.details.map((detail) => (
                              <tr key={detail.id}>
                                <td className="p-2 text-sm">{detail.id}</td>
                                <td className="p-2 text-sm">
                                  {detail.description}
                                </td>
                                <td className="p-2 text-sm">
                                  {detail.employee}
                                </td>
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
            </Table.Body>
          </Table.Root>
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
