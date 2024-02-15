import { makeCreateGymsService } from "@/services/factories/make-create-gym-service";
import { makeFetchUserCheckInsHistoryService } from "@/services/factories/make-fetch-user-ins-history-service";
import { makeSearchGymsService } from "@/services/factories/make-search-gym-service";

import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, response: FastifyReply) {
  const checkInHistorySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  /* parse caso nao for igual a validação ele da um throw automatico */
  const { page } = checkInHistorySchema.parse(request.query);

  const hisotryService = makeFetchUserCheckInsHistoryService();

  const { checkIns } = await hisotryService.execute({
    page,
    userId: request.user.sub,
  });

  return response.status(201).send({
    checkIns,
  });
}
