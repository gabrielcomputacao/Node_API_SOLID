import { makeCreateGymsService } from "@/services/factories/make-create-gym-service";
import { makeSearchGymsService } from "@/services/factories/make-search-gym-service";

import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, response: FastifyReply) {
  const createGymQuery = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  /* parse caso nao for igual a validação ele da um throw automatico */
  const { q, page } = createGymQuery.parse(request.body);

  const searchService = makeSearchGymsService();

  const { gyms } = await searchService.execute({
    query: q,
    page,
  });

  return response.status(201).send({
    gyms,
  });
}
