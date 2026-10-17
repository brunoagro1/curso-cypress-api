import { CriarUsuarioParams, EditarUsuarioParams } from "../interfaces/usuario";


declare global {
  namespace Cypress {
    interface Chainable {
      gerarToken(usuario: string, senha: string): Chainable<Cypress.Response<any>>;
      criarUsuarioApi(token: string, tenantId: string,usuario: CriarUsuarioParams): Chainable<Cypress.Response<any>>;
      visualizarUsuarioApi(token: string, tenantId: string): Chainable<Cypress.Response<any>>;
      editarUsuarioApi(token: string, tenantId: string, id: string, usuario: EditarUsuarioParams): Chainable<Cypress.Response<any>>;
    }
  }
}
