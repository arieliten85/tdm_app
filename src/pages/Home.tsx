import { CustomCarousel } from "../components/carousel/CustomCarousel";
import { CardList } from "../components/cards/cardList/CardList";
import { InfoText } from "../infoTextHome/InfoText";

import { useProductsContext } from "../context/ProductProvider";

export function Home() {
  const { filteredProducts } = useProductsContext();
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
