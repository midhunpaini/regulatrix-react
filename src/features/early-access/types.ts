export type EarlyAccessRole = "agency" | "merchant";

export interface EarlyAccessRequest {
  name: string;
  email: string;
  company: string;
  website?: string;
  role: EarlyAccessRole;
}

export interface EarlyAccessResponse {
  success: boolean;
  message?: string | undefined;
  error?: string | undefined;
  request_id?: string | undefined;
}
