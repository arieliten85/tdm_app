import { apiProducts } from "../api/apiProducts";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { ProductoProps } from "../types/types";

interface ProductContextType {
  products: ProductoProps[];
  loading: boolean;

  error: boolean;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  error: false,
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setError(false);
      setProducts(apiProducts);
    }, 500);
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductContext);
