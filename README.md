# mern-todo

## Overview
This is a full-stack To-Do application built using **React (frontend)**, **Node.js with Express (backend)**, and **MongoDB (database)**. The app allows users to create, update, and delete tasks. It is containerized using **Docker** for easy deployment.

## Features
- Add, update, and delete to-dos
- Mark tasks as completed
- Responsive UI using Material-UI
- REST API with Express.js
- MongoDB for data storage
- Docker for containerized deployment

## Tech Stack
- **Frontend:** React, Redux, Material-UI
- **Backend:** Node.js, Express, MongoDB
- **Deployment:** Docker, Docker Compose

---

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)

### Clone the Repository
```sh
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file:
   ```sh
   MONGO_URI=mongodb://mongo:27017/todos
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm start
   ```

---

## API Endpoints
### Base URL: `http://localhost:5000/api/todos`
- **GET** `/` - Get all to-dos
- **POST** `/` - Add a new to-do
- **PUT** `/:id` - Update a to-do
- **DELETE** `/:id` - Delete a to-do

---

## Docker Deployment
### Using Docker Compose
1. Build and start the containers:
   ```sh
   docker-compose up --build
   ```
2. Access the app at: `http://localhost:3000`

### Docker Compose File (`docker-compose.yml`)
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongo

  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

---

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Added new feature"`).
4. Push to your branch (`git push origin feature-branch`).
5. Open a Pull Request.

---
# To-do
![1](https://github.com/user-attachments/assets/2b49f368-f96e-4926-96f6-6933fdc21d6d)
# To-do list added
![2](https://github.com/user-attachments/assets/58d54604-ef89-46d4-9390-4d26d92b9993)
# To-do list checklist box
![3](https://github.com/user-attachments/assets/59f39bf5-ab1b-41e6-bb8d-9f466a50b44f)
# To-do list Delete
![4](https://github.com/user-attachments/assets/45b7d933-c36e-4b0f-b428-12a81e3e3ad2)
# Weather Checker
![5](https://github.com/user-attachments/assets/704b0d11-8ed3-44d9-9c57-9a3605a59f2d)

