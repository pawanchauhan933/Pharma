import { useNavigate } from "react-router-dom";

import { PageHeader } from "../../../shared/ui";
import { medicineApi } from "../api/medicine.api";
import MedicineForm from "../components/MedicineForm";
import type { MedicineFormData } from "../schemas/medicine.schema";

const AddMedicinePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: MedicineFormData) => {
    await medicineApi.create(data as any);

    navigate("/medicines/list");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Medicine"
        description="Create a new medicine in the inventory."
      />

      <MedicineForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/medicines/list")}
      />
    </div>
  );
};

export default AddMedicinePage;