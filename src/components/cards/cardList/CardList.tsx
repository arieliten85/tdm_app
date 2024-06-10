import "./cardList.scss";
import { Productos } from "../../../types/types";
import { CardItem } from "./cardItem/CardItem";

export function CardList({ productos }: Productos) {
  return (
    <>
      <div className="wrapper">
        {productos.map((producto) => (
          <div key={producto.id}>
            <CardItem
              id={producto.id}
              img={producto.img}
              title={producto.title}
              description={producto.description}
              price={producto.price}
            />
          </div>
        ))}
      </div>
    </>
  );
}
