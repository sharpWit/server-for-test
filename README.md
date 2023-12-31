## Server for Test

This repository contains a server for testing purposes.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your local machine:

- [Docker Desktop (Windows)](https://docs.docker.com/desktop/install/windows-install/)

- [Docker Desktop (Linux)](https://docs.docker.com/engine/install/ubuntu/)

## Installation

```bash
git clone https://github.com/sharpWit/server-for-test.git


```

## Build Docker Image

Navigate to the project directory and build a Docker image:

docker build -t web-server .

## Create a Docker Container

Run a Docker container from the created image, exposing port 3001 and creating a data volume:

docker run -dp 127.0.0.1:3001:3001 -v server-data-volume:/app/data --name server web-server

Now you can communicate with this server from your local app environment.

## Usage

To communicate with the server from your local app environment, use the following address: http://127.0.0.1:3001.

Provide additional information here about the server's functionality, available endpoints, or any other relevant details.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgments

Feel free to make any additional changes or customization as needed for your project.
