# Article Cached App

## Requirements
1. Node.js installed on your machine
2. Docker installed on your machne

## Installation
1. Clone the repository
```
https://github.com/alramdein/article-cache-app.git
```

2. Install all its required libraries and dependencies. On the root project, run:
```
npm install
```

3. Set the environment variables in `.env` file and place it on the root project
```
HOST=<your-app-host>
PORT=<your-app-port>

PG_HOST=<your-postgres-host>
PG_PORT=<your-postgres-port>
PG_DATABASE=<your-postgres-database>
PG_USER=<your-postgres-user>
PG_PASSWORD=<your-postgres-password>
```

## Run
## Run on a local machine
On the root project, run:
```
node main.js
```
The app will be served at `http://localhost:3000/`

## Run on a Docker container
On the root project
1. Build the docker image
```
docker build . [-t <optional-name>]
```
*Syntax inside the bracket are optional*

2. Once the image is created, run it with docker compose
```
docker-compose --env-file .env up
```
*`--env-file .env` command include the `.env` file when running the container.*

Once it running, it will be serverd at `http://localhost:3000/`. Or you can customize the port by port-forwarding it in `docker-compose.yml` configuration

## Available Routes
[GET] `/article`, Get article based on query param. Available query params:

1. `query`, will search the matched keyword with title and body of the article
2. `author`, will search the matched keyword with the author of the article

[POST] `/artice`, added an article. Can be send in JSON or URL Encoded. Parameter:

1. `author`, author of the article
2. `title`, title of the article
3. `body`, body of the article


## Test
On the root project, run
```
npm test
```

## Author
This app was created by Alif Ramdani (@alramdein)