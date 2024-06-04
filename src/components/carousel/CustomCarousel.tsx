import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./customCarousel.scss";
import Slider from "react-slick";
import { imagesCarousel } from "../../api/imagesCarousel";

export const CustomCarousel = () => {
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
          {imagesCarousel.map((item, index) => (
            <div key={index}>
              <img
                src={item.img}
                className="img_slider"
                alt={`slide-${index}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
