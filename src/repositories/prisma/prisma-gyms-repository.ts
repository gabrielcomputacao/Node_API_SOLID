import { Gim, Prisma } from "@prisma/client";

import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gim.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }
  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gim[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }
  async create(data: Prisma.GimCreateInput) {
    const gym = await prisma.gim.create({
      data,
    });

    return gym;
  }
  async searchMany(query: string, page: number) {
    const gyms = await prisma.gim.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }
}
