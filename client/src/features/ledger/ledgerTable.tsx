import { DataTable } from "@/shared/ui/table/DataTable";
import { paymentColumns } from "@/entities/payment/table/columns";
import { Payment } from "@/entities/payment/payment.types";
import { useDataTable } from "@/shared/hooks/useDataTable";
import { DataTablePagination } from "@/shared/ui/table/Pagination";
interface LedgerTableProps {
  data: Payment[];
}

export function LedgerTable({ data }: LedgerTableProps) {
  const { table } = useDataTable({ columns: paymentColumns, data });
  return (
    <>
      <DataTable table={table} />
      <DataTablePagination table={table} />
    </>
  );
}
