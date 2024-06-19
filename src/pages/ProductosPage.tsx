// import React, { useEffect, useRef, useState } from 'react';
// import { NotFoundData, ShowSpinner, TitleCategory } from '../components/utililidades/Components';
// import { useProductsContext } from '../context/ProductProvider';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Breadcrumb } from '../components/breadcrumbs/Breadcrumbs';
// import ProductsList from '../components/ProductList/ProductList';
// import { ProductFilter } from '../components/filter/Filter';
// import { ApiProductoProps } from '../types/types';
// import {
//   getProductByAscending,
//   getProductByDescending,
//   getProductByRangePrice,
// } from '../hook/useGetProducts';
// import { useGetParamsLocation } from '../hook/useGetParamsLocation';

// export const ProductosPage = () => {
//   //HOOKS
//   const navigate = useNavigate();
//   const { categoria } = useParams();
//   const { products, errorMessage, status, setErrorMessage, setStatus } = useProductsContext();
//   const { sort_byParamas, minPriceParamas, maxPriceParamas, searchParams } = useGetParamsLocation();
//   //ESTADOS

//   const [isLoading, setIsLoading] = useState(true);
//   const [isFilterResults, setIsFilerResults] = useState(false);
//   const [productsFilterd, setProductsFilterd] = useState<ApiProductoProps[]>([]);

//   const productRef = useRef<ApiProductoProps[]>([]);

//   useEffect(() => {
//     //PRODUCT O CATEGORIA FILTER
//     setIsLoading(true);
//     const filteredProducts = categoria
//       ? products.filter(product => product.category === categoria)
//       : products;

//       // PRODUCTO DE REF PARA RESETEO
//     productRef.current = filteredProducts;

//     setTimeout(() => {
//       setIsLoading(false);
//       setProductsFilterd(filteredProducts);
//     }, 550);
//   }, [categoria, products]);

//   useEffect(() => {
//     if (searchParams.size > 0) {
//       setIsLoading(true);

//       //ORDER BY FILTER
//       if (sort_byParamas?.includes('descending')) {
//         const OrderByResultsDescending = getProductByDescending(productsFilterd);

//         setTimeout(() => {
//           setIsLoading(false);
//           setProductsFilterd(OrderByResultsDescending);
//         }, 550);
//       } else {
//         const OrderByResultsAscending = getProductByAscending(productsFilterd);

//         setTimeout(() => {
//           setIsLoading(false);
//           setProductsFilterd(OrderByResultsAscending);
//         }, 550);
//       }

//       //RANGE PRICE FILTER
//       if (minPriceParamas && maxPriceParamas) {
//         const resultRange = getProductByRangePrice({
//           numMin: minPriceParamas,
//           numMax: maxPriceParamas,
//           dataArray: productsFilterd,
//         });

//         if (!resultRange.length) {
//           setStatus('error');
//           setErrorMessage('No hay productos para este rango de precios');
//         } else {
//           setTimeout(() => {
//             setIsLoading(false);
//             setIsFilerResults(true);
//             setProductsFilterd(resultRange);
//           }, 550);
//         }
//       }
//     }

//     return () => {
//       setErrorMessage('');
//       setStatus('success');
//     };
//   }, [minPriceParamas, maxPriceParamas, setErrorMessage, setStatus, sort_byParamas]);

//   const clearFilters = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setProductsFilterd(productRef.current);
//       setIsFilerResults(false);
//       navigate(`/${categoria ? categoria : 'productos'}`);
//       setIsLoading(false);
//     }, 400);
//   };

//   if (isLoading) {
//     return <ShowSpinner />;
//   }

//   return (
//     <div className="productos-home">
//       <div className="w-100 d-flex flex-column justify-content-center align-items-center">
//         <TitleCategory title="Productos" />
//         <Breadcrumb />
//         <div className="productos-home">
//           {errorMessage && status === 'error' ? (
//             <NotFoundData />
//           ) : (
//             <>
//               <ProductFilter clearFilters={clearFilters} isFilterResults={isFilterResults} />
//               <ProductsList productos={productsFilterd} />
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

//--------- CONTEXTO

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
