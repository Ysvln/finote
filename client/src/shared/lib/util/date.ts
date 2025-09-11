/**
 * 날짜 문자열을 "YYYY.MM.DD" 형식으로 정규화합니다.
 *
 * @param {string} value - 원본 날짜 문자열
 * @returns {string} 정규화된 날짜 문자열
 *
 * @example
 * normalizeDate("2025-09-03") // "2025.09.03"
 * normalizeDate("2025.09.03") // "2025.09.03"
 */
export function normalizeDate(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value.replace(/-/g, ".");
  }
  return value;
}
