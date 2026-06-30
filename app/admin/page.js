import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import Blog from '@/models/Blog';
import Message from '@/models/Message';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminDashboard() {
  await dbConnect();
  
  const [propertyCount, blogCount, messageCount] = await Promise.all([
    Property.countDocuments(),
    Blog.countDocuments(),
    Message.countDocuments()
  ]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--admin-text-main)', margin: '0 0 8px 0' }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--admin-text-muted)', margin: 0 }}>Welcome back, Admin. Here is what's happening today.</p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        {/* Properties Stat Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: 'var(--admin-text-muted)', margin: '0 0 8px 0', textTransform: 'uppercase', fontSize: '12px', fontWeight: '700', letterSpacing: '0.05em' }}>Total Properties</p>
              <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--admin-text-main)', margin: 0 }}>{propertyCount}</h2>
            </div>
            <div className="stat-icon-wrapper stat-blue">
              <ion-icon name="home"></ion-icon>
            </div>
          </div>
          <Link href="/admin/properties" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '24px', color: '#3b82f6', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
            Manage Properties <ion-icon name="arrow-forward-outline"></ion-icon>
          </Link>
        </div>

        {/* Blogs Stat Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: 'var(--admin-text-muted)', margin: '0 0 8px 0', textTransform: 'uppercase', fontSize: '12px', fontWeight: '700', letterSpacing: '0.05em' }}>Total Blogs</p>
              <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--admin-text-main)', margin: 0 }}>{blogCount}</h2>
            </div>
            <div className="stat-icon-wrapper stat-green">
              <ion-icon name="newspaper"></ion-icon>
            </div>
          </div>
          <Link href="/admin/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '24px', color: '#22c55e', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
            Manage Blogs <ion-icon name="arrow-forward-outline"></ion-icon>
          </Link>
        </div>

        {/* Messages Stat Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: 'var(--admin-text-muted)', margin: '0 0 8px 0', textTransform: 'uppercase', fontSize: '12px', fontWeight: '700', letterSpacing: '0.05em' }}>New Messages</p>
              <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--admin-text-main)', margin: 0 }}>{messageCount}</h2>
            </div>
            <div className="stat-icon-wrapper stat-orange">
              <ion-icon name="mail"></ion-icon>
            </div>
          </div>
          <Link href="/admin/messages" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '24px', color: '#f97316', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
            View Messages <ion-icon name="arrow-forward-outline"></ion-icon>
          </Link>
        </div>

      </div>

      <div className="glass-card">
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--admin-text-main)', marginBottom: '24px' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/admin/properties/new" className="premium-btn btn-primary">
            <ion-icon name="add-circle-outline"></ion-icon> Add New Property
          </Link>
          <Link href="/admin/blogs/new" className="premium-btn btn-outline">
            <ion-icon name="create-outline"></ion-icon> Write a Blog Post
          </Link>
        </div>
      </div>
    </div>
  );
}
