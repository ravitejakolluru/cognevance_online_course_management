import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Course from './models/Course.js';

await mongoose.connect(process.env.MONGODB_URI);
await User.deleteMany({ email: { $in: ['admin@example.com', 'student@example.com'] } });
const [adminHash, studentHash] = await Promise.all([bcrypt.hash('Admin@12345', 12), bcrypt.hash('Student@12345', 12)]);
await User.create([
  { name: 'Course Admin', email: 'admin@example.com', passwordHash: adminHash, role: 'admin' },
  { name: 'Demo Student', email: 'student@example.com', passwordHash: studentHash, role: 'student' }
]);
if (await Course.countDocuments() === 0) await Course.insertMany([
  { title: 'Modern React Foundations', description: 'Build responsive React applications with components, state, hooks, and routing.', instructor: 'K. Venkata Raviteja', category: 'Web Development', level: 'Beginner', durationHours: 12, lessons: ['React fundamentals', 'Components and props', 'State and hooks', 'Routing', 'Responsive UI'] },
  { title: 'REST API Engineering with Node.js', description: 'Design production-ready REST APIs using Express, validation, authentication, and MongoDB.', instructor: 'K. Venkata Raviteja', category: 'Backend', level: 'Intermediate', durationHours: 15, lessons: ['Express architecture', 'REST design', 'JWT authentication', 'MongoDB', 'API security'] },
  { title: 'Data Science with Python', description: 'Learn a practical workflow for data cleaning, analysis, visualization, and introductory machine learning.', instructor: 'Raviteja Kolluru', category: 'Data Science', level: 'Intermediate', durationHours: 18, lessons: ['NumPy and pandas', 'Data cleaning', 'Visualization', 'Feature engineering', 'Model evaluation'] }
]);
console.log('Seed complete.');
await mongoose.disconnect();
