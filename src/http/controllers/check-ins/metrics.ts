import { makeGetUserMetricsService } from "@/services/factories/make-get-user-metrics-service";
import { makeSearchGymsService } from "@/services/factories/make-search-gym-service";

import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function metrics(request: FastifyRequest, response: FastifyReply) {
  const getMetricsService = makeGetUserMetricsService();

  const { checkInsCount } = await getMetricsService.execute({
    userId: request.user.sub,
  });

  return response.status(201).send({
    checkInsCount,
  });
}
