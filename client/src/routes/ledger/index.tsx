import { LedgerTable } from "@/features/ledger/LedgerTable";
import { createFileRoute } from "@tanstack/react-router";
import { Payment } from "@/entities/payment/payment.types";
import { DownloadXlsxButton } from "@/features/ledger/DownloadXlsxButton";

export const Route = createFileRoute("/ledger/")({
  component: RouteComponent,
});

const mockData: Payment[] = [
  {
    paymentDate: "2025.09.03",
    wallet: "카카오페이",
    category: "식비",
    type: "지출",
    description: "점심 (우동)",
    amount: 9000,
    memo: "",
  },
  {
    paymentDate: "2025.09.02",
    wallet: "신한카드",
    category: "교통비",
    type: "지출",
    description: "지하철 요금",
    amount: 1450,
    memo: "출근",
  },
  {
    paymentDate: "2025.09.01",
    wallet: "계좌이체",
    category: "월급",
    type: "수입",
    description: "9월 급여",
    amount: 3000000,
    memo: "월급날!",
  },
];

function RouteComponent() {
  return (
    <section className="flex-col flex gap-6">
      <h2 className="text-2xl font-bold">거래 내역</h2>
      <div className="flex-col flex gap-2">
        <DownloadXlsxButton data={mockData} className="ml-auto" size="sm" />
        <LedgerTable data={mockData} />
      </div>
    </section>
  );
}
