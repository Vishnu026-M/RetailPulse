from fastapi import APIRouter


router = APIRouter(
    prefix="/api",
    tags=["Inventory Optimization"]
)


@router.get("/inventory")
def get_inventory_data():
    return {
        "status": "success",

        "summary": {
            "total_products": 3665,
            "low_stock_items": 128,
            "overstock_items": 214,
            "inventory_value": 486000
        },

        "products": [
            {
                "id": "SKU-1001",
                "name": "Product A",
                "category": "Electronics",
                "stock": 42,
                "avg_daily_demand": 12,
                "predicted_demand": 360,
               "recommended_order": 318,
               "stockout_risk": 78,
                "reorder_point": 50,
                "status": "Low Stock"
            },
            {
                "id": "SKU-1002",
                "name": "Product B",
                "category": "Home",
                "stock": 185,
                "reorder_point": 60,
                "status": "Overstock"
            },
            {
                "id": "SKU-1003",
                "name": "Product C",
                "category": "Accessories",
                "stock": 96,
                "reorder_point": 50,
                "status": "Healthy"
            },
            {
                "id": "SKU-1004",
                "name": "Product D",
                "category": "Electronics",
                "stock": 75,
                "reorder_point": 70,
                "status": "Healthy"
            },
            {
                "id": "SKU-1005",
                "name": "Product E",
                "category": "Home",
                "stock": 28,
                "reorder_point": 45,
                "status": "Low Stock"
            },
            {
                "id": "SKU-1006",
                "name": "Product F",
                "category": "Apparel",
                "stock": 220,
                "reorder_point": 80,
                "status": "Overstock"
            },
            {
                "id": "SKU-1007",
                "name": "Product G",
                "category": "Footwear",
                "stock": 115,
                "reorder_point": 70,
                "status": "Healthy"
            },
            {
                "id": "SKU-1008",
                "name": "Product H",
                "category": "Sports",
                "stock": 35,
                "reorder_point": 50,
                "status": "Low Stock"
            },
            {
                "id": "SKU-1009",
                "name": "Product I",
                "category": "Accessories",
                "stock": 140,
                "reorder_point": 60,
                "status": "Healthy"
            },
            {
                "id": "SKU-1010",
                "name": "Product J",
                "category": "Electronics",
                "stock": 190,
                "reorder_point": 75,
                "status": "Overstock"
            }
        ]
    }