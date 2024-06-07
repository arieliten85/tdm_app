import "./filter.scss";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useProductsContext } from "../../context/ProductProvider";

export const Filter = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const isMinPriceParams = searchParams.get("min_price");
  const isMaxPriceParams = searchParams.get("max_price");

  const { clearFilters } = useProductsContext();
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

  const handleCleanFilter = () => {
    clearFilters();
    setMinPrice("");
    setMaxPrice("");
  };
  const handleFilter = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (!isNaN(min) && !isNaN(max)) {
      navigate(`/productos/?min_price=${min}&max_price=${max}`);
    }
    handleClose();
  };

  useEffect(() => {
    if (isMinPriceParams && isMaxPriceParams) {
      setMinPrice(isMinPriceParams);
      setMaxPrice(isMaxPriceParams);
    }
  }, [isMinPriceParams, isMaxPriceParams]);

  return (
    <div className="d-flex  gap-2 justify-content-center align-items-center">
      <div className="filter " onClick={handleShow}>
        <p className=" ">Filtrar</p>
        <FaFilter className="icon" />
      </div>

      <ShowFilterValue
        clearFilters={clearFilters}
        isMaxPriceParams={isMaxPriceParams}
        isMinPriceParams={isMinPriceParams}
      />

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
          <div className="w-100 border d-flex justify-content-between">
            <Button className="mt-3 button" onClick={handleFilter}>
              Filtrar
            </Button>
            <Button className="mt-3 button-clean" onClick={handleCleanFilter}>
              limpiar filtros
            </Button>
          </div>
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
          <Button className="mt-3 button" onClick={handleFilter}>
            Filtrar
          </Button>
          <Button className="mt-3 button" onClick={handleCleanFilter}>
            limpiar filtros
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
interface ShowFilterValueProps {
  isMinPriceParams: string | null;
  isMaxPriceParams: string | null;
  clearFilters: () => void;
}

const ShowFilterValue = ({
  isMinPriceParams,
  isMaxPriceParams,
  clearFilters,
}: ShowFilterValueProps) => {
  return (
    <>
      {isMinPriceParams && isMaxPriceParams ? (
        <div className="data-filter">
          <p>
            min: <span>{isMinPriceParams}</span>
          </p>
          -
          <p>
            max <span>{isMaxPriceParams}</span>
          </p>
          <button className="button" onClick={clearFilters}>
            x
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
