import { GerarTokenAutenticacaoParams } from "../interfaces/auth";

Cypress.Commands.add("gerarToken", (overrides?: GerarTokenAutenticacaoParams) => {
      const body = {
        grant_type: "password",
        client_id: Cypress.expose("client_id"),
        username: Cypress.expose("username"),
        password: Cypress.expose("password"),
        ...overrides, // sobrescreve só o que for passado
      };

      return cy
        .api({
          method: "POST",
          url: Cypress.expose("keycloak_url"), // lido com Cypress.expose("CHAVE"): síncrono, funciona em qualquer lugar (ex: fixtures)
          form: true,
          body,
          failOnStatusCode: false,
        })
    },
  );
