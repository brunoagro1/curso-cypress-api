describe("API - Geração de Token ", () => {
  it("Gerar token com sucesso", () => {
    cy.gerarToken().then((response) => {
      expect(response.status).to.eq(200);

      // Campos obrigatórios do retorno
      expect(response.body).to.have.property("access_token");
      expect(response.body).to.have.property("refresh_token");

      // Tipos e valores esperados
      expect(response.body.access_token).to.be.a("string").and.not.be.empty;
      expect(response.body.token_type).to.eq("Bearer");
      expect(response.body.expires_in).to.eq(300);
      expect(response.body.refresh_expires_in).to.eq(1800);
      expect(response.body.scope).to.include("agroconecta-user");
    });
  });

  it("Não gerar token com senha inválida", () => {
    cy.gerarToken({ password: "senha-errada" }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("invalid_grant");
      expect(response.body.error_description).to.eq("Invalid user credentials");
      expect(response.body).to.not.have.property("access_token");
    });
  });

  it("Não gerar token sem informar o grant_type", () => {
    cy.gerarToken({ grant_type: undefined }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq("invalid_request");
      expect(response.body.error_description).to.eq(
        "Missing form parameter: grant_type",
      );
    });
  });
});
