import type { ChangeEvent, FormEvent, ReactElement } from "react";
import { useMemo, useState } from "react";

import {
  earlyAccessInputSchema,
  earlyAccessRequestSchema,
  mapValidationErrors,
  type EarlyAccessFormInput,
  type EarlyAccessValidationErrors,
} from "@/features/early-access/schema";
import {
  extractRequestId,
  mapEarlyAccessError,
  submitEarlyAccessRequest,
} from "@/features/early-access/api";
import { env } from "@/shared/config/env";
import { telemetry } from "@/shared/telemetry/telemetry";

const initialFormState: EarlyAccessFormInput = {
  name: "",
  email: "",
  company: "",
  website: "",
  role: "merchant",
};

type SubmitState = "idle" | "loading" | "success" | "error";

export function EarlyAccessForm(): ReactElement {
  const [formData, setFormData] = useState<EarlyAccessFormInput>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<EarlyAccessValidationErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const endpointDisplay = useMemo(() => `${env.apiBaseUrl}/api/early-access`, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
    setFieldErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
    setFeedbackMessage("");
    setSubmitState("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const inputValidation = earlyAccessInputSchema.safeParse(formData);
    if (!inputValidation.success) {
      const errors = mapValidationErrors(inputValidation.error);
      setFieldErrors(errors);
      setSubmitState("error");
      setFeedbackMessage("Please correct the highlighted fields.");
      telemetry.track("early_access_submit_failure", { reason: "client_validation" });
      return;
    }

    const requestPayload = earlyAccessRequestSchema.parse(formData);
    setSubmitState("loading");
    setFeedbackMessage("");
    setFieldErrors({});

    telemetry.track("early_access_submit_attempt", {
      role: requestPayload.role,
    });

    try {
      const response = await submitEarlyAccessRequest(requestPayload);
      if (!response.success) {
        setSubmitState("error");
        setFeedbackMessage(response.error ?? "Could not submit your request.");
        telemetry.track("early_access_submit_failure", {
          reason: response.error ?? "unknown_error",
          request_id: response.request_id,
        });
        return;
      }

      setSubmitState("success");
      setFeedbackMessage(response.message ?? "Request received. Our team will contact you.");
      setFormData(initialFormState);
      telemetry.track("early_access_submit_success", {
        request_id: response.request_id,
      });
    } catch (error) {
      const userMessage = mapEarlyAccessError(error);
      setSubmitState("error");
      setFeedbackMessage(userMessage);
      telemetry.track("early_access_submit_failure", {
        reason: userMessage,
        request_id: extractRequestId(error),
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2" noValidate>
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
            aria-invalid={fieldErrors.name !== undefined}
            className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-brand-accent placeholder:text-slate-500 focus:ring-1"
          />
          {fieldErrors.name !== undefined ? (
            <p className="mt-1 text-xs text-rose-400">{fieldErrors.name}</p>
          ) : null}
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
            aria-invalid={fieldErrors.email !== undefined}
            className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-brand-accent placeholder:text-slate-500 focus:ring-1"
          />
          {fieldErrors.email !== undefined ? (
            <p className="mt-1 text-xs text-rose-400">{fieldErrors.email}</p>
          ) : null}
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
            aria-invalid={fieldErrors.company !== undefined}
            className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-brand-accent placeholder:text-slate-500 focus:ring-1"
          />
          {fieldErrors.company !== undefined ? (
            <p className="mt-1 text-xs text-rose-400">{fieldErrors.company}</p>
          ) : null}
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
            aria-invalid={fieldErrors.website !== undefined}
            className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-brand-accent placeholder:text-slate-500 focus:ring-1"
          />
          {fieldErrors.website !== undefined ? (
            <p className="mt-1 text-xs text-rose-400">{fieldErrors.website}</p>
          ) : null}
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
            disabled={submitState === "loading"}
            className="w-full rounded-md bg-brand-accent px-5 py-3 text-sm font-semibold text-slate-900 shadow-soft transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitState === "loading" ? "Submitting..." : "Request Access"}
          </button>
        </div>

        {feedbackMessage.length > 0 ? (
          <p
            className={`sm:col-span-2 text-sm ${
              submitState === "success" ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {feedbackMessage}
          </p>
        ) : null}
      </form>

      <p className="mt-4 text-xs text-slate-500">Submitting to: {endpointDisplay}</p>
    </>
  );
}
