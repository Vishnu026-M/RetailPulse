import {
  Search,
  Bell,
  Download,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

function Navbar() {
  return (
    <header className="fixed left-72 right-0 top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-8 backdrop-blur">

      {/* Search */}
      <div className="relative w-80">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search analytics..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
        />

      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">

        {/* Date */}
        <button className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 md:flex">

          <CalendarDays size={17} />

          Last 30 days

          <ChevronDown size={15} />

        </button>

        {/* Export */}
        <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">

          <Download size={17} />

          <span className="hidden sm:inline">
            Export
          </span>

        </button>

        {/* Notification */}
        <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50">

          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />

        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-xs font-bold text-white">
            VM
          </div>

          <ChevronDown
            size={15}
            className="hidden text-slate-400 sm:block"
          />

        </button>

      </div>

    </header>
  );
}

export default Navbar;