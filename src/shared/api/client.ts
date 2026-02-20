import { ApiError, type ApiClientRequestOptions } from "@/shared/api/types";

const DEFAULT_TIMEOUT_MS = 8_000;

function parseJsonOrText(text: string): unknown {
  if (text.length === 0) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function parseErrorResponse(status: number, payload: unknown): { code: string; message: string; details: unknown } {
  if (typeof payload === "object" && payload !== null) {
    const dictionary = payload as Record<string, unknown>;
    const rawCode = dictionary.code;
    const rawMessage = dictionary.message ?? dictionary.error;
    const rawDetail = dictionary.detail ?? dictionary.details;

    const code = typeof rawCode === "string" ? rawCode : `HTTP_${status}`;
    const message =
      typeof rawMessage === "string"
        ? rawMessage
        : typeof rawDetail === "string"
          ? rawDetail
          : status >= 500
            ? "Server error. Please try again later."
            : "Request failed.";

    return { code, message, details: payload };
  }

  if (typeof payload === "string" && payload.length > 0) {
    return { code: `HTTP_${status}`, message: payload, details: payload };
  }

  return {
    code: `HTTP_${status}`,
    message: status >= 500 ? "Server error. Please try again later." : "Request failed.",
    details: payload,
  };
}

function extractRequestId(response: Response, payload: unknown): string | undefined {
  const headerRequestId = response.headers.get("x-request-id");
  if (headerRequestId !== null && headerRequestId.length > 0) {
    return headerRequestId;
  }

  if (typeof payload === "object" && payload !== null && "request_id" in payload) {
    const requestId = (payload as Record<string, unknown>).request_id;
    if (typeof requestId === "string" && requestId.length > 0) {
      return requestId;
    }
  }

  return undefined;
}

export class ApiClient {
  private readonly baseUrl: string;

  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  public async request<TResponse>(options: ApiClientRequestOptions<TResponse>): Promise<TResponse> {
    const controller = new AbortController();
    const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const requestInit: RequestInit = {
        method: options.method ?? "GET",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        signal: controller.signal,
      };

      if (options.body !== undefined) {
        requestInit.body = JSON.stringify(options.body);
      }

      const response = await fetch(`${this.baseUrl}${options.path}`, requestInit);

      const bodyText = await response.text();
      const payload = parseJsonOrText(bodyText);
      const requestId = extractRequestId(response, payload);

      if (!response.ok) {
        const parsed = parseErrorResponse(response.status, payload);
        throw new ApiError({
          code: parsed.code,
          message: parsed.message,
          status: response.status,
          requestId,
          details: parsed.details,
        });
      }

      try {
        return options.parse !== undefined ? options.parse(payload) : (payload as TResponse);
      } catch (error) {
        throw new ApiError({
          code: "INVALID_RESPONSE",
          message: "Unexpected response format from server.",
          status: response.status,
          requestId,
          details: error,
        });
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        throw new ApiError({
          code: "TIMEOUT",
          message: "The request timed out.",
          status: 408,
        });
      }

      throw new ApiError({
        code: "NETWORK_ERROR",
        message: "Could not reach the server.",
        status: 0,
        details: error,
      });
    } finally {
      clearTimeout(timeout);
    }
  }
}
