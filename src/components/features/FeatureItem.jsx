import { Link } from 'react-router-dom';
import { ArrowUpRight, Truck, ShoppingBag, LifeBuoy, RefreshCw } from 'lucide-react';
import './FeatureItem.css';

const ICONS = { Truck, ShoppingBag, LifeBuoy, RefreshCw };

function FeatureItem({ feature, variant }) {
  const Icon = ICONS[feature.icon] ?? Truck;
  return (
    <article className={`feature-item${variant ? ` feature-item--${variant}` : ''}`}>
      <span className="feature-item__icon">
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <h3 className="feature-item__title">{feature.title}</h3>
      <p className="feature-item__description">{feature.description}</p>
      {variant === 'service' && (
        <Link className="feature-item__link" to={`/services/${feature.slug}`} aria-label={`Learn more about ${feature.title}`}>
          <ArrowUpRight size={20} strokeWidth={2} />
        </Link>
      )}
    </article>
  );
}

export default FeatureItem;
