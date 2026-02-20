import { z } from "zod";

import { apiClient } from "@/shared/api";
import { ApiError } from "@/shared/api/types";
import { earlyAccessResponseSchema } from "@/features/early-access/schema";
import type { EarlyAccessRequest, EarlyAccessResponse } from "@/features/early-access/types";

export async function submitEarlyAccessRequest(payload: EarlyAccessRequest): Promise<EarlyAccessResponse> {
  return apiClient.request({
    path: "/api/early-access",
    method: "POST",
    body: payload,
    parse: (raw) => earlyAccessResponseSchema.parse(raw),
  });
}

export function mapEarlyAccessError(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 400 || error.status === 422) {
      return "Please check your form details and try again.";
    }
    if (error.status >= 500) {
      return "Server error. Please try again in a moment.";
    }
    if (error.code === "TIMEOUT" || error.code === "NETWORK_ERROR") {
      return "Could not connect to the server. Please try again.";
    }
    return error.message;
  }

  if (error instanceof z.ZodError) {
    return "Unexpected server response. Please try again.";
  }

  return "Could not submit your request. Please try again.";
}

export function extractRequestId(error: unknown): string | undefined {
  if (error instanceof ApiError) {
    return error.requestId;
  }
  return undefined;
}
