import axios from "axios";

// Browser: use relative /api (goes through Next.js rewrite proxy)
// Server (SSR): use absolute Render URL directly (relative URLs don't work in Node.js)
const API_URL =
  typeof window === "undefined"
    ? process.env.API_URL || "http://localhost:5000/api"        // SSR
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"; // Browser

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Attach JWT from localStorage as Bearer token on every request
// Only runs in browser (localStorage doesn't exist in SSR)
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("da_jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Only redirect on 401 if not an auth endpoint and not already on login page
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const is401 = error.response?.status === 401;
    const isAuthEndpoint = error.config?.url?.includes("/auth/");
    const isLoginPage =
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/login");

    if (is401 && !isAuthEndpoint && !isLoginPage) {
      localStorage.removeItem("da_jwt");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const appointmentsApi = {
  getByUser: (email) => api.get(`/appointments?email=${email}`),
  create: (data) => api.post("/appointments", data),
  update: (id, data) => api.patch(`/appointments/${id}`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
};

// ⚠️ This hits your Render backend (/api/auth/jwt), NOT Better Auth
// Make sure your Render server has a POST /api/auth/jwt endpoint
export const authApi = {
  getJwt: async (email) => {
    const res = await api.post("/auth/jwt", { email });
    if (res.data?.token && typeof window !== "undefined") {
      localStorage.setItem("da_jwt", res.data.token);
    }
    return res;
  },
};

export const reviewsApi = {
  getByDoctor: (doctorId) => api.get(`/reviews/${doctorId}`),
  create: (data) => api.post("/reviews", data),
};

export const doctorsApi = {
  getAll: () => api.get("/doctors"),
  getById: (id) => api.get(`/doctors/${id}`),
};