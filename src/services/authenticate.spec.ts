import { expect, describe, it } from "vitest";

import { compare, hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { AuthenticateService } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

// ! teste unitario nunca vai tocar em banco de dados nem em camadas internas, quando chama ou mexe com o banco ou dados externos e teste de integração ou outros

describe("Authenticate Service", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();

    // todo: s u t é um padrao nos testes que significa system under test para indicar a principal variavel que esta sendo testada
    const sut = new AuthenticateService(usersRepository);

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
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateService(usersRepository);

    expect(
      async () =>
        await sut.execute({
          email: "john@hotmail.com",
          password: "1234567",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateService(usersRepository);

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
