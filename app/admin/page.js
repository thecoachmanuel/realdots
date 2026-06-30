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
      <h1 style={{ fontSize: '28px', color: '#2c3e50', marginBottom: '20px' }}>Dashboard Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        
        {/* Properties Stat Card */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '48px', color: '#3498db', marginBottom: '10px' }}>
            <ion-icon name="home"></ion-icon>
          </div>
          <h2 style={{ fontSize: '36px', color: '#2c3e50', margin: '0 0 10px 0' }}>{propertyCount}</h2>
          <p style={{ color: '#7f8c8d', margin: 0, textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>Total Properties</p>
          <Link href="/admin/properties" style={{ marginTop: '20px', color: '#3498db', textDecoration: 'none', fontWeight: '600' }}>
            Manage Properties &rarr;
          </Link>
        </div>

        {/* Blogs Stat Card */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '48px', color: '#27ae60', marginBottom: '10px' }}>
            <ion-icon name="newspaper"></ion-icon>
          </div>
          <h2 style={{ fontSize: '36px', color: '#2c3e50', margin: '0 0 10px 0' }}>{blogCount}</h2>
          <p style={{ color: '#7f8c8d', margin: 0, textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>Total Blogs</p>
          <Link href="/admin/blogs" style={{ marginTop: '20px', color: '#27ae60', textDecoration: 'none', fontWeight: '600' }}>
            Manage Blogs &rarr;
          </Link>
        </div>

        {/* Messages Stat Card */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '48px', color: '#e67e22', marginBottom: '10px' }}>
            <ion-icon name="mail"></ion-icon>
          </div>
          <h2 style={{ fontSize: '36px', color: '#2c3e50', margin: '0 0 10px 0' }}>{messageCount}</h2>
          <p style={{ color: '#7f8c8d', margin: 0, textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>Messages</p>
          <Link href="/admin/messages" style={{ marginTop: '20px', color: '#e67e22', textDecoration: 'none', fontWeight: '600' }}>
            View Messages &rarr;
          </Link>
        </div>

      </div>

      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '22px', color: '#2c3e50', marginBottom: '15px' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <Link href="/admin/properties/new" style={{ padding: '12px 24px', background: '#3498db', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: '600' }}>
            + Add New Property
          </Link>
          <Link href="/admin/blogs/new" style={{ padding: '12px 24px', background: '#27ae60', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: '600' }}>
            + Write a Blog Post
          </Link>
        </div>
      </div>
    </div>
  );
}
