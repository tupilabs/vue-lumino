# vue-lumino

![CI](https://github.com/kinow/vue-lumino/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/kinow/vue-lumino/branch/master/graph/badge.svg)](https://codecov.io/gh/kinow/vue-lumino)

An example project showing one way to integrate Vue.js and
[Lumino](https://github.com/jupyterlab/lumino) (née PhosphorJS).

![](./demo.gif)

Lumino *“is a library for building interactive web applications”*. It is used by JupyterLab to create the
top menu bar, widgets with close/maximize buttons, and other components that allow users to create
web applications.

Based on work done for [Cylc UI](https://github.com/cylc/cylc-ui).

## Building

```bash
$ yarn install             # install dependencies
$ yarn run serve           # run development server
$ yarn run build           # compiles and minifies for production
$ yarn run lint            # lint and fix files
$ yarn run test:unit       # run unit tests
$ yarn run coverage:unit   # report unit tests coverage
```

## License

Licensed under the Apache License. See LICENSE file for more.
