import './Form.css';

function FormTextarea({ label, id, rows = 6, className = '', ...rest }) {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label htmlFor={id} className="form-field__label">
          {label}
        </label>
      )}
      <textarea id={id} rows={rows} className="form-field__control form-field__control--textarea" {...rest} />
    </div>
  );
}

export default FormTextarea;
