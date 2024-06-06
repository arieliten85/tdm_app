import {
  NotFoundData,
  ShowSpinner,
} from "../components/utililidades/Components";
import { CardList } from "../components/cards/cardList/CardList";

import { useProductsContext } from "../context/ProductProvider";

export function SearchResults() {
  const { filteredProducts, error, loading } = useProductsContext();

  console.log("error", error);
  console.log("data search", filteredProducts);

  if (!filteredProducts.length) {
    return <NotFoundData />;
  }

  return (
    <>
      {loading ? (
        <ShowSpinner />
      ) : (
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
          <h1 className="w-100 text-center">Productos</h1>

          {!filteredProducts.length && <NotFoundData />}
          <CardList productos={filteredProducts} />
        </div>
      )}
    </>
  );
}
