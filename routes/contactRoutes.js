import { contactController } from "../controllers/contactController.js";

export default async function contactRoutes(fastify) {
  fastify.post("/api/contact", contactController.createContact);
}
