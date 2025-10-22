# AWS Lottery Full Stack

Full Stack app with React and Nest.js.

## Todo

⚠️ **Not ready yet**:

- frontend is not finished
- deploy to AWS and config is not yet finished

## Stack

- language: TypeScript
- frontend: React
- backend: Nest.js
- database: PostgreSQL
- ORM: TypeORM
- API: REST
- API doc: OpenAPI / Swagger
- container: Docker
- infra: SST
- cloud: AWS

## Backend Features

- API
- rate limiting
- in-memory cache
- health check

## Install

You will need to install both [Node.js](https://nodejs.org/en/download) and [Rancher Desktop](https://rancherdesktop.io/) (or [Docker Desktop](https://www.docker.com/products/docker-desktop/)).

### Inside program repo

```bash
npm install
```

## Usage

Please note the order in executing the steps.

1. Start Rancher or Docker, then wait until it is ready.
1. run `npm run start:db` to start database
1. run `npm run start:be` to start backend
1. run `npm run start:fe` to start frontend

## License

Please check out [LICENSE](LICENSE) and [NOTICE](NOTICE) file.

## History

- 22th October 2025: I added GET requests for React and updated spec
- 20th October 2025: I added Pico CSS as stylesheet, added OpenApi generator script.
- 16th October 2025: Working version in local.
