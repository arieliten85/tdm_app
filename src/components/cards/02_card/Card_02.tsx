import "./card_02.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { Button } from "react-bootstrap";
export function Card_02() {
  return (
    <div className="wrapper">
      <Card
        img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_V38fYdTpZZZWBKm2zsmdl2TLhkSowMgietl9YwQg65Bz0p2ltsrousuxyvW6aGwTG8c&usqp=CAU"
        title="Cookies"
        description="¡Irresistible! Nuestra cookie, con chispas de chocolate, te invita a una experiencia de sabor única. ¡Ordénala ahora y déjate tentar!"
        price="$2.50"
      />

      <Card
        img="https://vinomanos.com/wp-content/uploads/2019/11/brownie.jpg"
        title="Brownie Tentación"
        description="Una tentación irresistible! Nuestro brownie, con su textura densa y exquisito sabor a chocolate, te invita a disfrutar de un buen momento"
        price="$3.00"
      />

      <Card
        img="https://media.airedesantafe.com.ar/p/c3bcc6e6562c6e77ac34966c5e42c51f/adjuntos/268/imagenes/002/698/0002698406/1200x675/smart/pastafrola.png"
        title="Pastafrola Artesanal"
        description="¡Clásica y deliciosa! Nuestra pastafrola combina una base crujiente con dulce de membrillo casero. ¡Ordénala ahora y disfruta de un sabor auténtico en cada bocado!"
        price="$4.50"
      />
      <Card
        img="https://chocolateaguila.com/archivos/recetas/receta-262_budin-de-zanahorias.jpg"
        title="Budín de Zanahoria"
        description="Nuestro budín de zanahoria, con su suave textura y el toque cítrico del glaseado de limón, te invita a un festín de sabores caseros. Cada bocado es una explosión de sabor que te dejará deseando más. "
        price="$3.50"
      />
    </div>
  );
}

interface ProductoProps {
  img: string;
  title: string;
  description: string;
  price: string; // Nueva propiedad para el precio
}

function Card(props: ProductoProps) {
  const openWhatsApp = (props: ProductoProps) => {
    const phoneNumber = "541162331432";
    const message = `¡Hola! Estoy interesado en el producto:.
  -----------------------
   *Titulo*: ${props.title}
   *imagen*: ${props.img}
   *Precio*: ${props.price}
  -----------------------
  ¿Podrías brindarme más información?`;
    const formattedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/${phoneNumber}?text=${formattedMessage}`,
      "_blank"
    );
  };

  return (
    <div className="card">
      <div className="card__info">
        <img src={props.img} className="card__image" alt="Card" />
        <h2 className="card__title">{props.title}</h2>
        <p className="card__price">{props.price}</p>
        <p className="card__description">
          {props.description.slice(0, 100)}
          <strong className="text-seconday">...Ver más</strong>
        </p>
      </div>
      <Counter />
      <button
        className="card__btn_whatsapp"
        onClick={() => openWhatsApp(props)}
      >
        <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: "24px" }} /> Haz
        tu pedido ya!
      </button>
    </div>
  );
}

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="counter-container">
      <Button
        variant="outline-primary"
        className="counter-btn"
        onClick={decrement}
      >
        -
      </Button>
      <span className="counter-value">{count}</span>
      <Button
        variant="outline-primary"
        className="counter-btn"
        onClick={increment}
      >
        +
      </Button>
    </div>
  );
};
