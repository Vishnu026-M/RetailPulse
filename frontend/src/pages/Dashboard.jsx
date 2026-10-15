import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardApi";

import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  UserRoundX,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/* --------------------------------
   DEMO DATA
--------------------------------- */












/* --------------------------------
   KPI DATA
--------------------------------- */


/* --------------------------------
   REUSABLE CARD
--------------------------------- */

function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:shadow-md ${className}`}
    >

      <div className="mb-5 flex items-start justify-between">

        <div>
          <h3 className="text-sm font-bold text-slate-800">
            {title}
          </h3>

          {subtitle && (
            <p className="mt-1 text-xs text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
          <MoreHorizontal size={18} />
        </button>

      </div>

      {children}

    </div>
  );
}

/* --------------------------------
   TOOLTIP
--------------------------------- */

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xl">

      <p className="mb-2 text-xs font-semibold text-slate-700">
        {label}
      </p>

      {payload.map((item) => (
        <p
          key={item.dataKey}
          className="text-xs text-slate-500"
        >
          {item.name}:{" "}
          <span className="font-semibold text-slate-800">
            {typeof item.value === "number"
              ? item.value.toLocaleString()
              : item.value}
          </span>
        </p>
      ))}

    </div>
  );
}

/* --------------------------------
   DASHBOARD
--------------------------------- */

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const data = await getDashboardData();

        setDashboardData(data);
        setError("");
      } catch (err) {
        console.error("Dashboard API error:", err);
        setError("Unable to load dashboard data from backend.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);
    if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }
    if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
          <h2 className="text-lg font-semibold text-red-700">
            Dashboard Error
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  const kpis = [
  {
    title: "Total Revenue",
    value: dashboardData
      ? `$${(dashboardData.kpis.total_revenue / 1000000).toFixed(2)}M`
      : "—",
    change: "+12.8%",
    positive: true,
    icon: TrendingUp,
  },

  {
    title: "Total Orders",
    value: dashboardData
      ? dashboardData.kpis.total_orders.toLocaleString()
      : "—",
    change: "+8.4%",
    positive: true,
    icon: ShoppingCart,
  },

  {
    title: "Active Customers",
    value: dashboardData
      ? dashboardData.kpis.active_customers.toLocaleString()
      : "—",
    change: "+6.2%",
    positive: true,
    icon: Users,
  },

  {
    title: "Inventory Value",
    value: dashboardData
      ? `$${(dashboardData.kpis.inventory_value / 1000).toFixed(0)}K`
      : "—",
    change: "-3.1%",
    positive: true,
    icon: Package,
  },

  {
    title: "Customer Churn Rate",
    value: dashboardData
      ? `${dashboardData.kpis.customer_churn_rate}%`
      : "—",
    change: "-1.4%",
    positive: true,
    icon: UserRoundX,
  },

  {
    title: "Forecast Accuracy",
    value: dashboardData?.kpis?.forecast_accuracy !== null &&
           dashboardData?.kpis?.forecast_accuracy !== undefined
      ? `${dashboardData.kpis.forecast_accuracy}%`
      : "Awaiting Model",
    change: "Not evaluated",
    positive: null,
    icon: Target,
  },
];
  const revenueData = dashboardData?.revenue_trend || [];
  const salesData = dashboardData?.sales_trend || [];
  const forecastData = (dashboardData?.demand_forecast || []).map((item) => ({
  month: item.date,
  actual: item.actual,
  forecast: item.forecast,
}));
  const segmentationData = dashboardData?.customer_segmentation || [];
  const churnData = dashboardData?.churn_risk || [];
  const inventoryData = dashboardData?.inventory_status || [];
  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

        <div>

          <div className="mb-2 flex items-center gap-2">

            <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Analytics Overview
            </span>

            <span className="text-xs text-slate-400">
              Demo Data
            </span>

          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Good morning, Welcome to RetailPulse
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            AI-powered insights for smarter retail decisions.
          </p>

        </div>

        <div className="text-sm text-slate-400">
          Updated just now
        </div>

      </div>


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

        {kpis.map((kpi) => {

          const Icon = kpi.icon;

          return (
            <div
              key={kpi.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={20} />
                </div>

                <button className="rounded-lg p-1 text-slate-300 opacity-0 transition group-hover:opacity-100 hover:bg-slate-100 hover:text-slate-500">
                  <MoreHorizontal size={17} />
                </button>

              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                {kpi.title}
              </p>

              <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                {kpi.value}
              </p>

              <div className="mt-2 flex items-center gap-2">

                {kpi.positive !== null && (
                  kpi.positive ? (
                    <ArrowUpRight
                      size={15}
                      className="text-emerald-500"
                    />
                  ) : (
                    <ArrowDownRight
                      size={15}
                      className="text-red-500"
                    />
                  )
                )}

                <span
                  className={`text-xs font-semibold ${
                    kpi.positive === null
                      ? "text-slate-400"
                      : kpi.positive
                        ? "text-emerald-600"
                        : "text-red-500"
                  }`}
                >
                  {kpi.change}
                </span>

                {kpi.positive !== null && (
                  <span className="text-xs text-slate-400">
                    vs previous period
                  </span>
                )}

              </div>

            </div>
          );
        })}

      </div>


      {/* REVENUE + SALES */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ChartCard
          title="Revenue Trend"
          subtitle="Monthly revenue performance"
        >

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart data={revenueData}>

                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#3b82f6"
                      stopOpacity={0.25}
                    />

                    <stop
                      offset="95%"
                      stopColor="#3b82f6"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />

                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </ChartCard>


        <ChartCard
          title="Sales Trend"
          subtitle="Monthly order volume"
        >

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={salesData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />

                <Tooltip content={<CustomTooltip />} />

                <Bar
                  dataKey="orders"
                  name="Orders"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </ChartCard>

      </div>


      {/* FORECAST */}

      <ChartCard
        title="Demand Forecast"
        subtitle="Historical demand vs predicted demand"
      >

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={forecastData}>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
              />

              <Tooltip content={<CustomTooltip />} />

              <Legend />

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
                strokeDasharray="6 5"
                dot={{ r: 3 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </ChartCard>


      {/* SEGMENTATION + CHURN + INVENTORY */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Segmentation */}

        <ChartCard
          title="Customer Segmentation"
          subtitle="RFM segment distribution"
        >

          <div className="h-64">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={segmentationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >

                  {segmentationData.map((_, index) => (
                    <Cell
                      key={`segment-${index}`}
                      fill={[
                        "#2563eb",
                        "#4f46e5",
                        "#7c3aed",
                        "#f59e0b",
                        "#ef4444",
                        "#10b981",
                      ][index]}
                    />
                  ))}

                </Pie>

                <Tooltip content={<CustomTooltip />} />

              </PieChart>

            </ResponsiveContainer>

          </div>

          <div className="grid grid-cols-2 gap-2">

            {segmentationData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-xs"
              >

                <span className="truncate text-slate-500">
                  {item.name}
                </span>

                <span className="font-semibold text-slate-800">
                  {item.value}%
                </span>

              </div>
            ))}

          </div>

        </ChartCard>


        {/* Churn */}

        <ChartCard
          title="Churn Risk Distribution"
          subtitle="Current customer risk levels"
        >

          <div className="h-64">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={churnData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >

                  {churnData.map((_, index) => (
                    <Cell
                      key={`churn-${index}`}
                      fill={[
                        "#10b981",
                        "#f59e0b",
                        "#ef4444",
                      ][index]}
                    />
                  ))}

                </Pie>

                <Tooltip content={<CustomTooltip />} />

              </PieChart>

            </ResponsiveContainer>

          </div>

          <div className="space-y-3">

            {churnData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >

                <div className="flex items-center gap-2">

                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: [
                        "#10b981",
                        "#f59e0b",
                        "#ef4444",
                      ][index],
                    }}
                  />

                  <span className="text-xs text-slate-500">
                    {item.name}
                  </span>

                </div>

                <span className="text-xs font-bold text-slate-800">
                  {item.value}%
                </span>

              </div>
            ))}

          </div>

        </ChartCard>


        {/* Inventory */}

        <ChartCard
          title="Inventory Status"
          subtitle="Current stock distribution"
        >

          <div className="h-64">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={inventoryData}
                layout="vertical"
                margin={{
                  left: 15,
                  right: 15,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  width={70}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />

                <Tooltip content={<CustomTooltip />} />

                <Bar
                  dataKey="value"
                  name="Products"
                  fill="#3b82f6"
                  radius={[0, 6, 6, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </ChartCard>

      </div>


      {/* INSIGHTS */}

      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50 p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                <Target size={18} />
              </div>

              <h3 className="font-bold text-slate-800">
                RetailPulse Insights
              </h3>

            </div>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Your dashboard is currently running with demonstration data.
              Real forecasting, segmentation, churn and inventory insights
              will be connected to the ML backend in the next development
              phase.
            </p>

          </div>

          <button className="shrink-0 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Explore Analytics
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;