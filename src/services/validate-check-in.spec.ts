import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { ValidateCheckInService } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let checkInRepository: InMemoryCheckInsRepository;

let sut: ValidateCheckInService;

describe("Check In Service", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();

    sut = new ValidateCheckInService(checkInRepository);

    // durante os testes usa uma data ficticia
    // vi.useFakeTimers();
  });

  // boa pratica para depois dos testes voltar com a data original
  afterEach(() => {
    //  vi.useRealTimers();
  });

  it("should be able to validate the check-in", async () => {
    const createdCheckIn = await checkInRepository.create({
      gim_id: "gym-01",
      user_id: "user-01",
    });

    // vi.setSystemTime(new Date(2024, 0, 24, 8, 0, 0));

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
  it("should not be able to validate an inexistent check-in", async () => {
    expect(() =>
      sut.execute({
        checkInId: "createdCheckIn.id-inexist",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
