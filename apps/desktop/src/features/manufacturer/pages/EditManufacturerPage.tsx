import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PageHeader } from "../../../shared/ui";
import { ROUTES } from "../../../shared/constants/routes";

import { manufacturerApi } from "../api/manufacturer.api";
import ManufacturerForm from "../components/ManufacturerForm";

import type { Manufacturer } from "../../../shared/types/manufacturer";
import type { ManufacturerFormData } from "../schemas/manufacturer.schema";

const EditManufacturerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [manufacturer, setManufacturer] =
    useState<Manufacturer | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadManufacturer = async () => {
      if (!id) return;

      try {
        const data = await manufacturerApi.getById(Number(id));
        setManufacturer(data);
      } catch (error) {
        console.error(error);
        alert("Unable to load manufacturer.");
      } finally {
        setLoading(false);
      }
    };

    loadManufacturer();
  }, [id]);

  const handleUpdate = async (
    data: ManufacturerFormData,
  ) => {
    if (!id) return;

    try {
      await manufacturerApi.update(Number(id), data);

      navigate(ROUTES.LIST_MANUFACTURER);
    } catch (error) {
      console.error(error);
      alert("Failed to update manufacturer.");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!manufacturer) {
    return (
      <div className="p-6">
        Manufacturer not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Manufacturer"
        description="Update manufacturer details."
      />

      <ManufacturerForm
        defaultValues={manufacturer}
        submitText="Update Manufacturer"
        onSubmit={handleUpdate}
        onCancel={() =>
          navigate(ROUTES.LIST_MANUFACTURER)
        }
      />
    </div>
  );
};

export default EditManufacturerPage;