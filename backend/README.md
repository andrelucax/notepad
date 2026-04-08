# Backend

## Requirements

- Node.js >= 24
- npm or yarn
- Docker (optional, for running MongoDB)

## Install dependencies

```bash
npm install
```

## Set envinronment variables (create a .env file)

```bash
PORT=3000
MONGO_URI=mongodb://admin:Password!69@localhost:27017/notepad?authSource=admin
DEBUG=True
```

## Running MongoDB with Docker (optional)

```bash
docker run -d --name mongo-container -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=Password!69 -e MONGO_INITDB_DATABASE=notepad -v mongo-data:/data/db mongo:7.0
```

## Start the Backend

```bash
npm start
```