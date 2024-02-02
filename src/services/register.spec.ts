import { expect, describe, it } from "vitest";
import { RegisterService } from "./register";

import { compare } from "bcryptjs";

// ! teste unitario nunca vai tocar em banco de dados nem em camadas internas, quando chama ou mexe com o banco ou dados externos e teste de integração ou outros

describe("Register Services", () => {
  it("should hash user password upon registration", async () => {
    /* 
        Enviando um objeto ficticio nao bate no banco de dados, e por isso e uma boa criar um repositorio fake para fazer
        os testes, para nao sujar o banco nem demorar os testes.
    */

    const registerService = new RegisterService({
      async findByEmail(email: any) {
        return null;
      },

      async create(data: any) {
        return {
          id: "user-1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

    const { user } = await registerService.execute({
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
});
