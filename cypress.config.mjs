import {defineConfig} from 'cypress'
import codeCoverageTask from '@cypress/code-coverage/task.js'
import vitePreprocessor from 'cypress-vite'
import {resolve} from 'path'

const __dirname = resolve()

export default defineConfig({
  fixturesFolder: 'tests/e2e/fixtures',
  screenshotsFolder: 'tests/e2e/screenshots',
  videosFolder: 'tests/e2e/videos',
  video: false,
  viewportWidth: 1440,
  viewportHeight: 1024,
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.*',
    }
  },
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: 'tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/e2e/support/index.js',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config)
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--window-size=1440,1024', '--force-device-scale-factor=1')
        }
        return launchOptions
      })
      on('file:preprocessor', vitePreprocessor({
        configFile: resolve(__dirname, './vite.config.js'),
        mode: 'development',
      }))
      return config
    }
  },
})
