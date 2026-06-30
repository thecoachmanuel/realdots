import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!mongoose.Types.ObjectId.isValid(id)) return { title: 'Blog Not Found' };

  await dbConnect();
  const blog = await Blog.findById(id).lean();

  if (!blog) return { title: 'Blog Not Found' };

  return {
    title: `${blog.title} | RealDots Blog`,
    description: blog.content.substring(0, 150) + '...',
  };
}

export default async function BlogDetails({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await dbConnect();
  const blog = await Blog.findById(id).lean();

  if (!blog) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <section className="property" style={{ padding: '100px 0', background: 'var(--cultured-2)' }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--white)', padding: '40px', borderRadius: '10px', boxShadow: 'var(--shadow-1)' }}>
              <div style={{ marginBottom: '30px' }}>
                <span style={{ display: 'inline-block', background: 'var(--orange-soda)', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '14px', marginBottom: '15px' }}>
                  {blog.category}
                </span>
                <h1 className="h2" style={{ marginBottom: '15px' }}>{blog.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'var(--cadet)', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <ion-icon name="person-outline"></ion-icon>
                    <span>{blog.author?.name || 'Admin'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <ion-icon name="calendar-outline"></ion-icon>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <img src={blog.image} alt={blog.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '40px' }} />

              <div style={{ lineHeight: '1.8', color: 'var(--dark-jungle-green)', fontSize: '16px', whiteSpace: 'pre-wrap' }}>
                {blog.content}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
