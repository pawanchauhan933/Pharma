export interface CreateManufacturerDto {
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  description?: string;
  active: boolean;
}

export interface Manufacturer extends CreateManufacturerDto {
  id: number;
  createdAt: string;
  updatedAt: string;
}