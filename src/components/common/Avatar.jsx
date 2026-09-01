import './Avatar.css';

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
}

/** Round avatar — shows the image if given, otherwise the person's initials. */
function Avatar({ name = '', src, size = 72, className = '' }) {
  return (
    <span
      className={`avatar ${className}`.trim()}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
    >
      {src ? <img src={src} alt={name} /> : <span aria-hidden="true">{getInitials(name)}</span>}
    </span>
  );
}

export default Avatar;
