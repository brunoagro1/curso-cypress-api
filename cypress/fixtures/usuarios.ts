import { faker } from "@faker-js/faker";
import { CriarUsuarioParams } from "../interfaces/usuario";

export const usuarioPrincipal = {
  email: "bruno.vieira@agro1.inf.br",
  id: "01a06c8c-a7cb-7696-a935-1af24e74fb78",
};

export const usuarioSemPermissao = {
  email: "bruno.vieira+1@agro1.inf.br",
  id: "01a08124-0685-7679-b54d-8bce434f8bf5",
  password: Cypress.expose("AUTH_USER_INVALID_SCENARIOS"),
};

export const usuarioInativo = {
  email: "bruno.vieira+35@agro1.inf.br",
  id: "01a0f7a1-5a34-75a3-b52a-8fff5df208d0",
  password: Cypress.expose("AUTH_USER_INVALID_SCENARIOS"),
};

export const usuarioValido = (): CriarUsuarioParams => ({
  nome: faker.person.fullName(),
  cargo: "Automatizado",
  email: faker.internet.email(),
  telefone: "(11) 91234-5678",
  status: "active",
});
