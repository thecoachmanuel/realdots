import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import BlogListClient from '@/components/admin/BlogListClient';

export const revalidate = 0;

export default async function AdminBlogs() {
  await dbConnect();
  const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
  
  const serializedBlogs = JSON.parse(JSON.stringify(blogs));

  return <BlogListClient blogs={serializedBlogs} />;
}
