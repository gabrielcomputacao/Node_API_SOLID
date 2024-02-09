import { FetchUserCheckInsHistoryService } from "../fetch-member-check-ins-history";
import { GetUserMetricsService } from "../get-users-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma.check-ins-repository";
import { ValidateCheckInService } from "../validate-check-in";

export function makeValidateCheckInService() {
  const prismaUsersRepository = new PrismaCheckInsRepository();
  const service = new ValidateCheckInService(prismaUsersRepository);

  return service;
}
