# [Museon](https://museon-web.vercel.app/)

A free and open-source music platform

[![GitHub license](https://img.shields.io/badge/License-GPL3-blue.svg)](https://github.com/metyildirim/museon-web/blob/master/LICENSE) [![Build](https://github.com/metyildirim/museon-web/actions/workflows/build.yml/badge.svg)](https://github.com/metyildirim/museon-web/actions/workflows/build.yml) [![Lint](https://github.com/metyildirim/museon-web/actions/workflows/lint.yml/badge.svg)](https://github.com/metyildirim/museon-web/actions/workflows/lint.yml) [![Test](https://github.com/metyildirim/museon-web/actions/workflows/test.yml/badge.svg)](https://github.com/metyildirim/museon-web/actions/workflows/test.yml)

## Development

### Environments

- Copy `.env.local.template` to `.env.local` on same structure level.
- Fill required environment variables.

| Environment      | Type   | Recommendation for Development | Description             |
| ---------------- | ------ | ------------------------------ | ----------------------- |
| GRAPHQL_ENDPOINT | String | http://localhost:4000/graphql  | GraphQL Server Endpoint |

### Running GraphQL Server

Clone [museon-backend](https://github.com/metyildirim/museon-dummy-backend) repository and run GraphQL server:

```bash
$ npm start
```

Open [http://localhost:4000/graphql](http://localhost:4000/graphql) with your browser to see the result.

### Running App

Running the development server:

```bash
$ npm run dev
# or
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Linting:

```bash
$ npm run lint
# or
$ yarn lint
```

Testing:

```bash
$ npm test
# or
$ yarn test
```

Analyzing bundle:

```bash
$ npm run analyze
# or
$ yarn analyze
```

## Containerization with Docker

```bash
$ docker-compose build
# run
$ docker-compose up
```
