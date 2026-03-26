// API client for connecting to the Laravel Fitness API backend
// Update this URL to point to your live backend
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {} } = options;
    const token = this.getToken();

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);

    if (response.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.message || "Request failed", response.status, data.errors);
    }

    return data;
  }

  // ======== AUTH ========
  async login(email: string, password: string) {
    return this.request<{ token: string; user: ApiUser }>("/login", {
      method: "POST",
      body: { email, password },
    });
  }

  async register(data: { name: string; email: string; password: string; password_confirmation: string; role?: string }) {
    return this.request<{ token: string; user: ApiUser }>("/register", {
      method: "POST",
      body: data,
    });
  }

  async logout() {
    return this.request<{ message: string }>("/logout", { method: "POST" });
  }

  // ======== SCHEDULES & BOOKINGS (Member) ========
  async getSchedules() {
    return this.request<ApiSchedule[]>("/schedules");
  }

  async createBooking(scheduleId: number) {
    return this.request<ApiBooking>("/bookings", {
      method: "POST",
      body: { schedule_id: scheduleId },
    });
  }

  async cancelBooking(bookingId: number) {
    return this.request<{ message: string }>(`/bookings/${bookingId}`, {
      method: "DELETE",
    });
  }

  // ======== TRAINER ========
  async getRoster(scheduleId: number) {
    return this.request<ApiRosterEntry[]>(`/trainer/schedules/${scheduleId}/roster`);
  }

  async markAttendance(bookingId: number, status: "present" | "absent") {
    return this.request<ApiBooking>(`/trainer/bookings/${bookingId}/attendance`, {
      method: "PATCH",
      body: { status },
    });
  }

  // ======== ADMIN ========
  async getPlans() {
    return this.request<ApiPlan[]>("/admin/plans");
  }

  async createPlan(plan: Omit<ApiPlan, "id">) {
    return this.request<ApiPlan>("/admin/plans", {
      method: "POST",
      body: plan,
    });
  }

  async updatePlan(id: number, plan: Partial<ApiPlan>) {
    return this.request<ApiPlan>(`/admin/plans/${id}`, {
      method: "PUT",
      body: plan,
    });
  }

  async deletePlan(id: number) {
    return this.request<{ message: string }>(`/admin/plans/${id}`, {
      method: "DELETE",
    });
  }
}

// ======== Types ========
export interface ApiUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface ApiSchedule {
  id: number;
  name: string;
  trainer_name: string;
  trainer_id: number;
  time: string;
  date: string;
  day: string;
  capacity: number;
  booked: number;
  duration: string;
  category: string;
}

export interface ApiBooking {
  id: number;
  schedule_id: number;
  class_name: string;
  trainer_name: string;
  date: string;
  time: string;
  status: "confirmed" | "waitlist" | "cancelled";
}

export interface ApiRosterEntry {
  id: number;
  booking_id: number;
  member_name: string;
  status: "present" | "absent" | null;
}

export interface ApiPlan {
  id: number;
  name: string;
  price: number;
  duration: string;
  features: string[];
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export const api = new ApiClient(API_BASE_URL);
