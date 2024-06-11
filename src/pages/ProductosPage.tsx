import {
  NotFoundData,
  ShowSpinner,
  TitleCategory,
} from "../components/utililidades/Components";
import { useFilterProduct } from "../components/hook/useFilterProduct";
import ProductsList from "../components/ProductList/ProductList";
import { Breadcrumb } from "../components/breadcrumbs/Breadcrumbs";
import { ProductFilter } from "../components/filter/Filter";

export const ProductosPage = () => {
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
          <div className="productos-home">
            {errorMessage ? (
              <NotFoundData />
            ) : (
              <>
                <ProductFilter />
                <ProductsList productos={filteredProduct} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
