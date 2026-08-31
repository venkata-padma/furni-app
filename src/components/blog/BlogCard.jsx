import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './BlogCard.css';

function BlogCard({ post }) {
  return (
    <Link to="/blog" className="blog-card">
      <div className="blog-card__media">
        <img src={post.image} alt={post.title} />
      </div>
      <h3 className="blog-card__title">{post.title}</h3>
      <p className="blog-card__meta">
        by <span className="blog-card__author">{post.author}</span> on{' '}
        <span className="blog-card__date">{post.date}</span>
      </p>
      <span className="blog-card__more">
        Read More <ArrowRight size={15} strokeWidth={2.5} />
      </span>
    </Link>
  );
}

export default BlogCard;
