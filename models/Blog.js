import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    name: { type: String, required: true, default: 'RealDots Admin' },
    avatar: { type: String, required: true, default: '/images/author.jpg' }
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
