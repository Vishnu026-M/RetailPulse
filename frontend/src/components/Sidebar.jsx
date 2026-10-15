import {
  LayoutDashboard,
  TrendingUp,
  Users,
  UserRoundX,
  Package,
  SlidersHorizontal,
  Database,
  BrainCircuit,
  FileText,
  Settings,
  LogOut,
  BarChart3,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Demand Forecasting",
    path: "/forecasting",
    icon: TrendingUp,
  },
  {
    label: "Customer Segmentation",
    path: "/segmentation",
    icon: Users,
  },
  {
    label: "Churn Analysis",
    path: "/churn",
    icon: UserRoundX,
  },
  {
    label: "Inventory Optimization",
    path: "/inventory",
    icon: Package,
  },
  {
    label: "What-If Analysis",
    path: "/what-if",
    icon: SlidersHorizontal,
  },
  {
    label: "Data Explorer",
    path: "/data",
    icon: Database,
  },
  {
    label: "Model Performance",
    path: "/models",
    icon: BrainCircuit,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FileText,
  },
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r border-slate-200 bg-white">

      {/* Brand */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
          R
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">
            RetailPulse
          </h1>

          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Retail Intelligence
          </p>
        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-5">

        <div className="mb-3 flex items-center gap-2 px-3">
          <BarChart3 size={13} className="text-blue-500" />

          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Analytics
          </p>
        </div>

        <div className="space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.path;

            return (
              <button
                key={item.path}
                onClick={() => setActivePage(item.path)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >

                <Icon
                  size={18}
                  className={`shrink-0 ${
                    active
                      ? "text-blue-600"
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />

                <span>{item.label}</span>

                {active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                )}

              </button>
            );
          })}

        </div>

        {/* System */}
        <div className="mb-3 mt-8 flex items-center gap-2 px-3">
          <Settings size={13} className="text-slate-400" />

          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            System
          </p>
        </div>

        <button
          onClick={() => setActivePage("/settings")}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-all ${
            activePage === "/settings"
              ? "bg-blue-50 text-blue-700"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Settings size={18} />
          Settings
        </button>

      </nav>

      {/* Demo Environment */}
      <div className="mx-4 mb-3 rounded-xl border border-blue-100 bg-blue-50 p-3">

        <div className="flex items-center gap-2">

          <span className="h-2 w-2 rounded-full bg-blue-500" />

          <span className="text-xs font-semibold text-blue-700">
            Demo Environment
          </span>

        </div>

        <p className="mt-1 text-[11px] leading-4 text-blue-600/70">
          Using sample analytics data
        </p>

      </div>

      {/* Profile */}
      <div className="border-t border-slate-100 p-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-xs font-bold text-white">
            VM
          </div>

          <div className="min-w-0 flex-1">

            <p className="truncate text-sm font-semibold text-slate-800">
              Demo User
            </p>

            <p className="truncate text-xs text-slate-400">
              Administrator
            </p>

          </div>

          <button
            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
            title="Logout"
          >
            <LogOut size={17} />
          </button>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;