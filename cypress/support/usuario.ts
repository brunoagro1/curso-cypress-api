import { CriarUsuarioParams, EditarUsuarioParams } from "../interfaces/usuario";

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


Cypress.Commands.add('editarUsuarioApi', (token, tenantId, id, usuario: EditarUsuarioParams) => {
    cy.api({
        method: "PATCH",
        url: `https://conecta-api-hml.agro1.cloud/api/v1/configuracoes/usuarios/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Tenant-Id": tenantId,
        },
        body: usuario
    })
})
