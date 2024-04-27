import { Carousel } from 'react-responsive-carousel';
import banner from "../../assets/images/banner.png";
import banner1 from "../../assets/images/JustOwnItWebbanner_4.jpg";
import banner2 from "../../assets/images/JustOwnItWebbanner_3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ProductSlider = () => {

    return (
        <div className='w-full shadow-md h-fit bg-white rounded-sm mt-4 sm:mt-10'>
            <Carousel showThumbs={false} className='bg-white rounded-md' autoPlay={true} infiniteLoop={true}>
                <div>
                    <img loading="lazy" src={banner} alt="slider" className="object-cover bg-center bg-no-repeat" />
                </div>
                <div>
                    <img loading="lazy" src={banner1} alt="slider" className="object-cover bg-center bg-no-repeat" />
                </div>
                <div>
                    <img loading="lazy" src={banner2} alt="slider" className="object-cover bg-center bg-no-repeat" />
                </div>
            </Carousel>
        </div>
    );
}

export default ProductSlider;