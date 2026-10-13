import type { SubmissionDraft } from "./types";

/**
 * Validates a business draft. Returns an object mapping field names
 * to `true` for fields that failed validation. Empty object = valid.
 */
export function validateBusinessDraft(
  d: SubmissionDraft
): Partial<Record<keyof SubmissionDraft, boolean>> {
  const errors: Partial<Record<keyof SubmissionDraft, boolean>> = {};

  const required: (keyof SubmissionDraft)[] = [
    "name",
    "category",
    "location",
    "description",
    "phone",
    "email",
  ];
  for (const k of required) {
    if (!d[k] || !d[k].trim()) errors[k] = true;
  }

  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) {
    errors.email = true;
  }

  return errors;
}

/** Map a Business record to an editable draft */
export function businessToDraft(b: {
  name: string;
  category: string;
  location: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  services: string;
  image: string;
}): SubmissionDraft {
  return {
    name: b.name,
    category: b.category,
    location: b.location,
    description: b.description,
    phone: b.phone,
    whatsapp: b.whatsapp,
    email: b.email,
    address: b.address,
    hours: b.hours,
    services: b.services,
    image: b.image,
  };
}

/** Empty draft — used when opening a fresh create form */
export const EMPTY_DRAFT: SubmissionDraft = {
  name: "",
  category: "",
  location: "",
  description: "",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  hours: "",
  services: "",
  image: "",
};