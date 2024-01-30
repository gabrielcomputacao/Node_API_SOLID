const { Client } = require("pg");

const client = new Client({
  user: "gabriel",
  host: "localhost",
  database: "apisolid",
  password: "123",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Banco Rodando"))
  .catch(() => console.log("Erro na conexão do Banco"));
