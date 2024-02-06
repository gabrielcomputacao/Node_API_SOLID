import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./checkin";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchUserCheckInsHistoryService } from "./fetch-member-check-ins-history";
import { SearchGymsService } from "./search-gyms";

let searchGymsRepository: InMemoryGymsRepository;
let sut: SearchGymsService;

describe("Search Gyms Service", () => {
  beforeEach(async () => {
    searchGymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(searchGymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await searchGymsRepository.create({
      title: "Javascript",
      description: "",
      phone: "",
      latitude: -20.1549535,
      longitude: -44.9059697,
    });
    await searchGymsRepository.create({
      title: "Typescript",
      description: "",
      phone: "",
      latitude: -20.1549535,
      longitude: -44.9059697,
    });

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
  });
});
