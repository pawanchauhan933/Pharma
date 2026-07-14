import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import { Badge, IconButton, type Column } from "../../../shared/ui";

import type { Medicine } from "../../../shared/types/medicine";

type MedicineColumnProps = {
  onEdit: (medicine: Medicine) => void;
  onDelete: (medicine: Medicine) => void;
};

export const medicineColumns = ({
  onEdit,
  onDelete,
}: MedicineColumnProps): Column<Medicine>[] => [
  {
    key: "medicineName",
    header: "Medicine",
  },
  {
    key: "manufacturer",
    header: "Manufacturer",
  },
  {
    key: "category",
    header: "Category",
  },
  {
    key: "sellingPrice",
    header: "Selling Price",
    align: "right",
    render: (row) => `₹${row.sellingPrice.toFixed(2)}`,
  },
  {
    key: "minimumStock",
    header: "Min Stock",
    align: "center",
  },
  {
    key: "active",
    header: "Status",
    align: "center",
    render: (row) => (
      <Badge variant={row.active ? "success" : "danger"}>
        {row.active ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    header: "Actions",
    align: "center",
    render: (row) => (
      <div className="flex items-center justify-center gap-2">
        <IconButton
          variant="primary"
          aria-label="Edit Medicine"
          onClick={() => onEdit(row)}
        >
          <PencilSquareIcon className="h-5 w-5" />
        </IconButton>

        <IconButton
          variant="danger"
          aria-label="Delete Medicine"
          onClick={() => onDelete(row)}
        >
          <TrashIcon className="h-5 w-5" />
        </IconButton>
      </div>
    ),
  },
];
