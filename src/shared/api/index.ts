import { ApiClient } from "@/shared/api/client";
import { env } from "@/shared/config/env";

export const apiClient = new ApiClient(env.apiBaseUrl);
