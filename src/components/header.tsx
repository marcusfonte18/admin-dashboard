import { LayoutDashboard } from "lucide-react";

export const Header = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-600 flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Ajuda
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
