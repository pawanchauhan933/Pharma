import { useEffect, useState } from "react";
import { medicineApi } from "../api/medicine.api";
import type { Medicine } from "../../../shared/types/medicine";

export function useMedicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    medicineApi
      .getAll()
      .then(setMedicines)
      .finally(() => setLoading(false));
  }, []);

  return { medicines, loading };
}