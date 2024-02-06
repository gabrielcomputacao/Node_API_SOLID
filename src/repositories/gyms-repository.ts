import { Prisma, Gim } from "@prisma/client";

export interface GymsRepository {
  findById(id: string): Promise<Gim | null>;
  create(data: Prisma.GimCreateInput): Promise<Gim>;
  searchMany(query: string, page: number): Promise<Gim[]>;
}
