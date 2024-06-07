import { CardList } from "../cards/cardList/CardList";
import { useProductsContext } from "../../context/ProductProvider";
import {
  NotFoundData,
  ShowSpinner,
} from "../../components/utililidades/Components";

export const Productos = () => {
  const { products, loading } = useProductsContext();

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
            <h1 className="w-100 text-center">Productos</h1>

            {!products.length && <NotFoundData />}
            <CardList productos={products} />
          </div>
        )}
      </div>
    </div>
  );
};
