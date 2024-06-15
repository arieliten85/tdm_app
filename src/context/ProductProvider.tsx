import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useMemo,
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
  status: "loading" | "error" | "success";
  errorMessage: string;
  clearFilters: () => void;
  isActiveFilter: boolean;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  status: "loading",
  errorMessage: "",
  clearFilters: () => {},
  isActiveFilter: false,
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const {
    searchParams,
    minPriceParamas,
    maxPriceParamas,
    valueTextParamas,
    sort_byParamas,
  } = useGetParamsLocation();
  const [products, setProducts] = useState<ApiProductoProps[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const [isActiveFilter, setIsActiveFilter] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const memoizedParams = useMemo(
    () => ({
      valueTextParamas,
      minPriceParamas,
      maxPriceParamas,
      sort_byParamas,
    }),
    [valueTextParamas, minPriceParamas, maxPriceParamas, sort_byParamas]
  );
  const loadProducts = () => {
    const cachedProducts = JSON.parse(
      localStorage.getItem("filteredProducts") || "[]"
    );

    if (memoizedParams.valueTextParamas) {
      setStatus("loading");
      const findProductByTitleResults = getProductByTitle(
        memoizedParams.valueTextParamas
      );
      setTimeout(() => {
        if (findProductByTitleResults.length) {
          setProducts(findProductByTitleResults);
          localStorage.setItem(
            "filteredProducts",
            JSON.stringify(findProductByTitleResults)
          );
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage("No se encontraron resultados para su búsqueda.");
        }
      }, 500);
    } else if (
      memoizedParams.minPriceParamas &&
      memoizedParams.maxPriceParamas
    ) {
      localStorage.setItem("minPriceParamas", JSON.stringify(minPriceParamas));
      localStorage.setItem("maxPriceParamas", JSON.stringify(maxPriceParamas));
      setStatus("loading");
      setIsActiveFilter(true);
      const filterProductByRangePriceResults = getProductByRangePrice({
        numMin: parseFloat(memoizedParams.minPriceParamas),
        numMax: parseFloat(memoizedParams.maxPriceParamas),
      });
      setTimeout(() => {
        if (filterProductByRangePriceResults.length) {
          setProducts(filterProductByRangePriceResults);
          setIsActiveFilter(true);
          localStorage.setItem(
            "filteredProducts",
            JSON.stringify(filterProductByRangePriceResults)
          );
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage("No se encontraron resultados para su búsqueda.");
        }
      }, 500);
    } else if (memoizedParams.sort_byParamas) {
      const orderDescending =
        memoizedParams.sort_byParamas.includes("descending");
      const orderAscending =
        memoizedParams.sort_byParamas.includes("ascending");

      if (orderDescending || orderAscending) {
        setStatus("loading");
        const orderedProducts = orderDescending
          ? getProductByDescending(cachedProducts)
          : getProductByAscending(cachedProducts);
        setTimeout(() => {
          setProducts(orderedProducts);
          setStatus("success");
        }, 500);
      }
    } else {
      setStatus("loading");
      const allProductData = getAllProducts();
      setTimeout(() => {
        setProducts(allProductData);
        localStorage.setItem(
          "filteredProducts",
          JSON.stringify(allProductData)
        );
        setStatus("success");
      }, 500);
    }
  };

  // ESCUCHA EL LOCATION Y EJECUTA DEPENDE LA UBICACION
  useEffect(() => {
    loadProducts();

    // Clean up errors on unmount
    return () => {
      setErrorMessage("");
    };
  }, [memoizedParams]);

  // ELIMINA EL INIDICADOR DE FILTRO APLICADO DEL FRONT AL NAVEGAR A OTRAS CATEGORIAS
  useEffect(() => {
    if (searchParams.size !== 0 && !!localStorage.getItem("minPriceParamas")) {
      setIsActiveFilter(true);
    } else {
      localStorage.removeItem("minPriceParamas");
      localStorage.removeItem("maxPriceParamas");
      setIsActiveFilter(false);
    }
  }, [searchParams.size]);

  console.log("searchParams.size", isActiveFilter);

  const clearFilters = () => {
    searchParams.delete("q");
    searchParams.delete("min_price");
    searchParams.delete("max_price");
    setIsActiveFilter(false);
    navigate("/productos");
    localStorage.removeItem("minPriceParamas");
    localStorage.removeItem("maxPriceParamas");
  };

  return (
    <ProductContext.Provider
      value={{ products, status, errorMessage, clearFilters, isActiveFilter }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductContext);
