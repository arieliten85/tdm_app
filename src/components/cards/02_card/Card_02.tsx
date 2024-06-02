import "./card_02.scss";

import { useState } from "react";

import productos from "../../../api/products.json";
import { Link } from "react-router-dom";

export function Card_02() {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  const increment = (title: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [title]: (prevCounts[title] || 0) + 1,
    }));
  };

  const decrement = (title: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [title]: prevCounts[title] > 0 ? prevCounts[title] - 1 : 0,
    }));
  };

  return (
    <div className="wrapper">
      {productos.map((producto) => {
        return (
          <Card
            key={producto.id}
            id={producto.id}
            img={producto.img}
            title={producto.title}
            description={producto.description}
            price={producto.price}
            count={counts[producto.title] || 0}
            increment={() => increment(producto.title)}
            decrement={() => decrement(producto.title)}
          />
        );
      })}
    </div>
  );
}

interface ProductoProps {
  id: string;
  img: string;
  title: string;
  description: string;
  price: string;
  count: number;
  increment: () => void;
  decrement: () => void;
}

function Card(props: ProductoProps) {
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
              <strong className="text-seconday">...Ver más</strong>
            </p>
          </div>
        </div>

        <button className=" card__details">Ver más</button>
      </div>
    </Link>
  );
}
