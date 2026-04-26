import { contactRepo } from "../repos/contactRepo.js";
import { emailService } from "../services/emailService.js";

export const contactController = {
  async createContact(request, reply) {
    try {
      const { to, subject, html, text, data } = request.body;

      // Save to database
      await contactRepo.create(data);

      // Send emails
      await emailService.sendEmails(
        to,
        subject,
        html,
        text,
        data.email,
        data.name,
      );

      reply.code(200).send({ success: true });
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  },
};
