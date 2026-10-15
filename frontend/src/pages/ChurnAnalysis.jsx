import { useEffect, useMemo, useState } from "react";
import { getChurnData } from "../services/churnApi";
import {
  Users,
  UserX,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  BrainCircuit,
  MapPin,
  CalendarDays,
  Filter,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

/* ------------------------------------------------
   DEMO CHURN DATA
------------------------------------------------- */


/* ------------------------------------------------
   CHART DATA
------------------------------------------------- */

const churnTrendData = [
  { month: "Jan", churn: 9.2 },
  { month: "Feb", churn: 8.9 },
  { month: "Mar", churn: 8.5 },
  { month: "Apr", churn: 8.8 },
  { month: "May", churn: 8.1 },
  { month: "Jun", churn: 7.9 },
  { month: "Jul", churn: 8.2 },
  { month: "Aug", churn: 7.8 },
  { month: "Sep", churn: 7.5 },
  { month: "Oct", churn: 7.8 },
  { month: "Nov", churn: 7.4 },
  { month: "Dec", churn: 7.8 },
];

const segmentChurnData = [
  { name: "Champions", churn: 3.1 },
  { name: "Loyal", churn: 5.2 },
  { name: "Potential", churn: 8.6 },
  { name: "At Risk", churn: 18.4 },
  { name: "Lost", churn: 32.7 },
  { name: "New", churn: 4.8 },
];

const regionChurnData = [
  { name: "North", churn: 7.2 },
  { name: "South", churn: 6.5 },
  { name: "East", churn: 8.1 },
  { name: "West", churn: 9.3 },
];


const riskColors = [
  "#10b981", // Low Risk
  "#f59e0b", // Medium Risk
  "#ef4444", // High Risk
];

/* ------------------------------------------------
   FILTER COMPONENT
------------------------------------------------- */

function FilterSelect({
  icon: Icon,
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
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

/* ------------------------------------------------
   MAIN COMPONENT
------------------------------------------------- */

function ChurnAnalysis() {
  const [apiChurnData, setApiChurnData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadChurnData() {
      console.log("🔵 loadChurnData started");
      try {
        setLoading(true);

        const data = await getChurnData();

        console.log("🟢 Churn API response:", data);

        setApiChurnData(data);
        console.log("🟡 Setting Churn Data:", data);
        setError("");
      } catch (err) {
        console.error("🔴 Churn API error:", err);
        setError("Unable to load churn data.");
      } finally {
        setLoading(false);
      }
    }

    loadChurnData();
  }, []);

  const riskDistribution =
    apiChurnData?.risk_distribution?.map((risk) => ({
      name: risk.name,
      value: risk.value,
      customer_count: risk.customer_count,
    })) || [];
    const demoChurnCustomers = [
  {
    id: "CUS-1007",
    name: "Customer 1007",
    probability: 91,
    risk: "High",
    segment: "At Risk",
    region: "West",
    lastPurchase: 67,
    orders: 8,
    revenue: 1850,
  },
  {
    id: "CUS-1008",
    name: "Customer 1008",
    probability: 87,
    risk: "High",
    segment: "At Risk",
    region: "North",
    lastPurchase: 74,
    orders: 6,
    revenue: 1320,
  },
  {
    id: "CUS-1013",
    name: "Customer 1013",
    probability: 82,
    risk: "High",
    segment: "Lost Customers",
    region: "South",
    lastPurchase: 91,
    orders: 5,
    revenue: 1140,
  },
  {
    id: "CUS-1014",
    name: "Customer 1014",
    probability: 79,
    risk: "High",
    segment: "At Risk",
    region: "East",
    lastPurchase: 58,
    orders: 7,
    revenue: 1980,
  },
  {
    id: "CUS-1015",
    name: "Customer 1015",
    probability: 73,
    risk: "Medium",
    segment: "Potential Loyalists",
    region: "West",
    lastPurchase: 42,
    orders: 9,
    revenue: 2240,
  },
  {
    id: "CUS-1016",
    name: "Customer 1016",
    probability: 68,
    risk: "Medium",
    segment: "Loyal Customers",
    region: "South",
    lastPurchase: 35,
    orders: 13,
    revenue: 3560,
  },
  {
    id: "CUS-1017",
    name: "Customer 1017",
    probability: 61,
    risk: "Medium",
    segment: "Potential Loyalists",
    region: "North",
    lastPurchase: 31,
    orders: 10,
    revenue: 2710,
  },
  {
    id: "CUS-1018",
    name: "Customer 1018",
    probability: 24,
    risk: "Low",
    segment: "Champions",
    region: "South",
    lastPurchase: 12,
    orders: 24,
    revenue: 6840,
  },
  {
    id: "CUS-1019",
    name: "Customer 1019",
    probability: 18,
    risk: "Low",
    segment: "Loyal Customers",
    region: "East",
    lastPurchase: 15,
    orders: 19,
    revenue: 5120,
  },
  {
    id: "CUS-1020",
    name: "Customer 1020",
    probability: 12,
    risk: "Low",
    segment: "Champions",
    region: "West",
    lastPurchase: 8,
    orders: 27,
    revenue: 7310,
  },
];
  const apiChurnCustomers = apiChurnData?.customers || [];
  const churnCustomers =
  apiChurnCustomers.length > 0
    ? apiChurnCustomers
    : demoChurnCustomers;
    

  const [riskFilter, setRiskFilter] = useState("All Risks");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [segmentFilter, setSegmentFilter] = useState("All Segments");
  const [dateRange, setDateRange] = useState("Last 12 Months");
  const filteredCustomers = useMemo(() => {
  return churnCustomers.filter((customer) => {
    const riskMatch =
      riskFilter === "All Risks" ||
      customer.risk === riskFilter;

    const regionMatch =
      regionFilter === "All Regions" ||
      customer.region === regionFilter;

    const segmentMatch =
      segmentFilter === "All Segments" ||
      customer.segment === segmentFilter;

    return riskMatch && regionMatch && segmentMatch;
  });
}, [churnCustomers, riskFilter, regionFilter, segmentFilter]);
  const highRiskCount =
   apiChurnData?.summary?.high_risk_customers ?? 0;
  const mediumRiskCount = filteredCustomers.filter(
    (customer) => customer.risk === "Medium"
  ).length;

  const lowRiskCount = filteredCustomers.filter(
    (customer) => customer.risk === "Low"
  ).length;
  console.log("API Churn Data:", apiChurnData);
  console.log("Risk Distribution:", riskDistribution);

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

        <div>
          <div className="mb-2 flex items-center gap-2">

            <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600">
              Customer Risk Intelligence
            </span>

            <span className="text-xs text-slate-400">
              Demo Data
            </span>

          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Churn Analysis
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Identify customers at risk of leaving and understand the
            factors contributing to customer churn.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-500 shadow-sm">
          <BrainCircuit size={16} className="text-red-500" />
          <span>Model:</span>
          <strong className="text-slate-700">
            Churn Prediction
          </strong>
        </div>

      </div>


      {/* FILTERS */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center justify-between">

          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Churn Filters
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Filter customer risk and churn information.
            </p>
          </div>

          <Filter size={17} className="text-slate-400" />

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

          <FilterSelect
            icon={AlertTriangle}
            label="Risk Level"
            value={riskFilter}
            onChange={setRiskFilter}
            options={[
              "All Risks",
              "High",
              "Medium",
              "Low",
            ]}
          />

          <FilterSelect
            icon={MapPin}
            label="Region"
            value={regionFilter}
            onChange={setRegionFilter}
            options={[
              "All Regions",
              "North",
              "South",
              "East",
              "West",
            ]}
          />

          <FilterSelect
            icon={Users}
            label="Customer Segment"
            value={segmentFilter}
            onChange={setSegmentFilter}
            options={[
              "All Segments",
              "Champions",
              "Loyal Customers",
              "Potential Loyalists",
              "At Risk",
              "Lost Customers",
              "New Customers",
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


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Customers */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={20} />
            </div>

            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
              <TrendingDown size={12} />
              2.4%
            </span>

          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Customers
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
  {apiChurnData?.summary?.total_customers != null
    ? apiChurnData.summary.total_customers.toLocaleString()
    : "—"}
</p>

          <p className="mt-1 text-xs text-slate-400">
            Customers analyzed
          </p>

        </div>


        {/* Churn Rate */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <UserX size={20} />
            </div>

            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
              <TrendingDown size={12} />
              0.6%
            </span>

          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Customer Churn Rate
          </p>

         <p className="mt-2 text-3xl font-bold text-slate-900">
            {apiChurnData?.summary?.churn_rate != null
            ? `${apiChurnData.summary.churn_rate}%`
    :       "—"}
        </p>
          <p className="mt-1 text-xs text-slate-400">
            Current estimated churn rate
          </p>

        </div>


        {/* High Risk */}

        <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle size={20} />
            </div>

            <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">
              Attention
            </span>

          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            High Risk Customers
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {highRiskCount}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            In current filtered view
          </p>

        </div>


        {/* Retention Opportunity */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck size={20} />
            </div>

            <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600">
              58%
            </span>

          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Low Risk Customers
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {lowRiskCount}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Stable customer base
          </p>

        </div>

      </div>


      {/* RISK SUMMARY */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-red-100 bg-red-50/60 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-500">
                High Risk
              </p>

              <p className="mt-2 text-2xl font-bold text-red-700">
                {highRiskCount}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <AlertTriangle size={19} />
            </div>

          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-red-100">
            <div
              className="h-full rounded-full bg-red-500"
              style={{ width: "72%" }}
            />
          </div>

          <p className="mt-2 text-xs text-red-600/70">
            Immediate retention attention recommended
          </p>

        </div>


        <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-500">
                Medium Risk
              </p>

              <p className="mt-2 text-2xl font-bold text-amber-700">
                {mediumRiskCount}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <TrendingUp size={19} />
            </div>

          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-amber-100">
            <div
              className="h-full rounded-full bg-amber-500"
              style={{ width: "48%" }}
            />
          </div>

          <p className="mt-2 text-xs text-amber-600/70">
            Monitor engagement and purchasing behavior
          </p>

        </div>


        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                Low Risk
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-700">
                {lowRiskCount}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <ShieldCheck size={19} />
            </div>

          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-emerald-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: "88%" }}
            />
          </div>

          <p className="mt-2 text-xs text-emerald-600/70">
            Healthy and actively engaged customers
          </p>

        </div>

      </div>


      {/* CHART ROW */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Churn Trend */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-5 flex items-start justify-between">

            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Churn Rate Trend
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Monthly customer churn trend.
              </p>
            </div>

            <div className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
             {apiChurnData?.summary?.churn_rate != null
              ? `${apiChurnData.summary.churn_rate}%`
              : "—"}
            </div>

          </div>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart
                data={churnTrendData}
                margin={{
                  top: 10,
                  right: 10,
                  bottom: 5,
                  left: 0,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "#94a3b8",
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "#94a3b8",
                  }}
                  tickFormatter={(value) => `${value}%`}
                />

                <Tooltip
                  formatter={(value) => [
                    `${value}%`,
                    "Churn Rate",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="churn"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{
                    r: 3,
                    fill: "#ef4444",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* Risk Distribution */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-5">
            <h2 className="text-sm font-bold text-slate-800">
              Churn Risk Distribution
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Distribution of customers by predicted risk level.
            </p>
          </div>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={riskDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                >

                  {riskDistribution.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={riskColors[index]}
                    />
                  ))}

                </Pie>

                <Tooltip
                  formatter={(value) => [
                    `${value}%`,
                    "Customers",
                  ]}
                />

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-xs text-slate-500">
                      {value}
                    </span>
                  )}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* CHURN BY SEGMENT + REGION */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-5">
            <h2 className="text-sm font-bold text-slate-800">
              Churn Rate by Customer Segment
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Compare churn behavior across customer segments.
            </p>
          </div>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={segmentChurnData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#64748b",
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#94a3b8",
                  }}
                  tickFormatter={(value) => `${value}%`}
                />

                <Tooltip
                  formatter={(value) => [
                    `${value}%`,
                    "Churn Rate",
                  ]}
                />

                <Bar
                  dataKey="churn"
                  fill="#f97316"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>


        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-5">
            <h2 className="text-sm font-bold text-slate-800">
              Churn Rate by Region
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Geographic comparison of customer churn.
            </p>
          </div>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={regionChurnData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "#64748b",
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#94a3b8",
                  }}
                  tickFormatter={(value) => `${value}%`}
                />

                <Tooltip
                  formatter={(value) => [
                    `${value}%`,
                    "Churn Rate",
                  ]}
                />

                <Bar
                  dataKey="churn"
                  fill="#8b5cf6"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* HIGH RISK CUSTOMERS */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 md:flex-row md:items-center">

          <div>

            <div className="flex items-center gap-2">

              <AlertTriangle
                size={18}
                className="text-red-500"
              />

              <h2 className="text-sm font-bold text-slate-800">
                High-Risk Customers
              </h2>

            </div>

            <p className="mt-1 text-xs text-slate-400">
              Customers with elevated predicted churn probability.
            </p>

          </div>

          <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
            {highRiskCount} high-risk records
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px] text-left">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Customer
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Churn Probability
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Risk
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Segment
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Last Purchase
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Orders
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Revenue
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredCustomers
                .filter(
                  (customer) => customer.risk === "High"
                )
                .map((customer) => (

                  <tr
                    key={customer.id}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-xs font-bold text-red-600">
                          {customer.id.slice(-2)}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {customer.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {customer.id}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">

                          <div
                            className="h-full rounded-full bg-red-500"
                            style={{
                              width: `${customer.probability}%`,
                            }}
                          />

                        </div>

                        <span className="text-sm font-bold text-red-600">
                          {customer.probability}%
                        </span>

                      </div>

                    </td>

                    <td className="px-5 py-4">

                      <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                        {customer.risk}
                      </span>

                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {customer.segment}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {customer.lastPurchase} days ago
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {customer.orders}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                      ${customer.revenue.toLocaleString()}
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* EXPLAINABILITY */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col justify-between gap-5 lg:flex-row">

          <div className="max-w-xl">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <BrainCircuit size={19} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-800">
                  Churn Explainability
                </h2>

                <p className="text-xs text-slate-400">
                  Key factors associated with customer churn risk
                </p>
              </div>

            </div>

            <p className="mt-4 text-xs leading-6 text-slate-500">
              The following factors are shown as a demonstration of
              how churn explanations can be presented. Actual feature
              importance and SHAP explanations will be generated from
              the trained ML model when the backend is connected.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            <div className="rounded-xl border border-red-100 bg-red-50 p-4">

              <p className="text-xs font-bold text-red-600">
                Days Since Purchase
              </p>

              <div className="mt-2 flex items-center justify-between">

                <span className="text-sm font-semibold text-slate-700">
                  High Impact
                </span>

                <ArrowUpRight
                  size={17}
                  className="text-red-500"
                />

              </div>

            </div>


            <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">

              <p className="text-xs font-bold text-orange-600">
                Purchase Frequency
              </p>

              <div className="mt-2 flex items-center justify-between">

                <span className="text-sm font-semibold text-slate-700">
                  Medium Impact
                </span>

                <ArrowUpRight
                  size={17}
                  className="text-orange-500"
                />

              </div>

            </div>


            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

              <p className="text-xs font-bold text-blue-600">
                Order Value
              </p>

              <div className="mt-2 flex items-center justify-between">

                <span className="text-sm font-semibold text-slate-700">
                  Medium Impact
                </span>

                <TrendingUp
                  size={17}
                  className="text-blue-500"
                />

              </div>

            </div>


            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">

              <p className="text-xs font-bold text-emerald-600">
                Recent Engagement
              </p>

              <div className="mt-2 flex items-center justify-between">

                <span className="text-sm font-semibold text-slate-700">
                  Protective Factor
                </span>

                <TrendingDown
                  size={17}
                  className="text-emerald-500"
                />

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* MODEL STATUS */}

      <div className="rounded-2xl border border-red-100 bg-gradient-to-r from-red-50 via-orange-50 to-violet-50 p-6">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm">
              <BrainCircuit size={19} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Churn Prediction Model
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Real model predictions will be connected through the ML backend.
              </p>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

  <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
      Accuracy
    </p>
    <p className="mt-1 text-lg font-bold text-slate-900">
      {apiChurnData?.model?.accuracy != null
        ? `${(apiChurnData.model.accuracy * 100).toFixed(2)}%`
        : "—"}
    </p>
  </div>

  <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
      Precision
    </p>
    <p className="mt-1 text-lg font-bold text-slate-900">
      {apiChurnData?.model?.precision != null
        ? `${(apiChurnData.model.precision * 100).toFixed(2)}%`
        : "—"}
    </p>
  </div>

  <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
      Recall
    </p>
    <p className="mt-1 text-lg font-bold text-slate-900">
      {apiChurnData?.model?.recall != null
        ? `${(apiChurnData.model.recall * 100).toFixed(2)}%`
        : "—"}
    </p>
  </div>

  <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
      F1 Score
    </p>
    <p className="mt-1 text-lg font-bold text-slate-900">
      {apiChurnData?.model?.f1_score != null
        ? `${(apiChurnData.model.f1_score * 100).toFixed(2)}%`
        : "—"}
    </p>
  </div>

</div>

        </div>

      </div>

    </div>
  );
}

export default ChurnAnalysis;