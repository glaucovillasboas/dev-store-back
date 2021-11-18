# Dev. Store - Backend
A simple project with Node + Express for an e-commerce for developers. <br/>
You can check the front-end here: https://github.com/victordurco/dev-store <br/>
![preview](https://github.com/victordurco/dev-store/blob/main/src/assets/gifs/gif-presentation.gif)

## Deployment 🚀
You can check the application in production here: [https://dev-store-rouge.vercel.app/](https://dev-store-rouge.vercel.app/)

### Tooling:
* [ExpressJS](https://expressjs.com/)
* [JavaScript](https://www.javascript.com/)
* [NodeJS](https://nodejs.org/en/about/)
* [PostreSQL](https://www.postgresql.org/)
* [JestJS](https://jestjs.io/)

### Prerequisites
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
* [PostgreSQL](https://www.postgresql.org/)

### Installation
* Clone the backend repository
```sh
git clone https://github.com/glappsmobile/dev-store-back
```
* Clone the frontend repository
```sh
git clone https://github.com/victordurco/dev-store
```
* Install NPM packages in frontend AND backend folders
```sh
npm install
```

* Create the dev and test database using PostgreSQL
```sh
CREATE DATABASE dev_store_test;
CREATE DATABASE dev_store_dev;
```

* Import DATABASE.sql to both databases (it's located at the root of the backend repository)
```sh
pg_dump dev_store_test < path/to/DATABASE.sql
pg_dump dev_store_test < path/to/DATABASE.sql
```

* Put the database information in the [.env.dev](https://github.com/glappsmobile/dev-store-back/blob/main/.env.dev) and [.env.test](https://github.com/glappsmobile/dev-store-back/blob/main/.env.test) files in the backend repository.
* If you use a port that is not 4000 in the `PORT` var in the [.env.dev](https://github.com/glappsmobile/dev-store-back/blob/main/.env.dev) file, then replace the port in `REACT_APP_URL_API` located at [.env.development](https://github.com/victordurco/dev-store/blob/main/.env.development) in the frontend repository with the same one used on the backend.

### How to run:
To start the development server, run:
```sh
npm run start:dev
```
To start the frontend, run:
```sh
npm start
```
