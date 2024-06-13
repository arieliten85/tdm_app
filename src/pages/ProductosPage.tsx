import {
  NotFoundData,
  ShowSpinner,
  TitleCategory,
} from "../components/utililidades/Components";

import ProductsList from "../components/ProductList/ProductList";
import { Breadcrumb } from "../components/breadcrumbs/Breadcrumbs";
import { ProductFilter } from "../components/filter/Filter";
import { useProductsContext } from "../context/ProductProvider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiProductoProps } from "../types/types";
import { getProductByCategory } from "../hook/useGetProducts";

export const ProductosPage = () => {
  const { categoria } = useParams();
  <NotFoundData />;
  const { products, error, errorMessage, loading } = useProductsContext();

  const [productsByCategory, setProductsByCategory] = useState<
    ApiProductoProps[]
  >([]);

  useEffect(() => {
    if (categoria) {
      const productosFiltrados = getProductByCategory(categoria);
      setProductsByCategory(productosFiltrados);
    }
  }, [categoria, products]);

  console.log("errorMessage", errorMessage);
  console.log("error", error);
  console.log("products", products);

  if (loading) {
    return <ShowSpinner />;
  }

  return (
    <>
      <div className="productos-home ">
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
          <TitleCategory title="Productos" />
          <Breadcrumb />
          <div className="productos-home">
            {errorMessage && error ? (
              <NotFoundData />
            ) : (
              <>
                <ProductFilter />
                <ProductsList
                  productos={
                    !productsByCategory.length ? products : productsByCategory
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
