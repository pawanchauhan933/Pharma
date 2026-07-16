// shared/constants/routes.ts

export const ROUTES = {
  DASHBOARD: "/",
  MEDICINES: "/medicines",
  LIST_MEDICINE: "/medicines/list",
  ADD_MEDICINE: "/medicines/new",
  EDIT_MEDICINE: "/medicines/:id/edit",
  INVENTORY: "/inventory",
  PURCHASE: "/purchase",
  SALES: "/sales",
  REPORTS: "/reports",
  SETTINGS: "/settings",
  MANUFACTURERS: "/manufacturers",
  LIST_MANUFACTURER: "/manufacturers/list",
  ADD_MANUFACTURER: "/manufacturers/new",
  EDIT_MANUFACTURER: "/manufacturers/:id/edit",
} as const;
