import HeroBanner from '../components/common/HeroBanner';
import ProductGrid from '../components/product/ProductGrid';
import FeaturedProductShowcase from '../components/common/FeaturedProductShowcase';
import NewsletterSubscribe from '../components/common/NewsletterSubscribe';
import { shopProducts } from '../data/products';
import './Shop.css';

function Shop() {
  return (
    <>
      <HeroBanner
        title="Shop"
        description="Lorem Ipsum dolor sit amet consectetur. Pharetra aliquet ornarevelit blandit purus erat. Viverra ac tellus morbiet purus amet nec."
      />

      <section className="shop-section container">
        <ProductGrid products={shopProducts} columns={4} />
      </section>

      <FeaturedProductShowcase />
      <NewsletterSubscribe />
    </>
  );
}

export default Shop;
