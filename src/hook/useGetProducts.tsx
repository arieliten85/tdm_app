import { ApiProductoProps } from "../types/types";
import { apiQuickStock } from "../api/apiQuickStock";
import { apiAllproductos } from "../api/productos/apiAllproductos";

// TYPS
interface FilterRangePriceProps {
  numMin: string | number;
  numMax: string | number;
}

//ARRAY PRODUCTS
const products = apiAllproductos.concat(apiQuickStock);

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
  const products = apiAllproductos.concat(apiQuickStock);

  return products;
};

export const getProductByCategory = (categoryName: string) => {
  const ccategoryNameLowercase = categoryName.toLowerCase();

  const productosFiltrados = products.filter(
    (producto) => producto.category === ccategoryNameLowercase
  );

  return productosFiltrados;
};
