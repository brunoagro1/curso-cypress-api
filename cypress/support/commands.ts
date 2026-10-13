import { GerarTokenAutenticacaoParams } from "../interfaces/auth";
import { CriarUsuarioParams } from "../interfaces/usuario";


declare global {
  namespace Cypress {
    interface Chainable {
      gerarToken(overrides?: GerarTokenAutenticacaoParams): Chainable<Cypress.Response<any>>;
      criarUsuarioApi(token: string, tenantId: string,usuario: CriarUsuarioParams): Chainable<Cypress.Response<any>>;
      visualizarUsuarioApi(token: string, tenantId: string): Chainable<Cypress.Response<any>>;
    }
  }
}
