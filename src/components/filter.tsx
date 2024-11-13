import React, { useState } from "react";
import { Search } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import DateRangeFilter from "./data-ranger-filter";

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
    status: "",
    orderDate: "",
    completionDate: "",
    orderNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
      <div className="relative w-[150px]">
        <Select
          name="status"
          value={filters.status}
          onValueChange={(value) =>
            handleChange({
              target: { name: "status", value },
            } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
          }
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Status</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="completed">Completo</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DateRangeFilter />

      <div className="relative flex-1">
        <Input
          type="text"
          name="orderNumber"
          value={filters.orderNumber}
          onChange={handleChange}
          placeholder="Buscar"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-popover-foreground" />
      </div>

      <Button type="submit">Filtrar</Button>
    </form>
  );
};

export default SearchFilters;
