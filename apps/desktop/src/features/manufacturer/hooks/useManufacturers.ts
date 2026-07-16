import { useEffect, useState } from "react";

import { manufacturerApi } from "../api/manufacturer.api";

import type { Manufacturer } from "../../../shared/types/manufacturer";

export function useManufacturers() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    manufacturerApi
      .getAll()
      .then(setManufacturers)
      .finally(() => setLoading(false));
  }, []);

  return { manufacturers, loading };
}
