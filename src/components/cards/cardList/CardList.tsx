import "./cardList.scss";
import { useEffect, useState } from "react";
import productos from "../../../api/products.json";
import { ProductoProps } from "types/types";
import { Modal, Button } from "react-bootstrap";
import { Counter } from "../../../components/counter/Counter";
import { CardItem } from "./cardItem/CardItem";
import { useCounter } from "../../../components/hook/useCounter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { formatPrice } from "../../../components/utils/formatPrice ";

export function CardList() {
  const { count, increment, decrement, reset } = useCounter(0);
  const [total, setTotal] = useState<number>(0);

  const [selectedProduct, setSelectedProduct] = useState<ProductoProps | null>(
    null
  );

  const handleCardClick = (producto: ProductoProps) => {
    setSelectedProduct(producto);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    reset();
  };

  useEffect(() => {
    if (selectedProduct) {
      const newTotal = count * Number(selectedProduct.price.substring(1));
      setTotal(newTotal);
    }
  }, [count, selectedProduct]);

  return (
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

            <p className="desc">{selectedProduct.description}</p>

            <Counter
              count={count}
              increment={increment}
              decrement={decrement}
            />
          </Modal.Body>
          <Modal.Footer className="text-center">
            <div className="info-price">
              <p className="price">
                Precio: {selectedProduct.price}
                <span style={{ fontSize: "10px" }}> c/u</span>
              </p>
              <p className="total">Total: {formatPrice(total)}</p>
            </div>

            <Button className="card__btn_whatsapp">
              Comprar
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="icon-whatsapp"
              />{" "}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}