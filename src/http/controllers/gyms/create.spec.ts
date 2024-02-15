import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create Gym"),
    async () => {
      const { token } = await createAndAuthenticateUser(app);

      await request(app.server)
        .post("/gyms")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Gym teste",
          description: "testando",
          phone: "333333",
          latitude: -20.1549535,
          longitude: -44.9059697,
        });
      await request(app.server)
        .post("/gyms")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Typescript GYm",
          description: "testando",
          phone: "333333",
          latitude: -20.1549535,
          longitude: -44.9059697,
        });

      const response = await request(app.server)
        .get("/gyms/search")
        .query({
          q: "Typescript",
        })
        .set("Authorization", `Bearer ${token}`)
        .send();

      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveLength(1);
    };
});
