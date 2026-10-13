import { usuarioValido } from "../../../fixtures/usuarios";

describe('Criação de Usuários na API', () => {
    let token: string;
    let tenantId = "96120131-a57a-4b74-a767-88c5d421ed0f"


    before(() => {
        cy.gerarToken().then((response) => {
            token = response.body.access_token
        });
    })

    it("cria usuário com todos os campos obrigatórios", () => {
    const params = usuarioValido();
    cy.criarUsuarioApi(token, tenantId, params).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data.id).to.be.a("string").and.not.be.empty;
      expect(res.body.data.nome).to.eq(params.nome);
      expect(res.body.data.cargo).to.eq(params.cargo);
      expect(res.body.data.email).to.eq(params.email);
      expect(res.body.data.telefone).to.eq(params.telefone);
      expect(res.body.data.status).to.eq(params.status);
      expect(res.body.data.perfis).to.be.a("array");
      expect(res.body.data.full_name).to.eq(params.nome);
      expect(res.body.data.created_at).to.exist;
      expect(res.body.data.user_id).to.be.a("string");
    });
  });
});