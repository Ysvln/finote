import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <button
        className="border rounded p-1 cursor-pointer"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronsLeft className="h-4 w-4" />
      </button>
      <button
        className="border rounded p-1 cursor-pointer"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="flex items-center gap-1">
        <div>페이지</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </strong>
      </span>
      <button
        className="border rounded p-1 cursor-pointer"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
      <button
        className="border rounded p-1 cursor-pointer"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <ChevronsRight className="h-4 w-4" />
      </button>
    </div>
  );
}
