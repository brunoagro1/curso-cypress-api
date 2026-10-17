/**
 * Edição de usuário (PATCH)
 *
 * - PATCH x PUT: no PATCH enviamos só os campos que mudam; no PUT
 *   enviaríamos o objeto inteiro. O e-mail não pode ser alterado,
 *   por isso nem existe na interface EditarUsuarioParams.
 * - Teste independente: em vez de editar um id fixo (que alguém pode
 *   apagar ou alterar), o teste cria o próprio usuário e edita ele.
 * - Encadeamento: o id que volta na criação vira parâmetro da edição,
 *   por isso o editar fica dentro do .then() do criar.
 * - Os asserts validam os dois lados: o que mudou e o que NÃO podia mudar.
 */
import { usuarioPrincipal, usuarioEditado, usuarioValido } from "../../../fixtures/usuarios";

describe('Edição de Usuários na API', () => {
    let token: string;
    let tenantId = "96120131-a57a-4b74-a767-88c5d421ed0f"

    before(() => {
        cy.gerarToken(usuarioPrincipal.email, usuarioPrincipal.password).then((response) => {
            token = response.body.access_token
        });
    })

    it("edita um usuário criado com sucesso", () => {
        // Cria um usuário novo para o teste não depender de massa fixa
        const usuario = usuarioValido();
        cy.criarUsuarioApi(token, tenantId, usuario).then((resCriacao) => {
            const id = resCriacao.body.data.id;
            const params = usuarioEditado();

            cy.editarUsuarioApi(token, tenantId, id, params).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body.data.id).to.eq(id);
                // Campos enviados no PATCH foram alterados
                expect(res.body.data.nome).to.eq(params.nome);
                expect(res.body.data.cargo).to.eq(params.cargo);
                expect(res.body.data.telefone).to.eq(params.telefone);
                // Campos não enviados continuam iguais
                expect(res.body.data.email).to.eq(usuario.email);
                expect(res.body.data.status).to.eq(usuario.status);
            });
        });
    });
});
