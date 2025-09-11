import * as XLSX from "xlsx";

/**
 * 브라우저에서 Blob 데이터를 파일로 다운로드합니다.
 *
 * @param {string} fileName - 저장할 파일 이름 (예: "data.csv")
 * @param {Blob} data - 다운로드할 Blob 데이터
 *
 * @example
 * const blob = new Blob(["hello"], { type: "text/plain" });
 * downloadFile("test.txt", blob);
 */
export function downloadFile(fileName: string, data: Blob) {
  const link = document.createElement("a");
  link.download = fileName;
  const url = URL.createObjectURL(data);
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * 객체 배열을 CSV 문자열로 변환합니다.
 *
 * @template T - 객체 타입
 * @param {T[]} data - CSV로 변환할 데이터 배열
 * @returns {string} CSV 문자열
 *
 * 변환 규칙:
 * - 첫 줄은 객체 키를 헤더로 사용
 * - 값은 따옴표로 감싸고, 내부 따옴표는 이스케이프 처리
 *
 * @example
 * toCsv([{ name: "홍길동", age: 20 }, { name: "김철수", age: 25 }])
 * // "name,age\n\"홍길동\",\"20\"\n\"김철수\",\"25\""
 */
export function toCsv<T extends object>(data: T[]): string {
  if (!data.length) return "";
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) =>
    Object.values(row)
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",")
  );
  return [headers, ...rows].join("\n");
}

type HeaderMap<T> = Record<keyof T, string>;

/**
 * 객체 배열을 XLSX(엑셀) 워크북으로 변환합니다.
 *
 * @template T - 객체 타입
 * @param {T[]} data - 변환할 데이터 배열
 * @param {HeaderMap<T>} headerMap - 각 필드를 한글 헤더로 매핑한 객체
 * @param {string} [sheetName="Sheet1"] - 시트 이름 (기본값: "Sheet1")
 * @returns {XLSX.WorkBook} 생성된 엑셀 워크북 객체
 *
 * @throws {Error} 데이터가 비어 있을 경우 예외 발생
 *
 * @example
 * const headerMap = {
 *   paymentDate: "결제일",
 *   wallet: "지갑",
 *   category: "카테고리",
 *   type: "구분",
 *   description: "내용",
 *   amount: "금액",
 *   memo: "메모",
 * };
 *
 * const wb = toXlsx(payments, headerMap, "거래내역");
 * XLSX.writeFile(wb, "payments.xlsx");
 */
export function toXlsx<T extends object>(
  data: T[],
  headerMap: HeaderMap<T>,
  sheetName = "Sheet1"
): XLSX.WorkBook {
  if (!data.length) throw new Error("엑셀로 변환할 데이터가 없습니다.");

  // 헤더 매핑 적용
  const mappedData = data.map((row) => {
    const mapped: Record<string, any> = {};
    (Object.keys(headerMap) as (keyof T)[]).forEach((key) => {
      mapped[headerMap[key]] = row[key] ?? "";
    });
    return mapped;
  });

  const worksheet = XLSX.utils.json_to_sheet(mappedData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  return workbook;
}

/**
 * CSV/XLSX 헤더 키를 정규화합니다.
 * - BOM(Byte Order Mark) 제거
 * - 앞뒤 공백 제거
 *
 * @param {string} key - 원본 헤더 키
 * @returns {string} 정규화된 헤더 키
 */
export function normalizeKey(key: string): string {
  return key.replace(/\uFEFF/g, "").trim();
}
