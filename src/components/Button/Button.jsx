import "./Button.scss";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  width = "100%",
  height = "auto",
  size = "small",
  disabled = false,
  ...props
}) => {
  const buttonClass = `button ${variant} ${size && size}`;

  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClass}
      style={{ ...props.style, width, height }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

// Usage
// <Button width="200px" height="50px">Accept</Button>
// <Button width="200px" variant="secondary">Cancel</Button>
