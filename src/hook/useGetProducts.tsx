import { ApiProductoProps } from "../types/types";
import { apiQuickStock } from "../api/apiQuickStock";

import { apiAllproductosFinal } from "../api/productos/api-final/apiAllproductosFinal";

// TYPS
interface FilterRangePriceProps {
  numMin: string | number;
  numMax: string | number;
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
      const tagsLowercase = product.tags.map((tag) => tag.toLowerCase());
      if (tagsLowercase.some((tag) => tag.includes(searchValueLowercase))) {
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
}: FilterRangePriceProps) => {
  const minPrice = Number(numMin);
  const maxPrice = Number(numMax);

  const rangePriceResults = products.filter((producto: ApiProductoProps) => {
    const productPrice = parseFloat(producto.price.substring(1));
    return productPrice >= minPrice && productPrice <= maxPrice;
  });

  return rangePriceResults;
};

export const getAllProducts = () => {
  const products = apiAllproductosFinal.concat(apiQuickStock);

  return products;
};

export const getProductByCategory = (categoryName: string) => {
  const ccategoryNameLowercase = categoryName.toLowerCase();

  const productosFiltrados = products.filter(
    (producto) => producto.category === ccategoryNameLowercase
  );

  return productosFiltrados;
};

export const getProductByAscending = (dataArray?: ApiProductoProps[]) => {
  const productArray = dataArray ? dataArray : products;

  const sortedProducts = [...productArray].sort((a, b) =>
    a.price.localeCompare(b.price)
  );
  return sortedProducts;
};

export const getProductByDescending = (dataArray?: ApiProductoProps[]) => {
  const productArray = dataArray ? dataArray : products;
  const sortedProducts = [...productArray].sort((a, b) =>
    b.price.localeCompare(a.price)
  );
  return sortedProducts;
};
