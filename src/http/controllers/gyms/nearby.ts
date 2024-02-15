import { makeCreateGymsService } from "@/services/factories/make-create-gym-service";
import { makeFetchNearbyGymsService } from "@/services/factories/make-fetch-nearby-gyms-service";
import { makeSearchGymsService } from "@/services/factories/make-search-gym-service";

import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function nearby(request: FastifyRequest, response: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  /* parse caso nao for igual a validação ele da um throw automatico */
  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body);

  const fetchNearbyService = makeFetchNearbyGymsService();

  const { gyms } = await fetchNearbyService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return response.status(200).send({
    gyms,
  });
}
