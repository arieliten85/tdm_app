import "./card_02.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export function Card_02() {
  return (
    <div className="wrapper">
      <Card
        img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_V38fYdTpZZZWBKm2zsmdl2TLhkSowMgietl9YwQg65Bz0p2ltsrousuxyvW6aGwTG8c&usqp=CAU"
        title="Cookies"
        description="¡Irresistible! Nuestra cookie, con chispas de chocolate, te invita a una experiencia de sabor única. ¡Ordénala ahora y déjate tentar!"
      />

      <Card
        img="https://vinomanos.com/wp-content/uploads/2019/11/brownie.jpg"
        title="Brownie Tentación"
        description="Una tentación irresistible! Nuestro brownie, con su textura densa y exquisito sabor a chocolate, te invita a disfrutar de un buen momento"
      />

      <Card
        img="https://media.airedesantafe.com.ar/p/c3bcc6e6562c6e77ac34966c5e42c51f/adjuntos/268/imagenes/002/698/0002698406/1200x675/smart/pastafrola.png"
        title="Pastafrola Artesanal"
        description="¡Clásica y deliciosa! Nuestra pastafrola combina una base crujiente con dulce de membrillo casero. ¡Ordénala ahora y disfruta de un sabor auténtico en cada bocado!"
      />
      <Card
        img="https://chocolateaguila.com/archivos/recetas/receta-262_budin-de-zanahorias.jpg"
        title="Budín de Zanahoria"
        description="Nuestro budín de zanahoria, con su suave textura y el toque cítrico del glaseado de limón, te invita a un festín de sabores caseros. Cada bocado es una explosión de sabor que te dejará deseando más. "
      />
    </div>
  );
}

function Card(props: { img: string; title: string; description: string }) {
  // Función para abrir el enlace de WhatsApp
  const openWhatsApp = () => {
    window.open("https://wa.me/541162331432", "_blank");
  };

  return (
    <div className="card">
      <div className="card__body">
        <img src={props.img} className="card__image" alt="Card" />
        <h2 className="card__title">{props.title}</h2>
        <p className="card__description">{props.description}</p>
      </div>
      <button className="card__btn" onClick={openWhatsApp}>
        <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: "24px" }} />{" "}
        Contactar por WhatsApp
      </button>
    </div>
  );
}
