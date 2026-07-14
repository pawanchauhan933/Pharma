import type { Key } from "react";
import type { Column } from "./types";

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey?: (row: T) => Key;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  showSerialNumber?: boolean;
};

function DataTable<T extends Record<string, any>>({
  columns,
  data,
  rowKey,
  loading = false,
  emptyMessage = "No records found.",
  className = "",
  showSerialNumber = true,
}: DataTableProps<T>) {
  const totalColumns = columns.length + (showSerialNumber ? 1 : 0);

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
                      {index + 1}
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
    </div>
  );
}

export default DataTable;
