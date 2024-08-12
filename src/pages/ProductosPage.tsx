import { useEffect, useRef } from 'react';
import { NotFoundData, ShowSpinner, TitleCategory } from '../components/utililidades/Components';
import { useProductsContext } from '../context/ProductProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb } from '../components/breadcrumbs/Breadcrumbs';
import ProductsList from '../components/ProductList/ProductList';
import { ProductFilter } from '../components/filter/Filter';
import { ApiProductoProps } from '../types/types';
import { getProductByCategory } from '../hook/useGetProducts';

import { useFilterProductContext } from '../context/FilterProductsProvider';

export const ProductosPage = () => {
  //HOOKS
  const navigate = useNavigate();
  const { categoria } = useParams();
  const { errorMessage, status, products } = useProductsContext();

  const {
    isLoading,
    setProductsFilterd,
    productsFilterd,
    isFilterResults,
    setIsLoading,
    setIsFilerResults,
  } = useFilterProductContext();
  //ESTADOS

  const productRef = useRef<ApiProductoProps[]>([]);

  useEffect(() => {
    //PRODUCT O CATEGORIA FILTER
    setIsLoading(true);
    const filteredProducts = categoria ? getProductByCategory(categoria) : products;
    // PRODUCTO DE REF PARA RESETEO
    productRef.current = filteredProducts;

    setIsLoading(false);
    setProductsFilterd(filteredProducts);

    return () => {
      // Limpiar filtros al desmontar el componente
      setIsFilerResults(false);
    };
  }, [categoria, products, setIsLoading, setProductsFilterd]);

  // LIMPIAR FILTROS
  const clearFilters = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsFilerResults(false);
      setProductsFilterd(productRef.current);
      navigate(`/${categoria ? categoria : 'productos'}`);
    }, 500);
  };

  if (isLoading) {
    return <ShowSpinner />;
  }

  return (
    <div className="productos-home">
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        <TitleCategory title="Productos" />
        <Breadcrumb />
        <div className="productos-home">
          {errorMessage && status === 'error' ? (
            <NotFoundData />
          ) : (
            <>
              <ProductFilter
                clearFilters={clearFilters}
                isFilterResults={isFilterResults}
                setIsFilerResults={setIsFilerResults}
              />
              <ProductsList productos={productsFilterd} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
