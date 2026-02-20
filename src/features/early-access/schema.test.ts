import { earlyAccessInputSchema, earlyAccessRequestSchema } from "@/features/early-access/schema";

describe("earlyAccess schema", () => {
  it("accepts valid payloads", () => {
    const valid = earlyAccessInputSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      company: "Regulatrix",
      website: "https://regulatrix.io",
      role: "merchant",
    });

    expect(valid.success).toBe(true);
  });

  it("rejects invalid email and website", () => {
    const invalid = earlyAccessInputSchema.safeParse({
      name: "Jane Doe",
      email: "invalid-email",
      company: "Regulatrix",
      website: "invalid-website",
      role: "merchant",
    });

    expect(invalid.success).toBe(false);
  });

  it("normalizes empty website to undefined for request payload", () => {
    const parsed = earlyAccessRequestSchema.parse({
      name: "Jane Doe",
      email: "jane@example.com",
      company: "Regulatrix",
      website: "",
      role: "agency",
    });

    expect(parsed.website).toBeUndefined();
  });
});
