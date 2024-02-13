import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function profile(request: FastifyRequest, response: FastifyReply) {
  return response.status(200).send();
}
