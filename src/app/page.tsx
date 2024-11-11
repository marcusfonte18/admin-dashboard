/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useState } from 'react';
import { LayoutDashboard, TrendingUp, DollarSign, Users, Package } from 'lucide-react';
import OrderTable from "./components/order-table";
import SearchFilters from "./filter";

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start justify-between">
    <div className="space-y-2">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="flex items-baseline space-x-2">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {trend && (
          <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
  </div>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold text-purple-600 flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6" />
              Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <button className="text-sm text-gray-500 hover:text-gray-700">Ajuda</button>
              <button className="text-sm text-gray-500 hover:text-gray-700">Configurações</button>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Package}
            label="Total de Pedidos"
            value="1,234"
            trend={12.5}
            color="bg-purple-600"
          />
          <StatCard
            icon={DollarSign}
            label="Receita Total"
            value="R$ 45,678"
            trend={8.2}
            color="bg-blue-600"
          />
          <StatCard
            icon={TrendingUp}
            label="Taxa de Conversão"
            value="64%"
            trend={-2.4}
            color="bg-green-600"
          />
          <StatCard
            icon={Users}
            label="Novos Clientes"
            value="321"
            trend={24.3}
            color="bg-orange-600"
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['orders', 'analytics', 'customers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <SearchFilters onSearch={(ev) => console.log(ev)} />
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          <OrderTable />
        </div>
      </main>
    </div>
  );
}