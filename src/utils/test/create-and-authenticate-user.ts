import request from "supertest";
import { FastifyInstance } from "fastify";

export async function createAndAuthenticateUser(app: FastifyInstance) {
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

  return { token };
}
