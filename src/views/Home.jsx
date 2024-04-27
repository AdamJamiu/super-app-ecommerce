import React from "react";
import { Link } from "react-router-dom";

// assets images
import banner from "../assets/images/banner.png";
import googleplay from "../assets/images/googleplay.png";
import appstore from "../assets/images/appstore.png";
import accessbank from "../assets/images/access.svg";
import gtbank from "../assets/images/gt.svg";
import payWithSpectar from "../assets/images/specta.svg";
// components
import AppBar from "../components/home/AppBar";
import AppFooter from "../components/home/AppFooter";

// images 

const Home = () => {

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <AppBar />
            <div className="max-w-5xl flex flex-col justify-center items-center h-full w-full">
                <div className="mt-10 flex flex-col justify-center gap-5 items-centers h-full bg-white">

                    <img loading="lazy" src={banner} alt="banner" height={200} className="w-full object-cover my-5" />
                    <p className="text-secondary text-lg">
                        Just Own It is a first of its kind asset-financing platform that bridges the gap between financial institutions,
                        customers and Original Equipment Manufacturers (OEMs). In line with the mission to ensure products and services are
                        accessible, affordable and usable across Africa, we have implemented an Asset Financing technology solution to ensure a
                        stable supply of assets with minimal hassles in order to ease your journey to acquisition.
                    </p>
                    <div className="flex flex-row justify-start items-center gap-5 mb-5">
                        <Link to="https://play.google.com/store/apps/details?id=com.TDAfrica.justownitapp">
                            <img src={googleplay} alt="googleplay" className="cursor-pointer" width={130} />
                        </Link>
                        <img src={appstore} alt="appstore" className="cursor-pointer" width={130} />
                    </div>

                    <div className="flex flex-row justify-start items-center gap-10 text-secondary my-5">
                        <h1 className="font-medium text-sm">Strategic partner:</h1>
                        <div className="flex flex-row justify-center items-center gap-10">
                            <img src={accessbank} alt="accessbank" width={100} />
                            <img src={gtbank} alt="gtbank" width={100} />
                            <img src={payWithSpectar} alt="payWithSpectar" width={100} />
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter />
        </div>
    );
}

export default Home;