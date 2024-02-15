import fastify from "fastify";

import { usersRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { gymRoutes } from "./http/controllers/gyms/routes";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(usersRoutes);
app.register(gymRoutes);
app.register(checkInsRoutes);

// colocar _ o codigo entende que foi um parametro que nao foi usado
app.setErrorHandler((err, _, response) => {
  if (err instanceof ZodError) {
    return response
      .status(400)
      .send({ message: "Validation Error", issues: err.format() });
  }

  if (env.NODE_ENV === "production") {
    console.error(err);
  }

  return response.status(500).send({ message: "Internal server error" });
});
