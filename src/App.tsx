import { type ReactElement, useEffect } from "react";

import { AppShell } from "@/app/AppShell";
import { trackPageView } from "@/shared/telemetry/telemetry";

export default function App(): ReactElement {
  useEffect(() => {
    trackPageView();
  }, []);

  return <AppShell />;
}
