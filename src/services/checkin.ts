import { GymsRepository } from "./../repositories/gyms-repository";
import { CheckIn } from "@prisma/client";

import { CheckInsRepository } from "@/repositories/check-ins-repositiry";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}
interface CheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userId,
    gymId,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    // calcular a distancia do usuario e a academia se for maior que 100 metros precisa dar um erro

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new Error();
    }

    const checkIn = await this.checkInsRepository.create({
      gim_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
