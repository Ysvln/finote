import { Payment } from "@/entities/payment/payment.types";
import { normalizeDate } from "@/shared/lib/util/date";
import { normalizeKey } from "@/shared/lib/util/file";

/**
 * 업로드된 CSV/XLSX 파일의 헤더에 필수 필드가 모두 있는지 검증합니다.
 *
 * @param {string[]} headers - 파일에서 읽어온 헤더 배열
 * @returns {string[]} 누락된 필드 목록 (없으면 빈 배열)
 *
 * @example
 * validateHeaders(["paymentDate", "wallet", "category", "type", "description", "amount"])
 * // []
 *
 * validateHeaders(["wallet", "category"])
 * // ["paymentDate", "type", "description", "amount"]
 */
export function validateHeaders(headers: string[]): string[] {
  const required = [
    "paymentDate",
    "wallet",
    "category",
    "type",
    "description",
    "amount",
  ];
  const normalized = headers.map((h) => h.replace(/\uFEFF/g, "").trim());
  const missing = required.filter((key) => !normalized.includes(key));
  return missing;
}

/**
 * CSV/XLSX 데이터 행들을 Payment 객체 배열로 변환합니다.
 *
 * @param {any[]} rows - CSV/XLSX에서 파싱된 원시 데이터 배열
 * @returns {Payment[]} 변환된 Payment 객체 배열
 *
 * 변환 규칙:
 * - `paymentDate`: YYYY.MM.DD 형식으로 정규화 (`normalizeDate` 사용)
 * - `wallet`, `category`, `description`, `memo`: 문자열로 변환
 * - `type`: "수입" 또는 "지출" (기본값 "지출")
 * - `amount`: 숫자로 변환 (기본값 0)
 *
 * @example
 * parseCsvData([
 *   { paymentDate: "2025-09-03", wallet: "카드", category: "식비", type: "지출", description: "점심", amount: "9000" }
 * ])
 * // [
 * //   {
 * //     paymentDate: "2025.09.03",
 * //     wallet: "카드",
 * //     category: "식비",
 * //     type: "지출",
 * //     description: "점심",
 * //     amount: 9000,
 * //     memo: ""
 * //   }
 * // ]
 */
export function parseCsvData(rows: any[]): Payment[] {
  return rows
    .map((row) => {
      const normalized: Record<string, any> = {};
      for (const key in row) {
        normalized[normalizeKey(key)] = row[key];
      }

      return {
        paymentDate: normalizeDate(
          String(normalized.paymentDate ?? normalized["결제일"] ?? "")
        ),
        wallet: String(normalized.wallet ?? normalized["지갑"] ?? ""),
        category: String(normalized.category ?? normalized["카테고리"] ?? ""),
        type:
          (normalized.type ?? normalized["구분"]) === "수입" ? "수입" : "지출",
        description: String(normalized.description ?? normalized["내용"] ?? ""),
        amount: Number(normalized.amount ?? normalized["금액"] ?? 0),
        memo: String(normalized.memo ?? normalized["메모"] ?? ""),
      } as Payment;
    })
    .filter((row) => row.paymentDate && row.wallet && row.category);
}
