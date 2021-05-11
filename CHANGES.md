## 1.1.1 (2020-??-??)

- Bump highlight.js from 9.18.1 to 9.18.5 #19
- Bump ini from 1.3.5 to 1.3.8 #20 
- Bump elliptic from 6.5.3 to 6.5.4 #23
- Bump y18n from 4.0.0 to 4.0.1 #24
- Bump ssri from 6.0.1 to 6.0.2 #25
- Bump url-parse from 1.4.7 to 1.5.1 #26
- Bump hosted-git-info from 2.8.8 to 2.8.9 #27

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
be possible afterwards too)

## 0.1 (2020-02-22)

- Initial version, with a `VueComponentWrapper` wrapper component that
handled the syncing of Vue components and Lumino DOM elements.
- Link added to the Lumino project
