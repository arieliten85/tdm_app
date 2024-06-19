import './filter.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import { apiRootNavLink } from '../../api/apiRootNavLink';
import { useGetParamsLocation } from '../../hook/useGetParamsLocation';

interface ProductFilterProps {
  clearFilters: () => void;
  isFilterResults: boolean;
  setIsFilerResults: Dispatch<SetStateAction<boolean>>;
}

export const ProductFilter = ({
  clearFilters,
  isFilterResults: activeFilter,
  setIsFilerResults,
}: ProductFilterProps) => {
  //HOOK
  const navigate = useNavigate();

  const { minPriceParamas, maxPriceParamas, sort_byParamas, location } = useGetParamsLocation();

  // ESTADOS
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setMinPrice('');
    setMaxPrice('');
    setShow(true);
  };

  const handlerclearFilters = () => {
    clearFilters();
  };

  const handleFilter = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    // Validación de rangos
    if (!isNaN(min) && !isNaN(max)) {
      const currentSearchParams = new URLSearchParams(location.search);

      // Eliminar parámetros anteriores si existen
      currentSearchParams.delete('min_price');
      currentSearchParams.delete('max_price');

      // Agregar nuevos parámetros
      currentSearchParams.set('min_price', min.toString());
      currentSearchParams.set('max_price', max.toString());

      const newSearch = currentSearchParams.toString();
      navigate(`${location.pathname}?${newSearch}`);
    }

    handleClose();
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const valueSelect = event.target.value;
    let newSortParam = '';

    if (valueSelect === '2') {
      newSortParam = 'price-descending';
    } else if (valueSelect === '3') {
      newSortParam = 'price-ascending';
    }

    // Obtener los parámetros actuales de la URL
    const currentSearchParams = new URLSearchParams(location.search);

    // Modificar el parámetro 'sort_by'
    currentSearchParams.set('sort_by', newSortParam);

    // // Reconstruir la nueva URL manteniendo el resto de parámetros
    const newSearch = currentSearchParams.toString();

    // // Navegar a la nueva URL
    navigate(`${location.pathname}?${newSearch}`);

    // Cerrar el menú o realizar otras acciones necesarias
    handleClose();
  };

  // FIJO VALOR SELECCIONADO EN EL SELECT
  useEffect(() => {
    if (sort_byParamas?.includes('descending')) {
      setSelectedOption('2');
    } else if (sort_byParamas?.includes('ascending')) {
      setSelectedOption('3');
    } else {
      setSelectedOption('');
    }
  }, [sort_byParamas]);

  useEffect(() => {
    if (!minPriceParamas && !maxPriceParamas) {
      setIsFilerResults(false);
    }
  }, [minPriceParamas, maxPriceParamas, navigate, setIsFilerResults]);

  return (
    <>
      <div className=" w-100  select-order-container   d-flex  justify-content-between align-items-center">
        <div className=" w-100 select-order p-2 d-flex  justify-content-between align-items-end">
          <div className=" d-flex flex-column gap-2  ">
            <p>Ordenar por:</p>
            <Form.Select
              aria-label="Default select example select"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="">Más Vendidos</option>
              <option value="2">Precio: Mayor a Menor</option>
              <option value="3">Precio: Menor a Mayor</option>
            </Form.Select>
          </div>

          {activeFilter && (
            <div className="data-filter-container-mobile ">
              <ShowFilterValue
                clearFilters={handlerclearFilters}
                minPriceParamas={minPriceParamas}
                maxPriceParamas={maxPriceParamas}
              />
            </div>
          )}

          {!activeFilter && (
            <div className=" d-flex justify-content-between align-items-end ">
              <div className="filter" onClick={handleShow}>
                <p className=" ">Filtrar</p>
                <FaFilter className="icon" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="filter-form border p-3">
        <h4>Filtrar por:</h4>

        <div className=" d-flex flex-column gap-2 pb-2">
          <p>Ordenar por:</p>
          <Form.Select
            aria-label="Default select example select"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="1">Más Vendidos</option>
            <option value="2">Precio: Mayor a Menor</option>
            <option value="3">Precio: Menor a Mayor</option>
          </Form.Select>
        </div>

        {activeFilter && (
          <div className="data-filter-container">
            <div className="w-50">
              <ShowFilterValue
                clearFilters={handlerclearFilters}
                minPriceParamas={minPriceParamas}
                maxPriceParamas={maxPriceParamas}
              />
            </div>
          </div>
        )}

        <Form>
          <Form.Group controlId="formMinPrice">
            <Form.Label>Precio mínimo</Form.Label>
            <Form.Control
              type="number"
              placeholder="min"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formMaxPrice">
            <Form.Label>Precio máximo</Form.Label>
            <Form.Control
              type="number"
              placeholder="max"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            />
          </Form.Group>
          <div className="w-100 d-flex justify-content-between">
            <Button className="mt-3 button" onClick={handleFilter}>
              Filtrar
            </Button>
          </div>
        </Form>
      </div>

      <Modal show={show} onHide={handleClose} className="modal-filter">
        <Modal.Header closeButton>
          <p className="fs-5 fw-normal">Filtrar por:</p>
        </Modal.Header>
        <Modal.Body className="p-5">
          <ProductFilterByCategory handleClose={handleClose} />
          <p className="fs-5 fw-normal">Precio</p>
          <Form className="d-flex gap-2 align-items-center mt-3 ">
            <Form.Group controlId="formMinPrice">
              <p className="pb-1">Desde</p>
              <Form.Control
                className="p-1 px-2"
                type="tel"
                placeholder="min"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMaxPrice">
              <p className="pb-1">Hasta</p>
              <Form.Control
                className="p-1 px-2"
                type="tel"
                placeholder="max"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="mt-3 button" onClick={handleFilter}>
            APLICAR
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

interface ShowFilterValueProps {
  minPriceParamas: string | null;
  maxPriceParamas: string | null;
  clearFilters: () => void;
}

const ShowFilterValue = ({
  minPriceParamas,
  maxPriceParamas,

  clearFilters,
}: ShowFilterValueProps) => {
  return (
    <>
      <>
        <p className="text-dark pb-2   fw-normal" style={{}}>
          Filtros Aplicados:
        </p>
        <div className="data-filter text-center">
          <span>${minPriceParamas}</span> - <span>${maxPriceParamas}</span>
          <FontAwesomeIcon icon={faClose} className="icon-close" onClick={clearFilters} />
        </div>
      </>
    </>
  );
};
interface ProductFilterByCategoryProps {
  handleClose: () => void;
}
export const ProductFilterByCategory = ({ handleClose }: ProductFilterByCategoryProps) => {
  return (
    <nav>
      <p className="fs-5 fw-normal pb-2">Categorías</p>
      <ul className="list-unstyled pills-container">
        {apiRootNavLink[1].subRoutes?.map(cat => (
          <Link to={`${cat.path}`} onClick={handleClose} key={cat.path}>
            <li className="list-group-item bg-secondary text-white">{cat.label}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
