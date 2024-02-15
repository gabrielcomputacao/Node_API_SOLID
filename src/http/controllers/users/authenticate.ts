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

    const { user } = await authenticateService.execute({ email, password });

    // token que o usuario usa com duração baixa
    const token = await response.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );
    const refreshToken = await response.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          /* expira caso usuario fique 7 dias sem entrar no sistema */
          expiresIn: "7d",
        },
      }
    );

    return response
      .status(200)
      .setCookie("refresh", refreshToken, {
        // quais rotas do backend vao poder acessar o cookie
        path: "/",
        // o cookie vai ser encriptado via https, front end nao consegue ler o valor como informação bruta, ela esta incriptada
        secure: true,
        // so acessado dentro do mesmo dominio
        sameSite: true,
        //so pode ser acessado pelo backend, so vai poder ser acessado pelo contexto da requisicao, nao fica visivel na abinha do navegador em cookies
        httpOnly: true,
      })
      .send({
        token,
      });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      response.status(400).send({
        message: error.message,
      });
    }

    /* O fastify esta tratando o erro nesse momento  */
    throw error;
  }
}
