Cypress.Commands.add(
  "gerarToken",
  (usuario: string, senha: string) => {
    return cy.api({
      method: "POST",
      url: Cypress.expose("keycloak_url"), // lido com Cypress.expose("CHAVE"): síncrono, funciona em qualquer lugar (ex: fixtures)
      form: true,
      body: {
        grant_type: "password",
        client_id: "agroconecta-client",
        username: usuario,
        password: senha,
      },
      failOnStatusCode: false,
    });
  },
);
