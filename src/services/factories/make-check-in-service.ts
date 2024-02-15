import { CheckInService } from "./../checkin";
import { PrismaCheckInsRepository } from "./../../repositories/prisma/prisma.check-ins-repository";
import { PrismaGymsRepository } from "./../../repositories/prisma/prisma-gyms-repository";
import { GetUserMetricsService } from "../get-users-metrics";

export function makeCheckInService() {
  const prismaUsersRepository = new PrismaCheckInsRepository();
  const gymRepository = new PrismaGymsRepository();
  const service = new CheckInService(prismaUsersRepository, gymRepository);

  return service;
}
