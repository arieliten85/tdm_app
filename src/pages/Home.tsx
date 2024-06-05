import { CustomCarousel } from "../components/carousel/CustomCarousel";
import { CardList } from "../components/cards/cardList/CardList";
import { InfoText } from "../infoTextHome/InfoText";
import { productos } from "../api/productos";

export default function Home() {
  return (
    <>
      <CustomCarousel />
      <div className="flex-center-column">
        <InfoText />
        <CardList productos={productos} />
      </div>
    </>
  );
}
