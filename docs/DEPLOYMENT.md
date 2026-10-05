# Deployment Guide

The project is configured for MongoDB Atlas, Render, and Vercel. Deployment
requires accounts and credentials for these services; no public deployment
URLs are configured in this source tree.

## 1. Provision MongoDB

1. Create a MongoDB Atlas cluster and database.
2. Create a database user and allow network access from the Render service.
3. Copy the connection string into Render as `MONGODB_URI`. Do not commit it.

## 2. Deploy the API to Render

Use the included `server/render.yaml` Blueprint or create a Node web service
with `server/` as its root directory.

- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `MONGODB_URI`: Atlas connection string
  - `JWT_SECRET`: long, randomly generated secret
  - `CLIENT_URL`: deployed Vercel origin; comma-separated origins are supported

Wait for the service to start, then verify its `/api/health` endpoint reports
`"status": "ok"`.

## 3. Deploy the client to Vercel

Import the repository into Vercel and set the project root to `client/`.

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL`, set to the Render API origin without
  a trailing slash (for example, `https://your-api.onrender.com`)

After deployment, set Render's `CLIENT_URL` to the Vercel site's origin and
redeploy the API if necessary.

## 4. Seed demo data (optional)

For local development, set the backend environment variables and run
`npm run seed` from `server/`. The seed script creates demo users with known
passwords. Do not use those accounts or credentials on a public production
deployment; create a private admin account and change/remove demo credentials
before exposing the application.

## 5. Smoke test and screenshots

Verify the health endpoint, student registration and login, course search and
filters, enrollment, progress updates, and admin course management. Capture
the screenshots listed in [`../screenshots/README.txt`](../screenshots/README.txt)
from the deployed application, and ensure screenshots do not expose
credentials or tokens.
