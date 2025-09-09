export function downloadFile(fileName: string, data: Blob) {
  const link = document.createElement("a");
  link.download = fileName;
  const url = URL.createObjectURL(data);
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}
