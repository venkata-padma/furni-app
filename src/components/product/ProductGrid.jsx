import ProductCard from './ProductCard';
import './ProductGrid.css';

function ProductGrid({ products, columns = 3 }) {
  return (
    <div className="product-grid" style={{ '--grid-columns': columns }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
