import { ApiClient } from "@/shared/api/client";

describe("ApiClient", () => {
  const client = new ApiClient("https://api.example.com");

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("maps backend errors into ApiError", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "Invalid payload." }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "x-request-id": "req-123",
        },
      })
    );

    await expect(client.request({ path: "/api/early-access", method: "POST", body: {} })).rejects.toEqual(
      expect.objectContaining({
        code: "HTTP_400",
        status: 400,
        requestId: "req-123",
      })
    );
  });

  it("maps network errors into ApiError", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("Failed to fetch"));

    await expect(client.request({ path: "/api/early-access", method: "POST", body: {} })).rejects.toEqual(
      expect.objectContaining({
        code: "NETWORK_ERROR",
        status: 0,
      })
    );
  });

  it("maps timeout errors into ApiError", async () => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, "fetch").mockImplementation(
      (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          const signal = init?.signal;
          signal?.addEventListener("abort", () => {
            reject(new DOMException("aborted", "AbortError"));
          });
        })
    );

    const requestPromise = client.request({
      path: "/api/early-access",
      method: "POST",
      body: {},
      timeoutMs: 10,
    });

    const expectation = expect(requestPromise).rejects.toEqual(
      expect.objectContaining({
        code: "TIMEOUT",
        status: 408,
      })
    );

    await vi.advanceTimersByTimeAsync(10);
    await expectation;
  });
});
