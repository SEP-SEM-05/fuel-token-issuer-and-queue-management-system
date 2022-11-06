const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "8ju1x4",
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
