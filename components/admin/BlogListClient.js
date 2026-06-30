'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BlogListClient({ blogs }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete blog');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', color: '#2c3e50' }}>Manage Blogs</h1>
        <Link href="/admin/blogs/new" style={{ padding: '10px 20px', background: '#27ae60', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Add New Blog
        </Link>
      </div>

      <div className="admin-table-container" style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#ecf0f1', color: '#34495e' }}>
              <th style={{ padding: '15px' }}>Title</th>
              <th style={{ padding: '15px' }}>Category</th>
              <th style={{ padding: '15px' }}>Date</th>
              <th style={{ padding: '15px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                <td style={{ padding: '15px' }}>
                  <strong>{blog.title}</strong>
                </td>
                <td style={{ padding: '15px' }}>{blog.category}</td>
                <td style={{ padding: '15px' }}>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '15px', textAlign: 'right' }}>
                  <Link href={`/admin/blogs/${blog._id}`} style={{ marginRight: '10px', color: '#3498db', textDecoration: 'none' }}>Edit</Link>
                  <button onClick={() => handleDelete(blog._id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#7f8c8d' }}>No blogs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
