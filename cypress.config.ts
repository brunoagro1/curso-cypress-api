import { defineConfig } from "cypress";

// Carrega o .env para o process.env (nativo do Node 20.12+, sem precisar do dotenv)
process.loadEnvFile();

export default defineConfig({
  e2e: {
    // Lidos com Cypress.expose("CHAVE"): síncrono, funciona em qualquer lugar (ex: fixtures)
    expose: {
      keycloak_url:
        "https://auth-hml.agro1.cloud/realms/agroconecta/protocol/openid-connect/token",
      client_id: process.env.AUTH_CLIENT_ID,
      username: process.env.AUTH_USERNAME,
      password: process.env.AUTH_PASSWORD,
      AUTH_USER_INVALID_SCENARIOS: process.env.AUTH_USER_INVALID_SCENARIOS,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
