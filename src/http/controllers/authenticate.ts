import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "@/services/authenticate";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service";

import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  response: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  /* parse caso nao for igual a validação ele da um throw automatico */
  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateService = makeAuthenticateService();

    await authenticateService.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      response.status(400).send({
        message: error.message,
      });
    }

    /* O fastify esta tratando o erro nesse momento  */
    throw error;
  }

  return response.status(200).send();
}
