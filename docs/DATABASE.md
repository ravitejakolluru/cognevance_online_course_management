# Database Schema

MongoDB database: `cognevance_courses`

## Users

- `_id`: ObjectId
- `name`: string
- `email`: unique string
- `passwordHash`: bcrypt hash
- `role`: `student | admin`
- timestamps

## Courses

- `_id`: ObjectId
- `title`: string
- `description`: string
- `instructor`: string
- `category`: string
- `level`: `Beginner | Intermediate | Advanced`
- `durationHours`: number
- `lessons`: string array
- `published`: boolean
- timestamps

## Enrollments

- `_id`: ObjectId
- `student`: reference to Users
- `course`: reference to Courses
- `progress`: number from 0 to 100
- `completedLessons`: number array
- `completed`: boolean
- `enrolledAt`: date
- `lastAccessedAt`: date
- timestamps

A compound unique index on `(student, course)` prevents duplicate enrollment.
