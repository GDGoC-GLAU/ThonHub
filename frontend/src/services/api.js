import axios from "axios";
import {
  getAuthHeader,
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  clearTokens
} from "./auth";

// Base configuration
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "/",
  withCredentials: true,
  timeout: 20000
});

// Track refresh state to avoid duplicate refresh calls
let isRefreshing = false;
let pendingRequestsQueue = [];

function resolveQueuedRequests(newAccessToken) {
  pendingRequestsQueue.forEach(({ resolve }) => resolve(newAccessToken));
  pendingRequestsQueue = [];
}

function rejectQueuedRequests(error) {
  pendingRequestsQueue.forEach(({ reject }) => reject(error));
  pendingRequestsQueue = [];
}

// Attach Authorization header
apiClient.interceptors.request.use(
  (config) => {
    config.headers = {
      ...(config.headers || {}),
      ...getAuthHeader()
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// Normalize error shape
function normalizeError(error) {
  if (error.response) {
    const { status, data } = error.response;
    return {
      isNetworkError: false,
      status,
      data,
      message: data?.message || error.message || "Request failed"
    };
  }
  if (error.request) {
    return {
      isNetworkError: true,
      status: 0,
      data: null,
      message: "Network error. Please check your connection."
    };
  }
  return { isNetworkError: false, status: 0, data: null, message: error.message };
}

// Attempt token refresh using a conventional endpoint.
// Adjust path/body to your backend contract (Flask backend can expose /api/auth/refresh).
async function refreshAccessToken() {
  const currentRefreshToken = getRefreshToken();
  if (!currentRefreshToken) throw new Error("No refresh token available");

  const response = await axios.post(
    (process.env.REACT_APP_API_BASE_URL || "/") + "api/auth/refresh",
    { refresh_token: currentRefreshToken },
    { withCredentials: true }
  );

  const { access_token: newAccessToken, refresh_token: newRefreshToken } = response.data || {};
  if (!newAccessToken) throw new Error("Missing access token in refresh response");

  setAccessToken(newAccessToken);
  if (newRefreshToken) setRefreshToken(newRefreshToken);
  return newAccessToken;
}

// Response interceptor to handle 401 and retry
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const normalized = normalizeError(error);
    const originalRequest = error.config;

    if (normalized.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshAccessToken();
          isRefreshing = false;
          resolveQueuedRequests(newToken);
        } catch (refreshError) {
          isRefreshing = false;
          rejectQueuedRequests(refreshError);
          clearTokens();
          return Promise.reject(normalizeError(refreshError));
        }
      }

      try {
        const newToken = await new Promise((resolve, reject) => {
          pendingRequestsQueue.push({ resolve, reject });
        });
        originalRequest.headers = {
          ...(originalRequest.headers || {}),
          Authorization: `Bearer ${newToken}`
        };
        return apiClient(originalRequest);
      } catch (e) {
        return Promise.reject(normalizeError(e));
      }
    }

    return Promise.reject(normalized);
  }
);

export default apiClient;

// Convenience helpers
export const get = (url, config) => apiClient.get(url, config).then((r) => r.data);
export const del = (url, config) => apiClient.delete(url, config).then((r) => r.data);
export const post = (url, data, config) => apiClient.post(url, data, config).then((r) => r.data);
export const put = (url, data, config) => apiClient.put(url, data, config).then((r) => r.data);
export const patch = (url, data, config) => apiClient.patch(url, data, config).then((r) => r.data);


