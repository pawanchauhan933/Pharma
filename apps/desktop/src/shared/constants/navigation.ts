import {
  HomeIcon,
  BeakerIcon,
  CubeIcon,
  ShoppingCartIcon,
  BanknotesIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import { ROUTES } from "./routes";

export const navigation = [
  {
    name: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: HomeIcon,
  },
  {
    name: "Medicines",
    path: ROUTES.LIST_MEDICINE,
    icon: BeakerIcon,
  },
  {
    name: "Inventory",
    path: ROUTES.INVENTORY,
    icon: CubeIcon,
  },
  {
    name: "Purchase",
    path: ROUTES.PURCHASE,
    icon: ShoppingCartIcon,
  },
  {
    name: "Sales",
    path: ROUTES.SALES,
    icon: BanknotesIcon,
  },
  {
    name: "Reports",
    path: ROUTES.REPORTS,
    icon: ChartBarIcon,
  },
  {
    name: "Settings",
    path: ROUTES.SETTINGS,
    icon: Cog6ToothIcon,
  },
];