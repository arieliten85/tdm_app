import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { productos } from "../api/productos";
import { ProductoProps } from "types/types";

interface SearchContextProps {
  searchResults: ProductoProps[];
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextProps>({
  searchResults: [],
  setSearchValue: () => {},
  searchValue: "",
});

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ProductoProps[]>([]);

  useEffect(() => {
    if (searchValue) {
      const searchValueMinusculas = searchValue.toLowerCase();

      const results = productos.filter((producto: ProductoProps) => {
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

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  return (
    <SearchContext.Provider
      value={{ searchResults, searchValue, setSearchValue }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = (): SearchContextProps =>
  useContext(SearchContext);
