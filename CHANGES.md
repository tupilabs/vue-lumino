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
