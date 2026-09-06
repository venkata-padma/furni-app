import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, MessageCircle } from 'lucide-react';
import Button from '../components/common/Button';
import HeroBanner from '../components/common/HeroBanner';
import { serviceDetails } from '../data/features';
import './ServiceDetail.css';

function ServiceDetail() {
  const { serviceSlug } = useParams();
  const service = serviceDetails.find((item) => item.slug === serviceSlug);

  if (!service) {
    return <HeroBanner title="Service not found" description="The service you are looking for is not available." exploreTo="/services" />;
  }

  return (
    <>
      <HeroBanner title={service.title} description={service.detailDescription} exploreTo="/services" />
      <main className="service-detail container">
        <Link className="service-detail__back" to="/services"><ArrowLeft size={17} /> Back to services</Link>
        <section className="service-detail__content">
          <div className="service-detail__intro">
            <p className="service-detail__eyebrow">Our service</p>
            <h2>{service.detailTitle}</h2>
            <p>{service.detailDescription}</p>
          </div>
          <div className="service-detail__benefits">
            <h3>What you can expect</h3>
            <ul>
              {service.points.map((point) => <li key={point}><Check size={18} /> {point}</li>)}
            </ul>
            <Button as={Link} to="/contact" variant="primary-solid"><MessageCircle size={17} /> Talk to our team</Button>
          </div>
        </section>
      </main>
    </>
  );
}

export default ServiceDetail;