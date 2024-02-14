import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "../../middlewares/verify-jwt";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);

  app.post("/sessions", authenticate);

  /* ** Autentticated */
  /* OnRequest executa antes do controller , vai passar o request e response para dentro do verifyJWT */
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
