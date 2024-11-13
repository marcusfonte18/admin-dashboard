import { ChevronDown, ChevronUp } from "lucide-react";
import { SortableHeaderProps } from "./types";

export const SortableHeader = <T extends object>({
  name,
  label,
  sortConfig,
  requestSort,
}: SortableHeaderProps<T>) => {
  const direction = sortConfig?.key === name ? sortConfig.direction : undefined;

  return (
    <th
      className="px-2 text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-50"
      onClick={() => requestSort(name)}
    >
      <div className="flex items-center space-x-1 justify-between">
        <span>{label}</span>
        <div className="flex flex-col">
          <ChevronUp
            size={14}
            className={`${
              direction === "ascending" ? "text-purple-600" : "text-gray-300"
            }`}
          />
          <ChevronDown
            size={14}
            className={`${
              direction === "descending" ? "text-purple-600" : "text-gray-300"
            }`}
          />
        </div>
      </div>
    </th>
  );
};
