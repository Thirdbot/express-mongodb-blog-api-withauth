# Blog API

A simple REST API built with **Node.js**, **Express**, and **MongoDB (Mongoose)** that supports:
- User authentication (JWT stored in cookies)
- CRUD operations for blog posts (protected routes)

## Tech Stack
- Node.js (ES Modules)
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt (password hashing)
- cookie-parser
- dotenv
- nodemon (dev)

---

## Getting Started

### 1) Prerequisites
- **Node.js** installed
- **MongoDB** running locally *or* a MongoDB Atlas connection string

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables
Create a `.env` file (recommended: copy from the example):
```bash
cp .env.example .env
```
Then edit `.env` and set values (example):
- `MONGO_URI` = your MongoDB connection string
- `SALT_ROUNDS` = bcrypt salt rounds (e.g. `10`)
- `JWT_SECRET` = long random string

> Never commit `.env` to GitHub.

### 4) Run the server (development)
```bash
npm run dev
```

Server starts on:
- `http://localhost:3000`

---

## API Base URL
All routes are prefixed with:
- `/v1/api`

---

## Authentication

This API uses **JWT stored in a cookie** (session-style).
- After **signup/signin**, the server sets a `token` cookie.
- Protected blog routes require that cookie to be present.

### Auth Routes
**POST** `/v1/api/user/signup`  
Create a user account.

**Body**
```json
{ 
  "username": "your_name",
  "email": "you@example.com",
  "password": "your_password"
}
```
**POST** `/v1/api/user/signin`  
Sign in to an existing account.

**Body**
```json
{ 
  "email": "you@example.com",
  "password": "your_password"
}
```
> Tip: When testing with Postman/Insomnia, ensure cookies are enabled so the `token` cookie is saved and sent automatically.

---

## Blog Routes (Protected)

All blog routes require authentication (token cookie).

### Get all blogs for the logged-in user
**GET** `/v1/api/blog`

### Get a blog by id
**GET** `/v1/api/blog/:blogId`

### Create a new blog
**POST** `/v1/api/blog/`

**Body**
```json
{ 
  "title": "My first post",
  "content": "Hello world"
}
```
### Update a blog
**PATCH** `/v1/api/blog/update/:blogid`

**Body**
```json 
{ 
  "title": "Updated title", 
  "content": "Updated content"
}
```
### Delete a blog
**DELETE** `/v1/api/blog/:blogid`

---

## Common Responses
- `200` / `201` success
- `400` bad request (missing/invalid fields)
- `401` unauthorized (not signed in / invalid token)
- `500` server error

---

## Project Structure (high level)
- `controllers/` request handlers
- `routes/` Express routes
- `models/` Mongoose schemas
- `utils/` helpers (authentication, hashing, middleware)
- `index.ts` app entry point

---

## Notes / Recommendations
If you plan to extend this project, good next steps:
- Add Docker Compose for MongoDB

---

## License
ISC