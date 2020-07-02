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

### SSR 관련 중요 상수 값

#### `process.env.IS_BROWSER`

- webpack 빌드타임에 클라언트 번들에 추가되는 환경변수.
- 클라언트 `<App/>` 이 서버에서 먼저 렌더링 되기 때문에, 서버/클라이언트 환경에 따라 컴포넌트 로직 분기를 위해 추가된 플래그
- 서버에선 없는 값.

#### `window.__INITIAL_DATA__`

- `app-shell.html` 에 `null` 값으로 초기화
- 데이터를 직접 요청하는 컴포넌트에서, 서버 렌더링시 응답을 임시로 저장하는 글로벌 객체.
- 컴포넌트 내부에서 `window.__INITIAL_DATA__` 에 접근해서, 컴포넌트 초기 상태값으로 사용

#### `window.__INITIAL_STATE__`

- `app-shell.html` 에 `null` 값으로 초기화
- 서버 렌더링시, store 상태를 미리 요청해서 임시 저장해두는 글로벌 객체
- `store/index.js` 에서 `window.__INITIAL_STATE__` 접근해서 초기 스토어를 만들때, `preloadState로 추가함`

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
