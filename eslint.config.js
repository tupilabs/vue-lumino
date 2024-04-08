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

import js from "@eslint/js"
import pluginVue from "eslint-plugin-vue"

export default [
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    "files": [
      "**/*.js",
      "**/*.vue"
    ],
    "ignores": [
      "node_modules/*",
      "dist/*",
      "tests/coverage/*"
    ],
    "rules": {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "vue/custom-event-name-casing": 0,
      "vue/multi-word-component-names": 0
    },
    "languageOptions": {
      "ecmaVersion": 2021
    }
  }
];
