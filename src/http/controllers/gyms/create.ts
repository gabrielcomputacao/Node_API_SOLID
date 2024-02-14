import { makeCreateGymsService } from "@/services/factories/make-create-gym-service";

import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, response: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  /* parse caso nao for igual a validação ele da um throw automatico */
  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body);

  const registerService = makeCreateGymsService();

  await registerService.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

  return response.status(201).send();
}
