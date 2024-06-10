import "./filter.scss";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useFilterProduct } from "../../components/hook/useFilterProduct";

export const Filter = () => {
  const navigate = useNavigate();

  // CAPTURO LOS PARAMETRO DE BUSQUEDA
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isMinPriceParams = searchParams.get("min_price");
  const isMaxPriceParams = searchParams.get("max_price");
  //CONTEXTO
  const { clearFilters } = useFilterProduct();

  //ESTADOS
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setMinPrice("");
    setMaxPrice("");
    setShow(true);
  };

  //FUNCIONES
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

  //ESTADOS
  useEffect(() => {
    if (isMinPriceParams && isMaxPriceParams) {
      setMinPrice(isMinPriceParams);
      setMaxPrice(isMaxPriceParams);
    }
  }, [isMinPriceParams, isMaxPriceParams]);

  return (
    <div className="d-flex  gap-2 justify-content-center align-items-start">
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
          <p className="fs-5 fw-normal">Filtrar por:</p>
        </Modal.Header>
        <Modal.Body className="p-2">
          <ProductFilterByCategory />
          <p className="fs-5 fw-normal">Precio</p>
          <Form className="d-flex gap-2 align-items-center mt-3 ">
            <Form.Group controlId="formMinPrice">
              <p className="pb-1">Desde</p>
              <Form.Control
                className="p-1 px-2"
                type="tel"
                placeholder="min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMaxPrice">
              <p className="pb-1">Hasta</p>
              <Form.Control
                className="p-1 px-2"
                type="tel"
                placeholder="max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="mt-3 button " onClick={handleFilter}>
            APLICAR
          </Button>
          {/* <Button className="mt-3 button" onClick={handleCleanFilter}>
            limpiar filtros
          </Button> */}
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

export const ProductFilterByCategory = () => {
  return (
    <>
      <ul className="list-group">
        <Link to={"/tematicas"}>
          <li className="list-group-item bg-secondary text-white">
            Tortas tematicas
          </li>
        </Link>
        <Link to={"/Budines"}>
          <li className="list-group-item bg-secondary text-white ">Budines</li>
        </Link>
        <Link to={"/Tartas"}>
          <li className="list-group-item bg-secondary text-white">Tartas</li>
        </Link>
        <Link to={"/Bombones"}>
          <li className="list-group-item bg-secondary text-white ">Bombones</li>
        </Link>
      </ul>
    </>
  );
};