import './Button.css';

/**
 * Reusable pill button.
 * variant: 'primary' (yellow), 'outline' (light outline, for dark backgrounds),
 *          'dark' (solid dark), 'ghost' (muted/disabled look)
 */
function Button({ variant = 'primary', as = 'button', className = '', children, ...rest }) {
  const Tag = as;
  const classes = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ');
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

export default Button;
