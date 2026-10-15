from fastapi import APIRouter
import pandas as pd

from app.services.churn_service import predict_churn


router = APIRouter(
    prefix="/api",
    tags=["Customer Churn"]
)


import os

PROJECT_ROOT = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "..")
)

DATA_PATH = os.path.join(
    PROJECT_ROOT,
    "data",
    "raw",
    "Online Retail.xlsx"
)


def build_customer_churn_data():
    print("🔵 Churn: Loading Excel file...")

    # Load original transaction dataset
    df = pd.read_excel(DATA_PATH)

    print("🟢 Churn: Excel file loaded:", len(df), "rows")
    # Clean data
    df = df.dropna(subset=["CustomerID"])

    df = df[
        ~df["InvoiceNo"]
        .astype(str)
        .str.startswith("C")
    ]

    df = df[df["Quantity"] > 0]
    df = df[df["UnitPrice"] > 0]

    df["InvoiceDate"] = pd.to_datetime(df["InvoiceDate"])

    # Calculate revenue
    df["Revenue"] = (
        df["Quantity"] * df["UnitPrice"]
    )

    # Reference date
    reference_date = (
        df["InvoiceDate"].max()
        + pd.Timedelta(days=1)
    )

    # Create customer-level RFM
    customers = (
        df.groupby("CustomerID")
        .agg(
            Recency=(
                "InvoiceDate",
                lambda x: (
                    reference_date - x.max()
                ).days
            ),
            Frequency=(
                "InvoiceNo",
                "nunique"
            ),
            Monetary=(
                "Revenue",
                "sum"
            )
        )
        .reset_index()
    )

    # Generate ML predictions
    predictions = []

    for _, customer in customers.iterrows():

        result = predict_churn(
            customer["Recency"],
            customer["Frequency"],
            customer["Monetary"]
        )

        predictions.append({
            "id": f"CUS-{int(customer['CustomerID'])}",
            "name": f"Customer {int(customer['CustomerID'])}",
            "probability": result["probability"],
            "risk": result["risk"],
            "segment": "RFM Customer",
            "region": "Unknown",
            "lastPurchase": int(customer["Recency"]),
            "orders": int(customer["Frequency"]),
            "revenue": round(
                float(customer["Monetary"]),
                2
            )
        })

    return predictions


@router.get("/churn")
def get_churn_data():

    customers = build_customer_churn_data()

    # Calculate summary
    total_customers = len(customers)

    high_risk = sum(
        1 for customer in customers
        if customer["risk"] == "High"
    )

    medium_risk = sum(
        1 for customer in customers
        if customer["risk"] == "Medium"
    )

    low_risk = sum(
        1 for customer in customers
        if customer["risk"] == "Low"
    )

    # Churn probability average
    churn_rate = round(
        sum(
            customer["probability"]
            for customer in customers
        ) / total_customers,
        2
    )

    # Risk percentages
    low_percentage = round(
        (low_risk / total_customers) * 100,
        2
    )

    medium_percentage = round(
        (medium_risk / total_customers) * 100,
        2
    )

    high_percentage = round(
        (high_risk / total_customers) * 100,
        2
    )

    return {
        "status": "success",

        "summary": {
            "churn_rate": churn_rate,
            "total_customers": total_customers,
            "high_risk_customers": high_risk
        },

        "risk_distribution": [
            {
                "name": "Low Risk",
                "value": low_percentage,
                "customer_count": low_risk
            },
            {
                "name": "Medium Risk",
                "value": medium_percentage,
                "customer_count": medium_risk
            },
            {
                "name": "High Risk",
                "value": high_percentage,
                "customer_count": high_risk
            }
        ],

        "model": {
            "algorithm": "Logistic Regression",
            "accuracy": 0.9896,
            "precision": 1.0000,
            "recall": 0.9690,
            "f1_score": 0.9842,
            "status": "Evaluated"
        },

        "customers": customers
    }