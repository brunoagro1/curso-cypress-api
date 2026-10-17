/**
 * Geração de token (Keycloak)
 *
 * - cy.gerarToken(usuario, senha) é um custom command (cypress/support/auth.ts):
 *   o teste não sabe URL nem client_id, só passa quem está logando.
 * - As credenciais vêm do .env -> cypress.config.ts (expose) -> Cypress.expose().
 *   Nada de senha no código nem no Git.
 * - O command usa failOnStatusCode: false, senão o Cypress falharia sozinho
 *   nos cenários 401/400 e não conseguiríamos validar o erro.
 * - Usuário e senha são sempre passados no teste: fica explícito quem está
 *   logando em cada cenário (usuário do .env, senha errada, inativo...).
 */
import { usuarioPrincipal } from "../../../fixtures/usuarios";

describe("API - Geração de Token ", () => {
  // Cenário feliz: valida status, contrato (campos obrigatórios) e regras (expiração e escopo)
  it("Gerar token com sucesso", () => {
    cy.gerarToken(usuarioPrincipal.email, usuarioPrincipal.password).then((response) => {
      expect(response.status).to.eq(200);

      // Campos obrigatórios do retorno
      expect(response.body).to.have.property("access_token");
      expect(response.body).to.have.property("refresh_token");

      // Tipos e valores esperados
      expect(response.body.access_token).to.be.a("string").and.not.be.empty;
      expect(response.body.token_type).to.eq("Bearer"); // usado no header Authorization
      expect(response.body.expires_in).to.eq(300); // 5 minutos
      expect(response.body.refresh_expires_in).to.eq(1800); // 30 minutos
      expect(response.body.scope).to.include("agroconecta-user");
    });
  });

  // Negativo: usuário certo com senha errada. Além do 401, garante que NÃO veio token
  it("Não gerar token com senha inválida", () => {
    cy.gerarToken(usuarioPrincipal.email, "senha-errada").then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("invalid_grant");
      expect(response.body.error_description).to.eq("Invalid user credentials");
      expect(response.body).to.not.have.property("access_token");
    });
  });

  // Negativo: cenário de requisição malformada, por isso usa o cy.api() direto
  // em vez do command (o command sempre envia o grant_type)
  it("Não gerar token sem informar o grant_type", () => {
    cy.api({
      method: "POST",
      url: Cypress.expose("keycloak_url"),
      form: true,
      body: {
        client_id: "agroconecta-client",
        username: usuarioPrincipal.email,
        password: usuarioPrincipal.password,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq("invalid_request");
      expect(response.body.error_description).to.eq(
        "Missing form parameter: grant_type",
      );
    });
  });
});
