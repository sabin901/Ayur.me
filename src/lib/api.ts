/**
 * Central API client for the ayur.me backend.
 *
 * - In production: set VITE_API_URL in Vercel env vars (e.g. https://your-backend.onrender.com/api)
 * - In development: defaults to /api (proxied to localhost:5002 via vite.config.ts)
 *
 * All routes that need auth pull the token from localStorage. Use
 * `setAuthToken(...)` on login/logout.
 */

export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) || "/api";

const TOKEN_STORAGE_KEY = "ayurme:token:v1";

let memoryToken: string | null = null;

function readStoredToken(): string | null {
  if (memoryToken) return memoryToken;
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token: string | null) {
  memoryToken = token;
  try {
    if (typeof window === "undefined") return;
    if (token) window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
    else window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    /* ignore storage errors */
  }
}

export function getAuthToken(): string | null {
  return readStoredToken();
}

export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

type RequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: unknown;
  headers?: Record<string, string>;
  /** When true, don't attach the auth token even if one is present. */
  anonymous?: boolean;
  /** Abort after this many ms (default 15s). */
  timeoutMs?: number;
};

export async function apiFetch<T = unknown>(
  path: string,
  opts: RequestOptions = {}
): Promise<T> {
  const { anonymous, timeoutMs = 15_000, body, headers, ...rest } = opts;

  const url = path.startsWith("http")
    ? path
    : `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

  const finalHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
  };
  if (body !== undefined && !(body instanceof FormData)) {
    finalHeaders["Content-Type"] = "application/json";
  }
  if (!anonymous) {
    const token = readStoredToken();
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(url, {
      ...rest,
      headers: finalHeaders,
      signal: controller.signal,
      body:
        body === undefined
          ? undefined
          : body instanceof FormData
          ? body
          : JSON.stringify(body),
    });
  } catch (err) {
    window.clearTimeout(timer);
    if ((err as DOMException)?.name === "AbortError") {
      throw new ApiError("Request timed out", 0);
    }
    throw new ApiError(
      err instanceof Error ? err.message : "Network error",
      0
    );
  }
  window.clearTimeout(timer);

  const isJson = (res.headers.get("content-type") || "").includes("application/json");
  const payload: unknown = isJson ? await res.json().catch(() => null) : await res.text();

  if (!res.ok) {
    const message =
      (payload && typeof payload === "object" && "error" in payload
        ? String((payload as { error: unknown }).error)
        : null) || `Request failed (${res.status})`;
    // Auto-clear stale tokens on 401.
    if (res.status === 401 && !anonymous) setAuthToken(null);
    throw new ApiError(message, res.status, payload);
  }

  return payload as T;
}

// ---------- Typed helpers ----------

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
  primaryDosha?: "vata" | "pitta" | "kapha" | null;
  createdAt?: string;
};

export type AuthResponse = { token: string; user: AuthUser };

export const auth = {
  register: (input: { email: string; password: string; name?: string }) =>
    apiFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: input,
      anonymous: true,
    }),
  login: (input: { email: string; password: string }) =>
    apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: input,
      anonymous: true,
    }),
  me: () => apiFetch<{ user: AuthUser }>("/auth/me"),
};

export type SavedAssessment = {
  _id: string;
  userId: string;
  primaryDosha: "vata" | "pitta" | "kapha";
  secondaryDosha: "vata" | "pitta" | "kapha" | null;
  constitution: string;
  percentages: { vata: number; pitta: number; kapha: number };
  rawScores?: { vata: number; pitta: number; kapha: number };
  notes?: string;
  createdAt: string;
};

export const assessments = {
  list: () => apiFetch<{ items: SavedAssessment[] }>("/assessments"),
  save: (input: Omit<SavedAssessment, "_id" | "userId" | "createdAt">) =>
    apiFetch<{ assessment: SavedAssessment }>("/assessments", {
      method: "POST",
      body: input,
    }),
  remove: (id: string) =>
    apiFetch<{ ok: true }>(`/assessments/${id}`, { method: "DELETE" }),
};

export const contact = {
  send: (input: { name: string; email: string; message: string }) =>
    apiFetch<{ ok: true }>("/contact", { method: "POST", body: input, anonymous: true }),
};
