import { Card as BSCard } from "react-bootstrap";

type CardModel = {
  className?: string;
};

const Card: React.FC<CardModel> = ({
  children,
  className = "",
}) => {
  let classname = `${className} bg-white white-shadow rounded `;

  return <BSCard className={classname}>{children}</BSCard>;
};

export default Card;
