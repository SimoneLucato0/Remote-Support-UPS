import { MouseEventHandler } from "react";
import { Button } from "react-bootstrap";


export type ButtonUIModel = {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    icon?: React.ReactNode;
    outline?: boolean;
    size?: "lg" | "sm";
    customStyle?: string,
    type?: "button" | "submit" | "reset";
    variant?:
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "danger"
      | "info"
      | "light"
      | "dark"
      | "link";
    className?: string;
  };

const ButtonUI: React.FC<ButtonUIModel> = ({
  children,
  icon = undefined,
  onClick = () => {},
  outline = false,
  size = undefined,
  type = "button",
  variant = "primary",
  className = "",
  ...rest
}) => {
  const buttonVariant = outline ? `outline-${variant}` : `${variant}`;


  return (
    <Button size={size} type={type} variant={buttonVariant} className={className} onClick={onClick} {...rest}>
      <span className="d-flex align-items-center">
        {icon} {" "}
        {children}
      </span>
    </Button>
  );
};

export default ButtonUI;