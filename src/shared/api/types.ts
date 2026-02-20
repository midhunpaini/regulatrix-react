export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiClientRequestOptions<TResponse> {
  path: string;
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
  parse?: (payload: unknown) => TResponse;
}

interface ApiErrorParams {
  code: string;
  message: string;
  status: number;
  requestId?: string | undefined;
  details?: unknown;
}

export class ApiError extends Error {
  public readonly code: string;

  public readonly status: number;

  public readonly requestId: string | undefined;

  public readonly details: unknown;

  public constructor(params: ApiErrorParams) {
    super(params.message);
    this.name = "ApiError";
    this.code = params.code;
    this.status = params.status;
    this.requestId = params.requestId;
    this.details = params.details;
  }
}
