import HeroBanner from '../components/common/HeroBanner';
import FeatureItem from '../components/features/FeatureItem';
import TeamMemberCard from '../components/team/TeamMemberCard';
import TestimonialCarousel from '../components/testimonial/TestimonialCarousel';
import FeaturedProductShowcase from '../components/common/FeaturedProductShowcase';
import NewsletterSubscribe from '../components/common/NewsletterSubscribe';
import { features } from '../data/features';
import { teamWithBio } from '../data/team';
import { testimonials } from '../data/testimonials';
import './About.css';

const whyChooseImg = '/why-choose-us.png';

function About() {
  return (
    <>
      <HeroBanner
        title="About Us"
        description="Lorem Ipsum dolor sit amet consectetur. Pharetra aliquet ornarevelit blandit purus erat. Viverra ac tellus morbiet purus amet nec."
      />

      <section className="about-section container why-choose">
        <div className="why-choose__text">
          <h2>Why Choose Us</h2>
          <p>
            Donec vitae odio quis nisidapibus malesuada. Nullam acaliquet velit. Aliquam
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

      <section className="about-section container team-grid">
        {teamWithBio.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </section>

      <TestimonialCarousel testimonials={testimonials} />
      <FeaturedProductShowcase />
      <NewsletterSubscribe />
    </>
  );
}

export default About;
