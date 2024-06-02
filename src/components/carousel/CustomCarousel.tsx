import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./customCarousel.scss";
import Slider from "react-slick";

export function CustomCarousel() {
  const image01 =
    "https://dcdn.mitiendanube.com/stores/001/377/634/themes/new_linkedman/2-slide-1714504411269-5658220142-d0bed3eebba43c8ecaf0d7744ae7ba3e1714504423-1920-1920.webp?819690099";

  const image02 =
    "https://dcdn.mitiendanube.com/stores/001/377/634/themes/new_linkedman/2-slide-1714137566562-600619833-d94cac8eff404d1322837221d98e6b361714137577-1920-1920.webp?819690099";

  const image03 =
    "https://dcdn.mitiendanube.com/stores/001/377/634/themes/new_linkedman/1-slide-1653607423820-7339466423-5251f519a986c42dd7eef8dd89214af11653607504-1920-1920.webp?819690099";

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider_container">
      <div className="slider">
        <Slider {...settings}>
          <div>
            <img src={image01} className="img_slider" />
          </div>
          <div>
            <img src={image02} className=" img_slider" />
          </div>
          <div>
            <img src={image03} className=" img_slider" />
          </div>
        </Slider>
      </div>
    </div>
  );
}
