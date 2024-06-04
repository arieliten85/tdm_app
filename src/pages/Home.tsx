import { CustomCarousel } from "../components/carousel/CustomCarousel";
import { CardList } from "../components/cards/cardList/CardList";
import { InfoText } from "../infoTextHome/InfoText";

export default function Home() {
  return (
    <>
      <CustomCarousel />
      <div className="main-home">
        <InfoText />
        <CardList />
      </div>
    </>
  );
}
