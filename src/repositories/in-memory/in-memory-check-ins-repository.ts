import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

import { CheckInsRepository } from "../check-ins-repositiry";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {
    // retorna as horas iniciais do dia exemplo: 24-01-24 00:00
    const startOfTheDay = dayjs(date).startOf("date");
    // retorna as horas finais do dia exemplo: 24-01-24 23:59
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        // verifica se a data começo depois de 00:00 e se terminou antes de 23:59
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gim_id: data.gim_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
