import {
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Database,
  CalendarDays,
  GitBranch,
  BarChart3,
  Info,
} from "lucide-react";

const models = [
  {
    id: "forecasting",
    name: "Demand Forecasting",
    description: "Evaluates how accurately the system predicts future product demand.",
    icon: BarChart3,
    status: "Awaiting evaluation",
    type: "Forecasting",
    metrics: [
      { label: "MAPE", value: "Awaiting model evaluation" },
      { label: "MAE", value: "Awaiting model evaluation" },
      { label: "RMSE", value: "Awaiting model evaluation" },
    ],
  },
  {
    id: "segmentation",
    name: "Customer Segmentation",
    description: "Evaluates customer grouping based on RFM behavior and clustering.",
    icon: Database,
    status: "Awaiting evaluation",
    type: "Clustering",
    metrics: [
      { label: "Precision", value: "Awaiting model evaluation" },
      { label: "Recall", value: "Awaiting model evaluation" },
      { label: "F1 Score", value: "Awaiting model evaluation" },
    ],
  },
  {
    id: "churn",
    name: "Churn Prediction",
    description: "Evaluates the model used to identify customers at risk of churn.",
    icon: BrainCircuit,
    status: "Awaiting evaluation",
    type: "Classification",
    metrics: [
      { label: "AUC", value: "Awaiting model evaluation" },
      { label: "Precision", value: "Awaiting model evaluation" },
      { label: "Recall", value: "Awaiting model evaluation" },
      { label: "F1 Score", value: "Awaiting model evaluation" },
    ],
  },
];

function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
      <Clock3 size={13} />
      Awaiting evaluation
    </span>
  );
}

function MetricBox({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-500">
        {value}
      </p>
    </div>
  );
}

function ModelCard({ model }) {
  const Icon = model.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Icon size={21} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900">{model.name}</h3>
            <p className="mt-0.5 text-xs text-slate-400">
              {model.type} model
            </p>
          </div>
        </div>

        <StatusBadge />
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-500">
        {model.description}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {model.metrics.slice(0, 3).map((metric) => (
          <MetricBox
            key={metric.label}
            label={metric.label}
            value={metric.value}
          />
        ))}
      </div>

      {model.metrics.length > 3 && (
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {model.metrics.slice(3).map((metric) => (
            <MetricBox
              key={metric.label}
              label={metric.label}
              value={metric.value}
            />
          ))}
        </div>
      )}

      <div className="mt-5 border-t border-slate-100 pt-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-slate-400">Algorithm</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Awaiting evaluation
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Training Date</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Awaiting evaluation
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Model Version</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Awaiting evaluation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModelPerformance() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
            <BrainCircuit size={17} />
            Machine Learning
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Model Performance
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Monitor evaluation metrics, model versions, training information,
            and performance across RetailPulse machine learning modules.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <Clock3 size={17} />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              Evaluation Status
            </p>
            <p className="text-sm font-bold text-slate-700">
              Awaiting ML Backend
            </p>
          </div>
        </div>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BrainCircuit size={19} />
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Models
            </span>
          </div>

          <p className="mt-4 text-2xl font-bold text-slate-900">3</p>
          <p className="mt-1 text-sm text-slate-500">
            ML modules planned
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={19} />
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Status
            </span>
          </div>

          <p className="mt-4 text-2xl font-bold text-slate-900">3</p>
          <p className="mt-1 text-sm text-slate-500">
            Awaiting evaluation
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Database size={19} />
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Dataset
            </span>
          </div>

          <p className="mt-4 text-lg font-bold text-slate-900">
            Not connected
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Dataset version unavailable
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={19} />
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Backend
            </span>
          </div>

          <p className="mt-4 text-lg font-bold text-slate-900">
            Not connected
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Evaluation API will appear here
          </p>
        </div>
      </div>

      {/* Model cards */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Model Evaluation
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Evaluation results will populate automatically after the ML
            backend is connected.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {models.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BarChart3 size={19} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Model Comparison
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Compare evaluation metrics across model versions once
                evaluation results are available.
              </p>
            </div>
          </div>
        </div>

        <div className="flex min-h-[260px] flex-col items-center justify-center p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <BarChart3 size={25} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-700">
            No evaluation data available
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
            Model comparison charts will be displayed here after the
            forecasting, segmentation, and churn models have been evaluated.
          </p>
        </div>
      </section>

      {/* Model metadata */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="font-bold text-slate-900">
            Model Metadata
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Version and training information supplied by the ML backend.
          </p>
        </div>

        <div className="grid grid-cols-1 divide-y divide-slate-100 md:grid-cols-3 md:divide-x md:divide-y-0">

          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <GitBranch size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-400">Model Version</p>
                <p className="mt-1 text-sm font-bold text-slate-700">
                  Awaiting evaluation
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <CalendarDays size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-400">Training Date</p>
                <p className="mt-1 text-sm font-bold text-slate-700">
                  Awaiting evaluation
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Database size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-400">Dataset Version</p>
                <p className="mt-1 text-sm font-bold text-slate-700">
                  Awaiting evaluation
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Monitoring note */}
      <div className="flex gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
          <Info size={18} />
        </div>

        <div>
          <h3 className="text-sm font-bold text-blue-900">
            ML evaluation pipeline
          </h3>

          <p className="mt-1 text-sm leading-6 text-blue-700/80">
            RetailPulse is currently using the frontend demonstration
            environment. Once the Python ML backend is connected, actual
            evaluation metrics, model versions, training dates, and dataset
            versions can be displayed here.
          </p>
        </div>
      </div>

    </div>
  );
}

export default ModelPerformance;