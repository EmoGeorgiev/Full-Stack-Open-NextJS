import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: "http://localhost:3000",
  },

  webServer: {
    command: 'dotenv -e .env.test -- npm run dev',
    url: 'http://localhost:3000',
  }
});
