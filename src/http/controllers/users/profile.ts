import { makeGetUserProfileService } from "@/services/factories/make-get-user-profile-service";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function profile(request: FastifyRequest, response: FastifyReply) {
  // valida o token e verifica se ele existe, garante que a rota nao possa ser chamada sem o token
  // tambem recebe os dados enviados por meio do payload no jwt

  const getUserProfile = makeGetUserProfileService();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  return response.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
