const API_BASE_URL = "http://127.0.0.1:8000";

export async function getForecastData(horizon = 7) {
  const response = await fetch(
    `${API_BASE_URL}/api/forecast?horizon=${horizon}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }

  return response.json();
}