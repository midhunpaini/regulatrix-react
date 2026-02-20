import { type ErrorInfo, type ReactNode } from "react";
import { Component } from "react";

import { telemetry } from "@/shared/telemetry/telemetry";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    telemetry.track("frontend_error", {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }

  public override render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="mx-auto mt-20 max-w-xl rounded-xl border border-rose-500/40 bg-brand-panel p-6 text-slate-200">
        <h1 className="text-xl font-semibold text-white">Something went wrong</h1>
        <p className="mt-2 text-sm text-slate-300">
          An unexpected frontend error occurred. Please refresh and try again.
        </p>
      </div>
    );
  }
}
