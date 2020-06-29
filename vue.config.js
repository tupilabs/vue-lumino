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

const path = require('path')

module.exports = {
  publicPath: '',
  outputDir: 'dist',
  indexPath: 'index.html',
  runtimeCompiler: true,
  chainWebpack: config => {
    if (['test'].includes(process.env.NODE_ENV)) {
      config.module.rule('istanbul')
        .test(/\.js$/)
        .include.add(path.resolve('src')).end()
        .use('istanbul-instrumenter-loader')
        .loader('istanbul-instrumenter-loader')
        .options({ esModules: true })
        .before('babel-loader')

      config.output
        .devtoolModuleFilenameTemplate('[absolute-resource-path]')
        .devtoolFallbackModuleFilenameTemplate('[absolute-resource-path]?[hash]')
    }
    // https://webpack.js.org/configuration/devtool/
    if (process.env.NODE_ENV !== 'production') {
      if (process.env.NODE_ENV === 'test') {
        config.devtool('eval')
      } else {
        config.devtool('eval-source-map')
      }
    }
  }
}
