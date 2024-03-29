import { expect, describe, it, beforeEach } from "vitest";
import { RegisterService } from "./register";

import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

// ! teste unitario nunca vai tocar em banco de dados nem em camadas internas, quando chama ou mexe com o banco ou dados externos e teste de integração ou outros

let usersRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe("Register Services", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterService(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john@hotmail.com",
      password: "1234567",
    });

    // espera que o id do usuario seja igual a qualquer string , nesse caso para verificar se o usuario foi criado de fato
    expect(user.id).toEqual(expect.any(String));
  });
  it("should hash user password upon registration", async () => {
    /* 
        Enviando um objeto ficticio nao bate no banco de dados, e por isso e uma boa criar um repositorio fake para fazer
        os testes, para nao sujar o banco nem demorar os testes.
    */

    const { user } = await sut.execute({
      name: "John Doe",
      email: "john@hotmail.com",
      password: "1234567",
    });

    console.log(user.password_hash);

    const isPasswordCorrectlyHashed = await compare(
      "1234567",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
  it("should not be able to register with same email twice", async () => {
    const email = "john@hotmail.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "1234567",
    });

    // todo: Sempre que tiver um promise dentro do expect adicionar o await

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "1234567",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
