# POPEYE - Become a True Docker Sailor!
![Logo de Popeye](https://images.bfmtv.com/RrINSdAu2vxkPMNqGbQN0ps_Viw=/4x3:1252x705/800x0/images/-176238.jpg "Logo de Popeye")
## Overview

POPEYE is a project aimed at mastering the basics of containerizing applications and describing multi-container infrastructures using Docker and Docker Compose. Like the brave sailor Popeye, this project navigates through the vast ocean of operating systems and configurations, ensuring that containers work wherever they might end. This capability allows containers to be used on any host OS where Docker is installed.

## Project Description

The task is to containerize and define the deployment of a simple web poll application consisting of five elements:

- **Poll**: A Flask Python web application that gathers votes and pushes them into a Redis queue.
- **Redis Queue**: Holds the votes sent by the Poll application.
- **Worker**: A Java application that consumes the votes from the Redis queue and stores them into a PostgreSQL database.
- **PostgreSQL Database**: Persistently stores the votes.
- **Result**: A Node.js web application that fetches the votes from the database and displays the results.

## Docker Images

You are required to create 3 Docker images for the Poll, Worker, and Result components, following specific requirements provided in the project instructions.

## Docker Compose

The `docker-compose.yml` file is responsible for running and linking your containers. It must define:
- 5 services: poll, redis, worker, db, and result.
- 3 networks: poll-tier, result-tier, and back-tier.
- 1 named volume: db-data for database persistence.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Setup and Running

**Clone the repository**

git clone https://github.com/EpitechMscProPromo2026/T-DOP-601-PAR_david-laun.git

### BUILD AND RUN

docker compose up -d

### Accessing the applications

  Poll application: http://localhost:5000
  
  Result application: http://localhost:5001

### Environment Variables

Make sure to configure the necessary environment variables for connecting the services as required. These should be defined within the docker-compose.yml file.

### THANKS
