import "./cardList.scss";
import { useEffect, useState } from "react";

import { Productos, buyProductProps } from "../../../types/types";
import { Modal, Button } from "react-bootstrap";
import { Counter } from "../../../components/counter/Counter";
import { CardItem } from "./cardItem/CardItem";
import { useCounter } from "../../../components/hook/useCounter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { phoneNumber } from "../../../api/whatapp";
import { formatPrice } from "../../../components/utils/formatPrice ";
import { Filter } from "../../../components/filter/Filter";
export function CardList({ productos }: Productos) {
  const { count, increment, decrement, reset } = useCounter(0);
  const [total, setTotal] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] =
    useState<buyProductProps | null>(null);

  const handleCardClick = (producto: buyProductProps) => {
    setSelectedProduct(producto);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    reset();
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
    if (selectedProduct) {
      const newTotal = count * Number(selectedProduct.price.substring(1));
      setTotal(newTotal);
    }
  }, [count, selectedProduct]);

  return (
    <div className="productos-home">
      <Filter />
      <div className="wrapper">
        {productos.map((producto) => (
          <div key={producto.id} onClick={() => handleCardClick(producto)}>
            <CardItem
              id={producto.id}
              img={producto.img}
              title={producto.title}
              description={producto.description}
              price={producto.price}
            />
          </div>
        ))}

        {selectedProduct && (
          <ModalCards
            buyProduct={buyProduct}
            count={count}
            decrement={decrement}
            handleClose={handleClose}
            increment={increment}
            selectedProduct={selectedProduct}
            total={total}
          />
        )}
      </div>
    </div>
  );
}

interface ModalCardsProps {
  handleClose: () => void;
  selectedProduct: buyProductProps;
  count: number;
  increment: () => void;
  decrement: () => void;
  total: number;
  buyProduct: (product: buyProductProps, count: number, total: number) => void;
}

const ModalCards = ({
  handleClose,
  selectedProduct,
  count,
  increment,
  decrement,
  total,
  buyProduct,
}: ModalCardsProps) => {
  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedProduct.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-image-container">
          <img
            src={selectedProduct.img}
            alt={selectedProduct.title}
            className="modal-image"
          />
        </div>
        <div className="modal-body-container">
          <p className="desc">{selectedProduct.description}</p>
          <Counter count={count} increment={increment} decrement={decrement} />
        </div>
      </Modal.Body>
      <Modal.Footer className="text-center">
        <div className="info-price">
          <p className="total">Total: {formatPrice(total)}</p>
          <p className="price">
            {selectedProduct.price}
            <span style={{ fontSize: "10px" }}> c/u</span>
          </p>
        </div>
        <Button
          className="card__btn_whatsapp"
          onClick={() => buyProduct(selectedProduct, count, total)}
        >
          Comprar
          <FontAwesomeIcon icon={faWhatsapp} className="icon-whatsapp" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
