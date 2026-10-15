const API_BASE_URL = "http://127.0.0.1:8000";

export async function getCustomerSegments() {
  const response = await fetch(
    `${API_BASE_URL}/api/customers/segments`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch customer segmentation data");
  }

  return response.json();
}