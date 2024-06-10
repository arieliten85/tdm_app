import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./counter.scss";
import { CounterProps } from "types/types";

export const Counter = ({ count, increment, decrement }: CounterProps) => {
  return (
    <div className="counter-container">
      <div className="counter-title fs-5">Cantidad</div>
      <Button className="counter-btn" onClick={decrement}>
        <FontAwesomeIcon icon={faChevronDown} />
      </Button>
      <span className="counter-value">{count}</span>
      <Button className="counter-btn" onClick={increment}>
        <FontAwesomeIcon icon={faChevronUp} />
      </Button>
    </div>
  );
};
