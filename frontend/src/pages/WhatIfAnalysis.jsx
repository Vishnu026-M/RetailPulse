import { useMemo, useState } from "react";
import {
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  AlertTriangle,
  BarChart3,
  Clock3,
  RotateCcw,
  Lightbulb,
  BrainCircuit,
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
} from "recharts";

/* ------------------------------------------------
   BASELINE BUSINESS VALUES
------------------------------------------------- */

const BASELINE = {
  revenue: 1840000,
  demand: 24892,
  inventory: 486000,
  stockoutRisk: 7.8,
  profit: 412000,
};

/* ------------------------------------------------
   INPUT SLIDER
------------------------------------------------- */

function ScenarioSlider({
  icon: Icon,
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Icon size={18} />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-800">
              {label}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {description}
            </p>
          </div>

        </div>

        <span
          className={`rounded-lg px-3 py-1.5 text-sm font-bold ${
            value > 0
              ? "bg-emerald-50 text-emerald-600"
              : value < 0
              ? "bg-red-50 text-red-600"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {value > 0 ? "+" : ""}
          {value}
          {unit}
        </span>

      </div>

      <div className="mt-5">

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) =>
            onChange(Number(event.target.value))
          }
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600"
        />

        <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-400">
          <span>
            {min > 0 ? "+" : ""}
            {min}
            {unit}
          </span>

          <span>0{unit}</span>

          <span>
            {max > 0 ? "+" : ""}
            {max}
            {unit}
          </span>
        </div>

      </div>

    </div>
  );
}

/* ------------------------------------------------
   KPI CARD
------------------------------------------------- */

function ScenarioKPI({
  icon: Icon,
  label,
  baseline,
  modified,
  formatter,
  positiveWhenUp = true,
}) {
  const difference = modified - baseline;

  const percentage =
    baseline !== 0
      ? (difference / baseline) * 100
      : 0;

  const isPositive = positiveWhenUp
    ? difference >= 0
    : difference <= 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={19} />
        </div>

        <span
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${
            isPositive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {difference >= 0 ? (
            <TrendingUp size={11} />
          ) : (
            <TrendingDown size={11} />
          )}

          {Math.abs(percentage).toFixed(1)}%
        </span>

      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {formatter(modified)}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Baseline: {formatter(baseline)}
      </p>

    </div>
  );
}

/* ------------------------------------------------
   MAIN COMPONENT
------------------------------------------------- */

function WhatIfAnalysis() {

  const [demandChange, setDemandChange] = useState(10);
  const [priceChange, setPriceChange] = useState(5);
  const [inventoryChange, setInventoryChange] = useState(0);
  const [promotionChange, setPromotionChange] = useState(10);
  const [leadTimeChange, setLeadTimeChange] = useState(-2);

  /* ---------------------------------------------
     SCENARIO CALCULATION
  --------------------------------------------- */

  const scenario = useMemo(() => {

    /*
      These formulas are demonstration calculations
      for the frontend scenario engine.

      Real business/ML formulas will be connected
      later through the backend.
    */

    const demandMultiplier =
      1 +
      demandChange / 100 +
      promotionChange * 0.003;

    const priceMultiplier =
      1 + priceChange / 100;

    const projectedDemand = Math.max(
      0,
      Math.round(
        BASELINE.demand * demandMultiplier
      )
    );

    const projectedRevenue = Math.max(
      0,
      Math.round(
        BASELINE.revenue *
          demandMultiplier *
          priceMultiplier
      )
    );

    const projectedInventory = Math.max(
      0,
      Math.round(
        BASELINE.inventory *
          (1 + inventoryChange / 100)
      )
    );

    const demandPressure =
      Math.max(0, demandChange) * 0.25;

    const inventoryProtection =
      inventoryChange * 0.18;

    const leadTimeImpact =
      Math.max(0, leadTimeChange) * 0.7 -
      Math.max(0, -leadTimeChange) * 0.3;

    const projectedStockoutRisk = Math.min(
      100,
      Math.max(
        0,
        BASELINE.stockoutRisk +
          demandPressure -
          inventoryProtection +
          leadTimeImpact
      )
    );

    const projectedProfit = Math.round(
      projectedRevenue * 0.224 -
        Math.max(0, priceChange) *
          BASELINE.revenue *
          0.002 -
        Math.max(0, inventoryChange) *
          BASELINE.inventory *
          0.015
    );

    const inventoryRequirement = Math.max(
      0,
      Math.round(
        BASELINE.inventory *
          (projectedDemand / BASELINE.demand)
      )
    );

    return {
      projectedDemand,
      projectedRevenue,
      projectedInventory,
      projectedStockoutRisk,
      projectedProfit,
      inventoryRequirement,
    };

  }, [
    demandChange,
    priceChange,
    inventoryChange,
    promotionChange,
    leadTimeChange,
  ]);

  /* ---------------------------------------------
     CHART DATA
  --------------------------------------------- */

  const comparisonData = [
    {
      name: "Revenue",
      baseline: BASELINE.revenue / 100000,
      modified: scenario.projectedRevenue / 100000,
    },
    {
      name: "Demand",
      baseline: BASELINE.demand / 1000,
      modified: scenario.projectedDemand / 1000,
    },
    {
      name: "Inventory",
      baseline: BASELINE.inventory / 100000,
      modified: scenario.projectedInventory / 100000,
    },
    {
      name: "Profit",
      baseline: BASELINE.profit / 100000,
      modified: scenario.projectedProfit / 100000,
    },
  ];

  const resetScenario = () => {
    setDemandChange(0);
    setPriceChange(0);
    setInventoryChange(0);
    setPromotionChange(0);
    setLeadTimeChange(0);
  };

  const scenarioStatus =
    scenario.projectedStockoutRisk >= 20
      ? "High Stockout Risk"
      : scenario.projectedStockoutRisk >= 12
      ? "Moderate Stockout Risk"
      : "Low Stockout Risk";

  const scenarioStatusClass =
    scenario.projectedStockoutRisk >= 20
      ? "bg-red-50 text-red-600"
      : scenario.projectedStockoutRisk >= 12
      ? "bg-amber-50 text-amber-600"
      : "bg-emerald-50 text-emerald-600";

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

        <div>

          <div className="mb-2 flex items-center gap-2">

            <span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-600">
              Scenario Planning
            </span>

            <span className="text-xs text-slate-400">
              Interactive Demo
            </span>

          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            What-If Analysis
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Test business scenarios and understand how changes in
            demand, pricing, inventory, promotions and lead time may
            affect business outcomes.
          </p>

        </div>

        <button
          onClick={resetScenario}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <RotateCcw size={16} />
          Reset Scenario
        </button>

      </div>


      {/* DEMO NOTICE */}

      <div className="flex items-start gap-3 rounded-2xl border border-violet-100 bg-violet-50 p-4">

        <Lightbulb
          size={19}
          className="mt-0.5 shrink-0 text-violet-600"
        />

        <div>

          <p className="text-sm font-semibold text-violet-800">
            Interactive Scenario Simulator
          </p>

          <p className="mt-1 text-xs leading-5 text-violet-700/70">
            Adjust the controls below to simulate a business scenario.
            The current calculations are frontend demonstration formulas.
            The production version will use the connected analytics and
            ML backend.
          </p>

        </div>

      </div>


      {/* SCENARIO CONTROLS */}

      <div>

        <div className="mb-4 flex items-center gap-2">

          <SlidersHorizontal
            size={18}
            className="text-blue-600"
          />

          <div>

            <h2 className="text-base font-bold text-slate-800">
              Scenario Controls
            </h2>

            <p className="text-xs text-slate-400">
              Change one or more business assumptions.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <ScenarioSlider
            icon={TrendingUp}
            label="Demand Change"
            value={demandChange}
            min={-30}
            max={50}
            step={1}
            unit="%"
            onChange={setDemandChange}
            description="Expected change in customer demand"
          />

          <ScenarioSlider
            icon={DollarSign}
            label="Price Change"
            value={priceChange}
            min={-20}
            max={30}
            step={1}
            unit="%"
            onChange={setPriceChange}
            description="Change in average selling price"
          />

          <ScenarioSlider
            icon={Package}
            label="Inventory Change"
            value={inventoryChange}
            min={-30}
            max={50}
            step={1}
            unit="%"
            onChange={setInventoryChange}
            description="Change in available inventory"
          />

          <ScenarioSlider
            icon={BarChart3}
            label="Promotion Change"
            value={promotionChange}
            min={-50}
            max={50}
            step={1}
            unit="%"
            onChange={setPromotionChange}
            description="Change in promotional activity"
          />

          <ScenarioSlider
            icon={Clock3}
            label="Lead Time"
            value={leadTimeChange}
            min={-10}
            max={20}
            step={1}
            unit=" days"
            onChange={setLeadTimeChange}
            description="Change in supplier lead time"
          />

        </div>

      </div>


      {/* SCENARIO SUMMARY */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>

            <h2 className="text-base font-bold text-slate-800">
              Current Scenario
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Combined effect of your selected assumptions.
            </p>

          </div>

          <span
            className={`rounded-full px-3 py-1.5 text-xs font-bold ${scenarioStatusClass}`}
          >
            {scenarioStatus}
          </span>

        </div>

        <div className="mt-5 flex flex-wrap gap-2">

          <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
            Demand: {demandChange > 0 ? "+" : ""}
            {demandChange}%
          </span>

          <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
            Price: {priceChange > 0 ? "+" : ""}
            {priceChange}%
          </span>

          <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
            Inventory: {inventoryChange > 0 ? "+" : ""}
            {inventoryChange}%
          </span>

          <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
            Promotion: {promotionChange > 0 ? "+" : ""}
            {promotionChange}%
          </span>

          <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
            Lead Time: {leadTimeChange > 0 ? "+" : ""}
            {leadTimeChange} days
          </span>

        </div>

      </div>


      {/* OUTPUT KPIs */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

        <ScenarioKPI
          icon={DollarSign}
          label="Projected Revenue"
          baseline={BASELINE.revenue}
          modified={scenario.projectedRevenue}
          formatter={(value) =>
            `$${(value / 1000000).toFixed(2)}M`
          }
        />

        <ScenarioKPI
          icon={TrendingUp}
          label="Projected Demand"
          baseline={BASELINE.demand}
          modified={scenario.projectedDemand}
          formatter={(value) =>
            value.toLocaleString()
          }
        />

        <ScenarioKPI
          icon={Package}
          label="Inventory Requirement"
          baseline={BASELINE.inventory}
          modified={scenario.inventoryRequirement}
          formatter={(value) =>
            `$${(value / 1000).toFixed(0)}K`
          }
        />

        <ScenarioKPI
          icon={AlertTriangle}
          label="Stockout Risk"
          baseline={BASELINE.stockoutRisk}
          modified={scenario.projectedStockoutRisk}
          formatter={(value) =>
            `${value.toFixed(1)}%`
          }
          positiveWhenUp={false}
        />

        <ScenarioKPI
          icon={BarChart3}
          label="Projected Profit"
          baseline={BASELINE.profit}
          modified={scenario.projectedProfit}
          formatter={(value) =>
            `$${(value / 1000).toFixed(0)}K`
          }
        />

      </div>


      {/* BASELINE VS MODIFIED */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* BAR CHART */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-5">

            <h2 className="text-sm font-bold text-slate-800">
              Baseline vs Modified Scenario
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Compare key business metrics before and after scenario changes.
            </p>

          </div>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={comparisonData}>

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
                    value.toFixed(1),
                    "Value",
                  ]}
                />

                <Legend />

                <Bar
                  dataKey="baseline"
                  name="Baseline"
                  fill="#94a3b8"
                  radius={[5, 5, 0, 0]}
                />

                <Bar
                  dataKey="modified"
                  name="Modified"
                  fill="#6366f1"
                  radius={[5, 5, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* SCENARIO BREAKDOWN */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-5">

            <h2 className="text-sm font-bold text-slate-800">
              Scenario Breakdown
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Detailed comparison of baseline and modified values.
            </p>

          </div>

          <div className="space-y-3">

            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Revenue
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  ${(scenario.projectedRevenue / 1000000).toFixed(2)}M
                </p>
              </div>

              <div className="text-right">

                <p className="text-xs text-slate-400">
                  Baseline
                </p>

                <p className="text-sm font-semibold text-slate-600">
                  $1.84M
                </p>

              </div>

            </div>


            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Demand
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {scenario.projectedDemand.toLocaleString()}
                </p>
              </div>

              <div className="text-right">

                <p className="text-xs text-slate-400">
                  Baseline
                </p>

                <p className="text-sm font-semibold text-slate-600">
                  {BASELINE.demand.toLocaleString()}
                </p>

              </div>

            </div>


            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Inventory Requirement
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  ${(scenario.inventoryRequirement / 1000).toFixed(0)}K
                </p>
              </div>

              <div className="text-right">

                <p className="text-xs text-slate-400">
                  Baseline
                </p>

                <p className="text-sm font-semibold text-slate-600">
                  $486K
                </p>

              </div>

            </div>


            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Stockout Risk
                </p>

                <p
                  className={`mt-1 text-sm font-bold ${
                    scenario.projectedStockoutRisk >= 20
                      ? "text-red-600"
                      : scenario.projectedStockoutRisk >= 12
                      ? "text-amber-600"
                      : "text-emerald-600"
                  }`}
                >
                  {scenario.projectedStockoutRisk.toFixed(1)}%
                </p>
              </div>

              <div className="text-right">

                <p className="text-xs text-slate-400">
                  Baseline
                </p>

                <p className="text-sm font-semibold text-slate-600">
                  7.8%
                </p>

              </div>

            </div>


            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Projected Profit
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  ${(scenario.projectedProfit / 1000).toFixed(0)}K
                </p>
              </div>

              <div className="text-right">

                <p className="text-xs text-slate-400">
                  Baseline
                </p>

                <p className="text-sm font-semibold text-slate-600">
                  $412K
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* BUSINESS INTERPRETATION */}

      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-violet-50 to-cyan-50 p-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

          <div className="max-w-xl">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                <Lightbulb size={19} />
              </div>

              <div>

                <h2 className="text-sm font-bold text-slate-800">
                  Scenario Insight
                </h2>

                <p className="text-xs text-slate-400">
                  Automated interpretation of the current scenario.
                </p>

              </div>

            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">

              {demandChange > 15
                ? "The scenario assumes a significant increase in demand. Inventory planning should be reviewed carefully to reduce potential stockout exposure."
                : demandChange < -10
                ? "The scenario assumes weaker demand. Inventory commitments may need to be reduced to limit excess inventory."
                : promotionChange > 20
                ? "The increased promotional activity may create additional demand. Review inventory availability before launching the promotion."
                : priceChange > 15
                ? "The higher price assumption may increase revenue per unit but could influence demand. The production model should evaluate price elasticity."
                : leadTimeChange > 5
                ? "The longer supplier lead time increases supply-chain exposure. Additional safety stock may be required."
                : "The current scenario represents a moderate business adjustment. Review the projected revenue, demand and inventory requirements before making operational decisions."}

            </p>

          </div>


          <div className="rounded-xl bg-white p-4 shadow-sm">

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Scenario Engine
            </p>

            <div className="mt-2 flex items-center gap-2">

              <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />

              <p className="text-sm font-bold text-blue-600">
                Active
              </p>

            </div>

            <p className="mt-1 text-xs text-slate-400">
              Frontend simulation
            </p>

          </div>

        </div>

      </div>


      {/* MODEL STATUS */}

      <div className="rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 via-blue-50 to-cyan-50 p-6">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
              <BrainCircuit size={19} />
            </div>

            <div>

              <h3 className="text-sm font-bold text-slate-800">
                Scenario Prediction Engine
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Production calculations will use connected forecasting,
                demand and inventory models.
              </p>

            </div>

          </div>

          <div className="rounded-xl bg-white px-4 py-3 shadow-sm">

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Backend Status
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

export default WhatIfAnalysis;