import {
  NotFoundData,
  ShowSpinner,
} from "../components/utililidades/Components";
import { CardList } from "../components/cards/cardList/CardList";

import { useProductsContext } from "../context/ProductProvider";

export function SearchResults() {
  const { products, status } = useProductsContext();

  if (!products.length) {
    return <NotFoundData />;
  }

  return (
    <>
      {status === "loading" ? (
        <ShowSpinner />
      ) : (
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
          <h1 className="w-100 text-center">Productos</h1>

          {!products.length && <NotFoundData />}
          <CardList productos={products} />
        </div>
      )}
    </>
  );
}
