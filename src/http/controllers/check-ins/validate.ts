import { makeCheckInService } from "@/services/factories/make-check-in-service";
import { makeCreateGymsService } from "@/services/factories/make-create-gym-service";
import { makeValidateCheckInService } from "@/services/factories/make-validate-check-in";

import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function validate(
  request: FastifyRequest,
  response: FastifyReply
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  /* parse caso nao for igual a validação ele da um throw automatico */
  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const registerService = makeValidateCheckInService();

  await registerService.execute({
    checkInId,
  });

  /* 204 resposta vazia mas sem retornar nada */
  return response.status(204).send({
    checkInId,
  });
}
