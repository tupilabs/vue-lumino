const {defineConfig} = require('cypress')
const vitePreprocessor = require('cypress-vite')
const path = require('path')

module.exports = defineConfig({
  fixturesFolder: 'tests/e2e/fixtures',
  screenshotsFolder: 'tests/e2e/screenshots',
  videosFolder: 'tests/e2e/videos',
  video: false,
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.*',
    }
  },
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      on('file:preprocessor', vitePreprocessor({
        configFile: path.resolve(__dirname, './vite.config.js'),
        mode: 'development',
      }))
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
    specPattern: 'tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/e2e/support/index.js',
  },
})
