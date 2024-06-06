import "./filter.scss";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

export const Filter = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setMinPrice("");
    setMaxPrice("");
    setShow(true);
  };

  const handleFilter = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (!isNaN(min) && !isNaN(max)) {
      navigate(`/productos/?min_price=${min}&max_price=${max}`);
    }
  };

  return (
    <>
      <div className="filter" onClick={handleShow}>
        <p className=" ">Filtrar</p>

        <FaFilter className="icon" />
      </div>

      <div className="filter-form border p-3">
        <h4>Filtrar por:</h4>
        <Form>
          <Form.Group controlId="formMinPrice">
            <Form.Label>Precio mínimo</Form.Label>
            <Form.Control
              type="number"
              placeholder="min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formMaxPrice">
            <Form.Label>Precio máximo</Form.Label>
            <Form.Control
              type="number"
              placeholder="max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Form.Group>

          <Button className="mt-3 button" onClick={handleFilter}>
            Filtrar
          </Button>
        </Form>
      </div>

      <Modal show={show} onHide={handleClose} className="modal-filter">
        <Modal.Header closeButton>
          <Modal.Title>Filtrar por:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="p-2">
            <Form.Group controlId="formMinPrice">
              <Form.Label>Precio mínimo</Form.Label>
              <Form.Control
                type="tel"
                placeholder="min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMaxPrice">
              <Form.Label>Precio máximo</Form.Label>
              <Form.Control
                type="tel"
                placeholder="max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button" onClick={handleFilter}>
            Filtrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
