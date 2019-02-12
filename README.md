# SSR with

## TODOS

- [x] webpack: dev server & hot reload
- [x] webpack: production & development configs
- [x] react-router
- [x] redux (thunk, devtool)
- [x] styled-components (no css)
- [ ] react-loadable
- [ ] react-helmet
- [ ] pwa - manifest.json & serviceworker.js
- [x] docker container
- [x] add polyfills & support IE9
- [ ] testing jest & enzyme

## Docker (production)

build image

``` shell
docker build -t 7ylee/ssr_react .
```

run image

``` shell
docker run -p ${PORT}:8080 --name ssr_react -d 7ylee/ssr_react
```