import { expect, describe, it, beforeEach } from "vitest";

import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { GetUserProfileService } from "./get-users-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileService;

describe("Get user profile Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();

    sut = new GetUserProfileService(usersRepository);
  });

  it("should be able to get profile", async () => {
    const createdUser = await usersRepository.create({
      name: "tim",
      email: "john@hotmail.com",
      password_hash: await hash("1234567", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("tim");
  });
  it("should not be able to get profile with wrong id", async () => {
    expect(
      async () =>
        await sut.execute({
          userId: "non-existing-id",
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
