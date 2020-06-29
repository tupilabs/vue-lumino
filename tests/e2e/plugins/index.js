/**
 * Copyright 2020 Bruno P. Kinoshita
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  // For test coverage
  on('task', require('@cypress/code-coverage/task'))
  const webpackOptions = require('@vue/cli-service/webpack.config')
  // NOTE: if we do not remove the webpack optimizations, Cypress seems
  //       to get confused when our JS code imports scss, failing
  //       silently, and reporting no tests found in Cypress GUI.
  webpackOptions.optimization = {}
  on('file:preprocessor', webpack({
    webpackOptions,
    watchOptions: {}
  }))
  return Object.assign({}, config, {
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js'
  })
}
