import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

import { FetchNearbyGymsService } from "./fetch-nearby-gyms";

let fetchNearbyGymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsService;

describe("Fetch Nearby Gyms Service", () => {
  beforeEach(async () => {
    fetchNearbyGymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService(fetchNearbyGymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await fetchNearbyGymsRepository.create({
      title: "Near Gym",
      description: "",
      phone: "",
      latitude: -20.1549535,
      longitude: -44.9059697,
    });
    await fetchNearbyGymsRepository.create({
      title: "Far Gym",
      description: "",
      phone: "",
      latitude: -27.1549535,
      longitude: -49.9059697,
    });

    const { gyms } = await sut.execute({
      userLatitude: -20.1549535,
      userLongitude: -44.9059697,
    });

    expect(gyms).toHaveLength(1);
  });
});
