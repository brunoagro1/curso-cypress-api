/**
 * Criação de usuário
 *
 * - before(): gera o token UMA vez para todos os testes do describe.
 *   (beforeEach geraria um token a cada it, mais lento e sem necessidade)
 * - Headers obrigatórios da API: Authorization (Bearer + token) e
 *   X-Tenant-Id (qual empresa/tenant estamos acessando).
 * - usuarioValido() (fixtures/usuarios.ts) usa o Faker: nome e e-mail
 *   mudam a cada execução, então o teste não quebra por "e-mail já cadastrado".
 * - A interface CriarUsuarioParams garante o formato do body: se faltar
 *   campo obrigatório, o editor acusa antes de rodar.
 */
import { usuarioPrincipal, usuarioValido } from "../../../fixtures/usuarios";

describe('Criação de Usuários na API', () => {
    let token: string;
    let tenantId = "96120131-a57a-4b74-a767-88c5d421ed0f"


    before(() => {
        cy.gerarToken(usuarioPrincipal.email, usuarioPrincipal.password).then((response) => {
            token = response.body.access_token
        });
    })

    it("cria usuário com todos os campos obrigatórios", () => {
    // Guarda o que foi enviado para comparar com o que a API devolveu
    const params = usuarioValido();
    cy.criarUsuarioApi(token, tenantId, params).then((res) => {
      expect(res.status).to.eq(200);

      // A API gerou um id para o usuário
      expect(res.body.data.id).to.be.a("string").and.not.be.empty;

      // O que foi enviado foi o que ficou salvo
      expect(res.body.data.nome).to.eq(params.nome);
      expect(res.body.data.cargo).to.eq(params.cargo);
      expect(res.body.data.email).to.eq(params.email);
      expect(res.body.data.telefone).to.eq(params.telefone);
      expect(res.body.data.status).to.eq(params.status);

      // Campos que a própria API preenche: valida tipo/existência, não o valor
      // (data e id mudam a cada execução, assert de valor deixaria o teste flaky)
      expect(res.body.data.perfis).to.be.a("array");
      expect(res.body.data.full_name).to.eq(params.nome);
      expect(res.body.data.created_at).to.exist;
      expect(res.body.data.user_id).to.be.a("string");
    });
  });
});
