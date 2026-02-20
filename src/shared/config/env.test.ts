import { parseEnv } from "@/shared/config/env";

describe("parseEnv", () => {
  it("parses valid env values", () => {
    const parsed = parseEnv({
      VITE_API_BASE_URL: "https://api.example.com",
      VITE_APP_ENV: "production",
      VITE_RELEASE: "2026.02.20",
    });

    expect(parsed).toEqual({
      apiBaseUrl: "https://api.example.com",
      appEnv: "production",
      release: "2026.02.20",
    });
  });

  it("rejects invalid api base urls", () => {
    expect(() =>
      parseEnv({
        VITE_API_BASE_URL: "not-a-url",
      })
    ).toThrowError();
  });
});
