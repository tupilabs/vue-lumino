## 1.2.3 (202?-??-??)

- Bump @cypress/code-coverage from 3.12.46 to 3.13.1
- Bump @eslint/js from 9.9.1 to 9.10.0
- Bump @vitejs/plugin-vue from 5.1.2 to 5.1.4
- Bump @vue/compiler-dom from 3.4.38 to 3.5.5
- Bump cypress from 13.14.1 to 13.14.2
- Bump eslint from 9.10.0 to 9.11.0
- Bump eslint-plugin-vue from 9.27.0 to 9.28.0
- Bump happy-dom from 15.7.3 to 15.7.4
- Bump jekyll from 4.3.3 to 4.3.4
- Bump path-to-regexp from 6.2.1 to 6.3.0
- Bump rollup from 4.21.2 to 4.22.4
- Bump sass from 1.77.8 to 1.79.3
- Bump sinon from 18.0.0 to 19.0.2
- Bump vite from 5.4.1 to 5.4.6
- Bump vue from 3.4.38 to 3.5.5

## 1.2.2 (2024-09-08)

- Bump @cypress/code-coverage from 3.12.29 to 3.12.46
- Bump @cypress/vue from 6.0.0 to 6.0.1
- Bump @eslint/js from 9.1.1 to 9.9.1
- Bump @lumino/datagrid from 2.3.1 to 2.4.1
- Bump @lumino/default-theme from 2.1.5 to 2.1.6
- Bump @lumino/widgets from 2.3.2 to 2.5.0
- Bump @vitest/coverage-istanbul from 1.4.0 to 1.6.0
- Bump @vitest/coverage-v8 from 1.4.0 to 2.0.5
- Bump @vitejs/plugin-vue from 5.0.4 to 5.1.2
- Bump @vue/compiler-dom from 3.4.21 to 3.4.38
- Bump @vue/compiler-sfc from 3.4.21 to 3.4.38
- Bump @vue/server-renderer from 3.4.21 to 3.4.38
- Bump @vue/test-utils from 2.4.5 to 2.4.6
- Bump axios from 1.6.5 to 1.7.4
- Bump braces from 3.0.2 to 3.0.3
- Bump cypress from 13.7.2 to 13.14.1
- Bump eslint from 9.0.0 to 9.10.0
- Bump eslint-plugin-cypress from 3.2.0 to 3.5.0
- Bump eslint-plugin-promise from 6.1.1 to 7.1.0
- Bump eslint-plugin-vue from 9.24.0 to 9.27.0
- Bump happy-dom from 14.7.1 to 15.7.3
- Bump micromatch from 4.0.5 to 4.0.8
- Bump sass from 1.74.1 to 1.77.8
- Bump sinon from 17.0.1 to 18.0.0
- Bump tar from 6.2.0 to 6.2.1
- Bump vite from 5.2.8 to 5.4.1
- Bump vite-plugin-istanbul from 6.0.0 to 6.0.2
- Bump vitest from 1.4.0 to 2.0.5
- Bump vue from 3.4.21 to 3.4.38

## 1.2.1 (2024-04-08)

- Bump @cypress/code-coverage from 3.12.18 to 3.12.29
- Bump @lumino/datagrid from 2.3.0 to 2.3.1
- Bump @lumino/default-theme from 2.1.4 to 2.1.5
- Bump @lumino/widgets from 1.37.2 to 2.3.2
- Bump @vitejs/plugin-vue from 5.0.3 to 5.0.4
- Bump @vitest/coverage-v8 from 1.2.0 to 1.4.0
- Bump @vitest/coverage-istanbul from 1.2.0 to 1.4.0
- Bump @vue/compiler-dom from 3.4.13 to 3.4.21
- Bump @vue/compiler-sfc from 3.4.13 to 3.4.21
- Bump @vue/server-renderer from 3.4.13 to 3.4.21
- Bump @vue/test-utils from 2.4.3 to 2.4.5
- Bump actions/cache from 3 to 4
- Bump codecov/codecov-action from 3 to 4
- Bump cypress from 13.6.2 to 13.7.2
- Bump eslint from 7.32.0 to 9.0.0
- Bump eslint-plugin-vue from 9.20.1 to 9.24.0
- Bump follow-redirects from 1.15.5 to 1.15.6
- Bump happy-dom from 14.3.9 to 14.7.1
- Bump ip from 2.0.0 to 2.0.1
- Bump jsdom from 23.2.0 to 24.0.0
- Bump sass from 1.69.7 to 1.74.1
- Bump vite from 5.0.11 to 5.1.7
- Bump vite-plugin-istanbul from 5.0.0 to 6.0.0
- Bump vitest from 1.2.0 to 1.4.0
- Bump vue from 3.4.13 to 3.4.21
- Marked the project type as module in `package.json`
- Migrated eslint configuration to flat configuration (eslint 9.0.0 requirement)
- Move from jsdom to happy-dom due to missing DragEvent (used in Lumino) in JSDom #125

## 1.2.0 (2024-01-14)

- Vue3 https://github.com/tupilabs/vue-lumino/pull/59
  - Vue 3 removed `$children`, which was used in this library with Vue 2. To
    work around that, and to support any kind of component without customization
    required, now users **must** provide a `:ref="id"` for each component. The
    `ref` value must match the `id` given to the component. This library uses
    that `ref` value to match with the `id`, and locate the element via
    `$parent.$refs`. This means, too, that the caller of `Lumino` must hold the
    `$refs`. See the example code and the `README.md` for an example.
- - Added a dependabot specifying package ecosystems github-actions and npm
- Upgraded versions of GitHub Actions used, added Node setting it to v14 (due to SSL issues with 18+)
- Bump @babel/traverse from 7.10.4 to 7.23.2 #56
- Bump @lumino/datagrid from 0.34.1 to 2.3.0 #64
- Bump @lumino/default-theme from 0.20.2 to 2.1.4 #62
- Bump @vitejs/plugin-vue from 4.6.2 to 5.0.3 #66
- Bump actions/setup-node from 3 to 4 #61
- Bump browserify-sign from 4.2.0 to 4.2.2 #57
- Bump codecov/codecov-action from 1 to 3 #60
- Bump follow-redirects from 1.14.8 to 1.15.4 #58
- Bump semver from 5.7.1 to 5.7.2 #54
- Bump vite from 4.5.1 to 5.0.11 #65
- Bump webpack from 5.64.4 to 5.76.0 #52
- Bump word-wrap from 1.2.3 to 1.2.4 #55

## 1.1.5 (2023-03-11)

- Bump follow-redirects from 1.12.1 to 1.14.7 #38
- Bump cached-path-relative from 1.0.2 to 1.1.0 #39
- Bump follow-redirects from 1.14.7 to 1.14.8 #40
- Bump url-parse from 1.5.3 to 1.5.7 #42
- Bump url-parse from 1.5.7 to 1.5.10 #43
- Bump eventsource from 1.0.7 to 1.1.1 #44
- Bump shell-quote from 1.7.2 to 1.7.3 #45
- Bump terser from 4.8.0 to 4.8.1 #46
- Bump decode-uri-component from 0.2.0 to 0.2.2 #47
- Bump minimatch from 3.0.4 to 3.1.2 #48
- Bump express from 4.17.1 to 4.18.2 #50
- Bump qs from 6.5.2 to 6.5.3 #49
- Bump ajv from 6.12.2 to 6.12.6 #41

## 1.1.4 (2021-12-06)

- Bump ws from 5.2.2 to 5.2.3 #35
- Bump color-string from 1.5.3 to 1.9.0 #36
- Upgrades after `ncu -u`: @lumino/datagrid, @lumino/default-theme, @lumino/widgets, core-js, vue (and other dev-dependencies) #37

## 1.1.3 (2021-12-06)

- Bump url-parse from 1.5.1 to 1.5.3 #33
- Fix release checklist Wiki page, re-release now bundle version (thanks to @Lee-42 for reporting in #34) #34

## 1.1.2 (2021-09-29)

- Bump postcss from 7.0.32 to 7.0.36 #30
- Bump path-parse from 1.0.6 to 1.0.7 #31
- Bump tmpl from 1.0.4 to 1.0.5 #32

## 1.1.1 (2021-05-29)

- Bump highlight.js from 9.18.1 to 9.18.5 #19
- Bump ini from 1.3.5 to 1.3.8 #20 
- Bump elliptic from 6.5.3 to 6.5.4 #23
- Bump y18n from 4.0.0 to 4.0.1 #24
- Bump ssri from 6.0.1 to 6.0.2 #25
- Bump url-parse from 1.4.7 to 1.5.1 #26
- Bump hosted-git-info from 2.8.8 to 2.8.9 #27
- Bump browserslist from 4.12.2 to 4.16.6 #28
- Bump dns-packet from 1.3.1 to 1.3.4 #29 

## 1.1.0 (2020-08-27)

- Upgraded dependencies via ncu -u (only non-dev dependency updated
was @lumino/datagrid, from 0.9.1 to 0.10.0)
- Add support for users to define their own tab titles, allowing for
dynamic tab titles

## 1.0.0 (2020-07-04)

- Added tests
- Added CI
- Made the code into a vue library (target/bundle)
- Transferred to github.com/tupilabs organization
- Created tupilabs NPM organization
- First release to NPM

## 0.2 (2020-06-27)

- Removed `VueComponentWrapper` simplifying code
- Using the default `<slot></slot>` wrapped in a `<div v-show=false>`
and syncing components and DOM elements via events
- Code now is almost ready to be used as a component directly, without
the need to copy it and adapt to other projects (which should still
be possible afterward too)

## 0.1 (2020-02-22)

- Initial version, with a `VueComponentWrapper` wrapper component that
handled the syncing of Vue components and Lumino DOM elements.
- Link added to the Lumino project
