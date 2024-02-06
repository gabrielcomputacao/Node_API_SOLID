import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { GetUserMetricsService } from "./get-users-metrics";

let checkInRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsService;

describe("Get user Metrics Service", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsService(checkInRepository);
  });

  it("should be able to Get user Metrics", async () => {
    await checkInRepository.create({
      gim_id: "gym-01",
      user_id: "user-01",
    });
    await checkInRepository.create({
      gim_id: "gym-02",
      user_id: "user-01",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toHaveLength(2);
  });
});
