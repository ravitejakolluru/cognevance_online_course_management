import { Router } from 'express';
import Course from '../models/Course.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  const { search = '', category, level } = req.query;
  const filter = { published: true };
  if (category) filter.category = category;
  if (level) filter.level = level;
  if (search.trim()) filter.$or = [
    { title: { $regex: search.trim(), $options: 'i' } },
    { description: { $regex: search.trim(), $options: 'i' } },
    { instructor: { $regex: search.trim(), $options: 'i' } }
  ];
  const courses = await Course.find(filter).sort({ createdAt: -1 });
  res.json({ courses });
});

router.get('/admin/all', auth, requireRole('admin'), async (_req, res) => {
  res.json({ courses: await Course.find().sort({ createdAt: -1 }) });
});

router.post('/', auth, requireRole('admin'), async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ course });
  } catch (error) { res.status(400).json({ message: error.message }); }
});

router.put('/:id', auth, requireRole('admin'), async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    res.json({ course });
  } catch (error) { res.status(400).json({ message: error.message }); }
});

router.delete('/:id', auth, requireRole('admin'), async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, { published: false }, { new: true });
  if (!course) return res.status(404).json({ message: 'Course not found.' });
  res.json({ message: 'Course unpublished.' });
});

export default router;
