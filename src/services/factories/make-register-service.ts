import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterService } from "../register";

/* 
    todo: factory pattern e um centralizador de criação de função os instanciaçoes de classe e como uma fabrica que gera o essencial para outros arquivos
    todo: quando precisa de trocar algo vai someente na fabrica que o essencial vai ser trocado em todos os outros arquivos

*/

export function makeRegisterService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerService = new RegisterService(prismaUsersRepository);

  return registerService;
}
