import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";

describe("authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile"),
    async () => {
      await request(app.server).post("/users").send({
        name: "John Doe",
        email: "Johndoe@example.com",
        password: "1234567",
      });
      const authResponse = await request(app.server).post("/sessions").send({
        email: "Johndoe@example.com",
        password: "1234567",
      });

      const { token } = authResponse.body;

      const profileResponse = await request(app.server)
        .get("/me")
        .set("Authorization", `Bearer ${token}`)
        .send();

      expect(profileResponse.statusCode).toEqual(200);
      expect(profileResponse.body.user).toEqual(
        expect.objectContaining({
          email: "Johndoe@example.com",
        })
      );
    };
});
