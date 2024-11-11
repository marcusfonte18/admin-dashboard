"use client";

import { useState } from "react";
import { TrendingUp, DollarSign, Users, Package } from "lucide-react";
import { StatCard } from "./components/stat-card";
import { Header } from "./components/header";
import CustomerTable from "./components/customers-table";
import { Orders } from "./components/orders";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("ordens");

  const stats = [
    {
      icon: TrendingUp,
      label: "Taxa de Conversão",
      value: "64%",
      trend: 2.4,
      color: "bg-green-600",
    },
    {
      icon: DollarSign,
      label: "Receita Total",
      value: "R$ 45,678",
      trend: 8.2,
      color: "bg-blue-600",
    },
    {
      icon: Users,
      label: "Novos Clientes",
      value: "321",
      trend: 24.3,
      color: "bg-orange-600",
    },
    {
      icon: Package,
      label: "Total de Pedidos",
      value: "1,234",
      trend: 12.5,
      color: "bg-purple-600",
    },
  ];

  const getComponent = () => {
    switch (activeTab) {
      case "ordens":
        return <Orders />;
      case "análises":
        return <div>Análises</div>;
      case "clientes":
        return <CustomerTable />;
      default:
        return <Orders />;
    }
  };

  const Component = getComponent();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              color={stat.color}
              value={stat.value}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {["ordens", "análises", "clientes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        {Component}
      </main>
    </div>
  );
}
