import { z } from "zod";

export const PaymentSchema = z.object({
  paymentDate: z.string().regex(/^\d{4}\.\d{2}\.\d{2}$/, {
    message: "결제일은 YYYY.MM.DD 형식이어야 합니다.",
  }),
  wallet: z.string().min(1, { message: "WALLET 정보는 필수입니다." }),
  category: z.string().min(1, { message: "카테고리는 필수입니다." }),
  type: z.enum(["지출", "수입"]),
  description: z.string().min(1, { message: "결제내역은 필수입니다." }),
  amount: z.number().positive({ message: "금액은 0보다 커야 합니다." }),
  memo: z.string().optional(),
});

export const PaymentsSchema = z.map(z.string(), PaymentSchema);
