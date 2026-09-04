import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, UserRound } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import './BlogDetail.css';

function BlogDetail() {
  const { postId } = useParams();
  const post = blogPosts.find((item) => item.id === postId);

  if (!post) {
    return <main className="blog-detail container"><h1>Article not found</h1><Link to="/blog">Back to blog</Link></main>;
  }

  return (
    <main className="blog-detail container">
      <Link className="blog-detail__back" to="/blog"><ArrowLeft size={17} /> Back to blog</Link>
      <article className="blog-detail__article">
        <img className="blog-detail__image" src={post.image} alt={post.title} />
        <div className="blog-detail__body">
          <div className="blog-detail__meta"><span><CalendarDays size={18} /> {post.date}</span><span><UserRound size={18} /> by {post.author}</span></div>
          <p className="blog-detail__eyebrow">Furni journal</p>
          <h1>{post.title}</h1>
          <p className="blog-detail__excerpt">{post.excerpt}</p>
          <p>{post.body}</p>
          <Link className="blog-detail__return" to="/blog">Explore more articles</Link>
        </div>
      </article>
    </main>
  );
}

export default BlogDetail;