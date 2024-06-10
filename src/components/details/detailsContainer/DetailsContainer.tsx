// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
// import { Button } from "react-bootstrap";
// import { useProductsContext } from "../../../context/ProductProvider";

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
