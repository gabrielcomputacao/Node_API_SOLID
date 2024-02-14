import "dotenv/config";
import { randomUUID } from "crypto";
import { Environment } from "vitest";
//funciona como um terminal dentro do codigo, tudo que voce digita dentro do codigo roda no terminal
import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const primsa = new PrismaClient();

function gererationDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>(<unknown>{
  name: "prisma",
  async setup() {
    // ocorre antes dos testes acontecerem

    const schema = randomUUID();
    const databaseURL = gererationDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;

    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );

        await prisma.$disconnect();
      },
    };
  },
});
