import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Input,
  Section,
  Select,
  TextArea,
} from "../../../shared/ui";
import {
  medicineSchema,
  type MedicineFormData,
} from "../schemas/medicine.schema";

type MedicineFormProps = {
  defaultValues?: Partial<MedicineFormData>;
  onSubmit: (data: MedicineFormData) => void | Promise<void>;
  submitText?: string;
  loading?: boolean;
  onCancel?: () => void;
};

const manufacturers = [
  { label: "Cipla", value: "cipla" },
  { label: "Sun Pharma", value: "sun-pharma" },
  { label: "Mankind", value: "mankind" },
];

const categories = [
  { label: "Tablet", value: "tablet" },
  { label: "Capsule", value: "capsule" },
  { label: "Syrup", value: "syrup" },
  { label: "Injection", value: "injection" },
];

const MedicineForm = ({
  defaultValues,
  onSubmit,
  submitText = "Save Medicine",
  loading = false,
  onCancel,
}: MedicineFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MedicineFormData>({
    defaultValues: {
      active: true,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Section
        title="Medicine Information"
        description="Basic information about the medicine."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            {...register("medicineName")}
            label="Medicine Name"
            placeholder="Enter medicine name"
            required
            error={errors.medicineName?.message}
          />

          <Input
            label="Generic Name"
            placeholder="Enter generic name"
            error={errors.genericName?.message}
            {...register("genericName")}
          />

          <Select
            label="Manufacturer"
            options={manufacturers}
            required
            error={errors.manufacturer?.message}
            {...register("manufacturer")}
          />

          <Select
            label="Category"
            options={categories}
            required
            error={errors.category?.message}
            {...register("category")}
          />
        </div>

        <div className="mt-4">
          <TextArea
            label="Description"
            placeholder="Enter medicine description..."
            error={errors.description?.message}
            {...register("description")}
          />
        </div>
      </Section>

      <Section
        title="Pricing"
        description="Configure medicine pricing and stock."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Input
            label="Purchase Price"
            type="number"
            step="0.01"
            required
            error={errors.purchasePrice?.message}
            {...register("purchasePrice")}
          />

          <Input
            label="Selling Price"
            type="number"
            step="0.01"
            required
            error={errors.sellingPrice?.message}
            {...register("sellingPrice")}
          />

          <Input
            label="Minimum Stock"
            type="number"
            required
            error={errors.minimumStock?.message}
            {...register("minimumStock")}
          />
        </div>
      </Section>

      <Section title="Status" description="Enable or disable this medicine.">
        <Checkbox label="Active" {...register("active")} />
      </Section>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : submitText}
        </Button>
      </div>
    </form>
  );
};

export default MedicineForm;
