import React, { useState, useEffect } from 'react';
import { ApiProductoProps } from '../../../../types/types';
import '../cardList.scss';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../../../../context/ProductProvider';
import { Spinner } from 'react-bootstrap';

export function CardItem(props: ApiProductoProps) {
  const noDataImage = 'https://www.testo.com/images/not-available.jpg';
  const { status } = useProductsContext();
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (props.image) {
      const imageElement = new Image();
      imageElement.src = props.image;
      imageElement.onload = () => setImageLoading(false);
      imageElement.onerror = () => setImageLoading(false);
    }
  }, [props.image]);

  return (
    <Link to={`/productos/${props.title}`}>
      <div className="card">
        <div className="card__container__img border">
          {imageLoading ? (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <img
              src={props.image || noDataImage} // fallback to noDataImage if props.image is undefined
              className="card__image"
              alt="Card"
            />
          )}
          {/* Mostrar una imagen alternativa en caso de error y status === 'error' */}
          {status === 'error' && !imageLoading && (
            <img src={noDataImage} className="card__image" alt="Card" />
          )}
        </div>
        <div className="card__info">
          <div className="card__info__text">
            <h2 className="card__title">{props.title}</h2>
            <p className="card__price">{props.price}</p>
            <p className="card__description">
              {props.description.slice(0, 100)}
              <strong className="text-secondary">...Ver más</strong>
            </p>
          </div>
        </div>
        <button className="card__details">Ver más</button>
      </div>
    </Link>
  );
}
