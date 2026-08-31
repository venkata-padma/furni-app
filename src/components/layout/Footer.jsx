import { Link } from 'react-router-dom';
import { FacebookIcon, LinkedinIcon, InstagramIcon, XIcon } from '../common/SocialIcons';
import './Footer.css';

const FOOTER_COLUMNS = [
  {
    heading: 'Company',
    links: ['About Us', 'Services', 'Blog', 'Contact Us'],
  },
  {
    heading: 'Support',
    links: ['Support', 'Knowledge Base', 'Live Chat'],
  },
  {
    heading: 'Careers',
    links: ['Jobs', 'Our Team', 'Leadership', 'Privacy Policy'],
  },
  {
    heading: 'Products',
    links: ['Nordic Chair', 'Kruzo aero Chair', 'Ergonomic Chair'],
  },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', Icon: FacebookIcon, href: '#' },
  { label: 'LinkedIn', Icon: LinkedinIcon, href: '#' },
  { label: 'Instagram', Icon: InstagramIcon, href: '#' },
  { label: 'X', Icon: XIcon, href: '#' },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              Furni
            </Link>
            <p className="footer__blurb">
              Donec facilisis quam ut purus tutrum lobortis. Donec vitae odio quis nisi dapibus
              maiesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor
              tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada
            </p>
            <ul className="footer__social">
              {SOCIAL_LINKS.map(({ label, Icon, href }) => (
                <li key={label}>
                  <a href={href} aria-label={label} className="footer__social-link">
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="footer__columns" aria-label="Footer">
            {FOOTER_COLUMNS.map((col) => (
              <ul key={col.heading} className="footer__column">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <p>Copyright@2024. All Rights Reserved - designed with Love by Designer.com</p>
          <div className="footer__legal">
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
