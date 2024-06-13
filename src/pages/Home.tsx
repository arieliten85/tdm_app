import "../components/utililidades/componentes.scss";

import { CustomCarousel } from "../components/carousel/CustomCarousel";
import { CardList } from "../components/cards/cardList/CardList";
import { InfoText } from "../infoTextHome/InfoText";

import { useProductsContext } from "../context/ProductProvider";
import {
  AllProductsButton,
  ShowSpinner,
  TitleCategory,
} from "../components/utililidades/Components";

export function Home() {
  const { products, loading } = useProductsContext();

  const productosVentaRapida = products.filter(
    (producto) => producto.tags && producto.tags.includes("ventaRapida")
  );

  if (loading) {
    return <ShowSpinner />;
  }
  return (
    <>
      <CustomCarousel />
      <div className="flex-center-column">
        <InfoText />
        <TitleCategory title="Listo para retirar" />
        <CardList productos={productosVentaRapida} />
        <AllProductsButton />
      </div>
    </>
  );
}
