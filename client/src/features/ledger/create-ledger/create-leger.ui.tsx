import { useState } from "react";
import { Payment } from "@/entities/payment/payment.types";
import * as XLSX from "xlsx";
import Papa from "papaparse";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { LedgerTable } from "../LedgerTable";
import { parseCsvData, validateHeaders } from "./create-ledger.lib";

interface Props {
  onSave?: (data: Payment[]) => void;
}

export function CreateLedgerModal({ onSave }: Props) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<Payment[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      alert("파일 크기는 최대 5MB까지만 지원합니다.");
      return;
    }

    setFileName(file.name);

    if (file.name.endsWith(".csv")) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const headers = result.meta.fields || [];
          const missing = validateHeaders(headers);

          if (missing.length > 0) {
            alert(`다음 필드가 누락되었습니다: ${missing.join(", ")}`);
            setPreview([]);
            return;
          }

          const parsed = parseCsvData(result.data as any[]);
          setPreview(parsed);
        },
      });
    } else if (file.name.endsWith(".xlsx")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // 첫 줄 헤더만 추출
        const headerRow = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
        })[0] as string[];
        const missing = validateHeaders(headerRow);

        if (missing.length > 0) {
          alert(`다음 필드가 누락되었습니다: ${missing.join(", ")}`);
          setPreview([]);
          return;
        }

        const json = XLSX.utils.sheet_to_json<any>(sheet, { defval: "" });
        const parsed = parseCsvData(json);
        setPreview(parsed);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          업로드
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[700px]">
        <DialogHeader>
          <DialogTitle>거래 내역 업로드</DialogTitle>
          <DialogDescription>
            CSV 또는 XLSX 파일을 업로드하면 미리보기가 표시됩니다.
          </DialogDescription>
        </DialogHeader>

        {/* 파일 업로드 UI */}
        <label
          htmlFor="file-upload"
          className="mt-2 flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition"
        >
          <span className="text-sm text-gray-700 font-medium">
            클릭해서 파일을 선택하세요
          </span>
          <span className="text-xs text-gray-500">
            지원 형식: <strong>CSV, XLSX</strong> | 최대 크기:{" "}
            <strong>5MB</strong>
          </span>
          {fileName && (
            <span className="text-xs text-blue-600 mt-1">
              선택된 파일: {fileName}
            </span>
          )}
          <input
            id="file-upload"
            type="file"
            accept=".csv,.xlsx"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
          />
        </label>

        {/* 미리보기 */}
        <div className="mt-4 max-h-[400px] overflow-y-auto">
          {preview.length > 0 ? (
            <LedgerTable data={preview} />
          ) : (
            <p className="text-sm text-gray-500">
              업로드 후 거래 내역이 여기에 표시됩니다.
            </p>
          )}
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPreview([]);
              setFileName(null);
              setOpen(false);
            }}
          >
            취소
          </Button>
          <Button
            size="sm"
            onClick={() => {
              if (preview.length > 0) {
                onSave?.(preview);
                setPreview([]);
                setFileName(null);
                setOpen(false);
              }
            }}
          >
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
