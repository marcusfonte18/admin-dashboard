import { useMemo, useState } from "react";

type SortDirection = "ascending" | "descending";

interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

const useSortable = <T,>(items: T[], config: SortConfig<T> | null = null) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(config);

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Verificação de tipo para data
        if (
          typeof aValue === "string" &&
          typeof bValue === "string" &&
          sortConfig.key.toString().toLowerCase().includes("date")
        ) {
          const aDate = new Date(
            aValue.split("-").reverse().join("-")
          ).getTime();
          const bDate = new Date(
            bValue.split("-").reverse().join("-")
          ).getTime();
          return sortConfig.direction === "ascending"
            ? aDate - bDate
            : bDate - aDate;
        }

        // Verificação de tipo para ID numérico em string
        if (
          sortConfig.key === "id" &&
          typeof aValue === "string" &&
          typeof bValue === "string"
        ) {
          const aId = parseInt(aValue, 10);
          const bId = parseInt(bValue, 10);
          return sortConfig.direction === "ascending" ? aId - bId : bId - aId;
        }

        // Ordenação padrão
        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: SortDirection = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export default useSortable;
