# SSR with React

## development 설정

### 로컬 환경 변수 설정 .env.local

버전 컨트롤에서 제외된 파일입니다.  \
해당 파일이 없으면 프로젝트 루트에 `.env.local` 파일을 생성합니다.

``` bash
PORT=80
DOMAIN=localhost
API_ENDPOINT=http://localhost
```

- `PORT=80` # 개발 환경 포트 (default 3000)
- `DOMAIN=localhost` # 개발환경 도메인 설정
- `API_ENDPOINT=http://localhost` # 사용 할 endpoint (배포 환경별로 다를수있어 분리)

> `start.js`에서 환경 변수값이 없을시 디폴트값이 추가됩니다.

``` js
// scripts/start.js
const host = process.env.DOMAIN || 'localhost';
let port = process.env.PORT || 3000;
```

### HTTPS 설정 (development only)

> [mkcert](https://github.com/FiloSottile/mkcert) - 로컬에서 신뢰할 수있는 개발 인증서를 만들기위한 도구입니다.

``` bash
brew install mkcert # 패키지 설치
brew install nss # if you use Firefox
mkcert -install # local CA 생성
# 프로젝트 루트로 cd
mkcert localhost # 인증서 & 인증 키 생성 - `process.env.DOMAIN` 값을 넣어 주세요
```

- 프로젝트 루트에 `localhost.pem` & `localh₩ost-key.pem` 이 생성 됩니다.
- *.pem 파일은 `.gitignore`에 추가 되어있습니다.

> localhost는 예제 입니다. `process.env.DOMAIN` 값을 넣어 주세요

---

## TODO LIST

### Common

- [x] webpack: dev server & hot reload
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
- [x] bundle js in *.js.gz format

### Serverside

- [x] Serverside renderer
- [x] Error handler
- [x] logs
  - [x] error logs - `error.log`
  - [x] access logs - `combined.log`
- [ ] PM2 (process manager)

## Docker (production)

build image

``` shell
docker build -t 7ylee/ssr-react .
```

run image

``` shell
docker run -p ${PORT}:8080 --name ssr-react -d 7ylee/ssr-react
```

### favicons

generate from [here](https://favicon.io/emoji-favicons/package/)
