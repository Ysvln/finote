import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "../payment.types";
import { Button } from "@/shared/ui/button";
import { ArrowUpDown } from "lucide-react";

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
          <ArrowUpDown />
        </Button>
      );
    },
  },
  { accessorKey: "wallet", header: "WALLET" },
  { accessorKey: "category", header: "카테고리" },
  { accessorKey: "description", header: "결제내역" },
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
          <ArrowUpDown />
        </Button>
      );
    },

    cell: ({ row }) => {
      const amount = row.getValue<number>("amount");
      const formatted = new Intl.NumberFormat("ko-KR", {
        style: "decimal",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  { accessorKey: "memo", header: "메모" },
];
