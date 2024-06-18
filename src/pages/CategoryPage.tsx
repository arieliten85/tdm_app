import {
  NotFoundData,
  TitleCategory,
} from "../components/utililidades/Components";
import { useProductsContext } from "../context/ProductProvider";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "../components/breadcrumbs/Breadcrumbs";
import ProductsList from "../components/ProductList/ProductList";

export const CategoryPage = () => {
  const { category } = useParams();
  const { products, errorMessage, status } = useProductsContext();

  if (!category) {
    return <div>No se ha especificado una categoría.</div>;
  }
  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <div className="productos-home ">
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        <TitleCategory title="Productos" />
        <Breadcrumb />
        <div className="productos-home">
          {errorMessage && status === "error" ? (
            <NotFoundData />
          ) : (
            <>
              {/* <ProductFilter /> */}
              <ProductsList productos={filteredProducts} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
