from fastapi import APIRouter

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("")
def get_dashboard():

    return {
        "status": "success",

        "kpis": {
            "total_revenue": 1840000,
            "total_orders": 24892,
            "active_customers": 8429,
            "inventory_value": 486000,
            "customer_churn_rate": 7.8,
            "forecast_accuracy": None
        },

        "revenue_trend": [
            {"month": "Jan", "revenue": 128000},
            {"month": "Feb", "revenue": 142000},
            {"month": "Mar", "revenue": 151000},
            {"month": "Apr", "revenue": 147000},
            {"month": "May", "revenue": 169000},
            {"month": "Jun", "revenue": 181000},
            {"month": "Jul", "revenue": 176000},
            {"month": "Aug", "revenue": 194000},
            {"month": "Sep", "revenue": 212000},
            {"month": "Oct", "revenue": 205000},
            {"month": "Nov", "revenue": 218000},
            {"month": "Dec", "revenue": 217000}
        ],

        "sales_trend": [
            {"month": "Jan", "orders": 1640},
            {"month": "Feb", "orders": 1810},
            {"month": "Mar", "orders": 1930},
            {"month": "Apr", "orders": 1870},
            {"month": "May", "orders": 2140},
            {"month": "Jun", "orders": 2290},
            {"month": "Jul", "orders": 2210},
            {"month": "Aug", "orders": 2460},
            {"month": "Sep", "orders": 2630},
            {"month": "Oct", "orders": 2570},
            {"month": "Nov", "orders": 2710},
            {"month": "Dec", "orders": 2632}
        ],

        "demand_forecast": [
            {"date": "Day 1", "actual": 820, "forecast": 840},
            {"date": "Day 2", "actual": 850, "forecast": 865},
            {"date": "Day 3", "actual": 875, "forecast": 890},
            {"date": "Day 4", "actual": 910, "forecast": 925},
            {"date": "Day 5", "actual": 940, "forecast": 955},
            {"date": "Day 6", "actual": 960, "forecast": 980},
            {"date": "Day 7", "actual": 990, "forecast": 1005}
        ],

        "customer_segmentation": [
            {"name": "Champions", "value": 18},
            {"name": "Loyal Customers", "value": 24},
            {"name": "Potential Loyalists", "value": 17},
            {"name": "At Risk", "value": 15},
            {"name": "Lost Customers", "value": 14},
            {"name": "New Customers", "value": 12}
        ],

        "churn_risk": [
            {"name": "Low Risk", "value": 62},
            {"name": "Medium Risk", "value": 25},
            {"name": "High Risk", "value": 13}
        ],

        "inventory_status": [
            {"name": "Healthy", "value": 58},
            {"name": "Low Stock", "value": 18},
            {"name": "Critical", "value": 9},
            {"name": "Overstocked", "value": 15}
        ]
    }