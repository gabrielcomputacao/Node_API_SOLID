import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./checkin";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-checkins-error";

let checkInRepository: InMemoryCheckInsRepository;
let gymRepository: InMemoryGymsRepository;
let sut: CheckInService;

describe("Check In Service", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymRepository = new InMemoryGymsRepository();

    sut = new CheckInService(checkInRepository, gymRepository);

    await gymRepository.create({
      id: "gym01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: -20.1695414,
      longitude: -44.9157458,
    });

    // durante os testes usa uma data ficticia
    vi.useFakeTimers();
  });

  // boa pratica para depois dos testes voltar com a data original
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to get check in", async () => {
    vi.setSystemTime(new Date(2024, 0, 24, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym01",
      userId: "user01",
      userLatitude: -20.1695414,
      userLongitude: -44.9157458,
    });

    console.log(checkIn.created_at);

    expect(checkIn.id).toEqual(expect.any(String));
  });
  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 0, 24, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym01",
      userId: "user01",
      userLatitude: -20.1695414,
      userLongitude: -44.9157458,
    });

    await expect(async () => {
      await sut.execute({
        gymId: "gym01",
        userId: "user01",
        userLatitude: -20.1695414,
        userLongitude: -44.9157459,
      });
    }).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });
  it("should not be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2024, 0, 24, 8, 0, 0));

    await sut.execute({
      gymId: "gym01",
      userId: "user01",
      userLatitude: -20.1695414,
      userLongitude: -44.9157458,
    });

    vi.setSystemTime(new Date(2024, 0, 25, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym01",
      userId: "user01",
      userLatitude: -20.1695414,
      userLongitude: -44.9157458,
    });

    /* verifica se criou um usuario e se o id dele é igual a qualquer string, pois se tiver criado um id quer dizer que o usuario foi criado
      independente do id
    */
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymRepository.items.push({
      id: "gym02",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-20.1549535),
      longitude: new Decimal(-44.9059697),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym02",
        userId: "user01",
        userLatitude: -20.1695414,
        userLongitude: -44.9157458,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
