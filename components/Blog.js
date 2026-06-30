import Link from 'next/link';

export default function Blog({ blogs = [] }) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="blog animate-on-scroll" id="blog">
      <div className="container">
        <p className="section-subtitle">News & Blogs</p>
        <h2 className="h2 section-title">Latest News Feeds</h2>
        <ul className="blog-list has-scrollbar">
          {blogs.map(blog => (
            <li key={blog._id}>
              <div className="blog-card">
                <figure className="card-banner">
                  <img src={blog.image || "/images/blog-1.png"} alt={blog.title} className="w-100" />
                </figure>
                <div className="blog-content">
                  <div className="blog-content-top">
                    <ul className="card-meta-list">
                      <li>
                        <span className="card-meta-link">
                          <ion-icon name="person"></ion-icon>
                          <span>by: {blog.author?.name || 'Admin'}</span>
                        </span>
                      </li>
                      <li>
                        <span className="card-meta-link">
                          <ion-icon name="pricetags"></ion-icon>
                          <span>{blog.category}</span>
                        </span>
                      </li>
                    </ul>
                    <h3 className="h3 blog-title">
                      <Link href={`/blog/${blog._id}`}>{blog.title}</Link>
                    </h3>
                  </div>
                  <div className="blog-content-bottom">
                    <div className="publish-date">
                      <ion-icon name="calendar"></ion-icon>
                      <time dateTime={blog.createdAt}>
                        {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
                      </time>
                    </div>
                    <Link href={`/blog/${blog._id}`} className="read-more-btn">Read More</Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
