import * as XLSX from "xlsx";

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
 * data: 원본 데이터 배열
 * headerMap: key → 한글 헤더 매핑
 * sheetName: 시트 이름
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
