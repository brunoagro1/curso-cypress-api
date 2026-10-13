describe('Visualização de Usuários na Lista via API', () => {
    let token: string;
    let tenantId = "96120131-a57a-4b74-a767-88c5d421ed0f"

    before(() => {
        cy.gerarToken().then((response) => {
            token = response.body.access_token
        })
    })

    it('Deve visualizar a lista de usuários com sucesso', () => {
        cy.visualizarUsuarioApi(token, tenantId).then((res) => {})
    });
});