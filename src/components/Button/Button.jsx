export const Button = ({
  type,
  onClick,
  children,
  className,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
