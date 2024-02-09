import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

import { GetUserProfileService } from "../get-users-profile";

export function makeGetUserProfileService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const service = new GetUserProfileService(prismaUsersRepository);

  return service;
}
