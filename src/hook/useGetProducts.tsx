import { ApiProductoProps } from '../types/types';
import { apiQuickStock } from '../api/apiQuickStock';

import { apiAllproductosFinal } from '../api/productos/api-final/apiAllproductosFinal';

// TYPS
interface FilterRangePriceProps {
  numMin: string | number;
  numMax: string | number;
  dataArray: ApiProductoProps[];
}

//ARRAY PRODUCTS
const products: ApiProductoProps[] = apiAllproductosFinal.concat(apiQuickStock);

export const getProductByTitle = (title: string) => {
  const searchValueLowercase = title.toLowerCase();

  const searchResults = products.filter((product: ApiProductoProps) => {
    const titleLowercase = product.title.toLowerCase();

    if (titleLowercase.includes(searchValueLowercase)) {
      return true;
    }

    if (product.tags) {
      const tagsLowercase = product.tags.map(tag => tag.toLowerCase());
      if (tagsLowercase.some(tag => tag.includes(searchValueLowercase))) {
        return true;
      }
    }

    return false;
  });

  return searchResults;
};

export const getProductByRangePrice = ({
  numMin,
  numMax,
  dataArray,
}: FilterRangePriceProps): ApiProductoProps[] => {
  const minPrice = parseFloat(numMin as string);
  const maxPrice = parseFloat(numMax as string);

  if (isNaN(minPrice) || isNaN(maxPrice)) {
    console.error('Invalid price range values:', { numMin, numMax });
    return [];
  }

  const resultRange = dataArray.filter((producto: ApiProductoProps) => {
    const productPrice = parseFloat(producto.price.replace(/[^\d.-]/g, ''));
    return productPrice >= minPrice && productPrice <= maxPrice;
  });

  return resultRange;
};

export const getAllProducts = () => {
  const products = apiAllproductosFinal.concat(apiQuickStock);

  return products;
};

export const getProductByCategory = (categoria: string) => {
  const productosFiltrados = products.filter(product => product.category === categoria);

  return productosFiltrados;
};

export const getProductByAscending = (dataArray: ApiProductoProps[]) => {
  return dataArray.slice().sort((a, b) => (a.price > b.price ? 1 : -1));
};

export const getProductByDescending = (dataArray: ApiProductoProps[]) => {
  return dataArray.slice().sort((a, b) => (a.price < b.price ? 1 : -1));
};
