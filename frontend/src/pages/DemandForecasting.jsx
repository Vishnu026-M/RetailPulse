import { useMemo, useState } from "react";
import { useEffect } from "react";
import { getForecastData } from "../services/forecastApi";
import {
  TrendingUp,
  TrendingDown,
  CalendarDays,
  Package,
  Store,
  MapPin,
  BarChart3,
  Target,
  Info,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

/* ---------------------------------------------
   DEMO DATA
   Replace with API data later
---------------------------------------------- */



/* ---------------------------------------------
   FILTER
---------------------------------------------- */

function FilterSelect({
  icon: Icon,
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div className="min-w-0 flex-1">
      <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
        <Icon size={14} />
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ---------------------------------------------
   METRIC CARD
---------------------------------------------- */

function MetricCard({ title, value, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={19} />
        </div>

        <Info size={15} className="text-slate-300" />
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

/* ---------------------------------------------
   TOOLTIP
---------------------------------------------- */

function ForecastTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
      <p className="mb-2 text-xs font-bold text-slate-800">
        {label}
      </p>

      {payload.map((item) => (
        <div
          key={item.dataKey}
          className="flex items-center justify-between gap-6 text-xs"
        >
          <span className="text-slate-500">
            {item.name}
          </span>

          <span className="font-semibold text-slate-800">
            {item.value ?? "—"}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------
   MAIN PAGE
---------------------------------------------- */

function DemandForecasting() {
  const [apiForecast, setApiForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [horizon, setHorizon] = useState(30);
  useEffect(() => {
    async function loadForecast() {
      try {
        setLoading(true);

        const data = await getForecastData(horizon);

        setApiForecast(data);
        setError("");
      } catch (err) {
        console.error("Forecast API error:", err);
        setError("Unable to load forecast data from backend.");
      } finally {
        setLoading(false);
      }
    }

    loadForecast();
  }, [horizon]);
  const horizonMetrics = {
  7: {
    mape:
      apiForecast?.metrics?.mape !== null &&
      apiForecast?.metrics?.mape !== undefined
        ? `${apiForecast.metrics.mape}%`
        : "Awaiting Model",

    mae:
      apiForecast?.metrics?.mae !== null &&
      apiForecast?.metrics?.mae !== undefined
        ? apiForecast.metrics.mae
        : "Awaiting Model",

    rmse:
      apiForecast?.metrics?.rmse !== null &&
      apiForecast?.metrics?.rmse !== undefined
        ? apiForecast.metrics.rmse
        : "Awaiting Model",
  },

  14: {
    mape:
      apiForecast?.metrics?.mape !== null &&
      apiForecast?.metrics?.mape !== undefined
        ? `${apiForecast.metrics.mape}%`
        : "Awaiting Model",

    mae:
      apiForecast?.metrics?.mae !== null &&
      apiForecast?.metrics?.mae !== undefined
        ? apiForecast.metrics.mae
        : "Awaiting Model",

    rmse:
      apiForecast?.metrics?.rmse !== null &&
      apiForecast?.metrics?.rmse !== undefined
        ? apiForecast.metrics.rmse
        : "Awaiting Model",
  },

  30: {
    mape:
      apiForecast?.metrics?.mape !== null &&
      apiForecast?.metrics?.mape !== undefined
        ? `${apiForecast.metrics.mape}%`
        : "Awaiting Model",

    mae:
      apiForecast?.metrics?.mae !== null &&
      apiForecast?.metrics?.mae !== undefined
        ? apiForecast.metrics.mae
        : "Awaiting Model",

    rmse:
      apiForecast?.metrics?.rmse !== null &&
      apiForecast?.metrics?.rmse !== undefined
        ? apiForecast.metrics.rmse
        : "Awaiting Model",
  },

  60: {
    mape:
      apiForecast?.metrics?.mape !== null &&
      apiForecast?.metrics?.mape !== undefined
        ? `${apiForecast.metrics.mape}%`
        : "Awaiting Model",

    mae:
      apiForecast?.metrics?.mae !== null &&
      apiForecast?.metrics?.mae !== undefined
        ? apiForecast.metrics.mae
        : "Awaiting Model",

    rmse:
      apiForecast?.metrics?.rmse !== null &&
      apiForecast?.metrics?.rmse !== undefined
        ? apiForecast.metrics.rmse
        : "Awaiting Model",
  },
};
  const forecastData =
  apiForecast?.forecast?.map((item) => ({
    day: item.day,
    actual: item.actual,
    forecast: item.forecast,
    lower: item.lower,
    upper: item.upper,
  })) || [];
  const [product, setProduct] = useState("All Products");
  const [category, setCategory] = useState("All Categories");
  const [store, setStore] = useState("All Stores");
  const [region, setRegion] = useState("All Regions");
  const [dateRange, setDateRange] = useState("Last 90 Days");
  

  const data = useMemo(() => {
    return forecastData[horizon];
  }, [horizon]);

  const metrics = horizonMetrics[horizon];

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-600">
              AI Forecasting
            </span>

            <span className="text-xs text-slate-400">
              Demo Data
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Demand Forecasting
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Predict future product demand using historical sales patterns
            and machine learning models.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <CalendarDays size={15} />
          Forecast horizon:{" "}
          <span className="font-semibold text-slate-700">
            {horizon} days
          </span>
        </div>

      </div>


      {/* FILTERS */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Forecast Filters
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Select the business dimensions for your forecast.
            </p>
          </div>

          <button
            onClick={() => {
              setProduct("All Products");
              setCategory("All Categories");
              setStore("All Stores");
              setRegion("All Regions");
              setDateRange("Last 90 Days");
            }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Reset filters
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">

          <FilterSelect
            icon={Package}
            label="Product"
            value={product}
            onChange={setProduct}
            options={[
              "All Products",
              "Product A",
              "Product B",
              "Product C",
              "Product D",
            ]}
          />

          <FilterSelect
            icon={BarChart3}
            label="Category"
            value={category}
            onChange={setCategory}
            options={[
              "All Categories",
              "Electronics",
              "Grocery",
              "Home & Living",
              "Fashion",
            ]}
          />

          <FilterSelect
            icon={Store}
            label="Store"
            value={store}
            onChange={setStore}
            options={[
              "All Stores",
              "Store 001",
              "Store 002",
              "Store 003",
              "Store 004",
            ]}
          />

          <FilterSelect
            icon={MapPin}
            label="Region"
            value={region}
            onChange={setRegion}
            options={[
              "All Regions",
              "North",
              "South",
              "East",
              "West",
            ]}
          />

          <FilterSelect
            icon={CalendarDays}
            label="Date Range"
            value={dateRange}
            onChange={setDateRange}
            options={[
              "Last 30 Days",
              "Last 90 Days",
              "Last 6 Months",
              "Last 12 Months",
            ]}
          />

        </div>

      </div>


      {/* HORIZON */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Forecast Horizon
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Choose how far into the future you want to forecast.
            </p>
          </div>

          <div className="grid grid-cols-4 rounded-xl bg-slate-100 p-1">

            {[7, 14, 30, 60].map((days) => (
              <button
                key={days}
                onClick={() => setHorizon(days)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                  horizon === days
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {days} Days
              </button>
            ))}

          </div>

        </div>

      </div>


      {/* CHART */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-start">

          <div>
            <h2 className="text-base font-bold text-slate-800">
              Historical Demand + Forecast
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Actual demand compared with predicted demand and confidence interval.
            </p>
          </div>

          <div className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
            Demo forecast visualization
          </div>

        </div>

        <div className="h-[380px]">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart
              data={forecastData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >

              <defs>

                <linearGradient
                  id="confidenceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#8b5cf6"
                    stopOpacity={0.16}
                  />

                  <stop
                    offset="95%"
                    stopColor="#8b5cf6"
                    stopOpacity={0.02}
                  />
                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                interval={horizon === 60 ? 6 : horizon === 30 ? 2 : 0}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
              />

              <Tooltip content={<ForecastTooltip />} />

              <Legend />

              <Area
                type="monotone"
                dataKey="upper"
                name="Upper Confidence"
                stroke="transparent"
                fill="url(#confidenceGradient)"
              />

              <Area
                type="monotone"
                dataKey="lower"
                name="Lower Confidence"
                stroke="transparent"
                fill="#ffffff"
                fillOpacity={1}
              />

              <Line
                type="monotone"
                dataKey="actual"
                name="Actual Demand"
                stroke="#0f172a"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                connectNulls={false}
              />

              <Line
                type="monotone"
                dataKey="forecast"
                name="Predicted Demand"
                stroke="#8b5cf6"
                strokeWidth={2.5}
                strokeDasharray="7 5"
                dot={{ r: 2 }}
              />

              <ReferenceLine
                y={1000}
                stroke="#cbd5e1"
                strokeDasharray="4 4"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* METRICS */}

      <div>

        <div className="mb-4">

          <h2 className="text-base font-bold text-slate-800">
            Forecast Evaluation
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Model evaluation metrics will be populated after backend evaluation.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <MetricCard
            title="MAPE"
            value={metrics.mape}
            description="Mean Absolute Percentage Error"
            icon={Target}
          />

          <MetricCard
            title="MAE"
            value={metrics.mae}
            description="Mean Absolute Error"
            icon={BarChart3}
          />

          <MetricCard
            title="RMSE"
            value={metrics.rmse}
            description="Root Mean Square Error"
            icon={TrendingUp}
          />

          <MetricCard
            title="Forecast Horizon"
            value={`${horizon} Days`}
            description="Selected prediction window"
            icon={CalendarDays}
          />

        </div>

      </div>


      {/* INSIGHTS */}

      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50 p-6">

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
            <TrendingUp size={19} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-800">
              Forecast Insights
            </h2>

            <p className="text-xs text-slate-500">
              Demonstration insights — real insights will come from the ML model.
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-xl border border-white bg-white/70 p-4">

            <div className="flex items-center gap-2 text-emerald-600">
              <TrendingUp size={16} />

              <span className="text-xs font-bold uppercase tracking-wider">
                Expected Demand
              </span>
            </div>

            <p className="mt-3 text-lg font-bold text-slate-800">
              Increasing
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Demo forecast indicates gradual demand growth.
            </p>

          </div>


          <div className="rounded-xl border border-white bg-white/70 p-4">

            <div className="flex items-center gap-2 text-blue-600">
              <Package size={16} />

              <span className="text-xs font-bold uppercase tracking-wider">
                High Demand
              </span>
            </div>

            <p className="mt-3 text-lg font-bold text-slate-800">
              Product A
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Demonstration product with projected demand growth.
            </p>

          </div>


          <div className="rounded-xl border border-white bg-white/70 p-4">

            <div className="flex items-center gap-2 text-orange-500">
              <TrendingDown size={16} />

              <span className="text-xs font-bold uppercase tracking-wider">
                Low Demand
              </span>
            </div>

            <p className="mt-3 text-lg font-bold text-slate-800">
              Product D
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Demonstration product requiring further monitoring.
            </p>

          </div>


          <div className="rounded-xl border border-white bg-white/70 p-4">

            <div className="flex items-center gap-2 text-violet-600">
              <BarChart3 size={16} />

              <span className="text-xs font-bold uppercase tracking-wider">
                Seasonal Trend
              </span>
            </div>

            <p className="mt-3 text-lg font-bold text-slate-800">
              Upward Pattern
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Demonstration data shows increasing demand toward the period end.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DemandForecasting;