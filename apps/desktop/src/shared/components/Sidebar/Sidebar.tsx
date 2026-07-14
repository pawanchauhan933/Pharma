import { NavLink } from "react-router-dom";
import { navigation } from "../../constants/navigation";
import logo from "../../../assets/logo.png";
const Sidebar = () => {
  return (
    <aside className="w-64 min-w-64 border-r bg-white flex flex-col">
      {/* Logo Section */}
      <div className="border-b p-4">
        <img
          src={logo}
          alt="Pharmacy Inventory System"
          className="h-12 w-auto"
        />
        <p className="text-xs text-slate-500">Offline First</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <div className="h-5 w-5 flex items-center justify-center overflow-hidden">
                <Icon className="h-full w-full" />
              </div>
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
