import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./checkin";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchUserCheckInsHistoryService } from "./fetch-member-check-ins-history";

let checkInRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryService;

describe("Fetch check-in History Service", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryService(checkInRepository);
  });

  it("should be able to fetch check-in history", async () => {
    await checkInRepository.create({
      gim_id: "gym-01",
      user_id: "user-01",
    });
    await checkInRepository.create({
      gim_id: "gym-02",
      user_id: "user-02",
    });

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    // expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gim_id: "gym-01" }),
      expect.objectContaining({ gim_id: "gym-02" }),
    ]);
  });
  it("should be able to fetch paginated check-in history", async () => {
    for (let index = 0; index < 22; index++) {
      await checkInRepository.create({
        gim_id: `gym-${index}`,
        user_id: `user-${index}`,
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    // expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gim_id: "gym-01" }),
      expect.objectContaining({ gim_id: "gym-02" }),
    ]);
  });
});
