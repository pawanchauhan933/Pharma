import { ManufacturerRepository } from "./manufacturer.repository";
import type { CreateManufacturerDto } from "../../shared/types/manufacturer";

export class ManufacturerService {
  private readonly repository = new ManufacturerRepository();

  create(data: CreateManufacturerDto): number {
    this.validate(data);

    return this.repository.create(data);
  }

  update(id: number, data: CreateManufacturerDto): void {
    this.validate(data);

    this.repository.update(id, data);
  }

  getAll() {
    return this.repository.findAll();
  }

  getById(id: number) {
    const manufacturer = this.repository.findById(id);

    if (!manufacturer) {
      throw new Error("Manufacturer not found.");
    }

    return manufacturer;
  }

  delete(id: number): void {
    this.repository.delete(id);
  }

  private validate(data: CreateManufacturerDto) {
    if (!data.name.trim()) {
      throw new Error("Manufacturer name is required.");
    }
  }
}