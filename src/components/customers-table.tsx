import React, { useState } from "react";
import {
  MoreVertical,
  Mail,
  Phone,
  Edit,
  Trash2,
  MapPin,
  Building,
  Package,
  DollarSign,
  Users,
} from "lucide-react";
import { SortableHeader } from "./table/sortable-header";
import { Customer } from "./types";
import AddCustomerButton from "./modal-add-customer";
import { CustomerModal } from "./modal-customers";
import useSortable from "@/hooks/useSortableTable";

const CustomerTable = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const customers: Customer[] = [
    {
      id: "001",
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "(11) 99999-9999",
      company: "Tech Solutions Ltd",
      location: "São Paulo, SP",
      totalOrders: 23,
      lastOrderDate: "21-03-2024",
      status: "active",
      totalSpent: "R$ 12.459,00",
    },
    {
      id: "002",
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "(21) 98888-8888",
      company: "Digital Services Inc",
      location: "Rio de Janeiro, RJ",
      totalOrders: 15,
      lastOrderDate: "18-03-2024",
      status: "active",
      totalSpent: "R$ 8.732,00",
    },
    {
      id: "003",
      name: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      phone: "(31) 97777-7777",
      company: "Global Systems",
      location: "Belo Horizonte, MG",
      totalOrders: 8,
      lastOrderDate: "15-03-2024",
      status: "inactive",
      totalSpent: "R$ 4.289,00",
    },
  ];

  const { items, requestSort, sortConfig } = useSortable<Customer>(customers);

  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter((c) => c.status === "active").length,
    totalRevenue: customers.reduce(
      (acc, curr) =>
        acc +
        parseFloat(
          curr.totalSpent.replace("R$ ", "").replace(".", "").replace(",", ".")
        ),
      0
    ),
    averageOrders:
      customers.reduce((acc, curr) => acc + curr.totalOrders, 0) /
      customers.length,
  };

  return (
    <div className="space-y-6">
      {/* Customer Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Clientes</p>
              <p className="text-2xl font-bold">{stats.totalCustomers}</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Clientes Ativos</p>
              <p className="text-2xl font-bold">{stats.activeCustomers}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Building className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Receita Total</p>
              <p className="text-2xl font-bold">
                R$ {stats.totalRevenue.toLocaleString("pt-BR")}
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Média de Pedidos</p>
              <p className="text-2xl font-bold">
                {stats.averageOrders.toFixed(1)}
              </p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Package className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <SortableHeader
                  name="name"
                  label="Cliente"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
                <SortableHeader
                  name="company"
                  label="Empresa"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
                <SortableHeader
                  name="totalOrders"
                  label="Total Pedidos"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
                <SortableHeader
                  name="totalSpent"
                  label="Total Gasto"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
                <SortableHeader
                  name="lastOrderDate"
                  label="Último Pedido"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
                <SortableHeader
                  name="status"
                  label="Status"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
                <th className="p-4 text-sm flex justify-between items-center  font-medium text-gray-600">
                  Ações
                  <AddCustomerButton />
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((customer) => (
                <tr key={customer.id} className="border-b">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {customer.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {customer.email}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900">{customer.company}</span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {customer.location}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium">{customer.totalOrders}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium">{customer.totalSpent}</span>
                  </td>
                  <td className="p-4 text-sm">{customer.lastOrderDate}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm
                        ${
                          customer.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {customer.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Mail size={16} />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                        <Phone size={16} />
                      </button>
                      <button
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsEditModalOpen(true);
                        }}
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
            <span className="text-sm text-gray-600">de 30</span>
          </div>
        </div>
      </div>
      {selectedCustomer && (
        <CustomerModal
          customer={selectedCustomer}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedCustomer(null);
          }}
          onSave={(updatedCustomer) => {
            console.log("Updated customer:", updatedCustomer);
            setIsEditModalOpen(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
};

export default CustomerTable;
