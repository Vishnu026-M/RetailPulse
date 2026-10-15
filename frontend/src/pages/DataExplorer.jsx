import { useMemo, useState } from "react";
import {
  Upload,
  Database,
  Search,
  FileSpreadsheet,
  Rows3,
  Columns3,
  AlertTriangle,
  Copy,
  BarChart3,
  CheckCircle2,
  X,
  FileText,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/* ------------------------------------------------
   DEMO DATA
------------------------------------------------- */

const demoData = [
  {
    customer_id: "CUS-1001",
    product: "Premium Coffee Beans",
    category: "Beverages",
    region: "South",
    quantity: 12,
    revenue: 420,
    order_date: "2026-01-05",
  },
  {
    customer_id: "CUS-1002",
    product: "Organic Green Tea",
    category: "Beverages",
    region: "North",
    quantity: 8,
    revenue: 280,
    order_date: "2026-01-08",
  },
  {
    customer_id: "CUS-1003",
    product: "Wireless Earbuds",
    category: "Electronics",
    region: "West",
    quantity: 5,
    revenue: 750,
    order_date: "2026-01-11",
  },
  {
    customer_id: "CUS-1004",
    product: "Cotton T-Shirt",
    category: "Apparel",
    region: "South",
    quantity: 14,
    revenue: 560,
    order_date: "2026-01-14",
  },
  {
    customer_id: "CUS-1005",
    product: "Running Shoes",
    category: "Footwear",
    region: "East",
    quantity: 4,
    revenue: 680,
    order_date: "2026-01-18",
  },
  {
    customer_id: "CUS-1006",
    product: "Smart Watch",
    category: "Electronics",
    region: "North",
    quantity: 3,
    revenue: 900,
    order_date: "2026-01-21",
  },
  {
    customer_id: "CUS-1007",
    product: "Denim Jeans",
    category: "Apparel",
    region: "West",
    quantity: 7,
    revenue: 490,
    order_date: "2026-01-25",
  },
  {
    customer_id: "CUS-1008",
    product: "Sports Water Bottle",
    category: "Sports",
    region: "South",
    quantity: 10,
    revenue: 300,
    order_date: "2026-01-28",
  },
  {
    customer_id: "CUS-1009",
    product: "Office Backpack",
    category: "Accessories",
    region: "East",
    quantity: 6,
    revenue: 540,
    order_date: "2026-02-02",
  },
  {
    customer_id: "CUS-1010",
    product: "Bluetooth Speaker",
    category: "Electronics",
    region: "West",
    quantity: 5,
    revenue: 625,
    order_date: "2026-02-06",
  },
];

/* ------------------------------------------------
   HELPERS
------------------------------------------------- */

function parseCSV(text) {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const headers = lines[0]
    .split(",")
    .map((header) => header.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",");

    const row = {};

    headers.forEach((header, index) => {
      row[header] = values[index]?.trim() ?? "";
    });

    return row;
  });
}

function isNumeric(value) {
  return (
    value !== "" &&
    value !== null &&
    !Number.isNaN(Number(value))
  );
}

function formatNumber(value) {
  return Number(value).toLocaleString();
}

/* ------------------------------------------------
   STAT CARD
------------------------------------------------- */

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  className,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${className}`}
      >
        <Icon size={19} />
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>

    </div>
  );
}

/* ------------------------------------------------
   MAIN COMPONENT
------------------------------------------------- */

function DataExplorer() {

  const [data, setData] = useState(demoData);
  const [fileName, setFileName] = useState("Demo Retail Dataset");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("revenue");
  const [uploadError, setUploadError] = useState("");

  const columns = useMemo(() => {
    if (!data.length) {
      return [];
    }

    return Object.keys(data[0]);
  }, [data]);

  /* ---------------------------------------------
     FILTERED DATA
  --------------------------------------------- */

  const filteredData = useMemo(() => {

    if (!searchTerm.trim()) {
      return data;
    }

    const query = searchTerm.toLowerCase();

    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value)
          .toLowerCase()
          .includes(query)
      )
    );

  }, [data, searchTerm]);

  /* ---------------------------------------------
     DATA QUALITY
  --------------------------------------------- */

  const missingValues = useMemo(() => {

    return data.reduce((total, row) => {

      return (
        total +
        columns.filter(
          (column) =>
            row[column] === "" ||
            row[column] === null ||
            row[column] === undefined
        ).length
      );

    }, 0);

  }, [data, columns]);

  const duplicateRows = useMemo(() => {

    const seen = new Set();
    let duplicates = 0;

    data.forEach((row) => {

      const key = JSON.stringify(row);

      if (seen.has(key)) {
        duplicates += 1;
      }

      seen.add(key);

    });

    return duplicates;

  }, [data]);

  /* ---------------------------------------------
     NUMERIC COLUMNS
  --------------------------------------------- */

  const numericColumns = useMemo(() => {

    return columns.filter((column) =>
      data.some((row) => isNumeric(row[column]))
    );

  }, [columns, data]);

  /* ---------------------------------------------
     BASIC STATISTICS
  --------------------------------------------- */

  const statistics = useMemo(() => {

    return numericColumns.map((column) => {

      const values = data
        .map((row) => Number(row[column]))
        .filter((value) => !Number.isNaN(value));

      const sum = values.reduce(
        (total, value) => total + value,
        0
      );

      const average =
        values.length > 0
          ? sum / values.length
          : 0;

      const min =
        values.length > 0
          ? Math.min(...values)
          : 0;

      const max =
        values.length > 0
          ? Math.max(...values)
          : 0;

      return {
        column,
        count: values.length,
        average,
        min,
        max,
        sum,
      };

    });

  }, [data, numericColumns]);

  /* ---------------------------------------------
     CHART DATA
  --------------------------------------------- */

  const chartData = useMemo(() => {

    const selectedStats = data.reduce(
      (result, row) => {

        const value = row[selectedColumn];

        if (isNumeric(value)) {

          const numericValue = Number(value);

          result.push({
            name:
              row.product ||
              row.customer_id ||
              `Row ${result.length + 1}`,
            value: numericValue,
          });

        }

        return result;

      },
      []
    );

    return selectedStats.slice(0, 10);

  }, [data, selectedColumn]);

  /* ---------------------------------------------
     FILE UPLOAD
  --------------------------------------------- */

  const handleFileUpload = (event) => {

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadError("");

    if (!file.name.toLowerCase().endsWith(".csv")) {

      setUploadError(
        "Please upload a CSV file."
      );

      return;
    }

    const reader = new FileReader();

    reader.onload = (loadEvent) => {

      try {

        const text = loadEvent.target.result;

        const parsedData = parseCSV(text);

        if (!parsedData.length) {

          setUploadError(
            "The CSV file does not contain readable data."
          );

          return;
        }

        setData(parsedData);
        setFileName(file.name);
        setSearchTerm("");

      } catch (error) {

        setUploadError(
          "Unable to read this CSV file."
        );

      }

    };

    reader.readAsText(file);
  };

  const resetDemoData = () => {
    setData(demoData);
    setFileName("Demo Retail Dataset");
    setSearchTerm("");
    setUploadError("");
    setSelectedColumn("revenue");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

        <div>

          <div className="mb-2 flex items-center gap-2">

            <span className="rounded-full bg-cyan-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-600">
              Data Management
            </span>

            <span className="text-xs text-slate-400">
              {fileName}
            </span>

          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Data Explorer
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Upload, inspect, search and analyze retail datasets before
            they are used by the analytics and machine learning modules.
          </p>

        </div>

        <button
          onClick={resetDemoData}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <Database size={16} />
          Reset Demo Data
        </button>

      </div>


      {/* UPLOAD AREA */}

      <div className="rounded-2xl border border-dashed border-blue-200 bg-gradient-to-r from-blue-50 via-cyan-50 to-violet-50 p-6">

        <div className="flex flex-col items-center justify-center text-center">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
            <Upload size={23} />
          </div>

          <h2 className="mt-4 text-base font-bold text-slate-800">
            Upload Retail Dataset
          </h2>

          <p className="mt-1 max-w-md text-xs leading-5 text-slate-500">
            Upload a CSV file to preview its records, inspect data
            quality and generate basic visualizations.
          </p>

          <label className="mt-5 cursor-pointer">

            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />

            <span className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              <Upload size={16} />
              Choose CSV File
            </span>

          </label>

          {uploadError && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
              <AlertTriangle size={14} />
              {uploadError}
            </div>
          )}

          <p className="mt-3 text-[10px] text-slate-400">
            Current dataset: {fileName}
          </p>

        </div>

      </div>


      {/* DATASET STATS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon={Rows3}
          label="Rows"
          value={formatNumber(data.length)}
          description="Total dataset records"
          className="bg-blue-50 text-blue-600"
        />

        <StatCard
          icon={Columns3}
          label="Columns"
          value={formatNumber(columns.length)}
          description="Dataset fields"
          className="bg-violet-50 text-violet-600"
        />

        <StatCard
          icon={AlertTriangle}
          label="Missing Values"
          value={formatNumber(missingValues)}
          description="Empty cells detected"
          className="bg-amber-50 text-amber-600"
        />

        <StatCard
          icon={Copy}
          label="Duplicate Rows"
          value={formatNumber(duplicateRows)}
          description="Duplicate records detected"
          className="bg-red-50 text-red-600"
        />

      </div>


      {/* DATASET INFO */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <FileSpreadsheet size={20} />
            </div>

            <div>

              <p className="text-sm font-bold text-slate-800">
                {fileName}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {data.length} rows · {columns.length} columns
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2">

            {missingValues === 0 ? (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                <CheckCircle2 size={13} />
                No Missing Values
              </span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600">
                <AlertTriangle size={13} />
                Missing Data
              </span>
            )}

            {duplicateRows === 0 && (
              <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                <CheckCircle2 size={13} />
                No Duplicates
              </span>
            )}

          </div>

        </div>

      </div>


      {/* DATA PREVIEW */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center">

          <div>

            <h2 className="text-sm font-bold text-slate-800">
              Dataset Preview
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Search across all available dataset fields.
            </p>

          </div>

          <div className="relative w-full lg:w-80">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search dataset..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X size={15} />
              </button>
            )}

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px] text-left">

            <thead className="bg-slate-50">

              <tr>

                {columns.map((column) => (
                  <th
                    key={column}
                    className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400"
                  >
                    {column.replaceAll("_", " ")}
                  </th>
                ))}

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredData.slice(0, 20).map((row, rowIndex) => (

                <tr
                  key={rowIndex}
                  className="transition hover:bg-slate-50"
                >

                  {columns.map((column) => (
                    <td
                      key={column}
                      className="px-5 py-3.5 text-sm text-slate-600"
                    >
                      {row[column] === "" ? (
                        <span className="text-amber-500">
                          Missing
                        </span>
                      ) : (
                        String(row[column])
                      )}
                    </td>
                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {filteredData.length === 0 && (
          <div className="p-10 text-center">

            <Search
              size={30}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm font-semibold text-slate-600">
              No matching records
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Try another search term.
            </p>

          </div>
        )}

        {filteredData.length > 20 && (
          <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
            Showing first 20 of {filteredData.length} matching records.
          </div>
        )}

      </div>


      {/* BASIC STATISTICS */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-5">

          <h2 className="text-sm font-bold text-slate-800">
            Basic Statistics
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Summary statistics for detected numeric columns.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px] text-left">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Column
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Count
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Average
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Minimum
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Maximum
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Sum
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {statistics.map((stat) => (

                <tr
                  key={stat.column}
                  className="hover:bg-slate-50"
                >

                  <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                    {stat.column}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {formatNumber(stat.count)}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {stat.average.toFixed(2)}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {stat.min.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {stat.max.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                    {stat.sum.toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {statistics.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-400">
            No numeric columns detected.
          </div>
        )}

      </div>


      {/* VISUALIZATION */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>

            <div className="flex items-center gap-2">

              <BarChart3
                size={18}
                className="text-blue-600"
              />

              <h2 className="text-sm font-bold text-slate-800">
                Dataset Visualization
              </h2>

            </div>

            <p className="mt-1 text-xs text-slate-400">
              Visualize values from a selected numeric column.
            </p>

          </div>

          <select
            value={selectedColumn}
            onChange={(event) =>
              setSelectedColumn(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-400"
          >
            {numericColumns.map((column) => (
              <option
                key={column}
                value={column}
              >
                {column}
              </option>
            ))}
          </select>

        </div>

        <div className="mt-5 h-80">

          {chartData.length > 0 ? (

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={chartData}>

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

                <Tooltip />

                <Bar
                  dataKey="value"
                  name={selectedColumn}
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          ) : (

            <div className="flex h-full items-center justify-center">

              <div className="text-center">

                <BarChart3
                  size={30}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-semibold text-slate-600">
                  No numeric data available
                </p>

              </div>

            </div>

          )}

        </div>

      </div>


      {/* DATA QUALITY */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
            <Database size={19} />
          </div>

          <div className="flex-1">

            <h2 className="text-sm font-bold text-slate-800">
              Data Quality Summary
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Basic validation performed on the currently loaded dataset.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

              <div className="rounded-xl bg-slate-50 p-4">

                <div className="flex items-center gap-2">

                  <CheckCircle2
                    size={16}
                    className="text-emerald-500"
                  />

                  <span className="text-xs font-semibold text-slate-600">
                    Columns Detected
                  </span>

                </div>

                <p className="mt-2 text-lg font-bold text-slate-800">
                  {columns.length}
                </p>

              </div>


              <div className="rounded-xl bg-slate-50 p-4">

                <div className="flex items-center gap-2">

                  {missingValues === 0 ? (
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500"
                    />
                  ) : (
                    <AlertTriangle
                      size={16}
                      className="text-amber-500"
                    />
                  )}

                  <span className="text-xs font-semibold text-slate-600">
                    Missing Cells
                  </span>

                </div>

                <p className="mt-2 text-lg font-bold text-slate-800">
                  {missingValues}
                </p>

              </div>


              <div className="rounded-xl bg-slate-50 p-4">

                <div className="flex items-center gap-2">

                  {duplicateRows === 0 ? (
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500"
                    />
                  ) : (
                    <AlertTriangle
                      size={16}
                      className="text-amber-500"
                    />
                  )}

                  <span className="text-xs font-semibold text-slate-600">
                    Duplicate Rows
                  </span>

                </div>

                <p className="mt-2 text-lg font-bold text-slate-800">
                  {duplicateRows}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DataExplorer;