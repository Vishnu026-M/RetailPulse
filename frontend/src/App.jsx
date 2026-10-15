import CustomerSegmentation from "./pages/CustomerSegmentation";
import ChurnAnalysis from "./pages/ChurnAnalysis";
import DemandForecasting from "./pages/DemandForecasting";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import InventoryOptimization from "./pages/InventoryOptimization";
import WhatIfAnalysis from "./pages/WhatIfAnalysis";
import DataExplorer from "./pages/DataExplorer";
import ModelPerformance from "./pages/ModelPerformance";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";


function PlaceholderPage({ title, description }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">

      <div className="max-w-lg text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <span className="text-2xl font-bold">R</span>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {description}
        </p>

        <div className="mt-5 inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600">
          Module coming next
        </div>

      </div>

    </div>
  );
}


function App() {

  const [activePage, setActivePage] = useState("/dashboard");

  const renderPage = () => {

    switch (activePage) {

      case "/dashboard":
        return <Dashboard />;

      case "/forecasting":
        return <DemandForecasting />;
        return (
          <PlaceholderPage
            title="Demand Forecasting"
            description="Analyze historical demand and generate future demand forecasts with confidence intervals."
          />
        );

      case "/segmentation":
        return <CustomerSegmentation />;
        return (
          <PlaceholderPage
            title="Customer Segmentation"
            description="Explore RFM-based customer segments including Champions, Loyal Customers, At Risk and Lost Customers."
          />
        );

      case "/churn":
  return <ChurnAnalysis />;
        return (
          <PlaceholderPage
            title="Churn Analysis"
            description="Analyze customer churn risk, high-risk customers and the factors contributing to churn."
          />
        );

      case "/inventory":
        return <InventoryOptimization />;
        return (
          <PlaceholderPage
            title="Inventory Optimization"
            description="Monitor inventory levels, stockout risk, overstock and recommended reorder quantities."
          />
        );

      case "/what-if":
        return <WhatIfAnalysis />;
        return (
          <PlaceholderPage
            title="What-If Analysis"
            description="Create business scenarios by changing demand, price, inventory, promotion and lead time."
          />
        );

      case "/data":
        return <DataExplorer />;
        return (
          <PlaceholderPage
            title="Data Explorer"
            description="Upload, inspect, filter and analyze retail datasets."
          />
        );

      case "/models":
        return <ModelPerformance />;

      case "/reports":
        return <Reports />;

      case "/settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  };


  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <Navbar />

      <main className="ml-72 min-h-screen pt-20">

        <div className="p-5 sm:p-6 lg:p-8">

          {renderPage()}

        </div>

      </main>

    </div>
  );
}

export default App;