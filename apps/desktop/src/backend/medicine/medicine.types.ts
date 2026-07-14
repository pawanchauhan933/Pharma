export interface CreateMedicineDto {
  medicineName: string;
  genericName?: string;
  manufacturer: string;
  category: string;
  description?: string;

  purchasePrice: number;
  sellingPrice: number;
  minimumStock: number;

  active: boolean;
}

export interface Medicine extends CreateMedicineDto {
  id: number;
  createdAt: string;
  updatedAt: string;
}
