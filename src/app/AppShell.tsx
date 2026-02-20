import type { ReactElement } from "react";

import { EarlyAccessForm } from "@/features/early-access/EarlyAccessForm";
import { Section } from "@/shared/ui/Section";

const problems = [
  "ZATCA Phase 2 requires strict invoice schema and integration workflows.",
  "Shopify teams struggle with compliant XML generation and signing.",
  "Manual fixes create failed invoices, risk, and support overhead.",
];

const solutions = [
  {
    title: "Real-time validation",
    text: "Validate invoice payloads before submission and reduce rejection rates.",
  },
  {
    title: "Automated compliance flow",
    text: "Transform Shopify order events into compliance-ready e-invoice documents.",
  },
  {
    title: "Enterprise visibility",
    text: "Track invoice lifecycle and compliance status with operational transparency.",
  },
];

const steps = [
  {
    step: "01",
    title: "Connect Shopify",
    text: "Authorize store access and configure tax/compliance profile.",
  },
  {
    step: "02",
    title: "Process invoices",
    text: "Regulatrix validates, formats, and routes invoices to backend workflows.",
  },
  {
    step: "03",
    title: "Monitor outcomes",
    text: "Review acceptance, retries, and audit logs in one operational view.",
  },
];

const plans = [
  {
    name: "Growth",
    price: "$299",
    details: "per month",
    items: ["Up to 5,000 invoices", "Core validation", "Email support"],
  },
  {
    name: "Scale",
    price: "$999",
    details: "per month",
    items: ["Up to 50,000 invoices", "Priority processing", "Dedicated onboarding"],
  },
];

const trustItems = [
  "Designed for KSA VAT operations",
  "Audit-ready event history",
  "Works for agencies and multi-store merchants",
];

export function AppShell(): ReactElement {
  return (
    <div className="min-h-screen bg-brand-bg text-slate-100">
      <header className="border-b border-slate-800/80">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="#" className="inline-flex items-center" aria-label="Regulatrix home">
            <img
              src="/logo.png"
              alt="Regulatrix"
              className="h-12 w-auto"
              width={767}
              height={212}
              loading="eager"
            />
          </a>
          <a
            href="#cta"
            className="rounded-md border border-brand-accent/40 bg-brand-accent/10 px-4 py-2 text-sm font-medium text-brand-accent transition hover:bg-brand-accent/20"
          >
            Request Early Access
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-800/70">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.17),transparent_42%)]" />
          <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
            <p className="mb-4 inline-flex rounded-full border border-brand-accent/40 bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">
              ZATCA Phase 2 Compliance for Shopify
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Enterprise-grade compliance infrastructure for Saudi Shopify operations.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Regulatrix helps merchants and agencies automate e-invoicing workflows, reduce failures, and stay
              audit-ready without rebuilding their commerce stack.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#cta"
                className="rounded-md bg-brand-accent px-5 py-3 text-sm font-semibold text-slate-900 shadow-soft transition hover:opacity-90"
              >
                Join Early Access
              </a>
              <a
                href="#how-it-works"
                className="rounded-md border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
              >
                How It Works
              </a>
            </div>
          </div>
        </section>

        <Section
          id="problem"
          eyebrow="Problem"
          title="Compliance cannot rely on manual fixes."
          description="Phase 2 requires reliability, traceability, and operational control at production volume."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {problems.map((item) => (
              <div key={item} className="rounded-xl border border-slate-800 bg-brand-panel p-5">
                <p className="text-sm leading-7 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="solution"
          eyebrow="Solution"
          title="Regulatrix is the compliance layer between Shopify and ZATCA workflows."
          description="Operate with predictable validation, routing, and observability for invoice processing."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {solutions.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-800 bg-brand-panel p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="how-it-works" eyebrow="How It Works" title="From order event to compliant invoice in 3 steps.">
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((item) => (
              <article key={item.step} className="rounded-xl border border-slate-800 bg-brand-panel p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                  Step {item.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="pricing" eyebrow="Pricing" title="Straightforward plans for growing and high-volume teams.">
          <div className="grid gap-4 sm:grid-cols-2">
            {plans.map((plan) => (
              <article key={plan.name} className="rounded-xl border border-slate-800 bg-brand-panel p-6">
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-3 text-3xl font-bold text-brand-accent">
                  {plan.price}
                  <span className="ml-2 text-sm font-medium text-slate-400">{plan.details}</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {plan.items.map((item) => (
                    <li key={item} className="text-sm text-slate-300">
                      - {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="trust"
          eyebrow="Trust"
          title="Built for compliance operations, not demo flows."
          description="Designed for teams that need stable, auditable production behavior."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {trustItems.map((item) => (
              <div key={item} className="rounded-xl border border-slate-800 bg-brand-panel p-5">
                <p className="text-sm font-medium text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="cta"
          eyebrow="Call To Action"
          title="Request early access"
          description="Submit your details and we will share onboarding options."
        >
          <div className="max-w-2xl rounded-2xl border border-slate-800 bg-brand-panel p-6">
            <EarlyAccessForm />
          </div>
        </Section>
      </main>
    </div>
  );
}
