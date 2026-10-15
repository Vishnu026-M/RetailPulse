from fastapi import APIRouter, Query

router = APIRouter(prefix="/api", tags=["Forecasting"])


@router.get("/forecast")
def get_forecast(
    horizon: int = Query(7, ge=7, le=60)
):
    base_forecast = [
        {
            "day": "Day 1",
            "actual": 820,
            "forecast": 840,
            "lower": 780,
            "upper": 900,
        },
        {
            "day": "Day 2",
            "actual": 850,
            "forecast": 865,
            "lower": 800,
            "upper": 930,
        },
        {
            "day": "Day 3",
            "actual": 890,
            "forecast": 885,
            "lower": 820,
            "upper": 950,
        },
        {
            "day": "Day 4",
            "actual": 910,
            "forecast": 925,
            "lower": 850,
            "upper": 1000,
        },
        {
            "day": "Day 5",
            "actual": 950,
            "forecast": 945,
            "lower": 870,
            "upper": 1020,
        },
        {
            "day": "Day 6",
            "actual": 980,
            "forecast": 985,
            "lower": 900,
            "upper": 1070,
        },
        {
            "day": "Day 7",
            "actual": None,
            "forecast": 1020,
            "lower": 930,
            "upper": 1110,
        },
    ]

    forecast = []

    for day_number in range(1, horizon + 1):
        if day_number <= len(base_forecast):
            forecast.append(base_forecast[day_number - 1])
        else:
            previous = forecast[-1]

            forecast_value = previous["forecast"] + 15
            lower_value = forecast_value - 90
            upper_value = forecast_value + 90

            forecast.append(
                {
                    "day": f"Day {day_number}",
                    "actual": None,
                    "forecast": forecast_value,
                    "lower": lower_value,
                    "upper": upper_value,
                }
            )

    return {
        "status": "success",
        "horizon": horizon,
        "forecast": forecast,
        "metrics": {
            "mape": None,
            "mae": None,
            "rmse": None,
        },
        "model_status": "Awaiting ML model evaluation",
    }