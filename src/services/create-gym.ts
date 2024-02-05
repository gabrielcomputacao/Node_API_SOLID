import { hash } from "bcryptjs";

import { UserRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { Gim } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface CreateGymServiceRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymServiceRsponse {
  gym: Gim;
}

export class CreateGymService {
  private gymRepository: GymsRepository;

  constructor(gymRepository: any) {
    this.gymRepository = gymRepository;
  }

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymServiceRequest): Promise<CreateGymServiceRsponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
