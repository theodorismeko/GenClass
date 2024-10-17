# GenClass Application

This project consists of a GenClass application (a tool for producing classification rules using Grammatical Evolution), a MongoDB database, a backend API built with FastAPI, and a frontend application built with React. The entire application is containerized using Docker for easy deployment and development.

## GenClass Setup

Before proceeding with the Docker setup, please follow the instructions in the [GenClass README](../README.md) to compile GenClass and prepare the necessary files.

## Prerequisites

Ensure you have the following installed on your system:
- Docker
- Docker Compose
- Mongo Compass Application or use mongodbcompass from docker

## Getting Started

1. After setting up GenClass(Make sure files genclass executable, classifier.c, classifier.h & classifier.py are present in bin folder which is required to be at `GenClassApp/backend/bin`), ensure you are in the root directory(GenClassApp) of the project.

2. Build and start the Docker containers:
   ```
   docker-compose up -d
   ```

3. Once the containers are up and running, you can access:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:80/docs
   - MongoDB Compass (Database GUI): http://localhost:8081

## Services

The application consists of the following services:
- `mongodb`: The MongoDB database
- `mongodbcompass`: A web-based MongoDB GUI (to access it in the docker desktop logs section you can view the credentials | basicAuth <username:password> | )
- `backend`: The FastAPI backend service (including GenClass)
- `frontend`: The React frontend application

## Development

The `backend` and `frontend` services use volume mounts for live code reloading during development.

## Stopping the Application

To stop the application and remove the containers, networks, and volumes:
```
docker-compose down -v
```

## Troubleshooting

If you encounter issues:
1. Use docker ps to check the id of the container
2. Check service logs: `docker-compose logs [service_name]`
3. Ensure all required ports (3000, 80, 27017, 8081) are available.
4. Verify MongoDB connection settings in `docker-compose.yml`.

For more detailed information on GenClass compilation and setup, please refer to the [GenClass README](../README.md).
