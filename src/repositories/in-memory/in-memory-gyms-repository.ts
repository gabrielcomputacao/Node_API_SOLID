import { Gim } from "@prisma/client";

import { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gim[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
