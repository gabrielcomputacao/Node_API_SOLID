Criar API Node, com design patterns , testes automatizados e utilizar os principios da programação sendo um deles o SOLID.

Aplicação baseada em testes, e com vários design patters a serem trabalhados, inversão de dependencia e deixando o codigo manutenivel com os principios
da programação que permitem criar testes de maneira simplificada.

- Geolocalização
- Verificação com datas

# App

Passe em academias

## RFs (Requisitos funcionais - ações que podem ser feitas dentro do app)

- [ ] Deve ser possível se cadastrar
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [ ] Deve ser possível o usuário obter seu historico de check-ins
- [ ] Deve ser possível buscar academias próximas
- [ ] Deve ser possível o usuario buscar academias pelo nome
- [ ] Deve ser possível o usuario realizar check-in em uma academia
- [ ] Deve ser possível validar o check-in de um usuario
- [ ] Deve ser possível cadastrar uma academia

## RNs (Regras de negocio - está ligada com um requisito funcional)

- [] O usuário não deve poder se cadastrar com e-mail duplicado
- [] O usuário não pode fazer dois check-in no mesmo dia
- [] O usuário não pode fazer check-in há 100 metros da academia
- [] O check-in so deve ser validado até 20 minutos depois de criado
- [] O check-in só pode ser validado por administradores
- [] A academia so pode ser cadastrada por administradores

## RNFs (Requisitos não-funcionais - não partem do cliente)

- [] Senha do usuário precise estar criptografada
- [] Os dados da aplicação precisam estar persistidos em um banco de dados
- [] Todas as listas precisam estar paginadas em 20 itens por página
- [] O usuario deve ser identificado por um JWT
