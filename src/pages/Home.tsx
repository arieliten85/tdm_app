import { CustomCarousel } from "../components/carousel/CustomCarousel";
import { CardList } from "../components/cards/cardList/CardList";
import { InfoText } from "../infoTextHome/InfoText";

import { useProductsContext } from "../context/ProductProvider";
import { ShowSpinner } from "../components/utililidades/Components";

export function Home() {
  const { filteredProducts, loading } = useProductsContext();

  if (loading) {
    return <ShowSpinner />;
  }
  return (
    <>
      <CustomCarousel />
      <div className="flex-center-column">
        <InfoText />

        <CardList productos={filteredProducts} />
      </div>
    </>
  );
}
