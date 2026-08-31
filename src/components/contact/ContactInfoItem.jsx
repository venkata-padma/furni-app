import './ContactInfoItem.css';

function ContactInfoItem({ icon: Icon, label }) {
  return (
    <div className="contact-info-item">
      <span className="contact-info-item__icon">
        <Icon size={16} strokeWidth={1.75} />
      </span>
      <span>{label}</span>
    </div>
  );
}

export default ContactInfoItem;
