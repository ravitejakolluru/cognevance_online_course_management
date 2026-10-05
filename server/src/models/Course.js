import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 140 },
  description: { type: String, required: true, maxlength: 2000 },
  instructor: { type: String, required: true, maxlength: 100 },
  category: { type: String, required: true, maxlength: 60 },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  durationHours: { type: Number, required: true, min: 1, max: 1000 },
  lessons: [{ type: String, maxlength: 180 }],
  published: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
