import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found container">
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist yet.</p>
      <Button as={Link} to="/" variant="primary-solid">
        Back to Home
      </Button>
    </section>
  );
}

export default NotFound;
