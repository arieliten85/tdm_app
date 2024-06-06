import { productos } from "../api/productos";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import { ProductoProps } from "../types/types";

interface ProductContextType {
  filteredProducts: ProductoProps[];
  loading: boolean;
}

const ProductContext = createContext<ProductContextType>({
  filteredProducts: [],
  loading: false,
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const valueText = searchParams.get("q");
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");

  useEffect(() => {
    const filterProducts = () => {
      let filteredResults = productos;

      if (valueText) {
        const searchValueMinusculas = valueText.toLowerCase();
        filteredResults = filteredResults.filter((producto: ProductoProps) => {
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
      }

      if (minPrice && maxPrice) {
        setLoading(true); // Set loading to true when fetching starts
        const results = productos.filter((producto: ProductoProps) => {
          const productPrice = parseFloat(producto.price.substring(1));
          return (
            productPrice >= Number(minPrice) && productPrice <= Number(maxPrice)
          );
        });

        setTimeout(() => {
          setFilteredProducts(results);
          setLoading(false);
        }, 1000);
      } else {
        setFilteredProducts(filteredResults);
      }
    };

    filterProducts();
  }, [location.search]);

  return (
    <ProductContext.Provider value={{ filteredProducts, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductContext);
