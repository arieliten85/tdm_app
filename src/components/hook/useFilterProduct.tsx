import { apiProducts } from "../../api/apiProducts";
import { useEffect, useState } from "react";
import { ProductoProps } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface PriceRangeProps {
  minPrice: string;
  maxPrice: string;
}

export const useFilterProduct = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const valueTextParamas = searchParams.get("q");
  const minPriceParamas = searchParams.get("min_price");
  const maxPriceParamas = searchParams.get("max_price");

  const [filteredProduct, setFilteredProduct] = useState<ProductoProps[]>([]);
  const [valueText, setValueText] = useState<string>("");
  const [priceRange, setPriceRange] = useState<PriceRangeProps>({
    minPrice: "",
    maxPrice: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (valueTextParamas) {
      setValueText(valueTextParamas);
    }
    if (minPriceParamas && maxPriceParamas) {
      setPriceRange({
        minPrice: minPriceParamas,
        maxPrice: maxPriceParamas,
      });
    }
    setErrorMessage("");
    setFilteredProduct(apiProducts);
  }, [valueTextParamas, minPriceParamas, maxPriceParamas]);

  useEffect(() => {
    if (valueText) {
      setLoading(true);

      const searchValueMinusculas = valueText.toLowerCase();
      const searchResults = apiProducts.filter((producto: ProductoProps) => {
        const tituloEnMinusculas = producto.title.toLowerCase();

        if (tituloEnMinusculas.includes(searchValueMinusculas)) {
          return true;
        }

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

      if (!searchResults.length) {
        setTimeout(() => {
          setLoading(false);
          setFilteredProduct(apiProducts);
          setErrorMessage(
            `No hubo resultados para tu búsqueda: "${valueText}".`
          );
        }, 500);
      } else {
        setTimeout(() => {
          setLoading(false);
          setFilteredProduct(searchResults);
        }, 500);
      }
    }

    if (priceRange.minPrice && priceRange.maxPrice) {
      setLoading(true);
      const minPrice = Number(priceRange.minPrice);
      const maxPrice = Number(priceRange.maxPrice);
      const rangePriceResults = apiProducts.filter(
        (producto: ProductoProps) => {
          const productPrice = parseFloat(producto.price.substring(1));
          return productPrice >= minPrice && productPrice <= maxPrice;
        }
      );

      if (!rangePriceResults.length) {
        setTimeout(() => {
          setLoading(false);
          setFilteredProduct([]);
          setErrorMessage("No se encontraron resultados para su búsqueda.");
        }, 500);
      } else {
        setTimeout(() => {
          setLoading(false);
          setFilteredProduct(rangePriceResults);
        }, 500);
      }
    }
  }, [priceRange.maxPrice, priceRange.minPrice, valueText]);

  const clearFilters = () => {
    setLoading(true);

    setFilteredProduct(apiProducts);
    searchParams.delete("q");
    searchParams.delete("min_price");
    searchParams.delete("max_price");
    navigate({ search: searchParams.toString() });

    setLoading(false);
  };

  return { filteredProduct, loading, clearFilters, errorMessage };
};
