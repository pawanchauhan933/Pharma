import type {
  CreateManufacturerDto,
  Manufacturer,
} from "../../../shared/types/manufacturer";

export const manufacturerApi = {
  create(data: CreateManufacturerDto) {
    return window.api.manufacturer.create(data);
  },

  getAll(): Promise<Manufacturer[]> {
    return window.api.manufacturer.getAll();
  },

  getById(id: number): Promise<Manufacturer> {
    return window.api.manufacturer.getById(id);
  },

  update(id: number, data: CreateManufacturerDto) {
    return window.api.manufacturer.update(id, data);
  },
  delete(id: number) {
    return window.api.manufacturer.delete(id);
  },
};
