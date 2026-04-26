import Fastify from "fastify";
import cors from "@fastify/cors";
import contactRoutes from "./routes/contactRoutes.js";

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  origin: ["https://ideasprout.in", "https://www.ideasprout.in"],
});

await fastify.register(contactRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 8082, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
