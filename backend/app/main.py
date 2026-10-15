from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.dashboard import router as dashboard_router
from app.api.forecast import router as forecast_router
from app.api.customer import router as customer_router
from app.api.churn import router as churn_router
from app.api.inventory import router as inventory_router


app = FastAPI(
    title="RetailPulse API",
    description="AI-Powered Customer Analytics & Demand Forecasting Platform",
    version="1.0.0",
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register API routes
  
  
app.include_router(dashboard_router)
app.include_router(forecast_router)
app.include_router(customer_router)
app.include_router(churn_router)
app.include_router(inventory_router)


# Root endpoint
@app.get("/")
def root():
    return {
        "application": "RetailPulse",
        "message": "RetailPulse API is running",
        "version": "1.0.0",
        "status": "online",
    }


# Health check
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "RetailPulse Backend",
    }