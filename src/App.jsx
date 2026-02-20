import { useMemo, useState } from "react";

import Section from "./components/Section";

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

const defaultForm = {
  name: "",
  email: "",
  company: "",
  website: "",
  role: "merchant",
};

export default function App() {
  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const apiBaseUrl = useMemo(
    () => (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000").replace(/\/$/, ""),
    []
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/early-access`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error ?? "Request failed");
      }

      setSuccess("Request received. Our team will contact you.");
      setFormData(defaultForm);
    } catch (submitError) {
      setError(submitError.message || "Unable to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-slate-100">
      <header className="border-b border-slate-800/80">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <span className="text-lg font-semibold tracking-wide text-white">Regulatrix</span>
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
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-brand-accent placeholder:text-slate-500 focus:ring-1"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-brand-accent placeholder:text-slate-500 focus:ring-1"
                />
              </div>

              <div>
                <label htmlFor="company" className="mb-2 block text-sm font-medium text-slate-200">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-brand-accent placeholder:text-slate-500 focus:ring-1"
                />
              </div>

              <div>
                <label htmlFor="website" className="mb-2 block text-sm font-medium text-slate-200">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://"
                  className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-brand-accent placeholder:text-slate-500 focus:ring-1"
                />
              </div>

              <div>
                <label htmlFor="role" className="mb-2 block text-sm font-medium text-slate-200">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-brand-accent focus:ring-1"
                >
                  <option value="agency">Agency</option>
                  <option value="merchant">Merchant</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-md bg-brand-accent px-5 py-3 text-sm font-semibold text-slate-900 shadow-soft transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Request Access"}
                </button>
              </div>

              {success ? <p className="sm:col-span-2 text-sm text-emerald-400">{success}</p> : null}
              {error ? <p className="sm:col-span-2 text-sm text-rose-400">{error}</p> : null}
            </form>
            <p className="mt-4 text-xs text-slate-500">Submitting to: {apiBaseUrl}/api/early-access</p>
          </div>
        </Section>
      </main>
    </div>
  );
}
