import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import './detailsContainer.scss';
import { ApiProductoProps, buyProductProps } from '../../../types/types';
import { FaEye, FaTimes } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Button } from 'react-bootstrap';
import { faCreditCard, faInfo } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from '../../../components/utils/formatPrice ';
import { phoneNumber } from '../../../api/whatapp';

import { Counter } from '../../../components/counter/Counter';
import { Breadcrumb } from '../../../components/breadcrumbs/Breadcrumbs';
import { useCounter } from '../../../hook/useCounter';
import { useProductsContext } from '../../../context/ProductProvider';

export const DetailsContainer = () => {
  const { count, increment, decrement } = useCounter(0);
  const [total, setTotal] = useState<number>(0);
  const { title } = useParams();
  const [producto, setProducto] = useState<ApiProductoProps>({
    id: '',
    title: '',
    price: '',
    description: '',
    image: '',
  });

  const [showFullImage, setShowFullImage] = useState(false);

  const { products: allProducts } = useProductsContext();

  useEffect(() => {
    if (allProducts && title) {
      allProducts.map(prod => {
        if (prod.title === title) {
          setProducto(prod);
        }
      });
    }
  }, [title, allProducts]);

  const handleIconClick = () => {
    setShowFullImage(!showFullImage);
  };

  const buyProduct = (product: buyProductProps, count: number, total: number) => {
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

    window.open(`https://wa.me/${phoneNumber}?text=${formattedMessage}`, '_blank');
  };

  useEffect(() => {
    if (producto) {
      const newTotal = count * Number(producto.price.substring(1));
      setTotal(newTotal);
    }
  }, [count, producto]);

  return (
    <div className="flex-center-column pt-3">
      <Breadcrumb />
      <div className="card-detail">
        <div className="container-image" onClick={handleIconClick}>
          <img src={producto.image} className={showFullImage ? 'full-image' : ''} />
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
                {'  '} Forma de pago
              </p>
            </div>

            <p className="border p-2 my-2">Traferencia por mecado pago</p>
          </div>
          <div className="container-local my-2">
            <div>
              <p className="seccion">
                <FontAwesomeIcon
                  style={{
                    backgroundColor: 'black',
                    borderRadius: '20px',
                    width: '10px',
                    height: '10px',
                    fontSize: '49px',
                  }}
                  className="   p-2 text-white"
                  icon={faInfo}
                />
                {'  '} Info
              </p>
            </div>

            <p
              className="border p-2 my-2 text-uppercase text-secondary"
              style={{
                backgroundColor: '#80808040',
              }}
            >
              Por favor, siempre consulte la disponibilidad de stock. Para los productos especiales,
              se requiere realizar el pedido con al menos 5 días de anticipación.
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
            <img src={producto.image} className="modal-image" />
          </div>
        )}
      </div>
    </div>
  );
};
