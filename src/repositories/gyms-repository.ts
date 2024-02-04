import { Prisma, Gim } from "@prisma/client";

export interface GymsRepository {
  findById(id: string): Promise<Gim | null>;
}
