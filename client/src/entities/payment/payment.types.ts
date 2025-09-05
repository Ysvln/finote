import z from "zod";
import { PaymentSchema, PaymentsSchema } from "./payment.contracts";

export type Payment = z.infer<typeof PaymentSchema>;
export type Payments = z.infer<typeof PaymentsSchema>;
