import BlogForm from '@/components/admin/BlogForm';

export const metadata = {
  title: 'Add New Blog - Admin',
};

export default function NewBlogPage() {
  return (
    <div>
      <h1 style={{ fontSize: '24px', color: '#2c3e50', marginBottom: '20px' }}>Add New Blog</h1>
      <BlogForm />
    </div>
  );
}
