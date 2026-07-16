import type { Key } from "react";
import { Button } from "../index";
import type { Column } from "./types";

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey?: (row: T) => Key;

  loading?: boolean;
  emptyMessage?: string;
  className?: string;

  showSerialNumber?: boolean;

  currentPage?: number;
  pageSize?: number;
  totalRecords?: number;
  onPageChange?: (page: number) => void;
};

function DataTable<T extends Record<string, any>>({
  columns,
  data,
  rowKey,
  loading = false,
  emptyMessage = "No records found.",
  className = "",
  showSerialNumber = true,

  currentPage = 1,
  pageSize = 10,
  totalRecords = data.length,
  onPageChange,
}: DataTableProps<T>) {
  const totalColumns = columns.length + (showSerialNumber ? 1 : 0);

  const totalPages = Math.ceil(totalRecords / pageSize);

  const getAlignment = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center":
        return "text-center";

      case "right":
        return "text-right";

      default:
        return "text-left";
    }
  };

  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="sticky top-0 z-10 bg-slate-100">
            <tr>
              {showSerialNumber && (
                <th className="w-16 border-b border-slate-200 px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-600">
                  S.No.
                </th>
              )}

              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`border-b border-slate-200 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-600 ${getAlignment(
                    column.align,
                  )}`}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {/* Loading */}
            {loading && (
              <tr>
                <td
                  colSpan={totalColumns}
                  className="px-6 py-12 text-center text-sm text-slate-500"
                >
                  Loading...
                </td>
              </tr>
            )}

            {/* Empty */}
            {!loading && data.length === 0 && (
              <tr>
                <td
                  colSpan={totalColumns}
                  className="px-6 py-12 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}

            {/* Data */}
            {!loading &&
              data.map((row, index) => (
                <tr
                  key={rowKey ? rowKey(row) : index}
                  className={`transition-colors hover:bg-blue-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                  }`}
                >
                  {showSerialNumber && (
                    <td className="px-4 py-4 text-center text-sm font-medium text-slate-600">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                  )}

                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={`px-6 py-4 text-sm text-slate-700 ${getAlignment(
                        column.align,
                      )}`}
                      style={{ width: column.width }}
                    >
                      {column.render
                        ? column.render(row)
                        : column.key
                          ? String(row[column.key] ?? "-")
                          : "-"}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
          <p className="text-sm text-slate-500">
            Showing {(currentPage - 1) * pageSize + 1} -{" "}
            {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords}{" "}
            records
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              disabled={currentPage === 1}
              onClick={() => onPageChange?.(currentPage - 1)}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => onPageChange?.(index + 1)}
                className={`h-9 w-9 rounded-lg border text-sm font-medium transition ${
                  currentPage === index + 1
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <Button
              variant="secondary"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange?.(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
