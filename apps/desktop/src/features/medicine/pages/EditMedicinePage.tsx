import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PageHeader } from "../../../shared/ui";
import { medicineApi } from "../api/medicine.api";
import MedicineForm from "../components/MedicineForm";
import type { Medicine } from "../../../shared/types/medicine";
import type { MedicineFormData } from "../schemas/medicine.schema";

const EditMedicinePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadMedicine = async () => {
      if (!id) return;

      try {
        const data = await medicineApi.getById(Number(id));
        setMedicine(data);
      } catch {
        setError("Unable to load medicine.");
      } finally {
        setLoading(false);
      }
    };

    loadMedicine();
  }, [id]);

  const handleUpdate = async (data: MedicineFormData) => {
    if (!id) return;

    try {
      await medicineApi.update(Number(id), data as any);

      navigate("/medicines/list");
    } catch (error) {
      alert("Failed to update medicine.");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!medicine) {
    return <div className="p-6">Medicine not found.</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Medicine"
        description="Update medicine information."
      />

      <MedicineForm
        defaultValues={medicine}
        submitText="Update Medicine"
        onSubmit={handleUpdate}
        onCancel={() => navigate("/medicines/list")}
      />
    </div>
  );
};

export default EditMedicinePage;
