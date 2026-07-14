export {};

import type { CreateMedicineDto } from "./medicine";

declare global {
  interface Window {
    api: {
      medicine: {
        create: (data: CreateMedicineDto) => Promise<number>;
        getAll: () => Promise<any[]>;
        getById: (id: number) => Promise<any>;
        update: (id: number, data: CreateMedicineDto) => Promise<void>;
        delete: (id: number) => Promise<void>;
      };
    };
  }
}