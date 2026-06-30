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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--admin-text-main)', margin: '0 0 8px 0' }}>Manage Blogs</h1>
          <p style={{ color: 'var(--admin-text-muted)', margin: 0 }}>Create and organize your latest news and articles.</p>
        </div>
        <Link href="/admin/blogs/new" className="premium-btn btn-primary">
          <ion-icon name="add-circle-outline"></ion-icon> Write New Blog
        </Link>
      </div>

      <div className="premium-table-container">
        <table className="premium-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Published On</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog._id}>
                <td>
                  <div style={{ fontWeight: '600', color: 'var(--admin-text-main)' }}>{blog.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--admin-text-muted)', marginTop: '4px' }}>By {blog.author?.name || 'Admin'}</div>
                </td>
                <td>
                  <span className="admin-badge badge-blue">
                    {blog.category}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--admin-text-muted)' }}>
                    <ion-icon name="calendar-outline"></ion-icon> {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Link href={`/admin/blogs/${blog._id}`} className="action-icon-btn" title="Edit">
                    <ion-icon name="create-outline"></ion-icon>
                  </Link>
                  <button onClick={() => handleDelete(blog._id)} className="action-icon-btn delete" title="Delete">
                    <ion-icon name="trash-outline"></ion-icon>
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '48px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                  <ion-icon name="newspaper-outline" style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}></ion-icon>
                  <p>No blogs published yet. Start writing!</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
