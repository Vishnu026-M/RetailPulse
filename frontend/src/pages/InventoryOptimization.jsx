import { useEffect,useMemo, useState } from "react";
import {
  Package,
  AlertTriangle,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Boxes,
  MapPin,
  CalendarDays,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
  Clock3,
  BrainCircuit,
  MoreHorizontal,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getInventoryData } from "../services/inventoryApi";
/* ------------------------------------------------
   DEMO INVENTORY DATA
------------------------------------------------- */

const inventoryData = [
  {
    id: "SKU-1001",
    product: "Premium Coffee Beans",
    category: "Beverages",
    region: "South",
    currentStock: 420,
    avgDailyDemand: 38,
    predictedDemand: 1140,
    reorderPoint: 300,
    recommendedOrder: 720,
    status: "Healthy",
    stockoutRisk: 8,
    inventoryValue: 12600,
  },
  {
    id: "SKU-1002",
    product: "Organic Green Tea",
    category: "Beverages",
    region: "North",
    currentStock: 185,
    avgDailyDemand: 31,
    predictedDemand: 930,
    reorderPoint: 220,
    recommendedOrder: 745,
    status: "Low",
    stockoutRisk: 62,
    inventoryValue: 7400,
  },
  {
    id: "SKU-1003",
    product: "Wireless Earbuds",
    category: "Electronics",
    region: "West",
    currentStock: 78,
    avgDailyDemand: 24,
    predictedDemand: 720,
    reorderPoint: 120,
    recommendedOrder: 642,
    status: "Critical",
    stockoutRisk: 91,
    inventoryValue: 11700,
  },
  {
    id: "SKU-1004",
    product: "Cotton T-Shirt",
    category: "Apparel",
    region: "South",
    currentStock: 960,
    avgDailyDemand: 22,
    predictedDemand: 660,
    reorderPoint: 180,
    recommendedOrder: 0,
    status: "Overstocked",
    stockoutRisk: 4,
    inventoryValue: 19200,
  },
  {
    id: "SKU-1005",
    product: "Running Shoes",
    category: "Footwear",
    region: "East",
    currentStock: 340,
    avgDailyDemand: 19,
    predictedDemand: 570,
    reorderPoint: 160,
    recommendedOrder: 230,
    status: "Healthy",
    stockoutRisk: 12,
    inventoryValue: 27200,
  },
  {
    id: "SKU-1006",
    product: "Smart Watch",
    category: "Electronics",
    region: "North",
    currentStock: 64,
    avgDailyDemand: 18,
    predictedDemand: 540,
    reorderPoint: 95,
    recommendedOrder: 476,
    status: "Critical",
    stockoutRisk: 94,
    inventoryValue: 16000,
  },
  {
    id: "SKU-1007",
    product: "Denim Jeans",
    category: "Apparel",
    region: "West",
    currentStock: 315,
    avgDailyDemand: 16,
    predictedDemand: 480,
    reorderPoint: 130,
    recommendedOrder: 165,
    status: "Healthy",
    stockoutRisk: 14,
    inventoryValue: 18900,
  },
  {
    id: "SKU-1008",
    product: "Sports Water Bottle",
    category: "Sports",
    region: "South",
    currentStock: 72,
    avgDailyDemand: 21,
    predictedDemand: 630,
    reorderPoint: 150,
    recommendedOrder: 558,
    status: "Low",
    stockoutRisk: 73,
    inventoryValue: 3600,
  },
  {
    id: "SKU-1009",
    product: "Office Backpack",
    category: "Accessories",
    region: "East",
    currentStock: 510,
    avgDailyDemand: 12,
    predictedDemand: 360,
    reorderPoint: 100,
    recommendedOrder: 0,
    status: "Overstocked",
    stockoutRisk: 3,
    inventoryValue: 15300,
  },
  {
    id: "SKU-1010",
    product: "Bluetooth Speaker",
    category: "Electronics",
    region: "West",
    currentStock: 145,
    avgDailyDemand: 17,
    predictedDemand: 510,
    reorderPoint: 110,
    recommendedOrder: 365,
    status: "Low",
    stockoutRisk: 58,
    inventoryValue: 10875,
  },
];

/* ------------------------------------------------
   CHART DATA
------------------------------------------------- */

const inventoryTrendData = [
  { month: "Jan", value: 412 },
  { month: "Feb", value: 425 },
  { month: "Mar", value: 438 },
  { month: "Apr", value: 452 },
  { month: "May", value: 461 },
  { month: "Jun", value: 474 },
  { month: "Jul", value: 468 },
  { month: "Aug", value: 479 },
  { month: "Sep", value: 486 },
  { month: "Oct", value: 492 },
  { month: "Nov", value: 488 },
  { month: "Dec", value: 486 },
];

const categoryData = [
  { name: "Beverages", stock: 605 },
  { name: "Electronics", stock: 287 },
  { name: "Apparel", stock: 1275 },
  { name: "Footwear", stock: 340 },
  { name: "Sports", stock: 72 },
  { name: "Accessories", stock: 510 },
];


const statusColors = [
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

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
   STATUS BADGE
------------------------------------------------- */

function StatusBadge({ status }) {
  const config = {
    Healthy: {
      icon: CheckCircle2,
      className: "bg-emerald-50 text-emerald-600",
    },

    "Low Stock": {
      icon: Clock3,
      className: "bg-amber-50 text-amber-600",
    },

    Overstock: {
      icon: TrendingDown,
      className: "bg-violet-50 text-violet-600",
    },
  };

  const item = config[status];

  if (!item) {
    return (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
        {status}
      </span>
    );
  }

  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${item.className}`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}
/* ------------------------------------------------
   MAIN COMPONENT
------------------------------------------------- */

function InventoryOptimization() {
  const [inventoryData, setInventoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const statusData = useMemo(() => {
  const products = inventoryData?.products || [];

  const healthy = products.filter(
    (item) => item.status === "Healthy"
  ).length;

  const lowStockCount = products.filter(
  (item) => item.status === "Low Stock"
).length;

const overstockedCount = products.filter(
  (item) => item.status === "Overstock"
).length;
  const statusData = [
  {
    name: "Healthy",
    value: inventoryData?.products?.filter(
      (item) => item.status === "Healthy"
    ).length || 0,
  },
  {
    name: "Low Stock",
    value: inventoryData?.products?.filter(
      (item) => item.status === "Low Stock"
    ).length || 0,
  },
  {
    name: "Overstock",
    value: inventoryData?.products?.filter(
      (item) => item.status === "Overstock"
    ).length || 0,
  },
];

  return [
    { name: "Healthy", value: healthy },
    { name: "Low Stock", value: lowStockCount },
    { name: "Overstock", value: overstockedCount },
  ];
}, [inventoryData]);
  useEffect(() => {
  async function loadInventoryData() {
    try {
      setLoading(true);

      const data = await getInventoryData();

      console.log("🟢 Inventory API response:", data);

      setInventoryData(data);
      setError("");
    } catch (err) {
      console.error("🔴 Inventory API error:", err);
      setError("Unable to load inventory data.");
    } finally {
      setLoading(false);
    }
  }

  loadInventoryData();
}, []);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [dateRange, setDateRange] = useState("Last 30 Days");

  const filteredInventory = inventoryData?.products || [];
  const lowStockCount = filteredInventory.filter(
  (item) => item.status === "Low Stock"
).length;

const criticalCount = 0;

const overstockedCount = filteredInventory.filter(
  (item) => item.status === "Overstock"
).length;
 

  const inventoryValue = filteredInventory.reduce(
    (total, item) => total + item.inventoryValue,
    0
  );

  const filteredCategoryData = [
    ...new Set(filteredInventory.map((item) => item.category)),
  ].map((category) => ({
    name: category,
    stock: filteredInventory
      .filter((item) => item.category === category)
      .reduce((total, item) => total + item.currentStock, 0),
  }));

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

        <div>
          <div className="mb-2 flex items-center gap-2">

            <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-600">
              Supply Chain Intelligence
            </span>

            <span className="text-xs text-slate-400">
              Demo Data
            </span>

          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Inventory Optimization
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Monitor inventory health, predict stockout risk and identify
            recommended replenishment quantities.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-500 shadow-sm">
          <BrainCircuit size={16} className="text-orange-500" />
          <span>Optimization:</span>
          <strong className="text-slate-700">
            Demand + Reorder Analysis
          </strong>
        </div>

      </div>


      {/* FILTERS */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center justify-between">

          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Inventory Filters
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Filter inventory by status, category and region.
            </p>
          </div>

          <Filter size={17} className="text-slate-400" />

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

          <FilterSelect
            icon={AlertTriangle}
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              "All Status",
              "Healthy",
              "Low",
              "Critical",
              "Overstocked",
            ]}
          />

          <FilterSelect
            icon={Package}
            label="Category"
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={[
              "All Categories",
              "Beverages",
              "Electronics",
              "Apparel",
              "Footwear",
              "Sports",
              "Accessories",
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
            icon={CalendarDays}
            label="Date Range"
            value={dateRange}
            onChange={setDateRange}
            options={[
              "Last 7 Days",
              "Last 30 Days",
              "Last 90 Days",
              "Last 12 Months",
            ]}
          />

        </div>

      </div>


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Inventory Value */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Package size={20} />
            </div>

            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
              <TrendingUp size={12} />
              3.2%
            </span>

          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Inventory Value
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
  {inventoryData?.summary?.inventory_value
    ? `$${(inventoryData.summary.inventory_value / 1000).toFixed(0)}K`
    : "—"}
</p>

          <p className="mt-1 text-xs text-slate-400">
            Current inventory valuation
          </p>

        </div>


        {/* Low Stock */}

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={20} />
            </div>

            <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-600">
              Monitor
            </span>

          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Low Stock Items
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
           {inventoryData?.summary?.low_stock_items ?? "—"}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Items below recommended level
          </p>

        </div>


        {/* Stockout Risk */}

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
            Stockout Risk
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {inventoryData?.summary?.overstock_items ?? "—"}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Items with elevated stockout risk
          </p>

        </div>


        {/* Overstock */}

        <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Boxes size={20} />
            </div>

            <span className="flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-[10px] font-bold text-violet-600">
              <TrendingDown size={12} />
              Optimize
            </span>

          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Overstocked Items
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {inventoryData?.summary?.low_stock_items ?? "—"}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Items above expected demand
          </p>

        </div>

      </div>


      {/* STATUS SUMMARY */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-red-100 bg-red-50/60 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-500">
                Critical Inventory
              </p>

              <p className="mt-2 text-2xl font-bold text-red-700">
                {criticalCount}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <XCircle size={19} />
            </div>

          </div>

          <p className="mt-3 text-xs leading-5 text-red-600/70">
            Immediate replenishment should be evaluated for these items.
          </p>

        </div>


        <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-500">
                Low Inventory
              </p>

              <p className="mt-2 text-2xl font-bold text-amber-700">
                {lowStockCount}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Clock3 size={19} />
            </div>

          </div>

          <p className="mt-3 text-xs leading-5 text-amber-600/70">
            Inventory is approaching the recommended replenishment level.
          </p>

        </div>


        <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-violet-500">
                Overstock
              </p>

              <p className="mt-2 text-2xl font-bold text-violet-700">
                {overstockedCount}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Boxes size={19} />
            </div>

          </div>

          <p className="mt-3 text-xs leading-5 text-violet-600/70">
            Consider reducing replenishment for slow-moving inventory.
          </p>

        </div>

      </div>


      {/* CHARTS */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Inventory Value Trend */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-5 flex items-start justify-between">

            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Inventory Value Trend
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Monthly inventory valuation trend.
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
              $486K
            </div>

          </div>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={inventoryTrendData}>

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
                  tickFormatter={(value) => `$${value}K`}
                />

                <Tooltip
                  formatter={(value) => [
                    `$${value}K`,
                    "Inventory Value",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{
                    r: 3,
                    fill: "#2563eb",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* Inventory Status */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-5">
            <h2 className="text-sm font-bold text-slate-800">
              Inventory Status
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Current distribution of inventory health.
            </p>
          </div>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                >

                  {statusData.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={statusColors[index]}
                    />
                  ))}

                </Pie>

                <Tooltip
  formatter={(value) => [
    `${value} items`,
    "Inventory Items",
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


      {/* CATEGORY CHART */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-5">

          <h2 className="text-sm font-bold text-slate-800">
            Inventory by Category
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Current stock quantity across product categories.
          </p>

        </div>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart
              data={
                filteredCategoryData.length
                  ? filteredCategoryData
                  : categoryData
              }
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
              />

              <Tooltip
                formatter={(value) => [
                  value.toLocaleString(),
                  "Units",
                ]}
              />

              <Bar
                dataKey="stock"
                fill="#0ea5e9"
                radius={[7, 7, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* INVENTORY TABLE */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 md:flex-row md:items-center">

          <div>

            <div className="flex items-center gap-2">

              <Package
                size={18}
                className="text-blue-500"
              />

              <h2 className="text-sm font-bold text-slate-800">
                Inventory Optimization Table
              </h2>

            </div>

            <p className="mt-1 text-xs text-slate-400">
              Stock levels, demand estimates and replenishment recommendations.
            </p>

          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
            {filteredInventory.length} products
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1250px] text-left">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Product
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Category
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Current Stock
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Avg Daily Demand
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Predicted Demand
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Reorder Point
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Recommended Order
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Stockout Risk
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredInventory.map((item) => (

                <tr
                  key={item.id}
                  className="transition hover:bg-slate-50"
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Package size={16} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {item.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {item.id}
                        </p>
                      </div>

                    </div>

                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {item.category}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                    {item.stock.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {item.avg_daily_demand} / day
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                   {item.predicted_demand?.toLocaleString() || "—"}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {item.reorder_point.toLocaleString()}
                  </td>

                  <td className="px-5 py-4">

                    {item.recommended_order > 0 ? (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-600">
                        <ShoppingCart size={13} />
                        {item.recommended_order?.toLocaleString() || "—"} units
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-slate-400">
                        No order required
                      </span>
                    )}

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-100">

                        <div
                          className={`h-full rounded-full ${
                            item.stockout_risk >= 80
                              ? "bg-red-500"
                              : item.stockout_risk >= 50
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                          style={{
                            width: `${item.stockout_risk ?? 0}%`,
                          }}
                        />

                      </div>

                     <span
  className={`text-xs font-bold ${
    item.stockout_risk >= 80
      ? "text-red-600"
      : item.stockout_risk >= 50
      ? "text-amber-600"
      : "text-emerald-600"
  }`}
>
  {item.stockout_risk ?? "—"}%
</span>

                    </div>

                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={item.status} />
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {filteredInventory.length === 0 && (
          <div className="p-10 text-center">

            <Package
              size={32}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm font-semibold text-slate-600">
              No inventory items found
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Try changing the selected filters.
            </p>

          </div>
        )}

      </div>


      {/* RECOMMENDED ACTIONS */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <ShoppingCart size={19} />
            </div>

            <div>

              <h2 className="text-sm font-bold text-slate-800">
                Recommended Actions
              </h2>

              <p className="text-xs text-slate-400">
                Demo recommendations based on current inventory conditions.
              </p>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-xl border border-red-100 bg-red-50 p-4">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                  Urgent Replenishment
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-800">
                  Wireless Earbuds
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Stockout risk is elevated. Review the recommended
                  replenishment quantity.
                </p>
              </div>

              <ArrowUpRight
                size={17}
                className="text-red-500"
              />

            </div>

          </div>


          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Monitor Demand
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-800">
                  Organic Green Tea
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Current stock is below the recommended inventory level.
                </p>
              </div>

              <TrendingUp
                size={17}
                className="text-amber-500"
              />

            </div>

          </div>


          <div className="rounded-xl border border-violet-100 bg-violet-50 p-4">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
                  Reduce Replenishment
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-800">
                  Cotton T-Shirt
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Current stock is above the estimated demand level.
                </p>
              </div>

              <ArrowDownRight
                size={17}
                className="text-violet-500"
              />

            </div>

          </div>

        </div>

      </div>


      {/* MODEL STATUS */}

      <div className="rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 via-amber-50 to-blue-50 p-6">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
              <BrainCircuit size={19} />
            </div>

            <div>

              <h3 className="text-sm font-bold text-slate-800">
                Inventory Optimization Engine
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Demand forecasts and replenishment recommendations will
                be connected to the ML backend.
              </p>

            </div>

          </div>

          <div className="rounded-xl bg-white px-4 py-3 shadow-sm">

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

export default InventoryOptimization;