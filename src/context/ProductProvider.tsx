import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { ApiProductoProps } from "../types/types";

import {
  getAllProducts,
  getProductByAscending,
  getProductByDescending,
  getProductByRangePrice,
  getProductByTitle,
} from "../hook/useGetProducts";
import { useNavigate } from "react-router-dom";
import { useGetParamsLocation } from "../hook/useGetParamsLocation";

interface ProductContextType {
  products: ApiProductoProps[];
  setProducts: Dispatch<SetStateAction<ApiProductoProps[]>>;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  clearFilters: () => void;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => {},
  loading: false,
  error: false,
  errorMessage: "",
  clearFilters: () => {},
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ApiProductoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    searchParams,
    minPriceParamas,
    maxPriceParamas,
    valueTextParamas,
    sort_byParamas,
  } = useGetParamsLocation();

  useEffect(() => {
    if (valueTextParamas) {
      setLoading(true);
      const findProductByTitleResults = getProductByTitle(valueTextParamas);
      if (!findProductByTitleResults.length) {
        setTimeout(() => {
          setLoading(false);
          setError(true);
          setErrorMessage("No se encontraron resultados para su búsqueda.");
        }, 500);
      }
      setTimeout(() => {
        setLoading(false);
        setProducts(findProductByTitleResults);
      }, 500);
    } else if (minPriceParamas && maxPriceParamas) {
      setLoading(true);
      const filterProductByRangePriceResults = getProductByRangePrice({
        numMin: parseFloat(minPriceParamas),
        numMax: parseFloat(maxPriceParamas),
      });

      //NOT-FOUND
      if (!filterProductByRangePriceResults.length) {
        setTimeout(() => {
          setLoading(false);
          setError(true);
          setErrorMessage("No se encontraron resultados para su búsqueda.");
        }, 500);
      }

      if (sort_byParamas && sort_byParamas?.includes("ascending")) {
        const productOrdeByAscending = getProductByAscending(
          filterProductByRangePriceResults
        );
        setTimeout(() => {
          setLoading(false);
          setProducts(productOrdeByAscending);
        }, 500);
      }

      if (sort_byParamas && sort_byParamas?.includes("descending")) {
        const productOrdeByDescending = getProductByDescending(
          filterProductByRangePriceResults
        );
        setTimeout(() => {
          setLoading(false);
          setProducts(productOrdeByDescending);
        }, 500);
      }

      setTimeout(() => {
        setLoading(false);
        setProducts(filterProductByRangePriceResults);
      }, 500);
    } else if (sort_byParamas && sort_byParamas?.includes("ascending")) {
      const productOrdeByAscending = getProductByAscending();
      setTimeout(() => {
        setLoading(false);
        setProducts(productOrdeByAscending);
      }, 500);
    } else if (sort_byParamas?.includes("descending")) {
      const productOrdeByDescending = getProductByDescending();
      setProducts(productOrdeByDescending);
    } else {
      setLoading(true);
      const allProductData = getAllProducts();
      if (allProductData.length) {
        setTimeout(() => {
          setProducts(allProductData);
          setLoading(false);
        }, 500);
      } else {
        setError(true);
        setErrorMessage("Hubo un problema con la carga de datos.");
      }
    }

    // Limpiar errores cuando el componente se desmonte
    return () => {
      setError(false);
      setErrorMessage("");
    };
  }, [valueTextParamas, minPriceParamas, maxPriceParamas, sort_byParamas]);

  const clearFilters = () => {
    searchParams.delete("q");
    searchParams.delete("min_price");
    searchParams.delete("max_price");
    navigate("/productos");
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        loading,
        error,
        errorMessage,
        clearFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductContext);
