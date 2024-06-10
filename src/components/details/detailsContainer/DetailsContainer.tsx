import { useEffect, useState } from "react";
import { useProductsContext } from "../../../context/ProductProvider";
import { useParams } from "react-router-dom";
import "./detailsContainer.scss";
import { ProductoProps, buyProductProps } from "../../../types/types";
import { FaEye, FaTimes } from "react-icons/fa"; // Importa los íconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Button } from "react-bootstrap";
import { faCreditCard, faStore } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "../../../components/utils/formatPrice ";
import { phoneNumber } from "../../../api/whatapp";
import { useCounter } from "../../../components/hook/useCounter";
import { Counter } from "../../../components/counter/Counter";

export const DetailsContainer = () => {
  const { count, increment, decrement } = useCounter(0);
  const [total, setTotal] = useState<number>(0);
  const { id } = useParams();
  const [producto, setProducto] = useState<ProductoProps>({
    id: "",
    title: "",
    price: "",
    description: "",
    img: "",
  });

  const [showFullImage, setShowFullImage] = useState(false);

  const { products: allProducts } = useProductsContext();

  useEffect(() => {
    if (allProducts) {
      allProducts.map((prod) => {
        if (prod.id === id) {
          setProducto(prod);
        }
      });
    }
  }, [id, allProducts]);

  const handleIconClick = () => {
    setShowFullImage(!showFullImage);
  };

  const buyProduct = (
    product: buyProductProps,
    count: number,
    total: number
  ) => {
    const message = `¡Hola!

 Me gustaría encargarte el siguiente producto:
---------------------------------------
 *Producto*: ${product.title}
 *Precio*: ${product.price} c/u
 *Cantidad*: ${count}
 *Total*: ${formatPrice(total)}
---------------------------------------

Por favor, ¿podrías confirmarme si hay stock?
¡Gracias!
    `;

    const formattedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/${phoneNumber}?text=${formattedMessage}`,
      "_blank"
    );
  };

  useEffect(() => {
    if (producto) {
      const newTotal = count * Number(producto.price.substring(1));
      setTotal(newTotal);
    }
  }, [count, producto]);

  console.log(total);

  return (
    <div className="card-detail">
      <div className="container-image" onClick={handleIconClick}>
        <img src={producto.img} className={showFullImage ? "full-image" : ""} />
        <FaEye className="eye-icon" />
      </div>
      <div className="container-info">
        <h2>{producto.title}</h2>

        <p className="price my-2">{producto.price}</p>
        <p className="mb-3">{producto.description}</p>

        <Counter count={count} increment={increment} decrement={decrement} />
        <div className="my-4">
          <Button
            className="card__btn_whatsapp"
            onClick={() => buyProduct(producto, count, total)}
          >
            Comprar
            <FontAwesomeIcon icon={faWhatsapp} className="icon-whatsapp" />
          </Button>
        </div>

        <div className="container-pago my-2">
          <div>
            <p className="seccion">
              <FontAwesomeIcon className="fs-5" icon={faCreditCard} />
              {"  "} Forma de pago
            </p>
          </div>

          <p className="border p-2 my-2">Traferencia por mecado pago</p>
        </div>
        <div className="container-local my-2">
          <div>
            <p className="seccion">
              <FontAwesomeIcon className="fs-5" icon={faStore} />
              {"  "} Nuestro local
            </p>
          </div>

          <p className="border p-2 my-2">
            TODO DULCE MARY: Rio de janeiro 2678, Lanús Oeste, POR FAVOR SIEMPRE
            CONSULTAR LA DISPONIBILIDAD DE STOCK. En el local manejamos un stock
            limitado.
          </p>
        </div>

        <div className="container-compartir my-2">
          <div>
            <p className="seccion"> COMPARTIR</p>
            <FontAwesomeIcon icon={faFacebook} className="icon-whatsapp m-1" />
            <FontAwesomeIcon icon={faInstagram} className="icon-whatsapp m-1" />
            <FontAwesomeIcon icon={faWhatsapp} className="icon-whatsapp m-1" />
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showFullImage && (
        <div className="modal" onClick={handleIconClick}>
          <FaTimes className="close-icon" onClick={handleIconClick} />
          <img src={producto.img} className="modal-image" />
        </div>
      )}
    </div>
  );
};

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
// import { Button } from "react-bootstrap";
// import { useProductsContext } from '../../../context/ProductProvider';

// interface ProductoProps {
//   id: string;
//   img: string;
//   title: string;
//   description: string;
//   price: string;
//   count?: number;
// }

// export function DetailsContainer() {
//   const { products } = useProductsContext();
//   const params = useParams();
//   const [product, setProduct] = useState<ProductoProps | null>(null);
//   const [counts, setCounts] = useState<{ [key: string]: number }>({});

//   useEffect(() => {
//     const findProductById = products.find(
//       (producto) => producto.id === params.id
//     );
//     setProduct(findProductById || null);
//   }, [params.id]);

//   const increment = (title: string) => {
//     setCounts((prevCounts) => ({
//       ...prevCounts,
//       [title]: (prevCounts[title] || 0) + 1,
//     }));
//   };

//   const decrement = (title: string) => {
//     setCounts((prevCounts) => ({
//       ...prevCounts,
//       [title]: prevCounts[title] > 0 ? prevCounts[title] - 1 : 0,
//     }));
//   };

//   if (!product) {
//     return <div>Producto no encontrado</div>;
//   }

//   return (
//     <div
//       style={{
//         width: "100%",
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <div style={{ width: "50%", margin: "0 auto" }}>
//         <Card
//           key={product.id}
//           img={product.img}
//           title={product.title}
//           description={product.description}
//           price={product.price}
//           count={counts[product.title] || 0}
//           increment={() => increment(product.title)}
//           decrement={() => decrement(product.title)}
//         />
//       </div>
//     </div>
//   );
// }

// interface CardProps {
//   img: string;
//   title: string;
//   description: string;
//   price: string;
//   count: number;
//   increment: () => void;
//   decrement: () => void;
// }

// export function Card(props: CardProps) {
//   const openWhatsApp = (props: CardProps) => {
//     const phoneNumber = "541162331432";
//     const message = `¡Hola Mary! 🌟

// 🛒 Me gustaría encargarte el siguiente producto:
// ---------------------------------------
//    📦 *Producto*: ${props.title}
//    💰 *Precio*: ${props.price}
//    🛍️ *Cantidad*: ${props.count}
// ---------------------------------------

// Por favor, ¿podrías confirmarme si hay disponibilidad de stock? 🤔
// ¡Gracias! 🙏
// `;

//     const formattedMessage = encodeURIComponent(message);

//     window.open(
//       `https://wa.me/${phoneNumber}?text=${formattedMessage}`,
//       "_blank"
//     );
//   };

//   const shareProduct = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: props.title,
//           text: `¡Mira este producto! ${props.title} por solo ${props.price}.`,
//           url: window.location.href,
//         });
//       } catch (error) {
//         console.error("Error sharing:", error);
//       }
//     } else {
//       alert("Tu navegador no soporta la API de compartir.");
//     }
//   };

//   return (
//     <div className="card">
//       <div className="card__info">
//         <img src={props.img} className="card__image" alt="Card" />
//         <h2 className="card__title">{props.title}</h2>
//         <p className="card__price">{props.price}</p>
//         <p className="card__description">
//           {props.description.slice(0, 100)}
//           <strong className="text-secondary">...Ver más</strong>
//         </p>
//       </div>
//       <Counter
//         count={props.count}
//         increment={props.increment}
//         decrement={props.decrement}
//       />
//       <button
//         className="card__btn_whatsapp"
//         onClick={() => openWhatsApp(props)}
//       >
//         <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: "24px" }} /> Haz
//         tu pedido ya!
//       </button>

//       <button className="text-center card__btn_share" onClick={shareProduct}>
//         Compartir en WhatsApp
//       </button>
//     </div>
//   );
// }

// interface CounterProps {
//   count: number;
//   increment: () => void;
//   decrement: () => void;
// }

// const Counter = ({ count, increment, decrement }: CounterProps) => {
//   return (
//     <div className="counter-container">
//       <Button
//         variant="outline-primary"
//         className="counter-btn"
//         onClick={decrement}
//       >
//         -
//       </Button>
//       <span className="counter-value">{count}</span>
//       <Button
//         variant="outline-primary"
//         className="counter-btn"
//         onClick={increment}
//       >
//         +
//       </Button>
//     </div>
//   );
// };
