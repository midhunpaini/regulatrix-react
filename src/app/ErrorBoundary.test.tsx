import type { ReactElement } from "react";

import { render, screen } from "@testing-library/react";

import { ErrorBoundary } from "@/app/ErrorBoundary";

function ThrowingComponent(): ReactElement {
  throw new Error("boom");
}

describe("ErrorBoundary", () => {
  it("renders fallback when child throws", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    errorSpy.mockRestore();
  });
});
