import { contactController } from "../controllers/contactController.js";

export default async function contactRoutes(fastify) {
  fastify.post(
    "/api/contact",
    {
      preHandler: async (request, reply) => {
        const origin = request.headers.origin || request.headers.referer;
        if (!origin || !origin.includes("ideasprout.in")) {
          reply.code(403).send({ error: "Forbidden" });
        }
      },
    },
    contactController.createContact,
  );
}
