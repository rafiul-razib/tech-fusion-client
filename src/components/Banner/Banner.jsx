import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import image1 from "../../assets/images/img- (1).jpg";
import image2 from "../../assets/images/img- (2).jpg";
import image3 from "../../assets/images/img- (3).jpg";
import image4 from "../../assets/images/img- (4).jpg";
import image5 from "../../assets/images/img- (5).jpg";
import image6 from "../../assets/images/img- (6).jpg";
import image7 from "../../assets/images/img- (7).jpg";
import image8 from "../../assets/images/img- (8).jpg";

const Banner = () => {
  return (
    <Carousel>
      <div>
        <img src={image1} />
        {/* <p className="legend">Legend 1</p> */}
      </div>
      <div>
        <img src={image2} />
        {/* <p className="legend">Legend 2</p> */}
      </div>
      <div>
        <img src={image3} />
        {/* <p className="legend">Legend 3</p> */}
      </div>
      <div>
        <img src={image4} />
        {/* <p className="legend">Legend 3</p> */}
      </div>
      <div>
        <img src={image5} />
        {/* <p className="legend">Legend 3</p> */}
      </div>
      <div>
        <img src={image6} />
        {/* <p className="legend">Legend 3</p> */}
      </div>
      <div>
        <img src={image7} />
        {/* <p className="legend">Legend 3</p> */}
      </div>
      <div>
        <img src={image8} />
        {/* <p className="legend">Legend 3</p> */}
      </div>
    </Carousel>
  );
};

export default Banner;
