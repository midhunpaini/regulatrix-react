export type TelemetryEventName =
  | "page_view"
  | "early_access_submit_attempt"
  | "early_access_submit_success"
  | "early_access_submit_failure"
  | "frontend_error";

export interface FrontendEvent {
  event: TelemetryEventName;
  timestamp: string;
  route: string;
  release?: string;
  payload?: Record<string, unknown>;
}
