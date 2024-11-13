/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import {
  Package2,
  Settings,
  Users,
  Mail,
  Phone,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { SortableHeader } from "./sortable-header";

const useSortableData = (items: any, config = null) => {
  const [sortConfig, setSortConfig] = useState<any>(config);

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const EquipmentDashboard = () => {
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [selectedEquipment, setSelectedEquipment] = useState(null);

  const equipment = [
    {
      id: "001",
      name: "Impressora HP LaserJet",
      model: "HP-2055DN",
      serialNumber: "SN-2024-001",
      status: "in_use",
      lastMaintenance: "15-03-2024",
      currentClient: "Tech Solutions Ltd",
      location: "São Paulo, SP",
      maintenanceCount: 12,
      utilizationRate: "85%",
    },
    {
      id: "002",
      name: "Scanner Epson",
      model: "ET-2850",
      serialNumber: "SN-2024-002",
      status: "available",
      lastMaintenance: "18-03-2024",
      currentClient: "Digital Services Inc",
      location: "Rio de Janeiro, RJ",
      maintenanceCount: 8,
      utilizationRate: "72%",
    },
    {
      id: "003",
      name: "Copiadora Xerox",
      model: "WorkCentre 3345",
      serialNumber: "SN-2024-003",
      status: "maintenance",
      lastMaintenance: "20-03-2024",
      currentClient: "Global Systems",
      location: "Belo Horizonte, MG",
      maintenanceCount: 15,
      utilizationRate: "93%",
    },
  ];

  const { items, requestSort, sortConfig } = useSortableData(equipment);

  const stats = {
    totalEquipment: equipment.length,
    inUseEquipment: equipment.filter((e) => e.status === "in_use").length,
    maintenanceEquipment: equipment.filter((e) => e.status === "maintenance")
      .length,
    availableEquipment: equipment.filter((e) => e.status === "available")
      .length,
  };

  return (
    <div className="space-y-6">
      {/* Equipment Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Equipamentos</p>
              <p className="text-2xl font-bold">{stats.totalEquipment}</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package2 className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Em Uso</p>
              <p className="text-2xl font-bold">{stats.inUseEquipment}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Em Manutenção</p>
              <p className="text-2xl font-bold">{stats.maintenanceEquipment}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Settings className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Disponíveis</p>
              <p className="text-2xl font-bold">{stats.availableEquipment}</p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Package2 className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* <AddEquipmentButton /> */}

      {/* Equipment Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <SortableHeader
                  name="name"
                  label="Equipamento"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
                <SortableHeader
                  name="serialNumber"
                  label="Número de Série"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
                <SortableHeader
                  name="maintenanceCount"
                  label="Manutenções"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
                <SortableHeader
                  name="utilizationRate"
                  label="Taxa Utilização"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
                <SortableHeader
                  name="lastMaintenance"
                  label="Última Manutenção"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
                <SortableHeader
                  name="status"
                  label="Status"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
                <th className="p-4 text-sm font-medium text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((equipment) => (
                <tr key={equipment.id} className="border-b">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {equipment.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {equipment.model}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900">
                        {equipment.serialNumber}
                      </span>
                      <span className="text-sm text-gray-500">
                        {equipment.currentClient}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium">
                      {equipment.maintenanceCount}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium">
                      {equipment.utilizationRate}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{equipment.lastMaintenance}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        equipment.status === "in_use"
                          ? "bg-green-100 text-green-800"
                          : equipment.status === "maintenance"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {equipment.status === "in_use"
                        ? "Em Uso"
                        : equipment.status === "maintenance"
                        ? "Em Manutenção"
                        : "Disponível"}
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
                        // onClick={() => {
                        //   setSelectedEquipment(equipment);
                        //   setIsEditModalOpen(true);
                        // }}
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
    </div>
  );
};

export default EquipmentDashboard;
