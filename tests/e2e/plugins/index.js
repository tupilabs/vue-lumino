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

module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)

  // on(
  //   'file:preprocessor',
  //   require('@cypress/code-coverage/use-browserify-istanbul')
  // )

  // important - return config because code coverage plugin
  // modifies environment variables there
  return config
}
