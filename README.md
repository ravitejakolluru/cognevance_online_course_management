# Cognevance Online Course Management System

A full-stack Level 2 project for managing online courses, users, enrollments, and learning progress.

## Live Demo

- Frontend: _Deploy after publishing the repository_
- API: _Deploy after publishing the repository_
- API health: `/api/health`

## Features

- JWT authentication and role-based authorization (student/admin)
- Student and admin dashboards
- Course CRUD for admins
- Course search, category filtering, and level filtering
- Student enrollment workflow
- Progress tracking with percentage and completion state
- REST APIs for authentication, courses, enrollments, and progress
- MongoDB persistence with Mongoose
- Responsive UI and accessible forms
- Client-side and server-side validation
- Helmet security headers, CORS, rate limiting, and password hashing

## Tech Stack

Frontend: React, Vite, React Router, CSS
Backend: Node.js, Express, JWT, bcryptjs, Mongoose
Database: MongoDB / MongoDB Atlas
Deployment target: Vercel + Render + MongoDB Atlas

## Project Structure

```text
cognevance_online_course_management/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── package.json
│   └── vercel.json
├── server/
│   ├── src/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   ├── package.json
│   ├── render.yaml
│   └── .env.example
├── docs/
│   ├── API.md
│   ├── DATABASE.md
│   └── DEPLOYMENT.md
└── README.md
```

## Local Setup

### 1. Install

```bash
npm install
npm run install:all
```

### 2. Backend environment

Copy `server/.env.example` to `server/.env` and configure:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cognevance_courses
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

### 3. Seed demo data

```bash
cd server
npm run seed
```

Demo credentials created by the seed script:

- Admin: `admin@example.com` / `Admin@12345`
- Student: `student@example.com` / `Student@12345`

Change these credentials in any real deployment.

### 4. Start

From the repository root:

```bash
npm run dev
```

Frontend: http://localhost:5173  
API: http://localhost:5000/api/health

## API Documentation

See [`docs/API.md`](./docs/API.md).

## Database Schema

See [`docs/DATABASE.md`](./docs/DATABASE.md).

## Deployment

See [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md).

## Deliverables

- Complete frontend and backend source code
- REST API documentation
- Database schema documentation
- Responsive dashboards
- Search/filtering and progress tracking
- Deployment configuration
- Screenshots/demo folder ready for captured deployment screenshots

## Security

Never commit `.env`, JWT secrets, database passwords, or production credentials.
