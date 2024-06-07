import { apiProducts } from "../api/apiProducts";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductoProps } from "../types/types";

interface ProductContextType {
  products: ProductoProps[];
  loading: boolean;
  clearFilters: () => void;
  error: boolean;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  clearFilters: () => {},
  error: false,
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const valueText = searchParams.get("q");
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");

  useEffect(() => {
    setLoading(true);
    if (valueText !== null) {
      const searchValueMinusculas = valueText.toLowerCase();
      const resultSearch = apiProducts.filter((producto: ProductoProps) => {
        // Buscar por título
        const tituloEnMinusculas = producto.title.toLowerCase();
        if (tituloEnMinusculas.includes(searchValueMinusculas)) {
          return true;
        }

        // Buscar por etiquetas
        if (producto.tags) {
          const tagsEnMinusculas = producto.tags.map((tag) =>
            tag.toLowerCase()
          );
          if (
            tagsEnMinusculas.some((tag) => tag.includes(searchValueMinusculas))
          ) {
            return true;
          }
        }

        return false;
      });

      if (!resultSearch.length) {
        setTimeout(() => {
          setError(true);
          setLoading(false);
          setProducts(apiProducts);
        }, 500);

        return;
      }

      setTimeout(() => {
        setError(false);
        setLoading(false);
        setProducts(resultSearch);
      }, 500);

      return;
    }

    if (minPrice && maxPrice !== null) {
      setLoading(true);
      const resultsFilterPrice = apiProducts.filter(
        (producto: ProductoProps) => {
          const productPrice = parseFloat(producto.price.substring(1));
          return (
            productPrice >= Number(minPrice) && productPrice <= Number(maxPrice)
          );
        }
      );

      if (!resultsFilterPrice.length) {
        setTimeout(() => {
          setLoading(false);
          setError(true);
          setProducts(apiProducts);
        }, 1000);

        return;
      }

      setTimeout(() => {
        setLoading(false);
        setError(false);
        setProducts(resultsFilterPrice);
      }, 1000);

      return;
    }

    setTimeout(() => {
      setLoading(false);
      setError(false);
      setProducts(apiProducts);
    }, 500);
  }, [location.search, maxPrice, minPrice, valueText]);

  const clearFilters = () => {
    setLoading(true);
    setProducts(apiProducts);
    searchParams.delete("q");
    searchParams.delete("min_price");
    searchParams.delete("max_price");
    navigate({ search: searchParams.toString() });
    setLoading(false);
    setError(false);
  };

  return (
    <ProductContext.Provider value={{ products, loading, clearFilters, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductContext);
