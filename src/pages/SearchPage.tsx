import {
  NotFoundData,
  ShowSpinner,
  TitleCategory,
} from "../components/utililidades/Components";

import ProductsList from "../components/ProductList/ProductList";
import { Breadcrumb } from "../components/breadcrumbs/Breadcrumbs";
import { useProductsContext } from "../context/ProductProvider";

export const SearchPage = () => {
  const { status, products, errorMessage } = useProductsContext();

  if (status === "loading") {
    return <ShowSpinner />;
  }

  return (
    <>
      <div className="productos-home ">
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
          <TitleCategory title="Productos" />
          <Breadcrumb />

          {errorMessage && status === "error" ? (
            <NotFoundData />
          ) : (
            <>
              <ProductsList productos={products} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
