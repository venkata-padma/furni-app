import { Truck, ShoppingBag, LifeBuoy, RefreshCw } from 'lucide-react';
import './FeatureItem.css';

const ICONS = { Truck, ShoppingBag, LifeBuoy, RefreshCw };

function FeatureItem({ feature }) {
  const Icon = ICONS[feature.icon] ?? Truck;
  return (
    <div className="feature-item">
      <span className="feature-item__icon">
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <h3 className="feature-item__title">{feature.title}</h3>
      <p className="feature-item__description">{feature.description}</p>
    </div>
  );
}

export default FeatureItem;
