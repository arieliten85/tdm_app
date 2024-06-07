import { CardList } from "../cards/cardList/CardList";
import { Filter } from "../filter/Filter";
import {
  NotFoundData,
  ShowSpinner,
  TitleCategory,
} from "../utililidades/Components";
import { useProductsContext } from "../../context/ProductProvider";

export default function ProductsContainer() {
  const { error, products, loading } = useProductsContext();
  return (
    <>
      <div className="productos-home">
        {loading ? (
          <ShowSpinner />
        ) : (
          <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <TitleCategory title="Productos" />
            {error && <NotFoundData />}
            {!products.length && <NotFoundData />}
            <div className="productos-home">
              <Filter />
              <CardList productos={products} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
