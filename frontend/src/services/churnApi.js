const API_BASE_URL = "http://127.0.0.1:8000";

export async function getChurnData() {
  console.log("🟣 Calling Churn API...");

  const response = await fetch(
    `${API_BASE_URL}/api/churn`
  );

  console.log("🟠 Churn API status:", response.status);

  if (!response.ok) {
    throw new Error("Failed to fetch churn data");
  }

  const data = await response.json();

  console.log("🟡 Churn API data received:", data);

  return data;
}