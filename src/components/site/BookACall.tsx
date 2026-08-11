import { useEffect, useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const EVENT = "kas:open-book-a-call";

export function openBookACall() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(EVENT));
}

const services = [
  "AI Video Ads",
  "Creative Production",
  "Social Media Creatives",
  "Meta Ads",
  "Other",
] as const;

const contactMethods = ["WhatsApp", "Phone Call", "Email"] as const;

interface FormState {
  name: string;
  brand: string;
  email: string;
  phone: string;
  service: string;
  details: string;
  contact: string;
}

const empty: FormState = {
  name: "",
  brand: "",
  email: "",
  phone: "",
  service: "",
  details: "",
  contact: "WhatsApp",
};

function validate(v: FormState) {
  const e: Partial<Record<keyof FormState, string>> = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  else if (v.name.trim().length > 100) e.name = "Name must be under 100 characters.";
  if (!v.brand.trim()) e.brand = "Please enter your brand or company name.";
  else if (v.brand.trim().length > 100) e.brand = "Must be under 100 characters.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  const digits = v.phone.replace(/\D/g, "");
  if (!v.phone.trim()) e.phone = "Please enter your phone number.";
  else if (digits.length < 8 || digits.length > 15) e.phone = "Enter a valid phone number.";
  if (!v.service) e.service = "Please select what you need.";
  if (!v.details.trim()) e.details = "Tell us a little about your project.";
  else if (v.details.trim().length > 1000) e.details = "Please keep it under 1000 characters.";
  return e;
}

function buildWaUrl(v: FormState) {
  const message =
    `NEW BOOK A CALL REQUEST\n\n` +
    `Name: ${v.name.trim()}\n` +
    `Brand / Company: ${v.brand.trim()}\n` +
    `Email: ${v.email.trim()}\n` +
    `Phone: ${v.phone.trim()}\n` +
    `Service: ${v.service}\n` +
    `Project Details: ${v.details.trim()}\n` +
    `Preferred Contact: ${v.contact}\n\n` +
    `Please get back to me regarding this project.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const fieldCls =
  "mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-gold/50 focus:bg-white/[0.05]";
const labelCls = "text-[10px] uppercase tracking-[0.25em] text-muted-foreground";

export function BookACallDialog() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);
  const [waUrl, setWaUrl] = useState<string | null>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(EVENT, onOpen);
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setLoading(true);
    const url = buildWaUrl(values);
    setWaUrl(url);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    setLoading(false);
    if (win) win.focus();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 py-10 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Book a Call">
      <div className="absolute inset-0" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0B0B0B]/95 p-6 sm:p-10 shadow-elevated animate-scale-in">
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-5 top-5 h-9 w-9 rounded-full glass grid place-items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          ✕
        </button>

        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Let&rsquo;s talk</div>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
          Book a <span className="text-gradient-gold italic font-normal">Call</span>
        </h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Tell us a little about your brand and what you need. We&rsquo;ll review it and get back to you.
        </p>

        {waUrl ? (
          <div className="mt-8 rounded-2xl glass p-6 text-sm">
            <p className="text-foreground">
              Your message is ready in WhatsApp — press <strong>Send</strong> there to deliver it. Nothing has been sent yet.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-gold hover:-translate-y-0.5"
              >
                Open WhatsApp <span aria-hidden>→</span>
              </a>
              <button
                type="button"
                onClick={() => setWaUrl(null)}
                className="inline-flex items-center rounded-full glass px-6 py-3 text-sm font-medium hover:bg-white/10 transition-all"
              >
                Edit details
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name *" error={errors.name}>
              <input className={fieldCls} value={values.name} onChange={set("name")} placeholder="Your name" maxLength={100} />
            </Field>
            <Field label="Brand / Company Name *" error={errors.brand}>
              <input className={fieldCls} value={values.brand} onChange={set("brand")} placeholder="Your brand" maxLength={100} />
            </Field>
            <Field label="Email *" error={errors.email}>
              <input className={fieldCls} value={values.email} onChange={set("email")} placeholder="you@brand.com" inputMode="email" maxLength={255} />
            </Field>
            <Field label="Phone Number *" error={errors.phone}>
              <input className={fieldCls} value={values.phone} onChange={set("phone")} placeholder="+91 90000 00000" inputMode="tel" maxLength={20} />
            </Field>
            <Field label="What do you need? *" error={errors.service} full>
              <select className={`${fieldCls} appearance-none`} value={values.service} onChange={set("service")}>
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s} value={s} className="bg-[#0B0B0B]">
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Project Details / What are you looking for? *" error={errors.details} full>
              <textarea rows={4} className={`${fieldCls} resize-none`} value={values.details} onChange={set("details")} placeholder="A few lines about your brand, goals and timeline." maxLength={1000} />
            </Field>
            <Field label="Preferred Contact Method" full>
              <div className="mt-2 flex flex-wrap gap-2">
                {contactMethods.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setValues((v) => ({ ...v, contact: m }))}
                    className={`rounded-full px-5 py-2.5 text-sm transition-all border ${
                      values.contact === m
                        ? "border-gold/50 bg-gold/10 text-gold"
                        : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </Field>

            <div className="sm:col-span-2 mt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium text-primary-foreground transition-all hover:shadow-gold hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? "Preparing…" : "Request a Call"}
                <span aria-hidden>→</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className={labelCls}>{label}</label>
      {children}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
