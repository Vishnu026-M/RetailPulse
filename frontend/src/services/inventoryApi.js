const API_BASE_URL = "http://127.0.0.1:8000";

export async function getInventoryData() {
  const response = await fetch(
    `${API_BASE_URL}/api/inventory`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch inventory data");
  }

  return response.json();
}