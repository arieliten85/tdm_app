import { CardList } from "../cards/cardList/CardList";
import { useProductsContext } from "../../context/ProductProvider";
import {
  NotFoundData,
  ShowSpinner,
} from "../../components/utililidades/Components";

export const Productos = () => {
  const { filteredProducts, loading } = useProductsContext();

  if (!filteredProducts.length) {
    return <NotFoundData />;
  }

  return (
    <div
      className="flex-center-column p-2"
      style={{
        height: "100vh",
      }}
    >
      <div className="products">
        {loading ? (
          <ShowSpinner />
        ) : (
          <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <h1 className="mb-4 w-100 ">Productos</h1>
            <CardList productos={filteredProducts} />
          </div>
        )}
      </div>
    </div>
  );
};
