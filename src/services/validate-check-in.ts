import { GymsRepository } from "./../repositories/gyms-repository";
import { CheckIn } from "@prisma/client";

import { CheckInsRepository } from "@/repositories/check-ins-repositiry";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordenates";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-checkins-error";
import { MaxDistanceError } from "./errors/max-distance-error";
import dayjs from "dayjs";
import { LateCheckInValidateError } from "./errors/late-check-in-validation-error";

interface ValidateCheckInServiceRequest {
  checkInId: string;
}
interface ValidateCheckInServiceResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    // diff retorna a diferença das duas datas passadas como parametro em uma unidade de medida escolhida

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distanceInMinutesFromCheckInCreation) {
      throw new LateCheckInValidateError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
