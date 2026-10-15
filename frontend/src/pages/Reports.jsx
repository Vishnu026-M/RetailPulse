import { useState } from "react";
import {
  FileText,
  Download,
  BarChart3,
  TrendingUp,
  Users,
  UserRoundX,
  Package,
  FileBarChart,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const reportTypes = [
  {
    id: "sales",
    title: "Sales Report",
    description: "Revenue, orders, sales trends and regional performance.",
    icon: BarChart3,
  },
  {
    id: "forecast",
    title: "Demand Forecast Report",
    description: "Actual demand, forecasted demand and forecast insights.",
    icon: TrendingUp,
  },
  {
    id: "segmentation",
    title: "Customer Segmentation Report",
    description: "RFM segments, customer distribution and segment revenue.",
    icon: Users,
  },
  {
    id: "churn",
    title: "Churn Analysis Report",
    description: "Churn rate, risk distribution and high-risk customers.",
    icon: UserRoundX,
  },
  {
    id: "inventory",
    title: "Inventory Report",
    description: "Stock levels, reorder requirements and inventory risks.",
    icon: Package,
  },
  {
    id: "executive",
    title: "Executive Summary",
    description: "High-level business KPIs and key analytics insights.",
    icon: FileBarChart,
  },
];

function Reports() {
  const [selectedReport, setSelectedReport] = useState("sales");
  const [format, setFormat] = useState("CSV");
  const [message, setMessage] = useState("");

  const selected = reportTypes.find(
    (report) => report.id === selectedReport
  );

  const handleGenerate = () => {
    setMessage(
      `${selected.title} is ready for ${format} export once the backend reporting service is connected.`
    );

    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
            <FileText size={17} />
            Business Intelligence
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Reports
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Generate business reports from RetailPulse analytics and export
            results for further analysis or sharing.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <Clock3 size={17} className="text-amber-500" />

          <div>
            <p className="text-xs text-slate-400">Reporting Service</p>
            <p className="text-sm font-bold text-slate-700">
              Demo Environment
            </p>
          </div>
        </div>
      </div>

      {/* Report types */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Report Types
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select the report you want to generate.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            const active = selectedReport === report.id;

            return (
              <button
                key={report.id}
                onClick={() => {
                  setSelectedReport(report.id);
                  setMessage("");
                }}
                className={`group rounded-2xl border p-5 text-left transition-all duration-200 ${
                  active
                    ? "border-blue-300 bg-blue-50/60 shadow-sm"
                    : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      active
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                    }`}
                  >
                    <Icon size={21} />
                  </div>

                  {active && (
                    <CheckCircle2
                      size={19}
                      className="text-blue-600"
                    />
                  )}
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  {report.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {report.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Generator */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileText size={19} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Generate Report
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Configure the selected report before exporting it.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">

          {/* Selected report */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-500">
              Selected Report
            </p>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                {selected && <selected.icon size={25} />}
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selected?.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {selected?.description}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white p-4">
                <p className="text-xs text-slate-400">Data Source</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  RetailPulse Analytics
                </p>
              </div>

              <div className="rounded-xl bg-white p-4">
                <p className="text-xs text-slate-400">Environment</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  Demo Data
                </p>
              </div>
            </div>
          </div>

          {/* Export options */}
          <div>
            <h3 className="font-bold text-slate-900">
              Export Format
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Choose the format for your report.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {["CSV", "PDF"].map((item) => {
                const active = format === item;

                return (
                  <button
                    key={item}
                    onClick={() => setFormat(item)}
                    className={`rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-blue-300 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{item}</span>

                      {active && (
                        <CheckCircle2 size={18} />
                      )}
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      {item === "CSV"
                        ? "Spreadsheet-compatible data"
                        : "Presentation-ready document"}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <Download size={17} className="text-slate-500" />

                <p className="text-sm font-semibold text-slate-700">
                  Export destination
                </p>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                The generated file will become available when the backend
                reporting service is connected.
              </p>
            </div>

            <button
              onClick={handleGenerate}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Download size={18} />
              Generate {format} Report
            </button>
          </div>
        </div>

        {message && (
          <div className="mx-6 mb-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <p className="text-sm leading-6 text-blue-700">
              {message}
            </p>
          </div>
        )}
      </section>

      {/* Recent reports */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-6">
          <h2 className="font-bold text-slate-900">
            Recent Reports
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Generated reports will appear here after the reporting backend
            is connected.
          </p>
        </div>

        <div className="flex min-h-[220px] flex-col items-center justify-center p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <FileText size={25} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-700">
            No reports generated yet
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
            Once the backend reporting service is connected, exported
            reports and their generation details will appear here.
          </p>
        </div>
      </section>

      {/* Demo notice */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
        <div className="flex gap-3">
          <Clock3
            size={19}
            className="mt-0.5 shrink-0 text-amber-600"
          />

          <div>
            <h3 className="text-sm font-bold text-amber-900">
              Demo environment
            </h3>

            <p className="mt-1 text-sm leading-6 text-amber-700/80">
              Report generation is currently represented by the frontend
              interface. Real CSV/PDF generation will be connected to the
              RetailPulse backend during the integration stage.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Reports;