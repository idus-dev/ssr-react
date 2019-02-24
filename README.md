# SSR with

## TODOS

- [x] webpack: dev server & hot reload
- [x] webpack: production & development configs
- [x] react-router
- [x] redux (thunk, devtool)
- [x] styled-components (no css)
- [ ] react-loadable
- [x] react-helmet
- [x] pwa - manifest.json & serviceworker.js
- [x] docker container
- [x] add polyfills & support IE9
- [ ] testing jest & enzyme

## Docker (production)

build image

``` shell
docker build -t 7ylee/ssr-react .
```

run image

``` shell
docker run -p ${PORT}:8080 --name ssr-react -d 7ylee/ssr-react
```