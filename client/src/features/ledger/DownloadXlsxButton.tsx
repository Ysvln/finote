import React from "react";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Payment } from "@/entities/payment/payment.types";
import { toXlsx } from "@/shared/lib/util/file";
import { VariantProps } from "class-variance-authority";
import * as XLSX from "xlsx";

interface Props
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  data: Payment[];
  asChild?: boolean;
  fileName?: string;
}

const headerMap: Record<keyof Payment, string> = {
  paymentDate: "결제일",
  wallet: "지갑",
  category: "카테고리",
  type: "구분",
  description: "내용",
  amount: "금액",
  memo: "메모",
};

export function DownloadXlsxButton({
  data,
  fileName = "payments.xlsx",
  ...props
}: Props) {
  const handleXlsxDownload = () => {
    try {
      const workbook = toXlsx(data, headerMap, "결제 내역");
      XLSX.writeFile(workbook, fileName);
    } catch (error: any) {
      console.error(`XLSX 다운로드 중 에러: ${error.message}`);
    }
  };

  return (
    <Button onClick={handleXlsxDownload} {...props}>
      다운로드
    </Button>
  );
}
