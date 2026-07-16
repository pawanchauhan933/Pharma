import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Checkbox, Input, Section, TextArea } from "../../../shared/ui";

import {
  manufacturerSchema,
  type ManufacturerFormData,
} from "../schemas/manufacturer.schema";

type ManufacturerFormProps = {
  defaultValues?: Partial<ManufacturerFormData>;
  onSubmit: (data: ManufacturerFormData) => void | Promise<void>;
  submitText?: string;
  loading?: boolean;
  onCancel?: () => void;
};

const ManufacturerForm = ({
  defaultValues,
  onSubmit,
  submitText = "Save Manufacturer",
  loading = false,
  onCancel,
}: ManufacturerFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ManufacturerFormData>({
    resolver: zodResolver(manufacturerSchema),
    defaultValues: {
      active: true,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Section
        title="Manufacturer Information"
        description="Basic details about the manufacturer."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Manufacturer Name"
            required
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Contact Person"
            error={errors.contactPerson?.message}
            {...register("contactPerson")}
          />

          <Input
            label="Phone"
            error={errors.phone?.message}
            {...register("phone")}
          />

          <Input
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <div className="mt-4">
          <TextArea
            label="Address"
            error={errors.address?.message}
            {...register("address")}
          />
        </div>

        <div className="mt-4">
          <TextArea
            label="Description"
            error={errors.description?.message}
            {...register("description")}
          />
        </div>
      </Section>

      <Section
        title="Status"
        description="Enable or disable this manufacturer."
      >
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

export default ManufacturerForm;
