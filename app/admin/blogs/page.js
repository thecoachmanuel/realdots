import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import BlogListClient from '@/components/admin/BlogListClient';

export const revalidate = 0;

export default async function AdminBlogs() {
  await dbConnect();
  const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
  
  const serializedBlogs = blogs.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
    createdAt: doc.createdAt.toISOString()
  }));

  return <BlogListClient blogs={serializedBlogs} />;
}
