import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  progress: { type: Number, min: 0, max: 100, default: 0 },
  completedLessons: [{ type: Number, min: 0 }],
  completed: { type: Boolean, default: false },
  enrolledAt: { type: Date, default: Date.now },
  lastAccessedAt: { type: Date, default: Date.now }
}, { timestamps: true });

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
export default mongoose.model('Enrollment', enrollmentSchema);
