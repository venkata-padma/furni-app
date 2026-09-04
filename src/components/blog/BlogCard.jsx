import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, UserRound } from 'lucide-react';
import './BlogCard.css';

function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <div className="blog-card__media">
        <img src={post.image} alt={post.title} />
      </div>
      <p className="blog-card__meta">
        <span><CalendarDays size={18} /> {post.date}</span>
        <span className="blog-card__meta-divider" />
        <span><UserRound size={18} /> by {post.author}</span>
      </p>
      <h3 className="blog-card__title">{post.title}</h3>
      <Link to={`/blog/${post.id}`} className="blog-card__more">Read More</Link>
      <Link to={`/blog/${post.id}`} className="blog-card__arrow" aria-label={`Read ${post.title}`}>
        <ArrowRight size={22} strokeWidth={2} />
      </Link>
    </article>
  );
}

export default BlogCard;
