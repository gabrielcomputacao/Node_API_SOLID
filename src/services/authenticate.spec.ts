import { expect, describe, it, beforeEach } from "vitest";

import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { AuthenticateService } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

// ! teste unitario nunca vai tocar em banco de dados nem em camadas internas, quando chama ou mexe com o banco ou dados externos e teste de integração ou outros

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateService;
// todo: s u t é um padrao nos testes que significa system under test para indicar a principal variavel que esta sendo testada

describe("Authenticate Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();

    sut = new AuthenticateService(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "tim",
      email: "john@hotmail.com",
      password_hash: await hash("1234567", 6),
    });

    const { user } = await sut.execute({
      email: "john@hotmail.com",
      password: "1234567",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should not be able to authenticate with wrong email", async () => {
    expect(
      async () =>
        await sut.execute({
          email: "john@hotmail.com",
          password: "1234567",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "tim",
      email: "john@hotmail.com",
      password_hash: await hash("1234567", 6),
    });

    expect(
      async () =>
        await sut.execute({
          email: "john@hotmail.com",
          password: "123123",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
