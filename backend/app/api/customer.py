from fastapi import APIRouter

router = APIRouter(
    prefix="/api",
    tags=["Customer Segmentation"]
)


@router.get("/customers/segments")
def get_customer_segments():
    return {
        "status": "success",

        "summary": {
            "total_customers": 8429,
            "segments": 6
        },

        "segments": [
            {
                "name": "Champions",
                "customer_count": 1517,
                "percentage": 18,
                "revenue": 428000
            },
            {
                "name": "Loyal Customers",
                "customer_count": 2023,
                "percentage": 24,
                "revenue": 512000
            },
            {
                "name": "Potential Loyalists",
                "customer_count": 1433,
                "percentage": 17,
                "revenue": 286000
            },
            {
                "name": "At Risk",
                "customer_count": 1264,
                "percentage": 15,
                "revenue": 214000
            },
            {
                "name": "Lost Customers",
                "customer_count": 1180,
                "percentage": 14,
                "revenue": 142000
            },
            {
                "name": "New Customers",
                "customer_count": 1012,
                "percentage": 12,
                "revenue": 168000
            }
        ],

        "model": {
            "method": "RFM Analysis",
            "algorithm": "Awaiting ML Evaluation",
            "status": "Demo Data"
        }
    }