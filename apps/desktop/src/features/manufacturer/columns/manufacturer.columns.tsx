import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import { Badge, IconButton, type Column } from "../../../shared/ui";

import type { Manufacturer } from "../../../shared/types/manufacturer";

type ManufacturerColumnProps = {
  onEdit: (manufacturer: Manufacturer) => void;
  onDelete: (manufacturer: Manufacturer) => void;
};

export const manufacturerColumns = ({
  onEdit,
  onDelete,
}: ManufacturerColumnProps): Column<Manufacturer>[] => [
  {
    key: "name",
    header: "Manufacturer",
  },
  {
    key: "contactPerson",
    header: "Contact Person",
  },
  {
    key: "phone",
    header: "Phone",
  },
  {
    key: "email",
    header: "Email",
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
          aria-label="Edit Manufacturer"
          onClick={() => onEdit(row)}
        >
          <PencilSquareIcon className="h-5 w-5" />
        </IconButton>

        <IconButton
          variant="danger"
          aria-label="Delete Manufacturer"
          onClick={() => onDelete(row)}
        >
          <TrashIcon className="h-5 w-5" />
        </IconButton>
      </div>
    ),
  },
];
