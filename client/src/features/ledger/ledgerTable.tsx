import { DataTable } from "@/shared/ui/table/dataTable";
import { paymentColumns } from "@/entities/payment/table/columns";
import { Payment } from "@/entities/payment/payment.types";

interface LedgerTableProps {
  data: Payment[];
}

export function LedgerTable({ data }: LedgerTableProps) {
  return <DataTable columns={paymentColumns} data={data} />;
}
