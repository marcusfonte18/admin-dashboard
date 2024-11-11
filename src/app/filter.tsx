import React, { useState } from 'react';
import { Search, Calendar, ArrowRight } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
}

interface SearchFilters {
  status: string;
  orderDate: string;
  completionDate: string;
  orderNumber: string;
}

const SearchFilters = ({ onSearch }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    status: '',
    orderDate: '',
    completionDate: '',
    orderNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-ful rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        {/* Status Select */}
        <div className="relative">
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="h-10 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-[200px] appearance-none cursor-pointer"
          >
            <option value="">Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Order Date Input */}
        <div className="relative">
          <input
            type="date"
            name="orderDate"
            value={filters.orderDate}
            onChange={handleChange}
            className="h-10 pl-10 pr-3 py-2 rounded-md border border-gray-300 w-[200px] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <ArrowRight className="h-5 w-5 text-gray-400" />

        {/* Completion Date Input */}
        <div className="relative">
          <input
            type="date"
            name="completionDate"
            value={filters.completionDate}
            onChange={handleChange}
            className="h-10 pl-10 pr-3 py-2 rounded-md border border-gray-300 w-[200px] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Order Number Input */}
        <div className="relative flex-1">
          <input
            type="text"
            name="orderNumber"
            value={filters.orderNumber}
            onChange={handleChange}
            placeholder="buscar"
            className="h-10 pl-10 pr-3 py-2 rounded-md border border-gray-300 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Filter Button */}
        <button
          type="submit"
          className="h-10 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
        >
          Filtrar
        </button>
      </form>
    </div>
  );
};

export default SearchFilters;