
const API_BASE_URL = "http://127.0.0.1:8001/api/";

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const cleanEndpoint = endpoint.replace(/^\/+/, "");

  const response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Token ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      typeof data === "object"
        ? Object.values(data).flat().join(" ")
        : "Request failed.";

    throw new Error(message || "Request failed.");
  }

  return data;
}

export function loginUser(usernameOrEmail, password) {
  return apiRequest("auth/login/", {
    method: "POST",
    body: JSON.stringify({
      username_or_email: usernameOrEmail,
      password,
    }),
  });
}

export function registerCustomer(formData) {
  return apiRequest("auth/register/", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}
