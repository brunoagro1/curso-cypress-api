import { CriarUsuarioParams } from "../interfaces/usuario";

Cypress.Commands.add(
  "criarUsuarioApi",
  (token, tenantId, usuario: CriarUsuarioParams) => {
    cy.api({
      method: "POST",
      url: "https://conecta-api-hml.agro1.cloud/api/v1/configuracoes/usuarios",
      headers: {
          Authorization: `Bearer ${token}`,
          "X-Tenant-Id": tenantId,
        },
      body: usuario
    });
  },
);

Cypress.Commands.add('visualizarUsuarioApi', (token, tenantId) => {
    cy.api({
        method: "GET",
        url: "https://conecta-api-hml.agro1.cloud/api/v1/configuracoes/usuarios",
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Tenant-Id": tenantId,
        }
    })
})
