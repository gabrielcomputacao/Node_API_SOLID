import { expect, describe, it, beforeEach } from "vitest";
import { RegisterService } from "./register";

import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { CreateGymService } from "./create-gym";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymService;

describe("Create Gym Services", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Javascript Gym",
      description: "",
      phone: "",
      latitude: -20.1549535,
      longitude: -44.9059697,
    });

    // espera que o id do usuario seja igual a qualquer string , nesse caso para verificar se o usuario foi criado de fato
    expect(gym.id).toEqual(expect.any(String));
  });
});
