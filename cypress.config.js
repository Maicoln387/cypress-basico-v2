const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,

  e2e: {
    setupNodeEvents(on, config) {
      // implemente os event listeners do Node.js aqui
    },
  },
  component: {
    setupNodeEvents(on, config) {
      // implemente os event listeners do Node.js aqui
    },
  },
  
});



