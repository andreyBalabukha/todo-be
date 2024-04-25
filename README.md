# todos-be

This is the backend for a simple todo application.

## Version

1.0.0

## Description

This backend service is responsible for managing todos. It provides APIs to create, update, delete, and retrieve todos.

## Installation

To install the project, follow these steps:
1. Rename `env` to `.env`
2. Follow local setup instructions or run with Docker-compose

## Setup project locally

1. Clone the repository
2. Navigate to the project directory: `cd todos-be`
3. check the node version in `.nvmrc` file and install the node version using nvm
4. Install the dependencies: `npm install`

## Scripts

- `npm run dev`: Starts the server from the compiled JavaScript files in the `dist` directory.


## Run with Docker-compose

This `docker-compose.yml` file defines the services that make up your application in development environment so they can be run together in a single environment.

### Version

The version of Docker Compose is `3.8`.

### Services

The services that make up your application are defined in this section:

### db

This service is named `db`. It uses the `postgres` Docker image. The container created for this service is named `postgres_container`.

#### container_name

The `container_name` directive is used to specify a custom name for the container, which is `postgres_container` in this case.

#### image

The `image` directive tells Docker Compose to use the `postgres` Docker image for this service.

#### restart

The `restart` directive is set to `always` which means Docker will always restart this container regardless of the exit code when the container exits.

#### environment

The `environment` directive is used to set environment variables in the container. The actual environment variables are not shown in the provided excerpt.

### Running the Application

To start the application, navigate to the directory containing the `docker-compose.yml` file and run `docker-compose up`.

To stop the application, you can run `docker-compose down` from the same directory.

## API Endpoints

- `GET /todos`: Retrieves all todos.
- `POST /todos`: Creates a new todo.
- `PUT /todos/:id`: Updates a todo with the given ID.
- `DELETE /todos/:id`: Deletes a todo with the given ID.

## Contributing

If you want to contribute to this project, please create a new issue or open a pull request.

## License

This project is licensed under the MIT License.
