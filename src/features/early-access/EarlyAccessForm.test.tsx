import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { EarlyAccessForm } from "@/features/early-access/EarlyAccessForm";

vi.mock("@/shared/telemetry/telemetry", () => ({
  telemetry: {
    track: vi.fn(),
  },
  trackPageView: vi.fn(),
}));

function mockJsonResponse(body: unknown, status = 200, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

describe("EarlyAccessForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>): Promise<void> {
    await user.type(screen.getByLabelText("Name"), "Jane Doe");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.type(screen.getByLabelText("Company"), "Regulatrix");
  }

  it("submits successfully and shows a success message", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      mockJsonResponse({
        success: true,
        message: "Saved",
        request_id: "req-100",
      })
    );

    const user = userEvent.setup();
    render(<EarlyAccessForm />);

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Request Access" }));

    await waitFor(() => {
      expect(screen.getByText("Saved")).toBeInTheDocument();
    });
  });

  it("maps 400/500 backend responses to safe user-facing errors", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    fetchSpy.mockResolvedValueOnce(mockJsonResponse({ error: "Bad Request" }, 400, { "x-request-id": "req-400" }));
    fetchSpy.mockResolvedValueOnce(
      mockJsonResponse({ error: "Server exploded" }, 500, { "x-request-id": "req-500" })
    );

    const user = userEvent.setup();
    render(<EarlyAccessForm />);

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Request Access" }));

    await waitFor(() => {
      expect(screen.getByText("Please check your form details and try again.")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Request Access" }));
    await waitFor(() => {
      expect(screen.getByText("Server error. Please try again in a moment.")).toBeInTheDocument();
    });
  });

  it("disables submit while request is in progress", async () => {
    let resolveFetch: (value: Response) => void = () => undefined;
    vi.spyOn(globalThis, "fetch").mockImplementation(
      () =>
        new Promise<Response>((resolve) => {
          resolveFetch = resolve;
        })
    );

    const user = userEvent.setup();
    render(<EarlyAccessForm />);

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Request Access" }));

    const button = screen.getByRole("button", { name: "Submitting..." });
    expect(button).toBeDisabled();

    resolveFetch(mockJsonResponse({ success: true, message: "done" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Request Access" })).toBeEnabled();
    });
  });
});
