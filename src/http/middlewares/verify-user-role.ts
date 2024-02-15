import { FastifyRequest, FastifyReply } from "fastify";

export function verifyUserRole(roleToVerify: "ADMIN" | "MEMBER") {
  return (request: FastifyRequest, response: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToVerify) {
      return response.status(401).send({ message: "Unauthorized" });
    }
  };
}
