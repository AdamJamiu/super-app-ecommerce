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

const AppDashboardPage = () => {
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

        </DashboardLayout>
    );
}

export default AppDashboardPage;