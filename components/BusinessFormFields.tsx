import { CATEGORIES, TOWNS } from "@/lib/data";
import type { SubmissionDraft } from "@/lib/types";

interface Props {
  draft: SubmissionDraft;
  errors: Partial<Record<keyof SubmissionDraft, boolean>>;
  onUpdate: <K extends keyof SubmissionDraft>(
    key: K,
    value: SubmissionDraft[K]
  ) => void;
}

export default function BusinessFormFields({ draft, errors, onUpdate }: Props) {
  const inputCls =
    "w-full px-3.5 py-2.5 border rounded-brand-sm text-sm outline-none transition " +
    "border-brand-line bg-white text-brand-ink " +
    "focus:border-brand-green focus:ring-[3px] focus:ring-brand-green/10 " +
    "dark:border-night-line dark:bg-night-elevated dark:text-night-heading " +
    "dark:focus:border-brand-gold dark:focus:ring-brand-gold/15";
  const invalid = "!border-red-500 !ring-[3px] !ring-red-500/15";
  const help = "text-[11px] text-brand-muted mt-0.5 dark:text-night-muted";

  return (
    <div className="grid sm:grid-cols-2 gap-4 mb-5">
      {/* Business Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bizName" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
          Business Name *
        </label>
        <input
          id="bizName"
          type="text"
          value={draft.name}
          className={`${inputCls} ${errors.name ? invalid : ""}`}
          onChange={(e) => onUpdate("name", e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bizCategory" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
          Category *
        </label>
        <select
          id="bizCategory"
          value={draft.category}
          className={`${inputCls} ${errors.category ? invalid : ""}`}
          onChange={(e) => onUpdate("category", e.target.value)}
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Town */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bizTown" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
          Town *
        </label>
        <select
          id="bizTown"
          value={draft.location}
          className={`${inputCls} ${errors.location ? invalid : ""}`}
          onChange={(e) => onUpdate("location", e.target.value)}
        >
          <option value="">Select town</option>
          {TOWNS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Operating Hours */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bizHours" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
          Operating Hours
        </label>
        <input
          id="bizHours"
          type="text"
          placeholder="Mon–Sat · 8:00 – 17:00"
          value={draft.hours}
          className={inputCls}
          onChange={(e) => onUpdate("hours", e.target.value)}
        />
        <span className={help}>Leave blank for &ldquo;Contact business for hours&rdquo;</span>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="bizDescription" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
          Business Description *
        </label>
        <textarea
          id="bizDescription"
          rows={3}
          value={draft.description}
          className={`${inputCls} resize-y min-h-[90px] ${errors.description ? invalid : ""}`}
          onChange={(e) => onUpdate("description", e.target.value)}
        />
      </div>

      {/* Services */}
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="bizServices" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
          Services Offered
        </label>
        <input
          id="bizServices"
          type="text"
          placeholder="Screen repair, Battery replacement, Water damage"
          value={draft.services}
          className={inputCls}
          onChange={(e) => onUpdate("services", e.target.value)}
        />
        <span className={help}>
          Separate multiple services with commas — they&apos;ll appear as chips on your page
        </span>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bizPhone" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
          Phone Number *
        </label>
        <input
          id="bizPhone"
          type="tel"
          value={draft.phone}
          className={`${inputCls} ${errors.phone ? invalid : ""}`}
          onChange={(e) => onUpdate("phone", e.target.value)}
        />
      </div>

      {/* WhatsApp */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bizWhatsapp" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
          WhatsApp Number
        </label>
        <input
          id="bizWhatsapp"
          type="tel"
          value={draft.whatsapp}
          className={inputCls}
          onChange={(e) => onUpdate("whatsapp", e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bizEmail" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
          Email Address *
        </label>
        <input
          id="bizEmail"
          type="email"
          value={draft.email}
          className={`${inputCls} ${errors.email ? invalid : ""}`}
          onChange={(e) => onUpdate("email", e.target.value)}
        />
      </div>

      {/* Address */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bizAddress" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
          Physical Address
        </label>
        <input
          id="bizAddress"
          type="text"
          value={draft.address}
          className={inputCls}
          onChange={(e) => onUpdate("address", e.target.value)}
        />
      </div>

      {/* Image URL */}
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="bizImage" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
          Cover Image URL
        </label>
        <input
          id="bizImage"
          type="url"
          placeholder="https://…"
          value={draft.image}
          className={inputCls}
          onChange={(e) => onUpdate("image", e.target.value)}
        />
        <span className={help}>
          Paste a link to a photo of your business — any image URL works. Leave blank for a default placeholder.
        </span>
      </div>
    </div>
  );
}