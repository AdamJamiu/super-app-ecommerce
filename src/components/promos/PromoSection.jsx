import { Link } from "react-router-dom";
import PromotionSkeleton from "../products/PromotionSekeleton";
import CountdownTimer from "./CountdownTimer";
import { getPromos } from "../../controllers/dashboard";
import { TimerOutlined } from "@mui/icons-material";
import { Scrollbar, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

const PromoSection = () => {
    const { data, isLoading, isFetching } = getPromos();
    const promoInfo = data?.map(item => item);

    const truncateName = (name) => {
        if (name.length > 20) {
            return name.slice(0, 20) + '...'
        }
        return name;
    }

    const formatCurrency = (amount) => {
        return amount.toLocaleString('en-US')
    }

    return (
        <div className={`${data?.length ? "block" : "hidden"} overflow-y-auto w-full pb-5`}>

            {isLoading || isFetching ? <PromotionSkeleton />
                :
                <div className="w-full my-4">
                    {data?.map((item, index) => (
                        <div key={index} className="bg-white rounded-b-md w-full">
                            <div className="font-medium p-4 text-lg flex flex-row justify-start items-center gap-2 text-white bg-black rounded-t-md">
                                <h1 className="text-xl">{item?.name}</h1>
                            </div>

                            <Swiper
                                autoplay={{
                                    delay: 5000 * index,
                                    disableOnInteraction: false,
                                }}
                                speed={3000}
                                navigation={true}
                                scrollbar={true}
                                breakpoints={{
                                    '@0.00': {
                                        slidesPerView: 1,
                                        spaceBetween: 0,
                                    },
                                    '@0.75': {
                                        slidesPerView: 2,
                                        spaceBetween: 0
                                    },
                                    '@1.00': {
                                        slidesPerView: 3,
                                    },
                                    '@1.50': {
                                        slidesPerView: 5,
                                    },
                                }}
                                slidesPerView={5}
                                spaceBetween={5}
                                modules={[Scrollbar, Navigation, Autoplay]}
                                className="my-7"
                            >
                                {item?.products?.map(product => (
                                    <SwiperSlide className="min-w-[250px] hover:shadow-lg hover:scale-105 ease transition-all" key={product?.id}>
                                        <Link to={`/products/${product.id}`} className="hover:border-orange-500 bg-white p-2 ease-in-out transition-all relative justify-between items-center">
                                            <div className="overflow-hidden h-[200px]">
                                                <img src={product?.productImageUrls[0]?.url} alt={product?.productName} className="ease transition-all hover:scale-[1.03] ease-in-out" />
                                            </div>
                                            <div className="py-2 flex flex-col items-center justify-center md:items-start md:justify-start text-left mt-2">
                                                <p className="text-sm text-secondary mb-2">{truncateName(product?.productName)}</p>
                                                <p className="md:text-xl text-md text-[#FF6000] font-medium md:font-semibold"><span className="font-light md:font-medium text-sm">&#8358;</span>{formatCurrency(product?.specialPrice)}</p>
                                                <p className="text-sm text-gray-500"><s> &#8358;{formatCurrency(product?.price)}</s></p>
                                                <div className="flex text-sm flex-row justify-center items-center gap-1 mt-2">
                                                    <TimerOutlined className="text-blue-500" fontSize="small" />
                                                    <div className="text-blue-700">
                                                        <CountdownTimer promoDetails={promoInfo[index]} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute right-2 top-0 text-sm font-medium p-1 text-white rounded-full bg-red-600 text-center">
                                                -{item?.percentOff}%
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    ))}
                </div>

            }
        </div >
    )
}

export default PromoSection;