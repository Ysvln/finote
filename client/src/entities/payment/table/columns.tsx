import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { Payment } from "../payment.types";
import { Button } from "@/shared/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnFilter } from "@/shared/ui/table/ColumnFilter";

const fuzzyFilter: FilterFn<any> = (row, columnId, value) => {
  const cellValue = row.getValue(columnId);
  const filterValue = value as string;

  if (typeof cellValue !== "string" || !filterValue) {
    return true;
  }

  return cellValue.toLowerCase().includes(filterValue.toLowerCase());
};

export const paymentColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "paymentDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-gray-800 font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          결제일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "wallet",
    header: ({ column, table }) => (
      <div className="flex flex-col items-start gap-1">
        <span className="text-gray-800 font-bold">WALLET</span>
        {/* <ColumnFilter column={column} table={table} /> */}
      </div>
    ),
    // filterFn: fuzzyFilter,
  },
  {
    accessorKey: "category",
    header: ({ column, table }) => (
      <div className="flex flex-col items-start gap-1">
        <span className="text-gray-800 font-bold">카테고리</span>
        {/* <ColumnFilter column={column} table={table} /> */}
      </div>
    ),
    // filterFn: fuzzyFilter,
  },
  {
    accessorKey: "description",
    header: "결제내역",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-gray-800 font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          금액
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const amount = row.getValue<number>("amount");
      const formatted = new Intl.NumberFormat("ko-KR", {
        style: "decimal",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "memo",
    header: "메모",
  },
];
