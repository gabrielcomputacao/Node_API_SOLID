import { hash } from "bcryptjs";
import { prisma } from "../lib/prisma";

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

export async function registerService({
  name,
  email,
  password,
}: RegisterServiceRequest) {
  // todo: Uma função assincrona ou uma promise pode ser usado o await ou o then (nesse caso: hash)

  const password_hash = await hash(password, 6);

  // findUnique procura em campos que tem o @unique e que são chave primaria somente

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("Email already exists");
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}
