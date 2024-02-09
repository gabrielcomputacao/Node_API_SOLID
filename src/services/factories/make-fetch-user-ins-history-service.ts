import { FetchUserCheckInsHistoryService } from "../fetch-member-check-ins-history";
import { GetUserMetricsService } from "../get-users-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma.check-ins-repository";

export function makeFetchUserCheckInsHistoryService() {
  const prismaUsersRepository = new PrismaCheckInsRepository();
  const service = new FetchUserCheckInsHistoryService(prismaUsersRepository);

  return service;
}
