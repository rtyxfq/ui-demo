const Button = ({
  children,
  ...rest
}) => {
  return <button {...rest}>{children}</button>;
};

export {
  Button
};