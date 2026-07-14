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
      //       {
      //   path: `${ROUTES.MEDICINES}/:id`,
      //   element: <MedicineDetailsPage />,
      // },
      // {
      //   path: `${ROUTES.MEDICINES}/:id/edit`,
      //   element: <EditMedicinePage />,
      // },
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
