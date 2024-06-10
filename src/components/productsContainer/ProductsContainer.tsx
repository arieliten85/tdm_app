import { CardList } from "../cards/cardList/CardList";
import { Filter } from "../filter/Filter";
import {
  NotFoundData,
  ShowSpinner,
  TitleCategory,
} from "../utililidades/Components";

import { useFilterProduct } from "../../components/hook/useFilterProduct";
import { Breadcrumb } from "../../components/breadcrumbs/Breadcrumbs";

export default function ProductsContainer() {
  const { filteredProduct, loading, errorMessage } = useFilterProduct();

  return (
    <>
      <div className="productos-home">
        {loading ? (
          <ShowSpinner />
        ) : (
          <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <Breadcrumb />
            <TitleCategory title="Productos" />

            {errorMessage && <NotFoundData />}
            <div className="productos-home">
              <Filter />
              <CardList productos={filteredProduct} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
