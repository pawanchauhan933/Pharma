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

import { useMedicines } from "../hooks/useMedicines";
import { medicineColumns } from "../columns/medicine.columns";
import { medicineApi } from "../api/medicine.api";

import type { Medicine } from "../../../shared/types/medicine";

const MedicineListPage = () => {
  const navigate = useNavigate();
  const { medicines, loading } = useMedicines();

  const [search, setSearch] = useState("");

  const handleEdit = (medicine: Medicine) => {
    navigate(`/medicines/${medicine.id}/edit`);
  };

  const handleDelete = async (medicine: Medicine) => {
    const confirmed = window.confirm(`Delete "${medicine.medicineName}"?`);

    if (!confirmed) return;

    try {
      await medicineApi.delete(medicine.id);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete medicine.");
    }
  };

  const filteredMedicines = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return medicines;

    return medicines.filter((medicine) =>
      [
        medicine.medicineName,
        medicine.genericName,
        medicine.manufacturer,
        medicine.category,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(keyword)),
    );
  }, [medicines, search]);

  return (
    <>
      <PageHeader
        title="Medicines"
        description="Manage all medicines available in your pharmacy."
        action={
          <Button onClick={() => navigate("/medicines/new")}>
            + Add Medicine
          </Button>
        }
      />

      <div className="mb-4">
        <Input
          label="Search Medicines"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card>
        {loading ? (
          <div className="py-10 text-center">Loading...</div>
        ) : filteredMedicines.length === 0 ? (
          <EmptyState
            title="No medicines found"
            description={
              search
                ? "No medicines match your search."
                : "Start by adding your first medicine."
            }
          />
        ) : (
          <DataTable
            columns={medicineColumns({
              onEdit: handleEdit,
              onDelete: handleDelete,
            })}
            data={filteredMedicines}
            rowKey={(medicine) => medicine.id}
            loading={loading}
            emptyMessage="No medicines found."
            showSerialNumber
          />
        )}
      </Card>
    </>
  );
};

export default MedicineListPage;
