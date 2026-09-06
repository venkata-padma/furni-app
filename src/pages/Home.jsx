import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroBanner from '../components/common/HeroBanner';
import Button from '../components/common/Button';
import ProductGrid from '../components/product/ProductGrid';
import FeatureItem from '../components/features/FeatureItem';
import BlogCard from '../components/blog/BlogCard';
import TestimonialCarousel from '../components/testimonial/TestimonialCarousel';
import FeaturedProductShowcase from '../components/common/FeaturedProductShowcase';
import NewsletterSubscribe from '../components/common/NewsletterSubscribe';
import HorizontalScrollRail from '../components/common/HorizontalScrollRail';
import { products } from '../data/products';
import { features } from '../data/features';
import { blogPosts } from '../data/blogPosts';
import { testimonials } from '../data/testimonials';
import './Home.css';

// Home-page photography served from /public.
const whyChooseImg = '/why-choose-us.png';
const helpCollageImg = '/we-help-you.png';

const HELP_POINTS = [
  'Donec vitae odio quis nisi dapibus maesuada.',
  'Donec vitae odio quis nisi dapibus maesuada.',
  'Donec vitae odio quis nisi dapibus maesuada.',
  'Donec vitae odio quis nisi dapibus maesuada.',
];

function Home() {
  return (
    <>
      <HeroBanner
        title="Modern interior Design Studio"
        description="Lorem Ipsum dolor sit amet consectetur. Pharetra aliquet ornarevelit blandit purus erat. Viverra ac tellus morbiet purus amet nec."
        imageAlt="Green velvet three-seater sofa"
      />

      <section className="home-section container">
        <div className="crafted">
          <div className="crafted__text">
            <h2>Craftedwith excellent material.</h2>
            <p>
              Donec vitae odio quis nisidapibus malesuada. Nullam acaliquet velit. Aliquam
              vulputata velit imperdiet dolor tempor tristique.
            </p>
            <Button as={Link} to="/shop" variant="dark">
              Explore
            </Button>
          </div>
          <ProductGrid products={products} columns={3} className="explore-product-rail" />
        </div>
      </section>

      <section className="home-section container why-choose">
        <div className="why-choose__text">
          <h2>Why Choose Us</h2>
          <p>
            Donec vitae odio quis nisidapibus malesuada.Nullam acaliquet velit. Aliquam
            vulputata velit imperdiet dolor tempor tristique.
          </p>
          <div className="why-choose__features">
            {features.map((f) => (
              <FeatureItem key={f.id} feature={f} />
            ))}
          </div>
        </div>
        <div className="why-choose__media">
          <img src={whyChooseImg} alt="Modern living room styling" />
        </div>
      </section>

      <section className="home-section container help-section">
        <div className="help-section__media">
          <span className="help-section__dots" aria-hidden="true" />
          <img src={helpCollageImg} alt="Modern interior styling collage" className="help-section__collage" />
        </div>
        <div className="help-section__text">
          <h2>We Help You Make Modern Interior Design</h2>
          <p>
            Donec facilisis quam ut purus tutrum lobortis. Donec vitae odio quis nisi dapibus
            maesuada.Nullam ac aliquet velit.Aliquam vulputate velit imperdiet dolor tempor
            tristique.Pellentesque habitant morbi tristique senectus et netus et malesuada
          </p>
          <ul className="help-section__list">
            {HELP_POINTS.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <Button as={Link} to="/shop" variant="dark">
            Explore
          </Button>
        </div>
      </section>

      <section className="home-section container featured-products">
        <HorizontalScrollRail>
          <div className="featured-products__items">
            {products.map((p) => (
              <div key={p.id} className="featured-products__item">
                <img src={p.image} alt={p.name} />
                <div>
                  <h3>{p.name}</h3>
                  <p>Thoughtfully designed comfort for modern living.</p>
                  <Link to={`/products/${p.id}`} className="featured-products__link">
                    Read More
                  </Link>
                </div>
                <Link to={`/products/${p.id}`} className="featured-products__arrow" aria-label={`View ${p.name}`}>
                  <ArrowRight size={22} strokeWidth={2} />
                </Link>
              </div>
            ))}
          </div>
        </HorizontalScrollRail>
      </section>

      <TestimonialCarousel testimonials={testimonials} />

      <section className="home-section container recent-blog">
        <div className="recent-blog__header">
          <h2>Recent Blog</h2>
          <Link to="/blog">View All</Link>
        </div>
        <HorizontalScrollRail>
          <div className="recent-blog__grid">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </HorizontalScrollRail>
      </section>

      <FeaturedProductShowcase />
      <NewsletterSubscribe />
    </>
  );
}

export default Home;
