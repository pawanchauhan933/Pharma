import { MedicineRepository } from "./medicine.repository";
import type { CreateMedicineDto } from "../../shared/types/medicine";

export class MedicineService {
  private readonly repository = new MedicineRepository();

  create(data: CreateMedicineDto): number {
    this.validate(data);

    return this.repository.create(data);
  }

  update(id: number, data: CreateMedicineDto): void {
    this.validate(data);

    this.repository.update(id, data);
  }

  getAll() {
    return this.repository.findAll();
  }

  getById(id: number) {
    const medicine = this.repository.findById(id);
    if (!medicine) {
      throw new Error("Medicine not found.");
    }

    return medicine;
  }

  private validate(data: CreateMedicineDto) {
    debugger;
    if (data.sellingPrice < data.purchasePrice) {
      throw new Error("Selling price cannot be less than purchase price.");
    }
  }
  deleteMedicine(id: number) {
    this.repository.delete(id);
  }
}
