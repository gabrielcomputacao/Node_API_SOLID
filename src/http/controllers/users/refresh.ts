import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function refresh(request: FastifyRequest, response: FastifyReply) {
  /* 
        valida se o usuario esta autenticado mas nao olha no processo da requisicao no cabeçalho
        ele olha para os cookies se o refresh token existe,  se continuar quer dizer que o resfresh é valido
   */
  await request.jwtVerify({ onlyCookie: true });

  const token = await response.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    }
  );
  const refreshToken = await response.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        /* expira caso usuario fique 7 dias sem entrar no sistema */
        expiresIn: "7d",
      },
    }
  );

  return response
    .status(200)
    .setCookie("refresh", refreshToken, {
      // quais rotas do backend vao poder acessar o cookie
      path: "/",
      // o cookie vai ser encriptado via https, front end nao consegue ler o valor como informação bruta, ela esta incriptada
      secure: true,
      // so acessado dentro do mesmo dominio
      sameSite: true,
      //so pode ser acessado pelo backend, so vai poder ser acessado pelo contexto da requisicao, nao fica visivel na abinha do navegador em cookies
      httpOnly: true,
    })
    .send({
      token,
    });
}
