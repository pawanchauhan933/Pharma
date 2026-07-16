import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import MedicinePage from "../../features/medicine/pages/MedicinePage";
import InventoryPage from "../../features/inventory/pages/InventoryPage";
import PurchasePage from "../../features/purchase/pages/PurchasePage";
import SalesPage from "../../features/sales/pages/SalesPage";
import ReportsPage from "../../features/reports/pages/ReportsPage";
import SettingsPage from "../../features/settings/pages/SettingsPage";
import MedicineListPage from "../../features/medicine/pages/MedicineListPage";
import AddMedicinePage from "../../features/medicine/pages/AddMedicinePage";
import { ROUTES } from "../../shared/constants/routes";
import EditMedicinePage from "../../features/medicine/pages/EditMedicinePage";
import ManufacturerListPage from "../../features/manufacturer/pages/ManufacturerListPage";
import AddManufacturerPage from "../../features/manufacturer/pages/AddManufacturerPage";
import EditManufacturerPage from "../../features/manufacturer/pages/EditManufacturerPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.MEDICINES,
        element: <MedicinePage />,
      },
      {
        path: ROUTES.LIST_MEDICINE,
        element: <MedicineListPage />,
      },
      {
        path: ROUTES.ADD_MEDICINE,
        element: <AddMedicinePage />,
      },
      {
        path: ROUTES.EDIT_MEDICINE,
        element: <EditMedicinePage />,
      },
      {
        path: ROUTES.LIST_MANUFACTURER,
        element: <ManufacturerListPage />,
      },
      {
        path: ROUTES.ADD_MANUFACTURER,
        element: <AddManufacturerPage />,
      },
      {
        path: ROUTES.EDIT_MANUFACTURER,
        element: <EditManufacturerPage />,
      },
      {
        path: ROUTES.INVENTORY,
        element: <InventoryPage />,
      },
      {
        path: ROUTES.PURCHASE,
        element: <PurchasePage />,
      },
      {
        path: ROUTES.SALES,
        element: <SalesPage />,
      },
      {
        path: ROUTES.REPORTS,
        element: <ReportsPage />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <SettingsPage />,
      },
    ],
  },
]);
