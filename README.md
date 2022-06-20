# Multi Tenant Demo App

## Description

This is a multi tenant demo application.
The application is built with Typescript, Nest.js Server, TypeORM, Swagger, Configuration under Nest.js framework. The app can run standalone or with Docker, which also has a configuration for running the database and the app within the same configuration file. The database used is PostgreSQL.
The app has 3 entities: Tenant, Project and Task. Tenant currently is auto-generated when the application runs, meanwhile there are endpoints available for Project and Task.
Task has a relation to Project, and Project has a relation to Tenant. If a Project is deleted, all the Tasks are also deleted, and if a Tenant is deleted, also all Projects are deleted.

## Web Server

As mentioned above, the app is using Nest.js as a web server and Create/Read(one or all)/Edit/Delete routes are available for Project and Task.
It follows a simple Controller/Service/Repository pattern. Base classes are created for entities, services and controller.

## Swagger

The documentation is available at `http://localhost:3000/api/v1/#/` after running the app.
NOTE: The swagger API had a poor support for Typescript Generics, which lead to method overwriting. There is a base controller which generates dynamically all the routes for an entity, but a dynamic swagger configuration cannot be added (It can show the endpoints, but it doesn't show details about request/response body). The methods are being overwritten when needed and a detailed Swagger configuration is provided.

## Configuration

The application is part of `The Twelve-Factor App` and can run on any host by providing the correct environment file.
It also has a default configuration for local development.

## Running the app

```bash
# development
$ docker-compose build dependencies
$ docker-compose up -d dependencies
$ npm run start

# production mode
$ docker-compose build
$ docker-compose up -d
```
