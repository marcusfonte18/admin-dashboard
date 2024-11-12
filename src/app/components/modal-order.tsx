import React from "react";
import { X } from "lucide-react";
import { Order } from "./types";

interface OrderEditModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: Order) => void;
}

export const OrderEditModal: React.FC<OrderEditModalProps> = ({
  order,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Editar Ordem #{order.id}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form className="space-y-6">
            {/* Status */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  defaultValue={order.status}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Confirmado">Confirmado</option>
                  <option value="Enviado">Enviado</option>
                </select>
              </div>

              {/* Document */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modalidade
                </label>
                <input
                  type="text"
                  defaultValue={order.modality}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data do Pedido
                </label>
                <input
                  type="text"
                  defaultValue={order.orderDate}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Execução
                </label>
                <input
                  type="text"
                  defaultValue={order.executionDate}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Pagamento
                </label>
                <input
                  type="text"
                  defaultValue={order.paymentDate}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor Líquido/Bruto
              </label>
              <input
                type="text"
                defaultValue={order.value}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Order Details */}
            {order.details && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detalhes do Pedido
                </label>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Nome
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Código
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Quantidade
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Valor Líquido
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Valor Bruto
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.details.map((detail) => (
                        <tr key={detail.id} className="border-t">
                          <td className="px-4 py-2 text-sm">
                            <input
                              type="text"
                              defaultValue={detail.name}
                              className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm">
                            <input
                              type="text"
                              defaultValue={detail.code}
                              className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm">
                            <input
                              type="number"
                              defaultValue={detail.quantity}
                              className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm">
                            <input
                              type="text"
                              defaultValue={detail.netValue}
                              className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm">
                            <input
                              type="text"
                              defaultValue={detail.grossValue}
                              className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(order)}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};
