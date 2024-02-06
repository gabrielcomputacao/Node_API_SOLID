import { hash } from "bcryptjs";

import { UserRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { Gim } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface SearchGymsServiceRequest {
  query: string;
  page: number;
}

interface SearchGymsServiceRsponse {
  gyms: Gim[];
}

export class SearchGymsService {
  private gymRepository: GymsRepository;

  constructor(gymRepository: any) {
    this.gymRepository = gymRepository;
  }

  async execute({
    query,
    page,
  }: SearchGymsServiceRequest): Promise<SearchGymsServiceRsponse> {
    const gyms = await this.gymRepository.searchMany(query, page);

    return { gyms };
  }
}
