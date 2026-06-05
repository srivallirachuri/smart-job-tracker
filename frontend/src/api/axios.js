import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // needed for refresh cookie
});

// ✅ Attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Handle refresh logic properly
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        console.log("🔄 Refreshing token...");

        const res = await api.post("/auth/refresh");

        const newAccessToken = res.data.accessToken;

        console.log("✅ New token:", newAccessToken);

        // 🔥 CRITICAL
        localStorage.setItem("accessToken", newAccessToken);

        // 🔥 UPDATE HEADER PROPERLY
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return api(originalRequest);
      } catch (err) {
        console.log("❌ Refresh failed");

        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
