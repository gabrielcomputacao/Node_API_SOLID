import { Prisma, Gim } from "@prisma/client";

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface GymsRepository {
  findById(id: string): Promise<Gim | null>;
  findManyNearby(params: FindManyNearbyParams): Promise<Gim[]>;
  create(data: Prisma.GimCreateInput): Promise<Gim>;
  searchMany(query: string, page: number): Promise<Gim[]>;
}
