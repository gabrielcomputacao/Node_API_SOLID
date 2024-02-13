import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function profile(request: FastifyRequest, response: FastifyReply) {
  // valida o token e verifica se ele existe, garante que a rota nao possa ser chamada sem o token
  // tambem recebe os dados enviados por meio do payload no jwt
  await request.jwtVerify();

  return response.status(200).send();
}
