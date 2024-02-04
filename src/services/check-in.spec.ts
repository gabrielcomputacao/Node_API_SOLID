import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./checkin";

let checkInRepository: InMemoryCheckInsRepository;
let sut: CheckInService;

describe("Check In Service", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();

    sut = new CheckInService(checkInRepository);
  });

  it("should be able to get check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym01",
      userId: "user01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
