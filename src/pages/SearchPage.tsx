import {
  NotFoundData,
  ShowSpinner,
  TitleCategory,
} from "../components/utililidades/Components";

import { useFilterProduct } from "../components/hook/useFilterProduct";
import ProductsList from "../components/ProductList/ProductList";
import { Breadcrumb } from "../components/breadcrumbs/Breadcrumbs";

export const SearchPage = () => {
  const { loading, errorMessage, filteredProduct } = useFilterProduct();

  if (loading) {
    return <ShowSpinner />;
  }

  return (
    <>
      <div className="productos-home ">
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
          <TitleCategory title="Productos" />
          <Breadcrumb />

          {errorMessage ? (
            <NotFoundData />
          ) : (
            <ProductsList productos={filteredProduct} />
          )}
        </div>
      </div>
    </>
  );
};
