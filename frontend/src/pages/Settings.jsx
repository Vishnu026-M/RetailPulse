import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Palette,
  Shield,
  Database,
  Moon,
  Sun,
  CheckCircle2,
  Save,
} from "lucide-react";

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 rounded-full transition ${
        enabled ? "bg-blue-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [modelAlerts, setModelAlerts] = useState(true);
  const [inventoryAlerts, setInventoryAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
          <SettingsIcon size={17} />
          System Configuration
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Manage your RetailPulse profile, notifications, appearance and
          application preferences.
        </p>
      </div>

      {/* Profile */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <User size={19} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Profile
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your RetailPulse account information.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              defaultValue="Demo User"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              type="email"
              defaultValue="demo@retailpulse.local"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Role
            </label>

            <input
              type="text"
              value="Administrator"
              readOnly
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Environment
            </label>

            <input
              type="text"
              value="Demo Environment"
              readOnly
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 outline-none"
            />
          </div>

        </div>
      </section>

      {/* Appearance */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Palette size={19} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Appearance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Customize the look and feel of the dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-600">
                {darkMode ? <Moon size={18} /> : <Sun size={18} />}
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Dark Mode
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Switch between light and dark appearance.
                </p>
              </div>
            </div>

            <Toggle
              enabled={darkMode}
              onChange={setDarkMode}
            />
          </div>

          {darkMode && (
            <div className="mt-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
              <p className="text-sm text-amber-700">
                Dark mode preference is saved locally in the frontend demo.
                Full theme support can be connected later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Bell size={19} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose which analytics alerts you want to receive.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">

          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Email Notifications
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Receive important RetailPulse notifications by email.
              </p>
            </div>

            <Toggle
              enabled={emailAlerts}
              onChange={setEmailAlerts}
            />
          </div>

          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Model Alerts
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Get notified about model evaluation and performance changes.
              </p>
            </div>

            <Toggle
              enabled={modelAlerts}
              onChange={setModelAlerts}
            />
          </div>

          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Inventory Alerts
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Receive alerts for low stock and stockout risks.
              </p>
            </div>

            <Toggle
              enabled={inventoryAlerts}
              onChange={setInventoryAlerts}
            />
          </div>

        </div>
      </section>

      {/* Data & Security */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Database size={19} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Data Connection
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current analytics data source.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                Backend API
              </span>

              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                Not Connected
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-400">
              The application is currently using frontend demonstration
              data. This will be replaced by the RetailPulse API during
              backend integration.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Shield size={19} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Security
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Application security configuration.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <span className="text-sm text-slate-600">
                Authentication
              </span>

              <span className="text-xs font-semibold text-amber-600">
                Demo
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <span className="text-sm text-slate-600">
                API Credentials
              </span>

              <span className="text-xs font-semibold text-emerald-600">
                Environment Variables
              </span>
            </div>
          </div>
        </div>

      </section>

      {/* Save */}
      <div className="flex flex-col justify-end gap-3 sm:flex-row">

        {saved && (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700">
            <CheckCircle2 size={17} />
            Settings saved
          </div>
        )}

        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Save size={17} />
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default Settings;