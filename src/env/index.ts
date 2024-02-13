import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  /* coerce do zod converte o valor para o proximo valor definido depois dele */
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
});

//  todo: safeParse tenta verificar o que foi definido a cima se todas as variaveis tem o mesmo tipo

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  /* metodo format pega todos os erros que aconteceram e formata eles de uma maneira mais amigavel */
  console.error("invalid enviroment variables", _env.error.format());

  // colocando o throw em top level sem ser dentro de uma função, ele nao deixa o codigo passar, ele derruba a aplicação
  throw new Error("invalid enviroment variables");
}

export const env = _env.data;
