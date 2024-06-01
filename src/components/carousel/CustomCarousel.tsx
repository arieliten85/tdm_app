// import Carousel from "react-bootstrap/Carousel";

// export function CustomCarousel() {
//   const image01 =
//     "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

//   return (
//     <Carousel
//       style={{
//         maxHeight: "200px ",
//         overflow: "hidden",

//         display: "flex",
//         margin: "0 auto",
//       }}
//     >
//       <Carousel.Item>
//         <img
//           src={image01}
//           alt="First slide"
//           className="w-100"
//           style={{ objectFit: "cover", height: "500px" }}
//         />
//       </Carousel.Item>
//     </Carousel>
//   );
// }

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

export function CustomCarousel() {
  const image01 =
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const image02 =
    "https://images.unsplash.com/photo-1516919549054-e08258825f80?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const image03 =
    "https://plus.unsplash.com/premium_photo-1663133730195-2ce4986a96b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGNha2UlMjBiYWNrZ3JvdW5kfGVufDB8MHwwfHx8MA%3D%3D";

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
        </Slider>
      </div>
    </div>
  );
}
