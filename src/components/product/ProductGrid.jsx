import ProductCard from './ProductCard';
import HorizontalScrollRail from '../common/HorizontalScrollRail';
import './ProductGrid.css';

function ProductGrid({ products, columns = 3, className = '' }) {
  return (
    <HorizontalScrollRail className={`product-grid-rail ${className}`}>
      <div className="product-grid" style={{ '--grid-columns': columns }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </HorizontalScrollRail>
  );
}

export default ProductGrid;
