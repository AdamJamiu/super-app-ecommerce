import { useState, useEffect } from "react";
import imgImg1 from "../assets/images/diverse.jpg"
import imgImg2 from "../assets/images/partnerships.jpg"
// custom components
import DashboardLayout from "../global/DashboardLayout";
import ProductSlider from "../components/home/ProductSlider"
import ShopFeature from "../components/home/ShopFeature"
import FeaturedProducts from "../components/home/FeaturedProducts";
// MUI icons
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// API 
import { useGetDashboardInfo } from "../controllers/dashboard";

import ShopByBrand from "../components/landingPage/ShopByBrand";
import PromoSection from "../components/promos/PromoSection";

// images
import altMallImg from "../assets/images/Altmall.jpg"
import FastCreditImg from "../assets/images/FastCredit.png"
import KlumpImg from "../assets/images/Klump.png"
import maxImg from "../assets/images/Max.jpg"
import quickbucksImg from "../assets/images/quickbucks.png"
import kezalogoImg from "../assets/images/kezalogo.png"
import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const LandingPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const { data, isLoading } = useGetDashboardInfo();
    // console.log(promos)
    const [isWindowPosition, setIsWindowPosition] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setIsWindowPosition(window.scrollY > 100);
        })
    }, [])

    const handleScroll = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col justify-center items-center h-full w-full">
                <ProductSlider />
                <ShopFeature />
                <FeaturedProducts data={data} isLoading={isLoading} />

                <Swiper
                    className="w-full h-96"
                    navigation={true}
                    pagination={true}
                    slidesPerView={1}
                    spaceBetween={30}
                    modules={[Navigation, Pagination]}
                >
                    <SwiperSlide className="rounded-md">
                        <img className="object-cover" src={imgImg1} width="100%" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className="rounded-md">
                        <img className="object-cover" src={imgImg2} width="100%" alt="" />
                    </SwiperSlide>
                </Swiper>

                <PromoSection />
                <ShopByBrand data={data} />
                {isWindowPosition &&
                    <Fab onClick={handleScroll} color="primary" aria-label="add" className="transition-all ease" sx={{ position: "fixed", bottom: 10, right: 0 }}>
                        <KeyboardArrowUpIcon />
                    </Fab>
                }
                <div className="mt-5 flex flex-col justify-center gap-5 items-center h-full bg-white md:py-10 p-7 md:px-32 rounded sm:shadow-sm w-full">
                    <h1 className="font-bold mb-2 text-lg w-full text-center">Just Own It - First of its kind multi asset financing platform</h1>
                    <p className="text-secondary text-md text-center">
                        Just Own It is a first of its kind multi asset-financing platform that bridges the gap between financial institutions, customers and Original Equipment Manufacturers (OEMs).
                    </p>
                    <p className="text-secondary text-md text-center">In line with our mission to ensure products and services are accessible, affordable and usable across Africa, we have built a digital product warehouse combined with lending gateways</p>
                    <Link to="/our-story" className="w-full self-center text-center text-sm underline mt-3">read more</Link>

                </div>

                <div className="my-5 flex flex-col justify-center gap-5 items-centers h-full bg-white rounded shadow-sm w-full">

                    <h1 className="font-semibold w-full self-center text-center px-10 pt-10">Strategic Partners</h1>

                    <Swiper
                        className="pb-20 pt-10 w-full self-center flex flex-col justify-center items-center"
                        slidesPerView={5.2}
                        centeredSlidesBounds={true}
                        centeredSlides={true}
                        spaceBetween={30}
                        speed={3000}
                        scrollbar={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        modules={[Scrollbar, Autoplay, Pagination]}
                        breakpoints={{
                            '@0.00': {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            '@0.75': {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            '@1.00': {
                                slidesPerView: 5,
                                spaceBetween: 25
                            },
                            '@1.50': {
                                slidesPerView: 7,
                                spaceBetween: 30,
                                scrollbar: true
                            },
                        }}
                    >
                        <SwiperSlide className="self-center">
                            <img loading="lazy" src={altMallImg} alt="atMall" className="rounded-full object-contain" />
                        </SwiperSlide>
                        <SwiperSlide className="self-center">
                            <img loading="lazy" src={FastCreditImg} alt="FastCredit" className="rounded-full object-contain" />
                        </SwiperSlide>
                        <SwiperSlide className="self-center">
                            <img loading="lazy" src={KlumpImg} alt="Klump_Img" className="rounded-full object-contain" />
                        </SwiperSlide>
                        <SwiperSlide className="self-center">
                            <img loading="lazy" src={quickbucksImg} alt="QuickBUCKS" className="rounded-full object-contain" />
                        </SwiperSlide>
                        <SwiperSlide className="self-center">
                            <img loading="lazy" src={kezalogoImg} alt="Keza_log" className="rounded-full object-contain" />
                        </SwiperSlide>
                        <SwiperSlide className="self-center">
                            <img loading="lazy" src={maxImg} alt="kipa_later_logo" className="rounded-full object-contain" />
                        </SwiperSlide>
                    </Swiper>
                </div>

            </div>
        </DashboardLayout>
    );
}

export default LandingPage;