import { useEffect, useMemo, useState } from "react";
import { getCustomerSegments } from "../services/customerApi";
import {
  Users,
  Crown,
  Heart,
  UserCheck,
  AlertTriangle,
  UserX,
  UserPlus,
  MapPin,
  CalendarDays,
  Filter,
  BrainCircuit,
  TrendingUp,
  DollarSign,
  Activity,
  MoreHorizontal,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

/* ------------------------------------------------
   DEMO CUSTOMER DATA
------------------------------------------------- */

const customers = [
  {
    id: "CUS-1001",
    recency: 4,
    frequency: 28,
    monetary: 8420,
    segment: "Champions",
    region: "South",
    type: "Returning",
  },
  {
    id: "CUS-1002",
    recency: 8,
    frequency: 21,
    monetary: 6210,
    segment: "Champions",
    region: "West",
    type: "Returning",
  },
  {
    id: "CUS-1003",
    recency: 15,
    frequency: 17,
    monetary: 4890,
    segment: "Loyal Customers",
    region: "South",
    type: "Returning",
  },
  {
    id: "CUS-1004",
    recency: 22,
    frequency: 14,
    monetary: 3780,
    segment: "Loyal Customers",
    region: "North",
    type: "Returning",
  },
  {
    id: "CUS-1005",
    recency: 31,
    frequency: 12,
    monetary: 2940,
    segment: "Potential Loyalists",
    region: "East",
    type: "Returning",
  },
  {
    id: "CUS-1006",
    recency: 38,
    frequency: 10,
    monetary: 2410,
    segment: "Potential Loyalists",
    region: "South",
    type: "Returning",
  },
  {
    id: "CUS-1007",
    recency: 67,
    frequency: 8,
    monetary: 1850,
    segment: "At Risk",
    region: "West",
    type: "Returning",
  },
  {
    id: "CUS-1008",
    recency: 74,
    frequency: 6,
    monetary: 1320,
    segment: "At Risk",
    region: "North",
    type: "Returning",
  },
  {
    id: "CUS-1009",
    recency: 125,
    frequency: 4,
    monetary: 760,
    segment: "Lost Customers",
    region: "East",
    type: "Returning",
  },
  {
    id: "CUS-1010",
    recency: 142,
    frequency: 3,
    monetary: 520,
    segment: "Lost Customers",
    region: "South",
    type: "Returning",
  },
  {
    id: "CUS-1011",
    recency: 2,
    frequency: 2,
    monetary: 340,
    segment: "New Customers",
    region: "North",
    type: "New",
  },
  {
    id: "CUS-1012",
    recency: 5,
    frequency: 3,
    monetary: 480,
    segment: "New Customers",
    region: "West",
    type: "New",
  },
];

/* ------------------------------------------------
   SEGMENTS
------------------------------------------------- */

const segments = [
  {
    name: "Champions",
    shortName: "Champions",
    icon: Crown,
    color: "#2563eb",
    bg: "bg-blue-50",
    text: "text-blue-600",
    description: "High-value and highly engaged customers",
  },
  {
    name: "Loyal Customers",
    shortName: "Loyal",
    icon: Heart,
    color: "#7c3aed",
    bg: "bg-violet-50",
    text: "text-violet-600",
    description: "Consistent customers with strong purchase history",
  },
  {
    name: "Potential Loyalists",
    shortName: "Potential",
    icon: UserCheck,
    color: "#0891b2",
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    description: "Customers with potential for increased loyalty",
  },
  {
    name: "At Risk",
    shortName: "At Risk",
    icon: AlertTriangle,
    color: "#f59e0b",
    bg: "bg-amber-50",
    text: "text-amber-600",
    description: "Previously engaged customers showing inactivity",
  },
  {
    name: "Lost Customers",
    shortName: "Lost",
    icon: UserX,
    color: "#ef4444",
    bg: "bg-red-50",
    text: "text-red-600",
    description: "Customers with long periods of inactivity",
  },
  {
    name: "New Customers",
    shortName: "New",
    icon: UserPlus,
    color: "#10b981",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    description: "Recently acquired customers",
  },
];

/* ------------------------------------------------
   HELPERS
------------------------------------------------- */

function formatCurrency(value) {
  return `$${value.toLocaleString()}`;
}

function SegmentTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
      <p className="text-xs font-semibold text-slate-700">
        {payload[0].name}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        Customers:{" "}
        <span className="font-bold text-slate-800">
          {payload[0].value}
        </span>
      </p>
    </div>
  );
}

/* ------------------------------------------------
   FILTER
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

function CustomerSegmentation() {
  const [segmentData, setSegmentData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
useEffect(() => {
  async function loadSegments() {
    try {
      setLoading(true);

      const data = await getCustomerSegments();

      setSegmentData(data);
      setError("");
    } catch (err) {
      console.error("Customer Segmentation API error:", err);
      setError("Unable to load customer segmentation data.");
    } finally {
      setLoading(false);
    }
  }

  loadSegments();
}, []);
   const segmentationData =
    segmentData?.segments?.map((segment) => ({
    name: segment.name,
    value: segment.percentage,
    customer_count: segment.customer_count,
    revenue: segment.revenue,
  })) || [];
  const [segmentFilter, setSegmentFilter] = useState("All Segments");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [customerType, setCustomerType] = useState("All Types");
  const [dateRange, setDateRange] = useState("Last 12 Months");

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const segmentMatch =
        segmentFilter === "All Segments" ||
        customer.segment === segmentFilter;

      const regionMatch =
        regionFilter === "All Regions" ||
        customer.region === regionFilter;

      const typeMatch =
        customerType === "All Types" ||
        customer.type === customerType;

      return segmentMatch && regionMatch && typeMatch;
    });
  }, [segmentFilter, regionFilter, customerType]);

 const segmentDistribution = segmentationData.map((segment) => ({
  name: segment.name,
  value: segment.customer_count,
}));
  const revenueBySegment = segmentationData.map((segment) => ({
  name: segment.name,
  revenue: segment.revenue,
}));

  const totalRevenue = filteredCustomers.reduce(
    (total, customer) => total + customer.monetary,
    0
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

        <div>
          <div className="mb-2 flex items-center gap-2">

            <span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-600">
              Customer Intelligence
            </span>

            <span className="text-xs text-slate-400">
              Demo Data
            </span>

          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Customer Segmentation
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Understand customer value and behavior using RFM-based
            segmentation.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-500 shadow-sm">
          <BrainCircuit size={16} className="text-violet-500" />
          <span>Model:</span>
          <strong className="text-slate-700">
            RFM + K-Means / DBSCAN
          </strong>
        </div>

      </div>


      {/* FILTERS */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center justify-between">

          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Segmentation Filters
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Filter customers by segment, region and customer type.
            </p>
          </div>

          <Filter size={17} className="text-slate-400" />

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

          <FilterSelect
            icon={Users}
            label="Segment"
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
            label="Customer Type"
            value={customerType}
            onChange={setCustomerType}
            options={[
              "All Types",
              "New",
              "Returning",
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


      {/* TOTAL CUSTOMER */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Users size={20} />
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Customers
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {segmentData?.summary?.total_customers
               ? segmentData.summary.total_customers.toLocaleString()
              : "—"}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Customers matching current filters
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <DollarSign size={20} />
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Segment Revenue
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {formatCurrency(totalRevenue)}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Total customer monetary value
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <Activity size={20} />
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Average Frequency
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {filteredCustomers.length
              ? (
                  filteredCustomers.reduce(
                    (total, customer) =>
                      total + customer.frequency,
                    0
                  ) / filteredCustomers.length
                ).toFixed(1)
              : "0.0"}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Purchases per customer
          </p>

        </div>

      </div>


      {/* SEGMENT CARDS */}

      <div>

        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-800">
            Customer Segments
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            RFM-based customer groups for targeted business actions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

          {segments.map((segment) => {

            const Icon = segment.icon;

           const count =
              segmentationData.find(
              (item) => item.name === segment.name
              )?.customer_count ?? 0;
            return (
              <div
                key={segment.name}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >

                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${segment.bg} ${segment.text}`}
                  >
                    <Icon size={20} />
                  </div>

                  <MoreHorizontal
                    size={18}
                    className="text-slate-300"
                  />

                </div>

                <p className="mt-4 text-sm font-bold text-slate-800">
                  {segment.name}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {segment.description}
                </p>

                <div className="mt-4 flex items-end justify-between">

                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {count}
                    </p>

                    <p className="text-xs text-slate-400">
                      customers
                    </p>
                  </div>

                  <div
                    className="rounded-lg px-2 py-1 text-xs font-bold"
                    style={{
                      backgroundColor: `${segment.color}12`,
                      color: segment.color,
                    }}
                  >
                    {filteredCustomers.length
                      ? `${Math.round(
                          (count / filteredCustomers.length) * 100
                        )}%`
                      : "0%"}
                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>


      {/* CHARTS */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Segment Distribution */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-5">
            <h2 className="text-sm font-bold text-slate-800">
              Customer Segment Distribution
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Distribution of customers across RFM segments.
            </p>
          </div>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={segmentationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={3}
                >

                  {segmentationData.map((segment, index) => (
                   <Cell key={segment.name} fill={segments[index]?.color || "#64748b"} />
                  ))}

                </Pie>

                <Tooltip content={<SegmentTooltip />} />

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


        {/* Revenue by Segment */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-5">
            <h2 className="text-sm font-bold text-slate-800">
              Revenue by Segment
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Monetary value generated by each customer segment.
            </p>
          </div>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={revenueBySegment}
                margin={{
                  left: 0,
                  right: 10,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#64748b" }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />

                <Tooltip
                  formatter={(value) => [
                    formatCurrency(value),
                    "Revenue",
                  ]}
                />

                <Bar
                  dataKey="revenue"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* RFM SCATTER */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-start">

          <div>
            <h2 className="text-sm font-bold text-slate-800">
              RFM Customer Analysis
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Frequency vs monetary value. Recency is represented by segment color.
            </p>
          </div>

          <div className="rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-600">
            RFM Analysis
          </div>

        </div>

        <div className="h-96">

          <ResponsiveContainer width="100%" height="100%">

            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 10,
              }}
            >

              <CartesianGrid stroke="#e2e8f0" />

              <XAxis
                type="number"
                dataKey="frequency"
                name="Frequency"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                label={{
                  value: "Frequency",
                  position: "insideBottom",
                  offset: -10,
                  fill: "#64748b",
                  fontSize: 11,
                }}
              />

              <YAxis
                type="number"
                dataKey="monetary"
                name="Monetary Value"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                tickFormatter={(value) => `$${value / 1000}k`}
                label={{
                  value: "Monetary Value",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#64748b",
                  fontSize: 11,
                }}
              />

              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(value, name) => [
                  name === "monetary"
                    ? formatCurrency(value)
                    : value,
                  name === "monetary"
                    ? "Monetary"
                    : "Frequency",
                ]}
              />

              {segments.map((segment) => {

                const segmentData = filteredCustomers
                  .filter(
                    (customer) =>
                      customer.segment === segment.name
                  )
                  .map((customer) => ({
                    frequency: customer.frequency,
                    monetary: customer.monetary,
                  }));

                return (
                  <Scatter
                    key={segment.name}
                    name={segment.name}
                    data={segmentData}
                    fill={segment.color}
                  />
                );
              })}

              <Legend />

            </ScatterChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* CUSTOMER TABLE */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 md:flex-row md:items-center">

          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Customer Segmentation Table
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              RFM values and assigned customer segment.
            </p>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
            {filteredCustomers.length} records
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[760px] text-left">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Customer ID
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Recency
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Frequency
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Monetary Value
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Region
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Segment
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredCustomers.map((customer) => {

                const segment = segments.find(
                  (item) => item.name === customer.segment
                );

                return (
                  <tr
                    key={customer.id}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                      {customer.id}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {customer.recency} days
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {customer.frequency}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                      {formatCurrency(customer.monetary)}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {customer.region}
                    </td>

                    <td className="px-5 py-4">

                      <span
                        className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                        style={{
                          backgroundColor: `${segment.color}12`,
                          color: segment.color,
                        }}
                      >
                        {customer.segment}
                      </span>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

        {filteredCustomers.length === 0 && (
          <div className="p-10 text-center">
            <Users className="mx-auto text-slate-300" size={30} />

            <p className="mt-3 text-sm font-semibold text-slate-600">
              No customers found
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Try changing your filters.
            </p>
          </div>
        )}

      </div>


      {/* MODEL INFORMATION */}

      <div className="rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 via-blue-50 to-cyan-50 p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                <BrainCircuit size={19} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Segmentation Model
                </h3>

                <p className="text-xs text-slate-500">
                  RFM-based segmentation with K-Means / DBSCAN support
                </p>
              </div>

            </div>

            <p className="mt-4 max-w-3xl text-xs leading-5 text-slate-500">
              This frontend currently uses demonstration customer data.
              The actual clustering model, feature engineering and segment
              assignments will be connected to the ML backend later.
            </p>

          </div>

          <div className="shrink-0 rounded-xl bg-white px-4 py-3 shadow-sm">

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Model Status
            </p>

            <p className="mt-1 text-sm font-bold text-amber-600">
              Awaiting ML Backend
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CustomerSegmentation;