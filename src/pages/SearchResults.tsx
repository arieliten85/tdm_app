import { NotFoundData } from "../components/utililidades/Components";
import { CardList } from "../components/cards/cardList/CardList";

import { useProductsContext } from "../context/ProductProvider";

export function SearchResults() {
  const { filteredProducts } = useProductsContext();

  if (!filteredProducts.length) {
    return <NotFoundData />;
  }

  return (
    <>
      <div className="flex-center-column p2" style={{ height: "100vh" }}>
        <CardList productos={filteredProducts} />
      </div>
    </>
  );
}
