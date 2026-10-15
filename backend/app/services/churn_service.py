import os
import joblib
import pandas as pd


# Get project root
BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "..")
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "backend",
    "models",
    "churn_logistic_model.pkl"
)

SCALER_PATH = os.path.join(
    BASE_DIR,
    "backend",
    "models",
    "churn_scaler.pkl"
)


# Load trained model and scaler
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)


def predict_churn(recency, frequency, monetary):
    """
    Generate churn prediction and probability
    using the trained Logistic Regression model.
    """

    features = pd.DataFrame(
        [[recency, frequency, monetary]],
        columns=["Recency", "Frequency", "Monetary"]
    )

    features_scaled = scaler.transform(features)

    prediction = int(model.predict(features_scaled)[0])

    probability = float(
        model.predict_proba(features_scaled)[0][1]
    )

    if probability >= 0.70:
        risk = "High"
    elif probability >= 0.40:
        risk = "Medium"
    else:
        risk = "Low"

    return {
        "prediction": prediction,
        "probability": round(probability * 100, 2),
        "risk": risk
    }