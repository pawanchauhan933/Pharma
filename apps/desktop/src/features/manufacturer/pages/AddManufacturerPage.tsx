import { useNavigate } from "react-router-dom";

import { PageHeader } from "../../../shared/ui";
import { ROUTES } from "../../../shared/constants/routes";

import { manufacturerApi } from "../api/manufacturer.api";
import ManufacturerForm from "../components/ManufacturerForm";

import type { ManufacturerFormData } from "../schemas/manufacturer.schema";

const AddManufacturerPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: ManufacturerFormData) => {
    try {
      await manufacturerApi.create(data);

      navigate(ROUTES.LIST_MANUFACTURER);
    } catch (error) {
      console.error(error);
      alert("Failed to create manufacturer.");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Manufacturer"
        description="Create a manufacturer to associate with medicines."
      />

      <ManufacturerForm
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.LIST_MANUFACTURER)}
      />
    </div>
  );
};

export default AddManufacturerPage;
