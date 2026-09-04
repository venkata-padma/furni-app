import { Link } from 'react-router-dom';
import HeroBanner from '../components/common/HeroBanner';
import Button from '../components/common/Button';
import FeatureItem from '../components/features/FeatureItem';
import ProductGrid from '../components/product/ProductGrid';
import TestimonialCarousel from '../components/testimonial/TestimonialCarousel';
import FeaturedProductShowcase from '../components/common/FeaturedProductShowcase';
import NewsletterSubscribe from '../components/common/NewsletterSubscribe';
import { servicesFeatures } from '../data/features';
import { products } from '../data/products';
import { testimonials } from '../data/testimonials';
import './Services.css';

function Services() {
  return (
    <>
      <HeroBanner
        title="Services"
        description="Lorem Ipsum dolor sit amet consectetur. Pharetra aliquet ornarevelit blandit purus erat. Viverra ac tellus morbiet purus amet nec."
      />

      <section className="services-section container services-grid">
        {servicesFeatures.map((f) => (
          <FeatureItem key={f.id} feature={f} variant="service" />
        ))}
      </section>

      <section className="services-section container crafted">
        <div className="crafted__text">
          <h2>Craftedwith excellent material.</h2>
          <p>
            Donec vitae odio quis nisidapibus malesuada.Nullam acaliquet velit. Aliquam
            vulputata velit imperdiet dolor tempor tristique.
          </p>
          <Button as={Link} to="/shop" variant="dark">
            Explore
          </Button>
        </div>
        <ProductGrid products={products} columns={3} />
      </section>

      <TestimonialCarousel testimonials={testimonials} />
      <FeaturedProductShowcase />
      <NewsletterSubscribe />
    </>
  );
}

export default Services;
