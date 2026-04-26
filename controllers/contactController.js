import { contactRepo } from "../repos/contactRepo.js";
import { emailService } from "../services/emailService.js";

const PRODUCT_LABELS = {
  "customer-support": "Customer Support",
  "it-support": "IT Helpdesk",
  "human-resources": "HR Management",
  "quality-assurance": "Quality Assurance",
  "fleet-management": "Fleet Management",
  "legal-compliance": "Legal & Compliance",
  "custom-solutions": "Custom Solutions",
  "general": "General Enquiry",
};

const CORE_FIELDS = ["name", "email", "phone", "company"];

function buildEmail(fields, productLabel) {
  const { name, email, phone, company, product, ...rest } = fields;
  const ordered = { name, email, phone, company, ...rest };

  const rows = Object.entries(ordered)
    .map(([k, v]) => `<tr><td style="padding:4px 8px;font-weight:bold;text-transform:capitalize">${k}</td><td style="padding:4px 8px">${v}</td></tr>`)
    .join("");

  const html = `<table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
  <thead><tr><th colspan="2" style="padding:8px;background:#f4f4f4">${productLabel} — Demo Request</th></tr></thead>
  <tbody>${rows}</tbody>
</table>`;

  const text = Object.entries(ordered)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  return { html, text };
}

export const contactController = {
  async createContact(request, reply) {
    try {
      const body = request.body;
      const missing = CORE_FIELDS.filter((f) => !body[f]);
      if (missing.length) {
        return reply.code(400).send({ error: `Missing required fields: ${missing.join(", ")}` });
      }

      const productLabel = PRODUCT_LABELS[body.product] ?? "General Enquiry";
      const subject = `[Demo Request] ${productLabel} — ${body.company} (${body.name})`;
      const { html, text } = buildEmail(body, productLabel);

      await contactRepo.create(body);
      await emailService.sendEmails(
        "contact@ideasprout.in",
        subject,
        html,
        text,
        body.email,
        body.name,
      );

      reply.code(200).send({ ok: true });
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  },
};
