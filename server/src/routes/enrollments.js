import { Router } from 'express';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/:courseId', auth, requireRole('student'), async (req, res) => {
  const course = await Course.findOne({ _id: req.params.courseId, published: true });
  if (!course) return res.status(404).json({ message: 'Course not found.' });
  try {
    const enrollment = await Enrollment.create({ student: req.user._id, course: course._id });
    await enrollment.populate('course');
    res.status(201).json({ enrollment });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'You are already enrolled in this course.' });
    res.status(400).json({ message: error.message });
  }
});

router.get('/mine', auth, requireRole('student'), async (req, res) => {
  const enrollments = await Enrollment.find({ student: req.user._id }).populate('course').sort({ lastAccessedAt: -1 });
  res.json({ enrollments });
});

router.patch('/:id/progress', auth, requireRole('student'), async (req, res) => {
  const progress = Number(req.body.progress);
  if (!Number.isFinite(progress) || progress < 0 || progress > 100) return res.status(400).json({ message: 'Progress must be between 0 and 100.' });
  const enrollment = await Enrollment.findOne({ _id: req.params.id, student: req.user._id }).populate('course');
  if (!enrollment) return res.status(404).json({ message: 'Enrollment not found.' });
  enrollment.progress = progress;
  enrollment.completed = progress === 100;
  enrollment.lastAccessedAt = new Date();
  await enrollment.save();
  res.json({ enrollment });
});

router.get('/admin/all', auth, requireRole('admin'), async (_req, res) => {
  const enrollments = await Enrollment.find().populate('student', 'name email').populate('course', 'title').sort({ createdAt: -1 });
  res.json({ enrollments });
});

export default router;
