import { hash } from "bcryptjs";

import { UserRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

/* 
    Hash é uma biblioteca para incriptar os dados , nesse caso esta sendo incriptdo
    o password do usuario, o segundo parametro e o numero de vezes que ele vai
    rodar para fazer a incriptação, quanto mais vezes mais dificil a incriptação mas
    mais pesado fica ao armazenar no banco de dados

*/

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterServiceRsponse {
  user: User;
}

export class RegisterService {
  private usersRepository: UserRepository;

  constructor(usersRepository: any) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    email,
    password,
  }: RegisterServiceRequest): Promise<RegisterServiceRsponse> {
    // todo: Uma função assincrona ou uma promise pode ser usado o await ou o then (nesse caso: hash)

    const password_hash = await hash(password, 6);

    // findUnique procura em campos que tem o @unique e que são chave primaria somente

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    // class separada para comunicação com o banco usando o pattern repository
    //const prismaUsersRepository = new PrismaUsersRepository();

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    /* 
        mesmo que tenha apenas um dado retornar em objeto caso essa função venha a ter mais parametros no futuro
    */

    return { user };
  }
}
