import { CustomCarousel } from "../components/carousel/CustomCarousel";
import { Card_02 } from "../components/cards/02_card/Card_02";

export default function Home() {
  return (
    <>
      <CustomCarousel />
      <div className="main-home">
        <Card_02 />
      </div>
    </>
  );
}
