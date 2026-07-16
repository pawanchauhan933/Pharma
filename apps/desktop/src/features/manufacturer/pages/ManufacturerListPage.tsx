import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  DataTable,
  EmptyState,
  Input,
  PageHeader,
} from "../../../shared/ui";

import { manufacturerColumns } from "../columns/manufacturer.columns";
import { manufacturerApi } from "../api/manufacturer.api";
import { useManufacturers } from "../hooks/useManufacturers";

import type { Manufacturer } from "../../../shared/types/manufacturer";

const PAGE_SIZE = 10;

const ManufacturerListPage = () => {
  const navigate = useNavigate();

  const { manufacturers, loading } = useManufacturers();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleEdit = (manufacturer: Manufacturer) => {
    navigate(`/manufacturers/${manufacturer.id}/edit`);
  };

  const handleDelete = async (manufacturer: Manufacturer) => {
    const confirmed = window.confirm(
      `Delete "${manufacturer.name}"?`,
    );

    if (!confirmed) return;

    try {
      await manufacturerApi.delete(manufacturer.id);

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete manufacturer.");
    }
  };

  const filteredManufacturers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return manufacturers;

    return manufacturers.filter((manufacturer) =>
      [
        manufacturer.name,
        manufacturer.description,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(keyword)),
    );
  }, [manufacturers, search]);

  const paginatedManufacturers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;

    return filteredManufacturers.slice(
      start,
      start + PAGE_SIZE,
    );
  }, [filteredManufacturers, currentPage]);

  return (
    <>
      <PageHeader
        title="Manufacturers"
        description="Manage all manufacturers."
        action={
          <Button
            onClick={() => navigate("/manufacturers/new")}
          >
            + Add Manufacturer
          </Button>
        }
      />

      <div className="mb-4">
        <Input
          label="Search Manufacturers"
          placeholder="Search manufacturers..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <Card>
        {loading ? (
          <div className="py-10 text-center">
            Loading...
          </div>
        ) : filteredManufacturers.length === 0 ? (
          <EmptyState
            title="No manufacturers found"
            description={
              search
                ? "No manufacturers match your search."
                : "Start by adding your first manufacturer."
            }
          />
        ) : (
          <DataTable
            columns={manufacturerColumns({
              onEdit: handleEdit,
              onDelete: handleDelete,
            })}
            data={paginatedManufacturers}
            rowKey={(manufacturer) => manufacturer.id}
            loading={loading}
            emptyMessage="No manufacturers found."
            showSerialNumber
            currentPage={currentPage}
            pageSize={PAGE_SIZE}
            totalRecords={filteredManufacturers.length}
            onPageChange={setCurrentPage}
          />
        )}
      </Card>
    </>
  );
};

export default ManufacturerListPage;