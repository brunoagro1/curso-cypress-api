/**
 * Listagem de usuários (GET)
 *
 * - Mesmo padrão dos outros specs: token no before() e headers
 *   Authorization + X-Tenant-Id dentro do command visualizarUsuarioApi.
 * - ATENÇÃO: este teste ainda não tem nenhum expect, então ele SEMPRE passa.
 *   Bom exemplo para a turma: "teste sem assert parece teste, mas não protege".
 *   Próximos asserts: status 200, data é um array, campos do primeiro item.
 * - Evolução possível: filtros e paginação (substr, per_page, page) via qs,
 *   usando a interface ObterUsuariosParams.
 */
import { usuarioPrincipal } from "../../../fixtures/usuarios";

describe('Visualização de Usuários na Lista via API', () => {
    let token: string;
    let tenantId = "96120131-a57a-4b74-a767-88c5d421ed0f"

    before(() => {
        cy.gerarToken(usuarioPrincipal.email, usuarioPrincipal.password).then((response) => {
            token = response.body.access_token
        })
    })

    it('Deve visualizar a lista de usuários com sucesso', () => {
        cy.visualizarUsuarioApi(token, tenantId).then((res) => {})
    });
});
