import { env } from "@/shared/config/env";
import type { FrontendEvent, TelemetryEventName } from "@/shared/telemetry/types";

class TelemetryClient {
  private readonly endpoint: string;

  public constructor(baseUrl: string) {
    this.endpoint = `${baseUrl.replace(/\/$/, "")}/api/frontend-events`;
  }

  public track(name: TelemetryEventName, payload?: Record<string, unknown>): void {
    if (typeof window === "undefined") {
      return;
    }

    const event: FrontendEvent = {
      event: name,
      timestamp: new Date().toISOString(),
      route: `${window.location.pathname}${window.location.search}`,
      release: env.release,
      ...(payload !== undefined ? { payload } : {}),
    };

    const body = JSON.stringify(event);
    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      const sent = navigator.sendBeacon(this.endpoint, blob);
      if (sent) {
        return;
      }
    }

    void fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      keepalive: true,
    }).catch(() => undefined);
  }
}

export const telemetry = new TelemetryClient(env.apiBaseUrl);

export function trackPageView(): void {
  telemetry.track("page_view", {
    title: typeof document !== "undefined" ? document.title : "unknown",
  });
}
