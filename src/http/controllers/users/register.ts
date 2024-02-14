import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { makeRegisterService } from "@/services/factories/make-register-service";

import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function register(
  request: FastifyRequest,
  response: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  /* parse caso nao for igual a validação ele da um throw automatico */
  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerService = makeRegisterService();

    await registerService.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      response.status(409).send({
        message: error.message,
      });
    }

    /* O fastify esta tratando o erro nesse momento  */
    throw error;
  }

  return response.status(201).send();
}
