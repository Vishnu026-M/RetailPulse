import pandas as pd

file_path = "RetailPulse_Cleaned_Dataset.csv"

df = pd.read_csv(file_path)

print("Dataset shape:", df.shape)

print("\nChurn Risk distribution:")
print(df["Churn Risk"].value_counts())

print("\nChurn Risk percentage:")
print(df["Churn Risk"].value_counts(normalize=True) * 100)

print("\nColumns:")
print(df.columns.tolist())