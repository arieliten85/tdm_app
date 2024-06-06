import { productos } from "../api/productos";
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
  filteredProducts: ProductoProps[];
  loading: boolean;
  clearFilters: () => void;
  error: boolean;
}

const ProductContext = createContext<ProductContextType>({
  filteredProducts: [],
  loading: false,
  clearFilters: () => {},
  error: false,
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const valueText = searchParams.get("q");
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");

  useEffect(() => {
    const filterProducts = () => {
      if (valueText) {
        setLoading(true);
        const searchValueMinusculas = valueText.toLowerCase();
        const resultSearch = productos.filter((producto: ProductoProps) => {
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
              tagsEnMinusculas.some((tag) =>
                tag.includes(searchValueMinusculas)
              )
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
            setFilteredProducts(productos);
          }, 1000);

          return;
        }

        setTimeout(() => {
          setError(false);
          setLoading(false);
          setFilteredProducts(resultSearch);
        }, 1000);

        return;
      }

      if (minPrice && maxPrice) {
        setLoading(true);
        const resultsFilterPrice = productos.filter(
          (producto: ProductoProps) => {
            const productPrice = parseFloat(producto.price.substring(1));
            return (
              productPrice >= Number(minPrice) &&
              productPrice <= Number(maxPrice)
            );
          }
        );

        if (!resultsFilterPrice.length) {
          setTimeout(() => {
            setLoading(false);
            setError(true);
            setFilteredProducts(productos);
          }, 1000);

          return;
        }

        setTimeout(() => {
          setLoading(false);
          setError(false);
          setFilteredProducts(resultsFilterPrice);
        }, 1000);

        return;
      }
    };

    filterProducts();
  }, [location.search]);

  useEffect(() => {
    setLoading(true);

    if (productos) {
      setTimeout(() => {
        setLoading(false);
        setFilteredProducts(productos);
      }, 1000);
    }
  }, []);
  const clearFilters = () => {
    setLoading(true);
    setFilteredProducts(productos);
    searchParams.delete("q");
    searchParams.delete("min_price");
    searchParams.delete("max_price");
    navigate({ search: searchParams.toString() });
    setLoading(false);
    setError(false);
  };

  return (
    <ProductContext.Provider
      value={{ filteredProducts, loading, clearFilters, error }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductContext);
