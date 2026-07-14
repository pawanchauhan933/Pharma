import { Outlet } from "react-router-dom";
import Header from "../shared/components/Header/Header";
import Sidebar from "../shared/components/Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-slate-100">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;