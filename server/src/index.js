import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import enrollmentRoutes from './routes/enrollments.js';

const app = express();
const port = process.env.PORT || 5000;
const allowed = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map(v => v.trim()).filter(Boolean);

app.use(helmet());
app.use(cors({ origin: (origin, cb) => !origin || allowed.includes(origin) ? cb(null, true) : cb(new Error('Origin not allowed by CORS')) }));
app.use(express.json({ limit: '100kb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false }));

app.get('/api/health', (_req, res) => res.status(mongoose.connection.readyState === 1 ? 200 : 503).json({ status: mongoose.connection.readyState === 1 ? 'ok' : 'degraded', service: 'Cognevance Course API', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use((err, _req, res, _next) => res.status(400).json({ message: err.message || 'Request failed.' }));

async function start() {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) throw new Error('MONGODB_URI and JWT_SECRET must be configured.');
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => console.log(`Course API listening on port ${port}`));
}
start().catch(error => { console.error('Startup failed:', error); process.exit(1); });
