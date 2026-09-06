import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, UserRound } from 'lucide-react';
import './BlogCard.css';

function BlogCard({ post }) {
  const navigate = useNavigate();
  const openPost = () => navigate(`/blog/${post.id}`);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPost();
    }
  };

  return (
    <article
      className="blog-card"
      role="link"
      tabIndex="0"
      onClick={openPost}
      onKeyDown={handleKeyDown}
      aria-label={`Read ${post.title}`}
    >
      <div className="blog-card__media">
        <img src={post.image} alt={post.title} />
      </div>
      <p className="blog-card__meta">
        <span><CalendarDays size={18} /> {post.date}</span>
        <span className="blog-card__meta-divider" />
        <span><UserRound size={18} /> by {post.author}</span>
      </p>
      <h3 className="blog-card__title">{post.title}</h3>
      <span className="blog-card__more">Read More</span>
      <span className="blog-card__arrow" aria-hidden="true">
        <ArrowRight size={22} strokeWidth={2} />
      </span>
    </article>
  );
}

export default BlogCard;
