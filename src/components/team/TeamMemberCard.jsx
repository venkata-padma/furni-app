import './TeamMemberCard.css';

function TeamMemberCard({ member }) {
  return (
    <article className="team-card">
      <div className="team-card__media">
        <img src={member.photo} alt={member.name} />
      </div>
      <h3 className="team-card__name">{member.name}</h3>
      <p className="team-card__title">{member.title}</p>
      <p className="team-card__bio">{member.bio}</p>
      <a href="#" className="team-card__link">
        Learn More
      </a>
    </article>
  );
}

export default TeamMemberCard;
