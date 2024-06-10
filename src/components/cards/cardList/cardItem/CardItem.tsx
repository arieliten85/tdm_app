import { ProductoProps } from "types/types";
import "../cardList.scss";
import { Link } from "react-router-dom";
export function CardItem(props: ProductoProps) {
  return (
    <Link to={`/producto/${props.id}`}>
      <div className="card">
        <div className="card__container__img">
          <img src={props.img} className="card__image" alt="Card" />
        </div>
        <div className="card__info">
          <div className="card__info__text">
            <h2 className="card__title">{props.title}</h2>
            <p className="card__price">{props.price}</p>
            <p className="card__description">
              {props.description.slice(0, 100)}
              <strong className="text-secondary">...Ver más</strong>
            </p>
          </div>
        </div>
        <button className="card__details">Ver más</button>
      </div>
    </Link>
  );
}
