import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    // usuario recem criado caso quem chamou queira usar esse objeto
    return user;
  }
}
