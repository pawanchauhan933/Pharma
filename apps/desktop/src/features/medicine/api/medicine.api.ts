import type {
  CreateMedicineDto,
  Medicine,
} from "../../../shared/types/medicine";

export const medicineApi = {
  create(data: CreateMedicineDto) {
    return window.api.medicine.create(data);
  },

  getAll(): Promise<Medicine[]> {
    return window.api.medicine.getAll();
  },

  getById(id: number): Promise<Medicine> {
    return window.api.medicine.getById(id);
  },

  update(id: number, data: CreateMedicineDto) {
    return window.api.medicine.update(id, data);
  },
  delete(id: number) {
    return window.api.medicine.delete(id);
  },
};
