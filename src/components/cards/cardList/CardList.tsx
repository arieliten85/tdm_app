import "./cardList.scss";
import { ApiProductoProps } from "../../../types/types";
import { CardItem } from "./cardItem/CardItem";

interface ApiProductos {
  productos: ApiProductoProps[];
}

export function CardList({ productos }: ApiProductos) {
  return (
    <>
      <div className="wrapper">
        {productos.map((producto) => (
          <div key={producto.id}>
            <CardItem
              id={producto.id}
              image={producto.image}
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
