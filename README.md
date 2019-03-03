# SSR with

## TODOS

### Common

- [ ] webpack: dev server & hot reload (broken)
- [x] webpack: production & development configs
- [ ] testing jest & enzyme
- [x] add polyfills & support IE9
- [x] docker container

### Clientside

- [x] react-helmet
- [ ] react-loadable
- [x] react-router
- [x] redux (thunk, devtool)
- [x] styled-components (no css)
- [x] pwa - manifest.json & serviceworker.js & offline support

### Serverside

- [x] Serverside renderer
- [ ] Error handler
- [ ] logs

## Docker (production)

build image

``` shell
docker build -t 7ylee/ssr-react .
```

run image

``` shell
docker run -p ${PORT}:8080 --name ssr-react -d 7ylee/ssr-react
```