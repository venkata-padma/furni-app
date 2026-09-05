import HeroBanner from '../components/common/HeroBanner';
import BlogCard from '../components/blog/BlogCard';
import TestimonialCarousel from '../components/testimonial/TestimonialCarousel';
import FeaturedProductShowcase from '../components/common/FeaturedProductShowcase';
import NewsletterSubscribe from '../components/common/NewsletterSubscribe';
import HorizontalScrollRail from '../components/common/HorizontalScrollRail';
import { blogPosts } from '../data/blogPosts';
import { testimonials } from '../data/testimonials';
import './Blog.css';

function Blog() {
  return (
    <>
      <HeroBanner
        title="Blog"
        description="Lorem Ipsum dolor sit amet consectetur. Pharetra aliquet ornarevelit blandit purus erat. Viverra ac tellus morbiet purus amet nec."
        <HorizontalScrollRail>
          <div className="blog-grid__items">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </HorizontalScrollRail>
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </section>

      <TestimonialCarousel testimonials={testimonials} />
      <FeaturedProductShowcase />
      <NewsletterSubscribe />
    </>
  );
}

export default Blog;
