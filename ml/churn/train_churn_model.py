import pandas as pd

DATA_PATH = "data/raw/Online Retail.xlsx"

# Load dataset
df = pd.read_excel(DATA_PATH)

print("Original rows:", len(df))

# Clean data
df = df.dropna(subset=["CustomerID"])
df = df[~df["InvoiceNo"].astype(str).str.startswith("C")]
df = df[df["Quantity"] > 0]
df = df[df["UnitPrice"] > 0]

df["InvoiceDate"] = pd.to_datetime(df["InvoiceDate"])

# Calculate revenue
df["Revenue"] = df["Quantity"] * df["UnitPrice"]

print("Rows after cleaning:", len(df))
print("Unique customers:", df["CustomerID"].nunique())

# Reference date for calculating recency
reference_date = df["InvoiceDate"].max() + pd.Timedelta(days=1)

# Create customer-level RFM features
rfm = df.groupby("CustomerID").agg(
    Recency=("InvoiceDate", lambda x: (reference_date - x.max()).days),
    Frequency=("InvoiceNo", "nunique"),
    Monetary=("Revenue", "sum")
).reset_index()

print("\nRFM dataset shape:", rfm.shape)

print("\nRFM preview:")
print(rfm.head(10).to_string(index=False))

print("\nRFM statistics:")
print(rfm[["Recency", "Frequency", "Monetary"]].describe())
# Define churn target
rfm["Churn"] = (rfm["Recency"] > 90).astype(int)

print("\nChurn distribution:")
print(rfm["Churn"].value_counts())

print("\nChurn percentage:")
print((rfm["Churn"].value_counts(normalize=True) * 100).round(2))
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report
)

# Features and target
X = rfm[["Recency", "Frequency", "Monetary"]]
y = rfm["Churn"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Scale features
scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train Logistic Regression
model = LogisticRegression(
    random_state=42,
    max_iter=1000
)

model.fit(X_train_scaled, y_train)

# Predictions
y_pred = model.predict(X_test_scaled)

# Evaluation
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

print("\n==============================")
print("LOGISTIC REGRESSION RESULTS")
print("==============================")

print(f"Accuracy:  {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall:    {recall:.4f}")
print(f"F1 Score:  {f1:.4f}")

print("\nClassification Report:")
print(classification_report(y_test, y_pred))
import joblib
import os

# Create model directory
model_dir = "backend/models"
os.makedirs(model_dir, exist_ok=True)

# Save trained model
joblib.dump(
    model,
    os.path.join(model_dir, "churn_logistic_model.pkl")
)

# Save scaler
joblib.dump(
    scaler,
    os.path.join(model_dir, "churn_scaler.pkl")
)

print("\n==============================")
print("MODEL SAVED SUCCESSFULLY")
print("==============================")
print("Model:  backend/models/churn_logistic_model.pkl")
print("Scaler: backend/models/churn_scaler.pkl")