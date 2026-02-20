import { z } from "zod";

const AppEnvSchema = z.enum(["development", "staging", "production"]);

const RawEnvSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
  VITE_APP_ENV: AppEnvSchema,
  VITE_RELEASE: z.string().min(1),
});

export interface EnvConfig {
  apiBaseUrl: string;
  appEnv: z.infer<typeof AppEnvSchema>;
  release: string;
}

export function parseEnv(raw: Partial<Record<"VITE_API_BASE_URL" | "VITE_APP_ENV" | "VITE_RELEASE", string>>): EnvConfig {
  const parsed = RawEnvSchema.parse({
    VITE_API_BASE_URL: raw.VITE_API_BASE_URL ?? "http://localhost:8000",
    VITE_APP_ENV: raw.VITE_APP_ENV ?? "development",
    VITE_RELEASE: raw.VITE_RELEASE ?? "dev",
  });

  return {
    apiBaseUrl: parsed.VITE_API_BASE_URL.replace(/\/$/, ""),
    appEnv: parsed.VITE_APP_ENV,
    release: parsed.VITE_RELEASE,
  };
}

const runtimeEnv: Partial<Record<"VITE_API_BASE_URL" | "VITE_APP_ENV" | "VITE_RELEASE", string>> = {};

if (typeof import.meta.env.VITE_API_BASE_URL === "string") {
  runtimeEnv.VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
}
if (typeof import.meta.env.VITE_APP_ENV === "string") {
  runtimeEnv.VITE_APP_ENV = import.meta.env.VITE_APP_ENV;
}
if (typeof import.meta.env.VITE_RELEASE === "string") {
  runtimeEnv.VITE_RELEASE = import.meta.env.VITE_RELEASE;
}

export const env = parseEnv(runtimeEnv);
