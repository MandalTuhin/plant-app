# 🌱 Plant Tracker

A simple full-stack plant tracking app built with:

- React (frontend)
- Express.js + Node (backend)
- MongoDB (via Docker)
- Image uploads (via multer)
- JWT-based authentication (optional)

## How to Run

1. Start MongoDB container:

   ```bash
   sudo docker start plant-mongo
   ```
   If the container doesn’t exist yet, run this instead:

   ```bash
   sudo docker run -d \
   --name plant-mongo \
   -p 27017:27017 \
   -v plantdata:/data/db \
   mongo:latest
   ```

2. Start backend

   ```bash
   cd backend
   nodemon index.js
   ```

3. Start frontend

   ```bash
   cd frontend
   npm start
   ```

##  Roadmap

See ROADMAP.md for planned features and progress.

## Purpose

Created for learning, growth, and healing. 🌿
