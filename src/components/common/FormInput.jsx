import './Form.css';

function FormInput({ label, id, className = '', ...rest }) {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label htmlFor={id} className="form-field__label">
          {label}
        </label>
      )}
      <input id={id} className="form-field__control" {...rest} />
    </div>
  );
}

export default FormInput;
