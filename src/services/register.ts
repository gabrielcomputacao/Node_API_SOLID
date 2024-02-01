import { hash } from "bcryptjs";
import { prisma } from "../lib/prisma";
import { UserRepository } from "@/repositories/users-repository";

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

export class RegisterService {
  private usersRepository: UserRepository;

  constructor(usersRepository: any) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password }: RegisterServiceRequest) {
    // todo: Uma função assincrona ou uma promise pode ser usado o await ou o then (nesse caso: hash)

    const password_hash = await hash(password, 6);

    // findUnique procura em campos que tem o @unique e que são chave primaria somente

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("Email already exists");
    }

    // class separada para comunicação com o banco usando o pattern repository
    //const prismaUsersRepository = new PrismaUsersRepository();

    await this.usersRepository.create({ name, email, password_hash });
  }
}
