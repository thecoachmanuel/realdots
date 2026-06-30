import BlogForm from '@/components/admin/BlogForm';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  return { title: 'Edit Blog - Admin' };
}

export default async function EditBlogPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  await dbConnect();
  const blog = await Blog.findById(id).lean();

  if (!blog) {
    notFound();
  }

  const serializedBlog = JSON.parse(JSON.stringify(blog));

  return (
    <div>
      <h1 style={{ fontSize: '24px', color: '#2c3e50', marginBottom: '20px' }}>Edit Blog</h1>
      <BlogForm initialData={serializedBlog} isEdit={true} />
    </div>
  );
}
