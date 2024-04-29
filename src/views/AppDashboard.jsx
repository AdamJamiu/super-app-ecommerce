import { useState, useEffect } from "react";
// custom components
import DashboardLayout from "../global/DashboardLayout";
// MUI icons
// API
// images
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HomePage from "../pages/dashboard/Home";

const AppDashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // console.log(promos)
  const [isWindowPosition, setIsWindowPosition] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsWindowPosition(window.scrollY > 100);
    });
  }, []);

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <DashboardLayout>
      <HomePage />
    </DashboardLayout>
  );
};

export default AppDashboardPage;
