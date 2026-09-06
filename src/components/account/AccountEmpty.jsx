import { Link } from 'react-router-dom';
import Button from '../common/Button';
import './AccountEmpty.css';

function AccountEmpty({ image, mobileImage, imageAlt = '', mobileImageAlt, title, body, actionLabel, actionTo }) {
  return (
    <div className="account-empty" data-reveal>
      {image && <img src={image} alt={imageAlt} className="account-empty__img" />}
      {(mobileImage || image) && (
        <img
          src={mobileImage || image}
          alt={mobileImageAlt || imageAlt}
          className="account-empty__img account-empty__img--mobile"
        />
      )}
      <h2 className="account-empty__title">{title}</h2>
      <p className="account-empty__body">{body}</p>
      {actionLabel && actionTo && (
        <Button as={Link} to={actionTo} variant="primary-solid">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default AccountEmpty;
