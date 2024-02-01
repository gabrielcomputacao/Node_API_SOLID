import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterService } from "@/services/register";
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
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(prismaUsersRepository);

    await registerService.execute({ name, email, password });
  } catch (error) {
    return response.status(409).send();
  }

  return response.status(201).send();
}
