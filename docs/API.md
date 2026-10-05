# REST API

The API is served from `http://localhost:5000` by default. All request and
response bodies use JSON. Protected endpoints require
`Authorization: Bearer <token>` using the token returned by login or register.

## Authentication

### `POST /api/auth/register`

Creates a student account. Admin accounts must be provisioned separately.

Request:

```json
{
  "name": "Jane Student",
  "email": "jane@example.com",
  "password": "Password123"
}
```

The name and email are required; the password must contain at least 8
characters. Returns `201` with `{ "token": "...", "user": { ... } }`.

### `POST /api/auth/login`

Request: `{ "email": "jane@example.com", "password": "Password123" }`

Returns `{ "token": "...", "user": { "id": "...", "name": "...", "email": "...", "role": "student" } }`.
Invalid credentials return `401`.

### `GET /api/auth/me`

Requires authentication. Returns the authenticated user profile.

## Courses

### `GET /api/courses`

Lists published courses. Optional query parameters:

| Parameter | Description |
|---|---|
| `search` | Match course title, description, or instructor |
| `category` | Match a course category |
| `level` | `Beginner`, `Intermediate`, or `Advanced` |

Returns `{ "courses": [...] }`.

### `GET /api/courses/admin/all`

Admin only. Lists published and unpublished courses.

### `POST /api/courses`

Admin only. Creates a course. Required fields: `title`, `description`,
`instructor`, `category`, `level`, and `durationHours`. `lessons` is an
optional array of lesson titles, and `published` defaults to `true`.

```json
{
  "title": "Modern React Foundations",
  "description": "Build responsive applications with React.",
  "instructor": "Course Instructor",
  "category": "Web Development",
  "level": "Beginner",
  "durationHours": 12,
  "lessons": ["Components", "State and hooks"]
}
```

Returns `201` with `{ "course": {...} }`.

### `PUT /api/courses/:id`

Admin only. Updates a course using the supplied course fields. Returns the
updated `{ "course": {...} }`, or `404` if the course does not exist.

### `DELETE /api/courses/:id`

Admin only. Unpublishes a course rather than deleting historical enrollment
records. Returns `{ "message": "Course unpublished." }`.

## Enrollments and progress

### `POST /api/enrollments/:courseId`

Student only. Enrolls the current student in a published course. Returns
`201` with `{ "enrollment": {...} }`; duplicate enrollment returns `409`.

### `GET /api/enrollments/mine`

Student only. Lists the current student's enrollments, including course details
and progress.

### `PATCH /api/enrollments/:id/progress`

Student only. Sets progress for an enrollment owned by the current student.
`progress` must be a number from `0` to `100`; setting it to `100` marks the
enrollment complete.

Request: `{ "progress": 60 }`

Returns `{ "enrollment": {...} }`.

### `GET /api/enrollments/admin/all`

Admin only. Lists enrollments with student and course summaries for reporting.

## Health and errors

### `GET /api/health`

Returns `200` with `"status": "ok"` when MongoDB is connected, or `503` with
`"status": "degraded"` when the database is disconnected.

Errors use a JSON `{ "message": "..." }` response. Common status codes are
`400` for invalid input, `401` for missing or invalid authentication,
`403` for insufficient role permissions, `404` for missing records, and
`409` for duplicate accounts or enrollments.
