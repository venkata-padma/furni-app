import { Link } from 'react-router-dom';
import { ArrowUpRight, Truck, ShoppingBag, LifeBuoy, RefreshCw } from 'lucide-react';
import './FeatureItem.css';

const ICONS = { Truck, ShoppingBag, LifeBuoy, RefreshCw };

function FeatureItem({ feature, variant }) {
  const Icon = ICONS[feature.icon] ?? Truck;
  const content = (
    <>
      <span className="feature-item__icon">
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <h3 className="feature-item__title">{feature.title}</h3>
      <p className="feature-item__description">{feature.description}</p>
      {variant === 'service' && (
        <span className="feature-item__link" aria-hidden="true">
          <ArrowUpRight size={20} strokeWidth={2} />
        </span>
      )}
    </>
  );

  if (variant === 'service') {
    return (
      <Link
        className={`feature-item feature-item--${variant}`}
        to={`/services/${feature.slug}`}
        aria-label={`Learn more about ${feature.title}`}
      >
        {content}
      </Link>
    );
  }

  return <article className={`feature-item${variant ? ` feature-item--${variant}` : ''}`}>{content}</article>;
}

export default FeatureItem;
