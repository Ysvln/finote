import { Column, Table } from "@tanstack/react-table";
import { ChangeEvent } from "react";

interface ColumnFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
  table: Table<TData>;
}

export function ColumnFilter<TData, TValue>({
  column,
}: ColumnFilterProps<TData, TValue>) {
  const columnFilterValue = column.getFilterValue();

  const filterValue =
    typeof columnFilterValue === "string" ? columnFilterValue : "";

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    column.setFilterValue(event.target.value);
  };

  return (
    <input
      type="text"
      value={filterValue}
      onChange={handleInputChange}
      placeholder={`Search...`}
      className="w-full border-b border-gray-300 focus:border-blue-500 outline-none mt-1 text-sm"
    />
  );
}
