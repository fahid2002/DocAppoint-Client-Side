import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Attach JWT from localStorage as Bearer token on every request
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("da_jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Protected endpoints that should redirect to login on 401
const PROTECTED_ENDPOINTS = ["/appointments"];

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const is401 = error.response?.status === 401;
    const url = error.config?.url || "";
    const isAuthEndpoint = url.includes("/auth/");
    const isProtectedEndpoint = PROTECTED_ENDPOINTS.some((ep) => url.includes(ep));
    const isLoginPage =
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/login");

    if (is401 && !isAuthEndpoint && isProtectedEndpoint && !isLoginPage) {
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