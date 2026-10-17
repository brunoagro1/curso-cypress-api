import { faker } from "@faker-js/faker";
import { CriarUsuarioParams, EditarUsuarioParams } from "../interfaces/usuario";

export const usuarioPrincipal = {
  email: Cypress.expose("username"),
  password: Cypress.expose("password"),
};

export const usuarioSemPermissao = {
  email: "bruno.vieira+1@agro1.inf.br",
  password: Cypress.expose("AUTH_USER_INVALID_PASSWORD_SCENARIOS"),
};

export const usuarioInativo = {
  email: "bruno.vieira+35@agro1.inf.br",
  password: Cypress.expose("AUTH_USER_INVALID_PASSWORD_SCENARIOS"),
};

export const usuarioValido = (): CriarUsuarioParams => ({
  nome: faker.person.fullName(),
  cargo: "Automatizado",
  email: faker.internet.email(),
  telefone: "(11) 91234-5678",
  status: "active",
});

export const usuarioEditado = (): EditarUsuarioParams => ({
  nome: faker.person.fullName(),
  cargo: "Aplicador",
  telefone: "(11) 19112-2121",
});
